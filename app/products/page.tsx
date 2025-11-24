"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { log } from "console";

interface Item {
  _id: string;
  title: string;
  shortDesc: string;
  price: string;
  image?: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products") // API still points to route returning items
      .then((res) => res.json())
      .then((data) => {
        console.log('fetched from API', data);
        
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Events / Items</h1>
      <p className="text-gray-600 mb-6">Browse all available items</p>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-3">{item.title}</h2>
              <p className="text-gray-600 line-clamp-2">{item.shortDesc}</p>
              <p className="font-bold mt-2">${item.price}</p>

              <Link
                href={`/items/${item._id}`} // will be Item Details page
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
