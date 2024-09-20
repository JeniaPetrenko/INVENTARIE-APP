// components/ItemForm.js - form for creating a new item

import React, { useState } from "react";

const ItemForm = ({ onAdd }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: "",
    category: "",
  });

  //work with updating existing items
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  //add new items
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newItem);
    setNewItem({
      name: "",
      description: "",
      quantity: "",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-72 mx-auto">
      <div>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Item Name"
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Item Description"
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>
      <div>
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>
      <div>
        <input
          type="text"
          name="category"
          value={newItem.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
      >
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
