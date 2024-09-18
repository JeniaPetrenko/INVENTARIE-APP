// //app/api/route.js

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { validateJSONData, validateUserData } from "@utils/apiUsers";

// const prisma = new PrismaClient();

// export async function GET(req, options) {
//   //get users from prisma server
//   let users = await prisma.users.findMany();
//   return NextResponse.json(users, {
//     status: 200,
//   });
// }

// export async function POST(req, options) {
//   const [bodyHasErrors, body] = await validateJSONData(req);
//   if (bodyHasErrors) {
//     return NextResponse.json(
//       { message: "Invalid JSON format" },
//       { status: 400 }
//     );
//   }
//   const [hasErrors, errors] = await validateUserData(body);
//   if (hasErrors) {
//     return NextResponse.json({ message: errors }, { status: 400 });
//   }
//   try {
//     const uaers = await prisma.users.create({
//       data: {
//         name: body.name,
//         email: body.email,
//         password: body.password,
//       },
//     });
//     return NextResponse.json(uaers, {
//       status: 201,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return NextResponse.json(
//       { message: "Failed to create user" },
//       { status: 400 }
//     );
//   }
// }
