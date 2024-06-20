import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Question } from "@/lib/types";

export async function PUT(req: NextRequest) {
  try {
    const { title, questions, id }: { title: string; questions: Question[]; id: string } = await req.json();

    const form = await prisma.form.update({
      where: { id },
      data: { title },
    });
    for (let q of questions) {
      const newData = { ...q };
      delete newData.id;
      const question = await prisma.question.update({ where: { id: q.id! }, data: { ...newData } });
    }
    return NextResponse.json({ msg: "Form updated successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }
}
