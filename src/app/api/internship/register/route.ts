import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, collegeName, registrationNo, email, mobileNo, dateOfBirth, session, internshipId } = await request.json();
    
    // Check if student already exists by registrationNo only
    let existingStudent = await prisma.student.findUnique({
      where: { registrationNo },
    });

    let student;
    let enrollment;

    if (existingStudent) {
      student = existingStudent;
      // Check if already enrolled in this specific internship
      const existingEnrollment = await prisma.enrollment.findFirst({
        where: { 
          studentId: existingStudent.id,
          internshipId: parseInt(internshipId)
        },
        include: { student: true, internship: { include: { tasks: true } }, payment: true }
      });

      if (existingEnrollment) {
        return new Response(JSON.stringify({ student, enrollment: existingEnrollment }), { status: 200, headers: { "Content-Type": "application/json" } });
      }

      // Create new enrollment for existing student
      enrollment = await prisma.enrollment.create({
        data: { studentId: existingStudent.id, internshipId: parseInt(internshipId) },
      });
    } else {
      // Create new student and enrollment
      student = await prisma.student.create({
        data: { 
          name, 
          collegeName, 
          registrationNo, 
          email, 
          mobileNo, 
          dateOfBirth: new Date(dateOfBirth), 
          session,
          internshipType: "Hybrid (Online)" 
        },
      });
      enrollment = await prisma.enrollment.create({
        data: { studentId: student.id, internshipId: parseInt(internshipId) },
      });
    }

    // Create payment record if not exists
    const existingPayment = await prisma.payment.findUnique({
      where: { enrollmentId: enrollment.id },
    });

    if (!existingPayment) {
      await prisma.payment.create({
        data: { enrollmentId: enrollment.id, amount: 500, status: "pending" },
      });
    }

    // Re-fetch enrollment with all includes (student, internship, payment)
    const fullEnrollment = await prisma.enrollment.findUnique({
      where: { id: enrollment.id },
      include: { student: true, internship: { include: { tasks: true } }, payment: true }
    });

    return new Response(JSON.stringify({ student, enrollment: fullEnrollment }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to register" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
