// src/app/items/page.js
"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import Header from "@/components/Header"; // Імпортуємо Header

export default function ItemsList() {
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
      alert("You need to be logged in.");
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

      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("Failed to get updated items");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item was successfully updated!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert(error.message || "Error updating item");
    }
  };

  const handleDelete = async (id) => {
    const _token = localStorage.getItem("@token");
    if (!_token) {
      console.error("Token not found.");
      alert("You need to be logged in.");
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

      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("Failed to get updated items");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item has been deleted!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error.message || "An error occurred");
    }
  };

  const handleAdd = async (newItem) => {
    const _token = localStorage.getItem("@token");
    if (!_token) {
      console.error("Token not found.");
      alert("Please log in to add items.");
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
      setItems((prevItems) => [...prevItems, addedItem]);

      const updatedItemsResponse = await fetch(
        "http://localhost:3000/api/items",
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      if (!updatedItemsResponse.ok) {
        throw new Error("Failed to get updated items");
      }

      const updatedItems = await updatedItemsResponse.json();
      setItems(updatedItems);

      alert("The item has been added!");
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error.message || "An error occurred");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add New Item
          </h2>
          <ItemForm onAdd={handleAdd} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">List of Items</h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">
            No items available. Add a new item.
          </p>
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
