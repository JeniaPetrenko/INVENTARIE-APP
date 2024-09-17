// src/app/api/items/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth";
import { PrismaClient } from "@prisma/client";
import { validateUserData } from "@/utils/apiUsers";

const prisma = new PrismaClient();

export async function GET(req) {
  const user = await verifyToken(req);

  if (!user) {
    console.log("Unauthorized: Token is missing or invalid.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.item.findMany({
      where: { userId: user.id }, // Фільтруємо по користувачеві
    });
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
  const user = await verifyToken(req);

  if (!user) {
    console.log("Unauthorized: Token is missing or invalid.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, description, quantity, category } = await req.json();

    if (!name || quantity < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        quantity,
        category,
        userId: user.id,
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
