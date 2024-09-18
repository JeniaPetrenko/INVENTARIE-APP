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
      console.error("Помилка при редагуванні:", error);
      // Можна додати відображення помилки для користувача
    }
  };

  // Implement the card UI and edit functionality here
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl shadow-md mb-6 transition-all hover:shadow-lg">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">
              Назва
            </label>
            <input
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="name"
              value={editedItem.name}
              onChange={handleEdit}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-purple-700 mb-1">
                Кількість
              </label>
              <input
                className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="quantity"
                type="number"
                value={editedItem.quantity}
                onChange={handleEdit}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-purple-700 mb-1">
                Категорія
              </label>
              <input
                className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="category"
                value={editedItem.category}
                onChange={handleEdit}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-1">
              Опис
            </label>
            <textarea
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="description"
              value={editedItem.description}
              onChange={handleEdit}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Зберегти
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
              onClick={() => setIsEditing(false)}
            >
              Скасувати
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-purple-800">{item.name}</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-purple-700">ID:</span>
              <span className="ml-2 text-gray-700">{item.id}</span>
            </div>
            <div>
              <span className="font-semibold text-purple-700">Кількість:</span>
              <span className="ml-2 text-gray-700">{item.quantity}</span>
            </div>
            <div>
              <span className="font-semibold text-purple-700">Категорія:</span>
              <span className="ml-2 text-gray-700">{item.category}</span>
            </div>
          </div>
          <div>
            <span className="block font-semibold text-purple-700 mb-1">
              Опис:
            </span>
            <p className="text-gray-700">{item.description}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              Редагувати
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Видалити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemCard;
