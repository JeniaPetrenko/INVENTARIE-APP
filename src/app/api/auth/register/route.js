//app/api/register/rout.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
      throw new Error("Email, password, and name are required");
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
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
        password: body.password, // Примітка: рекомендується хешувати пароль
        name: body.name,
      },
    });

    // Генеруйте JWT токен
    const token = await signJWT({ userId: user.id });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
