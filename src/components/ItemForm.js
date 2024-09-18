// //app/components/ItemForm.js - form for adding new items

// import { useState } from "react";

// function ItemForm({ onSubmit, item = {} }) {
//   const [name, setName] = useState(item?.name || ""); // Використання optional chaining
//   const [description, setDescription] = useState(item?.description || "");
//   const [quantity, setQuantity] = useState(item?.quantity || 0);
//   const [category, setCategory] = useState(item?.category || "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ id: item.id, name, description, quantity, category });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="item-form bg-white p-4 rounded shadow-md"
//     >
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {item.id ? "Update Item" : "Add Item"}
//       </button>
//     </form>
//   );
// }

// export default ItemForm;
