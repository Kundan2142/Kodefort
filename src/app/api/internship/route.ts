import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({ include: { tasks: true } });
    return new Response(JSON.stringify(internships), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch internships" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
