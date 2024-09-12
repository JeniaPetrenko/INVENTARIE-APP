//app/api/register/rout.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret_key";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { message: "A valid email, password, and name must be provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request format" },
      { status: 400 }
    );
  }

  try {
    // Перевірте, чи вже існує користувач з таким email
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Створіть нового користувача
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // Залиште без хешування для простоти
        name: body.name,
      },
    });

    // Генеруйте JWT токен
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET_KEY));

    return NextResponse.json({ user, token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
