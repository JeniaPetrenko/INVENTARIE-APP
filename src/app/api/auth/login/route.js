//app/api/login/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    console.log(body);
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    if (user.password !== body.password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = await signJWT({
      userId: user.id,
    });

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
