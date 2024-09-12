"use client";
import { useState, useEffect } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Функція для отримання товарів
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token"); // або sessionStorage
      const response = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Додаємо токен в заголовок
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data); // Тут немає поля `data.items`, бо ви передаєте масив товарів
      } else {
        console.error("Failed to fetch items:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Додавання нового товару
  const handleAddItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newItem,
          description: "", // Опис (опціональне)
          quantity: 1, // Кількість (мінімум 1)
          category: "default", // Категорія (опціонально)
        }),
      });

      if (response.ok) {
        setNewItem(""); // Очищуємо поле введення
        fetchItems(); // Оновлюємо список після додавання товару
      } else {
        console.error("Failed to add item:", response.status);
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(); // Завантажуємо список товарів при завантаженні компонента
  }, []);

  return (
    <main className="flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Items</h1>

        {/* Форма для додавання нового товару */}
        <form onSubmit={handleAddItem} className="mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? "Adding..." : "Add Item"}
          </button>
        </form>

        {/* Відображення списку товарів */}
        {items.length === 0 ? (
          <p className="text-center">No items found</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border border-gray-300 rounded-md"
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
