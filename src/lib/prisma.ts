import { PrismaClient } from "@prisma/client";

declare global {
  // Avoids type re-declaration errors in Next.js hot reload + Vercel
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
