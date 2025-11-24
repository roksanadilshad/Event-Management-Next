"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then((data: Item[]) => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">All Items</h1>
      <p className="text-gray-600 mb-4">Browse all available items</p>

      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="border rounded p-4 shadow">
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            <p className="font-semibold text-blue-600 mt-2">${item.price}</p>

            <Link
              href={`/items/${item._id}`} // safe string
              className="mt-3 inline-block bg-blue-500 text-white px-3 py-1 rounded"
            >
              Details
            </Link>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No items found.</p>
      )}
    </div>
  );
}
