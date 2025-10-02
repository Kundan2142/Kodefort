import { PrismaClient } from "@/generated/prisma"; // your generated Prisma client

// Avoid multiple instances in Next.js dev mode
// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing client if available, otherwise create a new one
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optional, useful for debugging
  });

// Only attach to globalThis in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
