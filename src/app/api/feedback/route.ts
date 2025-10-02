import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure prisma client is exported from lib/prisma.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: { name, email, message },
    });

    console.log("Saved feedback:", feedback);
    return NextResponse.json(feedback);
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
