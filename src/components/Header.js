//components/Header.js

"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
        >
          InventoryMaster
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            href="/items"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Items
          </Link>
          {auth.token ? (
            <button
              onClick={auth.logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
