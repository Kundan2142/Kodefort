import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { studentId: number };
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: decoded.studentId },
      include: { student: true, internship: { include: { tasks: true } }, payment: true }
    });
    return new Response(JSON.stringify(enrollments), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch enrollments" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export async function POST(request: Request) {
  try {
    const { enrollmentId } = await request.json();
    await prisma.payment.update({ where: { enrollmentId: parseInt(enrollmentId) }, data: { status: "completed" } });
    return new Response(JSON.stringify({ message: "Payment successful" }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to process payment" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
