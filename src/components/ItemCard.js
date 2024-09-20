// components/ItemCard.js

import React, { useState } from "react";

function ItemCard({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleEdit = (e) => {
    const { name, value } = e.target;
    const updateValue = name === "quantity" ? Number(value) : value();
    setEditedItem({ ...editedItem, [name]: updateValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(editedItem);
      setIsEditing(false);
    } catch (error) {
      console.error("Error while editing:", error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              name="name"
              value={editedItem.name}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Quantity
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              name="quantity"
              type="number"
              value={editedItem.quantity}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              name="category"
              value={editedItem.category}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              name="description"
              value={editedItem.description}
              onChange={handleEdit}
            />
          </div>
          <div className="flex justify-center space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <div className="space-y-2">
            <div>
              <span className="block font-semibold text-gray-600">ID:</span>
              <span className="text-gray-700">{item.id}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-600">
                Quantity:
              </span>
              <span className="text-gray-700">{item.quantity}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-600">
                Category:
              </span>
              <span className="text-gray-700">{item.category}</span>
            </div>
            <div>
              <span className="block font-semibold text-gray-600">
                Description:
              </span>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <button
              className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-gray-900"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
