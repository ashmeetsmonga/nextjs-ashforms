import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ msg: "Please provide form id" }, { status: 404 });

  try {
    const form = await prisma.form.findUnique({ where: { id } });
    if (!form) throw new Error("Invalid Form ID");
    const questions = await prisma.question.findMany({ where: { formId: form.id } });
    return NextResponse.json({
      msg: "Form fetched successfully",
      form: form,
      questions: questions,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      {
        msg: "Failed to fetch form",
      },
      { status: 400 }
    );
  }
}
