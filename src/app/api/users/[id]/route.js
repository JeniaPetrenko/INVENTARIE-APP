//app/api/users/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Отримання користувача за його ID
export async function GET(req, options) {
  const { id } = options.params;
  const userId = req.headers.get("userId");

  try {
    if (id != userId) {
      throw new Error();
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(userId),
      },
    });
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log("user", userId, error);
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }
}
