import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const norm = (v: any) => String(v || "").trim().replace(/\s+/g, "");

export async function POST(request: Request) {
  try {
    const { registrationNo } = await request.json();

    if (!registrationNo) {
      return NextResponse.json(
        { error: "Registration number is required" },
        { status: 400 }
      );
    }

    const normalizedRegNo = norm(registrationNo);

    // Look up the student's approval record(s) from the database.
    // We match both the normalized (no spaces) and the raw trimmed
    // registration number to remain compatible with legacy rows.
    const approvals = await prisma.certificateApproval.findMany({
      where: {
        OR: [
          { registrationNo: normalizedRegNo },
          { registrationNo: String(registrationNo).trim() },
        ],
      },
      orderBy: [{ updatedAt: "desc" }],
    });

    if (approvals.length === 0) {
      return NextResponse.json(
        {
          error:
            "No certificate found for this registration number. Please verify and try again.",
        },
        { status: 404 }
      );
    }

    // Pick the best record: prefer an approved one, else the most recently updated.
    const approved = approvals.find((a) => a.status === "approved");
    const record = approved || approvals[0];

    const studentData = {
      studentName: record.studentName || "N/A",
      collegeName: record.collegeName || "N/A",
      registrationNo: norm(record.registrationNo),
      degree: record.degree || "N/A",
      session: record.session || "N/A",
      subject: record.subject || "N/A",
      internshipTopic: record.internshipTopic || "Web Development",
      email: record.email || "N/A",
      mobileNo: record.mobileNo || "N/A",
      address: record.address || "N/A",
    };

    const approval = {
      status: record.status || "pending",
      registrationNo: norm(record.registrationNo),
      internshipTopic: record.internshipTopic || "Web Development",
      remarks: record.remarks || null,
      approvedAt: record.approvedAt
        ? new Date(record.approvedAt).toISOString()
        : null,
      approvedBy: record.approvedBy ?? null,
      updatedAt: record.updatedAt
        ? new Date(record.updatedAt).toISOString()
        : null,
    };

    return NextResponse.json({
      success: true,
      student: studentData,
      approval,
      documents: {
        offerLetter: { available: true, requiresApproval: false },
        completionCertificate: {
          available: approval.status === "approved",
          requiresApproval: true,
          status: approval.status,
        },
      },
    });
  } catch (error) {
    console.error("Error looking up certificate:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while looking up the certificate. Please try again later.",
      },
      { status: 500 }
    );
  }
}
