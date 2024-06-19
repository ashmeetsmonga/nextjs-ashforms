import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userID = req.headers.get("userID");

  const forms = await prisma.form.findMany({
    where: { user: { id: userID! } },
    orderBy: { updatedAt: "desc" },
  });

  const response = NextResponse.json({
    forms: forms,
  });

  return response;
}
