// //utils/apiUsers.js

// export function getIdFromUrl(url = "") {
//   try {
//     const { pathname } = new URL(url);
//     const startIndexOfId = pathname.lastIndexOf("/") + 1;
//     return startIndexOfId !== 0 ? pathname.substring(startIndexOfId) : "";
//   } catch (error) {
//     console.error("Invalid URL:", error);
//     return "";
//   }
// }

// //users validations
// export function validateUserData(data) {
//   let errors = [];
//   if (!data.name || typeof data.name !== "string") {
//     errors.name = "Name required";
//   }
//   if (!data.email || typeof data.email !== "email") {
//     errors.email = "Email required";
//   }
//   if (
//     !data.password ||
//     typeof data.password !== "string" ||
//     data.password.length < 6
//   ) {
//     errors.password =
//       "Password required and should be at least 6 characters long";
//   }
//   const hasErrors = Object.keys(errors).length > 0;
//   return [hasErrors, errors];
// }

// export function objectErrorResponse(
//   response,
//   message = "Not found",
//   status = 404
// ) {
//   return response.json({ message }, { status });
// }
// export async function validateJSONData(req) {
//   try {
//     const body = await req.json(); // Parse incoming data to JSON
//     return [false, body];
//   } catch (error) {
//     console.error("Failed to parse JSON:", error);
//     return [true, null, "Invalid JSON format"];
//   }
// }
