// src/app/api/items/[id]/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const user = await verifyToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { name, description, quantity, category } = await req.json();

  try {
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { name, description, quantity, category },
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
