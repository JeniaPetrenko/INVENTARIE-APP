// src/utils/auth.js
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret_key"; // Задайте ваш секретний ключ

export async function verifyToken(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    console.log("No Authorization header");
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
