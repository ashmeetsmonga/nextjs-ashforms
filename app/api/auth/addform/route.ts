import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Question } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const userID = req.headers.get("userID");

    const { title, questions }: { title: string; questions: Question[] } = await req.json();

    const form = await prisma.form.create({
      data: { title, userId: userID! },
    });
    for (let q of questions) {
      const question = await prisma.question.create({
        data: { ...q, formId: form.id },
      });
    }
    return NextResponse.json({ msg: "Form created successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }
}
