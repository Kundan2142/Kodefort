import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { registrationNo, dateOfBirth } = await request.json();
    const student = await prisma.student.findUnique({ 
      where: { registrationNo },
      include: { enrollments: true }
    });
    if (!student) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });
    
    // Compare dates (without time)
    const inputDate = new Date(dateOfBirth);
    const studentDate = new Date(student.dateOfBirth);
    const datesMatch = 
      inputDate.getFullYear() === studentDate.getFullYear() &&
      inputDate.getMonth() === studentDate.getMonth() &&
      inputDate.getDate() === studentDate.getDate();
    
    if (!datesMatch) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });
    
    const token = jwt.sign({ studentId: student.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    const enrollment = student.enrollments[0];
    // Remove enrollments from student object to avoid circular reference
    const { enrollments: _, ...studentWithoutEnrollment } = student;
    return new Response(JSON.stringify({ token, student: studentWithoutEnrollment, enrollment }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to login" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
