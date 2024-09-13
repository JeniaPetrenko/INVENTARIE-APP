//api/users/[id]/route.js

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth"; // Використовуємо для перевірки токену
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Отримання користувача за його ID
export async function GET(req, { params }) {
  const user = await verifyToken(req); // Перевіряємо токен

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Отримуємо ID з URL

  try {
    // Знаходимо користувача за ID
    const foundUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(foundUser, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Оновлення користувача за його ID
export async function PUT(req, { params }) {
  const user = await verifyToken(req); // Перевіряємо токен

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Отримуємо ID користувача з URL
  const { name, email, role } = await req.json(); // Отримуємо дані з тіла запиту

  try {
    // Оновлюємо користувача в базі даних
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) }, // Знаходимо користувача за ID
      data: {
        name,
        email,
        role, // Оновлюємо поля користувача
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const user = await verifyToken(req); // Перевірка токена

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; // Отримання ID користувача з URL

  try {
    // Видалення користувача з бази даних
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
