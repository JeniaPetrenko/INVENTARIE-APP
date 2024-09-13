//api/users/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth"; // Використовуємо для перевірки токену
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const user = await verifyToken(req); // Перевіряємо токен

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Отримуємо список усіх користувачів з бази даних
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
