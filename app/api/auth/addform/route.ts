import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userID = req.headers.get("userID");

    const { title, questions } = await req.json();

    const form = await prisma.form.create({
      data: { title, questions, userId: userID! },
    });
    return NextResponse.json({ msg: "Form created successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }
}
