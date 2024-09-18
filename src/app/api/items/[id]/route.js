// src/app/api/items/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { object404Response, validateItemData } from "@/utils/apiHelpers";

const prisma = new PrismaClient();

//get request
export async function GET(req, options) {
  const itemId = options.params.id;

  try {
    const item = await prisma.item.findUnique({
      where: {
        id: Number(itemId),
      },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the item" },
      { status: 500 }
    );
  }
}

//put request
export async function PUT(req, options) {
  const itemId = options.params.id; // Отримуємо ID товару з URL
  let body;
  try {
    body = await req.json(); // Парсимо JSON запиту
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid Json object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  const [hasErrors, errors] = validateItemData(body);
  if (hasErrors) {
    return NextResponse.json({ message: errors }, { status: 400 });
  }
  try {
    const updateItem = await prisma.item.update({
      where: { id: Number(itemId) },
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
    return NextResponse.json(updateItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: "failed to update item",
      },
      {
        status: 500,
      }
    );
  }
}

//delete request
export async function DELETE(req, options) {
  const id = options.params.id;

  try {
    await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return object404Response(NextResponse, "Item");
  }
}
