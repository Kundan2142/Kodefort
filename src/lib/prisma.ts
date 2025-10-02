// import { PrismaClient } from "@/generated/prisma"; // or "@prisma/client"

// // Use existing client if available, otherwise create a new one
// export const prisma =
//   globalThis.prisma ??
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"], // optional
//   });

// // Only attach to globalThis in development
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

// export default prisma;


// ./src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// This is the global variable we declared in global.d.ts.
// We must declare it again locally to ensure it is defined for use.

// We use 'let' instead of 'const' if we conditionally create it.
// We cast it to the type we expect to avoid the type conflict.
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, we always create a new client
  prisma = new PrismaClient({
    log: ["error"], // Keep logs minimal in production
  });
} else {
  // In development, use globalThis to preserve the client across hot-reloads
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  // We cast the global variable back to the specific PrismaClient type
  prisma = globalThis.prisma as PrismaClient;
}

// Export the client
export default prisma;