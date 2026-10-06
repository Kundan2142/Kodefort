import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import * as XLSX from "xlsx";
import * as path from "path";
import { fileURLToPath } from "url";
import { promises as fsPromises, existsSync } from "fs";

export const dynamic = "force-dynamic";

function resolveExcelPath(): string {
  const candidates: string[] = [];
  try {
    if (process.cwd()) {
      candidates.push(
        path.join(
          process.cwd(),
          "data",
          "Internship Form Kodefort  (Responses).xlsx"
        )
      );
      candidates.push(
        path.join(
          /*turbopackIgnore: true*/ process.cwd(),
          "Internship Form Kodefort  (Responses).xlsx"
        )
      );
    }
  } catch {
    // ignore
  }
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    candidates.push(
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "data",
        "Internship Form Kodefort  (Responses).xlsx"
      )
    );
    candidates.push(
      path.resolve(
        /*turbopackIgnore: true*/ __dirname,
        "..",
        "..",
        "..",
        "..",
        "Internship Form Kodefort  (Responses).xlsx"
      )
    );
  } catch {
    // ignore
  }
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return candidates[0] || "";
}

export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  try {
    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (q) {
      where.OR = [
        { studentName: { contains: q, mode: "insensitive" } },
        { registrationNo: { contains: q, mode: "insensitive" } },
        { collegeName: { contains: q, mode: "insensitive" } },
        { internshipTopic: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, counts, totalCount, uniqueStudents] = await Promise.all([
      prisma.certificateApproval.findMany({
        where,
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      }),
      prisma.certificateApproval.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.certificateApproval.count(),
      prisma.student.count(),
    ]);

    const summary: Record<string, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
      all: totalCount,
      uniqueStudents,
    };
    for (const c of counts) {
      summary[c.status || "pending"] = c._count.status || 0;
    }

    return NextResponse.json({
      success: true,
      items,
      summary,
      total: totalCount,
    });
  } catch (err) {
    console.error("[admin/approvals GET] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;

  try {
    const {
      id,
      registrationNo,
      internshipTopic,
      status,
      remarks,
    } = await request.json();

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: approved | rejected | pending" },
        { status: 400 }
      );
    }

    const norm = (v: any) => String(v || "").trim().replace(/\s+/g, "");

    let where: any = {};
    if (id) where.id = Number(id);
    else if (registrationNo) {
      const nReg = norm(registrationNo);
      where.OR = [
        { registrationNo: nReg },
        { registrationNo: String(registrationNo).trim() },
      ];
      if (internshipTopic) {
        const nTopic = String(internshipTopic).trim();
        where.internshipTopic = nTopic;
      }
    } else {
      return NextResponse.json(
        { error: "Provide id or registrationNo" },
        { status: 400 }
      );
    }

    const existing = await prisma.certificateApproval.findFirst({ where });
    if (!existing) {
      return NextResponse.json(
        { error: "Approval record not found" },
        { status: 404 }
      );
    }

    const updateData: any = {
      status,
      remarks: remarks ?? existing.remarks,
      approvedBy:
        status === "approved" ? auth.adminId : status === "rejected" ? auth.adminId : existing.approvedBy,
      approvedAt:
        status === "approved" ? new Date() : status === "rejected" ? new Date() : existing.approvedAt,
    };

    const updated = await prisma.certificateApproval.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    console.error("[admin/approvals PATCH] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if ("error" in auth) return auth.error;

  try {
    const excelPath = resolveExcelPath();
    if (!existsSync(excelPath)) {
      return NextResponse.json(
        { error: "Excel file not found at: " + excelPath },
        { status: 404 }
      );
    }

    const buffer = await fsPromises.readFile(excelPath);
    const wb = XLSX.read(buffer, { type: "buffer" });
    const firstSheet = wb.SheetNames[0];
    const ws = wb.Sheets[firstSheet];
    const rows = XLSX.utils.sheet_to_json<any>(ws, { defval: "" });

    const { createHash } = await import("crypto");
    const fingerprint = (parts: (string | number | null | undefined)[]) =>
      createHash("sha1")
        .update(parts.map((p) => (p == null ? "" : String(p))).join("|||"))
        .digest("hex");

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const sourceRowIndex = i + 2; // +2 because: 0-indexed rows + header row in sheet
        const timestampRaw =
          row["Timestamp"] || row["timestamp"] || row["Time Stamp"] || "";

        const registrationNo = String(
          row["REGISTRATION NO"] || row["Registration No"] || row["reg no"] || ""
        )
          .trim()
          .replace(/\s+/g, "");
        if (!registrationNo) {
          skipped++;
          continue;
        }
        const studentName = String(
          row["STUDENT NAME"] || row["Student Name"] || row["Name"] || ""
        ).trim() || "N/A";
        const collegeName = String(
          row["COLLEGE NAME"] || row["College Name"] || row["College"] || ""
        ).trim() || "N/A";
        const internshipTopic = String(
          row["INTERNSHIP TOPICS"] ||
            row["Internship Topic"] ||
            row["Topic"] ||
            "Web Development"
        ).trim() || "Web Development";
        const degree = String(row["DEGREE"] || row["Degree"] || "").trim() || null;
        const session =
          String(row["SESSION"] || row["Session"] || "").trim() || null;
        const subject =
          String(row["SUBJECT"] || row["Subject"] || "").trim() || null;
        const email =
          String(row["Email Address"] || row["EMAIL"] || row["Email"] || "")
            .trim() || null;
        const mobileNo = String(
          row["MOBILE NO ( WHATS NUMBER ALSO)"] ||
            row["Mobile"] ||
            row["MOBILE"] ||
            ""
        ).trim() || null;
        const address = String(
          row["ADDRESS ( VILL, POST, PS, DIST, STATE, PINCODE)"] ||
            row["Address"] ||
            ""
        ).trim() || null;

        let dateOfBirth: Date | null = null;
        const rawDob =
          row["DATE OF BIRTH (DOB)"] ||
          row["DATE OF BIRTH "] ||
          row["DOB"] ||
          row["Date of Birth"] ||
          null;
        if (rawDob) {
          try {
            const d = rawDob instanceof Date ? rawDob : new Date(rawDob);
            if (d && !isNaN(d.getTime())) dateOfBirth = d;
          } catch {}
        }
        if (!dateOfBirth) dateOfBirth = new Date();

        // ---- Ensure Student record exists so FK doesn't reject CertificateApproval ----
        const existingStudent = await prisma.student.findUnique({
          where: { registrationNo },
        });
        if (!existingStudent) {
          await prisma.student.create({
            data: {
              registrationNo,
              name: studentName,
              collegeName,
              dateOfBirth,
              email: email || "student@example.com",
              mobileNo: mobileNo || "0000000000",
              session: session || "N/A",
              internshipType: "Hybrid (Online)",
              degree,
              subject,
            },
          });
        } else {
          await prisma.student.update({
            where: { id: existingStudent.id },
            data: {
              name: studentName,
              collegeName,
              email: email || existingStudent.email,
              mobileNo: mobileNo || existingStudent.mobileNo,
              session: session || existingStudent.session,
              degree: degree || existingStudent.degree,
              subject: subject || existingStudent.subject,
            },
          });
        }

        const fp = fingerprint([
          timestampRaw,
          sourceRowIndex,
          registrationNo,
          internshipTopic,
          studentName,
          collegeName,
        ]);

        const baseData = {
          registrationNo,
          studentName,
          collegeName,
          internshipTopic,
          degree,
          session,
          subject,
          email,
          mobileNo,
          address,
          sourceRowIndex,
          sourceFingerprint: fp,
        };

        const existing = await prisma.certificateApproval.findUnique({
          where: { sourceFingerprint: fp },
        });

        if (existing) {
          await prisma.certificateApproval.update({
            where: { id: existing.id },
            data: baseData,
          });
          updated++;
        } else {
          try {
            await prisma.certificateApproval.create({
              data: {
                ...baseData,
                status: "pending",
              },
            });
            created++;
          } catch (createErr: any) {
            if (createErr?.code === "P2002") {
              errors.push(
                `Row ${sourceRowIndex}: fingerprint collision, skipping (${fp})`
              );
              skipped++;
            } else {
              throw createErr;
            }
          }
        }
      } catch (rowErr: any) {
        errors.push(rowErr?.message || String(rowErr));
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      created,
      updated,
      skipped,
      totalRows: rows.length,
      errors: errors.slice(0, 20),
      source: excelPath,
    });
  } catch (err) {
    console.error("[admin/approvals POST sync] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
