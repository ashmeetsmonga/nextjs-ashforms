import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const userID = req.headers.get("userID");
    const { title, questions, id } = await req.json();

    const form = await prisma.form.update({
      where: { id },
      data: { title, questions, userId: userID! },
    });
    return NextResponse.json({ msg: "Form updated successfully" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }
}
