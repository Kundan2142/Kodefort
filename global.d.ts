// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }


// global.d.ts
import { PrismaClient } from "@prisma/client"; // or your generated client

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
