
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking enrollment id=6...');
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: 6 },
      include: { student: true, internship: { include: { tasks: true } }, payment: true }
    });
    console.log('Enrollment:', JSON.stringify(enrollment, null, 2));

    console.log('\nAll enrollments:');
    const allEnrollments = await prisma.enrollment.findMany({
      include: { student: true, internship: true, payment: true }
    });
    console.log(JSON.stringify(allEnrollments, null, 2));
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
