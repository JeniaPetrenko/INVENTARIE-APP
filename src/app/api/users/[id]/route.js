//api/users/[id]/route.js

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth"; // Використовуємо для перевірки токену
import { PrismaClient } from "@prisma/client";
import {
  objectErrorResponse,
  validateJSONData,
  validateUserData,
} from "@/utils/apiUsers";

const prisma = new PrismaClient();

// Отримання користувача за його ID
export async function GET(req, options) {
  const id = await options.params.id;

  try {
    // Знаходимо користувача за ID
    const user = await prisma.user.findUniqueThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return objectErrorResponse(NextResponse, "User");
  }
}

// Оновлення користувача за його ID
export async function PUT(req, options) {
  const id = await options.params.id;
  const [bodyHasErrors, body] = await validateJSONData(req);
  if (!bodyHasErrors) {
    return NextResponse.json({ message: "valid json object" }, { status: 400 });
  }
  const [hasErrors, errors] = await validateUserData(body);
  if (hasErrors) {
    return NextResponse.json({ message: errors }, { status: 400 });
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return objectErrorResponse(NextResponse, "User");
  }
}

export async function DELETE(req, { params }) {
  const id = options.params.id;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return new Response.json(null, { status: 200 });
  } catch (error) {
    return objectErrorResponse(NextResponse, "User");
  }
}
