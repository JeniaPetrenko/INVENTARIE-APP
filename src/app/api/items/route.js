// src/app/api/items/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth";
import { PrismaClient } from "@prisma/client";
import { validateUserData } from "@/utils/apiUsers";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Отримуємо всі товари з бази даних
    const items = await prisma.item.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const user = await verifyToken(req); // Перевіряємо токен
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json(); // Отримуємо дані з запиту
  const { name, description, quantity, category } = data;

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        quantity,
        category,
        userId: user.id, // Прив'язуємо товар до користувача
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
