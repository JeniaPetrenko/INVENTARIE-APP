//app/utils/apiHelpers.js - data validation and api responses

export function validateItemData(data) {
  let errors = {};
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name required and should be a string";
  }
  if (!data.description || typeof data.description !== "string") {
    errors.description = "Description required and should be a string";
  }
  if (
    !data.quantity ||
    typeof data.quantity !== "number" ||
    data.quantity < 1
  ) {
    errors.quantity = "Quantity required and should be a positive number";
  }
  if (!data.category || typeof data.category !== "string") {
    errors.category = "Category required and should be a string";
  }
  const hasErrors = Object.keys(errors).length > 0;
  return [hasErrors, errors];
}

export function object404Response(response, model = "") {
  return response.json({ message: `Not found ${model}` }, { status: 404 });
}
