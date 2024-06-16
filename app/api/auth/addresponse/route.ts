import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userID = req.headers.get("userID");

    const { formId, answers } = await req.json();
    console.log({ formId, answers, userId: userID! });
    const response = await prisma.response.create({
      data: { formId, answers, userId: userID! },
    });
    return NextResponse.json({ msg: "response added successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }
}
