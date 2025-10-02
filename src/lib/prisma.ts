// // lib/prisma.ts
// import { PrismaClient } from "@/generated/prisma";  // ✅ instead of "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

// export default prisma;


// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma";  // use generated path

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use existing global prisma in dev to avoid multiple instances
const prisma = globalThis.prisma ?? new PrismaClient();

// Attach to globalThis only in development (Next.js hot reload)
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
