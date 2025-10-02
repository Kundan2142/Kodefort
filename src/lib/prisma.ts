import { PrismaClient } from "@prisma/client";

declare global {
  // Allows TypeScript to understand `globalThis.prisma`
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
