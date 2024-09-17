// src/utils/Auth.js
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1y";

function encodedSecret() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signJWT(payload) {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(encodedSecret());

  return token;
}

export async function verifyToken(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jose.jwtVerify(token, encodedSecret());
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
