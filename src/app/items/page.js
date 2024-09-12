"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const [username, setUsername] = useState(""); // Стан для імені користувача
  const router = useRouter();

  // Функція для отримання товарів
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Failed to fetch items:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Функція для отримання імені користувача
  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username); // Зберігаємо ім'я користувача у стані
      } else {
        console.error("Failed to fetch username:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch username:", error);
    }
  };

  // Функція для додавання нового товару
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

  // Функція для видалення товару
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

  // Функція для редагування товару
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

  // Функція для виходу з системи
  const handleLogout = () => {
    localStorage.removeItem("token"); // Видаляємо токен
    router.push("/"); // Перенаправляємо на домашню сторінку
  };

  useEffect(() => {
    fetchItems(); // Завантажуємо список товарів при завантаженні компонента
    fetchUsername(); // Завантажуємо ім'я користувача при завантаженні компонента
  }, []);

  return (
    <main className="flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Items</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

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
                            quantity: parseInt(e.target.value, 10),
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
