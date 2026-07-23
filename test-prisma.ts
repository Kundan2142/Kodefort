import prisma from "./src/lib/prisma";

async function test() {
  try {
    const enrollment = await prisma.enrollment.findFirst({
      include: { completedTasks: true }
    });
    console.log("Test successful:", enrollment);
  } catch (error) {
    console.error("Test error:", error);
  }
}

test();