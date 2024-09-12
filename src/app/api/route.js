//app/api/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  return NextResponse.json(
    {
      message: "Inventarie APP",
    },
    {
      status: 200,
    }
  );
}
