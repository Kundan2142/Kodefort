import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "kodefort-secret-key-change-in-prod";

const DEFAULT_EMAIL_ENV = (process.env.ADMIN_DEFAULT_EMAIL || "admin@kodefort.com").toLowerCase();
const DEFAULT_PASSWORD_ENV = process.env.ADMIN_DEFAULT_PASSWORD || "Kodefort@2026";
const DEFAULT_NAME_ENV = process.env.ADMIN_DEFAULT_NAME || "Kodefort Admin";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const targetEmail = String(email).trim().toLowerCase();
    const rawPassword = String(password);

    let admin = await prisma.admin.findUnique({
      where: { email: targetEmail },
    });

    if (!admin) {
      const count = await prisma.admin.count();
      if (
        count === 0 &&
        targetEmail === DEFAULT_EMAIL_ENV &&
        rawPassword === DEFAULT_PASSWORD_ENV
      ) {
        const hash = await bcrypt.hash(DEFAULT_PASSWORD_ENV, 10);
        admin = await prisma.admin.create({
          data: {
            email: DEFAULT_EMAIL_ENV,
            passwordHash: hash,
            name: DEFAULT_NAME_ENV,
            role: "super_admin",
          },
        });
      }
    }

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(rawPassword, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    const anyErr = err as { code?: string; message?: string };
    if (anyErr.code === "P2021") {
      console.error("[admin/login] table missing, run prisma migrate deploy:", anyErr.message);
      return NextResponse.json(
        { error: "Database not migrated — run prisma migrate deploy" },
        { status: 503 }
      );
    }
    console.error("[admin/login] error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.admin.count();
    if (count > 0) {
      return NextResponse.json({ seeded: true, count });
    }

    const hash = await bcrypt.hash(DEFAULT_PASSWORD_ENV, 10);
    await prisma.admin.create({
      data: {
        email: DEFAULT_EMAIL_ENV,
        passwordHash: hash,
        name: DEFAULT_NAME_ENV,
        role: "super_admin",
      },
    });

    return NextResponse.json({
      seeded: true,
      count: 1,
      credentials: {
        email: DEFAULT_EMAIL_ENV,
        password: DEFAULT_PASSWORD_ENV,
      },
    });
  } catch (err) {
    const anyErr = err as { code?: string; message?: string };
    if (anyErr.code === "P2021") {
      console.error("[admin/login GET] table missing, run prisma migrate deploy:", anyErr.message);
      return NextResponse.json(
        { error: "Database not migrated — run prisma migrate deploy" },
        { status: 503 }
      );
    }
    console.error("[admin/login GET] init error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
