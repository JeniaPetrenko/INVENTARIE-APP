//api/users/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/Auth"; // Використовуємо для перевірки токену
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {}
