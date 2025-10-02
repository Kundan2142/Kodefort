import { PrismaClient } from "@prisma/client";

// Fix for Next.js hot reload & Vercel build
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use existing global prisma if it exists (dev hot reload)
const prisma = globalThis.prisma ?? new PrismaClient();

// In dev, attach to global to avoid multiple instances
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
