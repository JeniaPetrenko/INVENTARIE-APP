"use client";
import { useState, useEffect } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    description: "",
    quantity: 1,
    category: "default",
  });
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

  // Видалення товару
  const handleDeleteItem = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchItems(); // Оновлюємо список після видалення товару
      } else {
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Редагування товару
  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditedItem({
      name: item.name,
      description: item.description || "",
      quantity: item.quantity,
      category: item.category || "default",
    });
  };

  const handleSaveItem = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedItem),
      });

      if (response.ok) {
        setEditingItem(null); // Закриваємо форму редагування
        fetchItems(); // Оновлюємо список після редагування товару
      } else {
        console.error("Failed to edit item:", response.status);
      }
    } catch (error) {
      console.error("Failed to edit item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null); // Закриваємо форму редагування
  };

  useEffect(() => {
    fetchItems(); // Завантажуємо список товарів при завантаженні компонента
  }, []);

  return (
    <main className="flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
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
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingItem === item.id ? (
                      <input
                        type="text"
                        value={editedItem.name}
                        onChange={(e) =>
                          setEditedItem({ ...editedItem, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingItem === item.id ? (
                      <input
                        type="text"
                        value={editedItem.description}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    ) : (
                      item.description || "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingItem === item.id ? (
                      <input
                        type="number"
                        value={editedItem.quantity}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingItem === item.id ? (
                      <input
                        type="text"
                        value={editedItem.category}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    ) : (
                      item.category || "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingItem === item.id ? (
                      <>
                        <button
                          onClick={() => handleSaveItem(item.id)}
                          className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
