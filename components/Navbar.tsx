"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/contact" className="hover:text-[#FCF5EE]">Contact</Link>
        </div>

        {/* Login / After Login Placeholder */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-4 py-2 bg-[#EE6983] text-white rounded-md hover:bg-[#850E35]"
          >
            Login
          </Link>
        </div>

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
