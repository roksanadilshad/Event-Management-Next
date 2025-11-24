"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const {user} = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="sticky top-0 bg-[#FFC4C4] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#850E35]">
          Eventify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-[#850E35] space-x-8">
          <Link href="/" className="hover:text-[#FCF5EE]">Home</Link>
          <Link href="/items" className="hover:text-[#FCF5EE]">Events</Link>
          <Link href="/about" className="hover:text-[#FCF5EE]">About</Link>
          
          {/* If user logged in */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="user"
                  className="w-7 h-7 rounded-full"
                />
                <span>{user.displayName || "User"}</span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded p-2 border">
                  <Link
                    href="/dashboard/add-product"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Add Product
                  </Link>

                  <Link
                    href="/dashboard/manage-products"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Manage Products
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 mt-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If user NOT logged in
            <div className="hidden md:block *:m-2">
          <Link
            href="/login"
            className="px-4 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#850E35]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#850E35]"
          >
            Register
          </Link>
        </div>
          )}
        </div>

        {/* Login / After Login Placeholder */}
        

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#FCF5EE]  text-[#850E35] px-6 pb-4 shadow">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/items" className="block py-2">Events</Link>
          <Link href="/about" className="block py-2">About</Link>
          <Link href="/contact" className="block py-2">Contact</Link>
          <Link
            href="/login"
            className="block mt-2 bg-[#FFC4C4] hover:bg-[#850E35] text-white text-center py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
