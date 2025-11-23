
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#FCF5EE] text-[#850E35]">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center md:text-left md:flex md:items-center md:justify-between">
        
        {/* Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manage Your Events Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Plan, organize, and track all your events in one place. Event management made simple.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-[#EE6983] text-[#FFC4C4] font-semibold rounded-md shadow-md hover:text-gray-100 hover:bg-[#FFC4C4] transition"
            >
              Get Started
            </Link>
            <Link
              href="/items"
              className="px-6 py-3 border border-[#FFC4C4] text-[#850E35] rounded-md hover:bg-[#FFC4C4] hover:text-white transition"
            >
              Browse Events
            </Link>
          </div>
        </div>

        {/* Optional Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/1f/f4/22/1ff422ba4ffed80c1640dfa287500e43.jpg"
            alt="Event Management"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
