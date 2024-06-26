import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "Email not found" }, { status: 404 });

  const isPasswordCorrect = bcrypt.compareSync(password, user.hashedPassword as string);
  if (!isPasswordCorrect) return NextResponse.json({ message: "Invalid password" }, { status: 404 });

  const token = await createToken({ id: user.id, email: user.email! });

  const response = NextResponse.json({
    name: user.name,
    email: user.email,
    id: user.id,
  });
  response.cookies.set("token", token);

  return response;
}
