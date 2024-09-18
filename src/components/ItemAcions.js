// src/components/ItemActions.js

import React from "react";
import { useRouter } from "next/navigation";

const ItemActions = ({ item, onUpdate, onDelete }) => {
  const router = useRouter();

  const handleAction = async (action, id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in or register to perform this action.");
      router.push("/login");
      return;
    }

    try {
      if (action === "update") {
        await onUpdate(id);
      } else if (action === "delete") {
        await onDelete(id);
      }
    } catch (error) {
      console.error(`Failed to ${action} item`, error);
    }
  };

  return (
    <td className="border border-gray-300 px-4 py-2">
      <button
        onClick={() => handleAction("update", item.id)}
        className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
      >
        Edit
      </button>
      <button
        onClick={() => handleAction("delete", item.id)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </td>
  );
};

export default ItemActions;
