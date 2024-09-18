//app/api/users/route.js
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
    console.log("user: ", userId, error);
    return NextResponse.json(
      {
        message: "User not found",
      },
      {
        status: 400,
      }
    );
  }
}
// Видалення користувача за його ID
export async function DELETE(req, { params }) {
  const { id } = params;
  const userId = req.headers.get("userId");

  try {
    if (id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.delete({ where: { id: Number(id) } });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 400 }
    );
  }
}
