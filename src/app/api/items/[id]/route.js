// src/app/api/items/[id]/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const user = await verifyToken(req); // Перевіряємо токен
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const itemId = params.id; // Отримуємо ID товару з URL
  const data = await req.json(); // Отримуємо дані для оновлення

  try {
    // Перевіряємо, чи існує товар і чи належить він авторизованому користувачу
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item || item.userId !== user.id) {
      return NextResponse.json(
        { error: "Item not found or not authorized" },
        { status: 403 }
      );
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { ...data },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const user = await verifyToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
