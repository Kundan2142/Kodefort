import { PrismaClient } from "@/generated/prisma"; // or "@prisma/client"

// Use existing client if available, otherwise create a new one
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optional
  });

// Only attach to globalThis in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
