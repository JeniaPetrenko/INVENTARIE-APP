// src/app/items/page.js - list of items and form for editing items
// app/items/page.js
"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";

export default function itemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items");
        const itemsData = await response.json();
        setItems(itemsData);
      } catch (error) {
        console.log("failed to fetch items", error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = async (updatedItem) => {
    const _token = localStorage.getItem("@token");
    if (!_token) {
      console.error("No token found.");
      alert("You need to be logged.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${updatedItem.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || `failed to edit the item: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Отримуємо оновлений список товарів
      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("faile to get updated items");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item succesfully updated!");
    } catch (error) {
      console.error("Error to update item:", error);
      alert(error.message || "Error to update item");
    }
  };

  const handleDelete = async (id) => {
    const _token = localStorage.getItem("@token");
    if (!_token) {
      console.error("Token not found.");
      alert("You need to be login.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete the item: ${response.status}`);
      }

      // Отримання оновленого списку товарів після успішного видалення
      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("Failed to get the updated list items");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item is deleted!");
    } catch (error) {
      console.error("error:", error);
      alert(error.message || "An error occurred");
    }
  };

  const handleAdd = async (newItem) => {
    const _token = localStorage.getItem("@token");
    if (!_token) {
      console.error("Токен не знайдено.");
      alert("Будь ласка, увійдіть в систему для додавання товару.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to add the item: ${response.status}`
        );
      }

      const addedItem = await response.json();
      console.log("The item is added:", addedItem);

      // Оптимістичне оновлення UI
      setItems((prevItems) => [...prevItems, addedItem]);

      // Отримання оновленого списку товарів
      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("to get updated items list failed");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item is added!");
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error.message || "An error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Items List
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add New Item
          </h2>
          <ItemForm onAdd={handleAdd} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">List of Items</h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Add new Item.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
