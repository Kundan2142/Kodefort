import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ enrollmentId: string }> }
) {
  console.log("=== enroll/[enrollmentId]/route.ts GET CALLED ===");
  try {
    const rawParams = await params;
    console.log("Raw params:", rawParams);
    const { enrollmentId } = rawParams;
    console.log("enrollmentId from params:", enrollmentId, "typeof enrollmentId:", typeof enrollmentId);
    const id = parseInt(enrollmentId);
    console.log("Parsed id:", id, "isNaN(id):", isNaN(id));
    
    if (isNaN(id)) {
      console.log("Returning 400: Invalid enrollment ID");
      return new Response(JSON.stringify({ error: "Invalid enrollment ID" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    
    console.log("Querying Prisma for enrollment with id:", id);
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: { student: true, internship: { include: { tasks: true } }, payment: true }
    });
    console.log("Prisma findUnique result (enrollment):", enrollment);
    if (!enrollment) {
      console.log("Returning 404: Enrollment not found");
      return new Response(JSON.stringify({ error: "Enrollment not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }
    console.log("Returning 200 with enrollment data");
    return new Response(JSON.stringify(enrollment), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("=== ERROR in enroll/[id] GET ===");
    console.error("Error type:", typeof error);
    console.error("Error message:", (error as Error).message);
    console.error("Stack trace:", (error as Error).stack);
    return new Response(JSON.stringify({ error: "Failed to fetch enrollment", details: String(error) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
