import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "kodefort-secret-key-change-in-prod";

export interface AdminTokenPayload {
  adminId: number;
  email: string;
  role: string;
}

export async function verifyAdminAuth(
  request: NextRequest
): Promise<AdminTokenPayload | { error: Response }> {
  const authHeader =
    request.headers.get("Authorization") ||
    request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: Response.json(
        { error: "Unauthorized: missing Bearer token" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
    if (!decoded || !decoded.adminId) {
      return {
        error: Response.json(
          { error: "Unauthorized: invalid token" },
          { status: 401 }
        ),
      };
    }

    const exists = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, email: true, role: true },
    });
    if (!exists) {
      return {
        error: Response.json(
          { error: "Unauthorized: admin not found" },
          { status: 401 }
        ),
      };
    }

    return { ...decoded };
  } catch (e) {
    return {
      error: Response.json(
        { error: "Unauthorized: invalid token" },
        { status: 401 }
      ),
    };
  }
}
