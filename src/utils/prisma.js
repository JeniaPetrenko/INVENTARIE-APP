// //itialisation of client prisma
// // src/utils/prisma.js
// import { prisma } from "@/utils/prisma"; // або де у вас зберігається екземпляр Prisma

// export async function POST(request) {
//   const { name, description, quantity, category } = await request.json();

//   try {
//     const newItem = await prisma.item.create({
//       data: {
//         name,
//         description,
//         quantity,
//         category, // Переконайтесь, що це поле включене у вашу модель
//         userId: 5, // або отримайте динамічно
//       },
//     });

//     return new Response(JSON.stringify(newItem), { status: 201 });
//   } catch (error) {
//     console.error("Failed to create item:", error);
//     return new Response("Failed to create item", { status: 500 });
//   }
// }
