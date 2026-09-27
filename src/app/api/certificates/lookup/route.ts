import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import * as path from "path";
import { fileURLToPath } from "url";
import { promises as fsPromises, existsSync } from "fs";

export const dynamic = "force-dynamic";

let cachedData: any[] | null = null;
let cachedFilePath: string | null = null;

function resolveExcelPath(): string {
  if (cachedFilePath && existsSync(cachedFilePath)) {
    return cachedFilePath;
  }

  const candidates: string[] = [];

  try {
    if (process.cwd()) {
      candidates.push(
        path.join(process.cwd(), "Internship Form Kodefort  (Responses).xlsx")
      );
    }
  } catch (e) {
    // ignore
  }

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    candidates.push(
      path.resolve(__dirname, "..", "..", "..", "..", "..", "Internship Form Kodefort  (Responses).xlsx")
    );
    candidates.push(
      path.resolve(__dirname, "..", "..", "..", "Internship Form Kodefort  (Responses).xlsx")
    );
  } catch (e) {
    // ignore
  }

  for (const p of candidates) {
    if (existsSync(p)) {
      cachedFilePath = p;
      return p;
    }
  }

  cachedFilePath = candidates[0] || "";
  return cachedFilePath;
}

async function loadExcelData(): Promise<any[]> {
  if (cachedData) return cachedData;

  const excelPath = resolveExcelPath();
  console.log("[certificates lookup] Resolved excel path:", excelPath);

  if (!existsSync(excelPath)) {
    console.error("[certificates lookup] File does not exist at:", excelPath);
    throw new Error("Certificate data file not found at: " + excelPath);
  }

  const buffer = await fsPromises.readFile(excelPath);
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const firstSheet = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheet];
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  cachedData = data;
  console.log("[certificates lookup] Loaded", data.length, "rows from Excel");
  return data;
}

export async function POST(request: Request) {
  try {
    const { registrationNo } = await request.json();

    if (!registrationNo) {
      return NextResponse.json(
        { error: "Registration number is required" },
        { status: 400 }
      );
    }

    const data = await loadExcelData();

    const normalizedRegNo = String(registrationNo).trim().replace(/\s+/g, "");

    const student = data.find((row: any) => {
      const rowRegNo = String(row["REGISTRATION NO"] || "").trim().replace(/\s+/g, "");
      return rowRegNo === normalizedRegNo;
    });

    if (!student) {
      return NextResponse.json(
        { error: "No certificate found for this registration number. Please verify and try again." },
        { status: 404 }
      );
    }

    const studentData = {
      studentName: String(student["STUDENT NAME"] || "N/A").trim(),
      collegeName: String(student["COLLEGE NAME"] || "N/A").trim(),
      registrationNo: String(student["REGISTRATION NO"] || "N/A").trim(),
      degree: String(student["DEGREE"] || "N/A").trim(),
      session: String(student["SESSION"] || "N/A").trim(),
      subject: String(student["SUBJECT"] || "N/A").trim(),
      internshipTopic: String(student["INTERNSHIP TOPICS"] || "N/A").trim(),
      email: String(student["Email Address"] || "N/A").trim(),
      mobileNo: String(student["MOBILE NO ( WHATS NUMBER ALSO)"] || "N/A").trim(),
      address: String(student["ADDRESS ( VILL, POST, PS, DIST, STATE, PINCODE)"] || "N/A").trim(),
    };

    return NextResponse.json({
      success: true,
      student: studentData,
    });
  } catch (error) {
    console.error("Error looking up certificate:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred while looking up the certificate. Please try again later." },
      { status: 500 }
    );
  }
}
