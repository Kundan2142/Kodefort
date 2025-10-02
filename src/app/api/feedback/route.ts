// // app/api/feedback/route.ts
// import prisma from "@/lib/prisma";

// export const runtime = "nodejs"; // ✅ important for Prisma

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     const feedback = await prisma.feedback.create({
//       data: { name, email, message },
//     });

//     return new Response(JSON.stringify(feedback), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response("Error saving feedback", { status: 500 });
//   }
// }


// app/api/feedback/route.ts
import prisma from "@/lib/prisma";

export const runtime = "nodejs"; // important for Prisma

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const feedback = await prisma.feedback.create({
      data: { name, email, message },
    });

    return new Response(JSON.stringify(feedback), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Error saving feedback", { status: 500 });
  }
}

// Optional: block GET requests
export async function GET(req: Request) {
  return new Response("Method Not Allowed", { status: 405 });
}
