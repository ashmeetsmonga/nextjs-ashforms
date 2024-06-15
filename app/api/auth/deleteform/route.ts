import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const userID = req.headers.get("userID");
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ msg: "Please provide form id" }, { status: 404 });

  try {
    const form = await prisma.form.delete({ where: { id } });
    return NextResponse.json({
      msg: "Form deleted successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        msg: "Failed to delete form",
      },
      { status: 400 }
    );
  }
}
