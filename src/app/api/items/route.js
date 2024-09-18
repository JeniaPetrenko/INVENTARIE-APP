// src/app/api/items/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateItemData } from "@/utils/apiHelpers";

const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  let items = [];
  if (search) {
    items = await prisma.item.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } else {
    items = await prisma.item.findMany();
  }
  return NextResponse.json(items);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  const [hasErrors, errors] = validateItemData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors,
      },
      {
        status: 400,
      }
    );
  }

  let newItem;
  try {
    newItem = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
        userId: body.userId, // Додайте це поле
      },
    });
  } catch (error) {
    console.log("error: ", error.message);
    return NextResponse.json(
      {
        message: "Invlid data sent for item creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newItem, {
    status: 201,
  });
}
