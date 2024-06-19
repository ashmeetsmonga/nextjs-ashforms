import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const {
    query: { id },
  } = req;

  const response = NextResponse.json({
    id: id,
  });

  return response;
}
