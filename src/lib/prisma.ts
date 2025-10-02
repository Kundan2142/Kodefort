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

// ./src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// 1. Declare the global variable type *in this file*
//    We use 'any' here to allow the type checker to reconcile the global
//    declaration with the complex inferred type of the local 'prisma' constant.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined | any;
}

// 2. Create the client instance
//    We use globalThis.prisma to ensure a single instance during Next.js hot-reloads.
const prisma = globalThis.prisma || new PrismaClient({
    log: ["query", "info", "warn", "error"], // Optional logging config
});

// 3. Attach the instance to globalThis *only* in development
//    This prevents the creation of new clients on every hot-reload.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// 4. Export the client
export default prisma;