import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ enrollmentId: string; taskId: string }> }
) {
  console.log("=== Toggle Task Completion API Called ===");
  try {
    const rawParams = await params;
    console.log("Raw params:", rawParams);
    const enrollmentId = parseInt(rawParams.enrollmentId);
    const taskId = parseInt(rawParams.taskId);
    console.log("Parsed enrollmentId:", enrollmentId, "taskId:", taskId);

    // Check if task is already completed
    const existingCompletedTask = await prisma.completedTask.findUnique({
      where: {
        enrollmentId_taskId: {
          enrollmentId,
          taskId,
        },
      },
    });
    console.log("Existing completed task:", existingCompletedTask);

    if (existingCompletedTask) {
      // If completed, delete it (uncheck)
      console.log("Deleting completed task...");
      await prisma.completedTask.delete({
        where: {
          id: existingCompletedTask.id,
        },
      });
      console.log("Task marked as incomplete");

      return new Response(JSON.stringify({ completed: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // If not completed, create it (check)
      console.log("Creating completed task...");
      await prisma.completedTask.create({
        data: {
          enrollmentId,
          taskId,
        },
      });
      console.log("Task marked as complete");

      return new Response(JSON.stringify({ completed: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("=== Error in toggle API ===");
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to toggle task completion" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
