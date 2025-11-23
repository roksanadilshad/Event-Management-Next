"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([
    { id: 1, title: "Event 1", price: "$10" },
    { id: 2, title: "Event 2", price: "$20" },
  ]);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <h2 className="font-semibold text-xl">{p.title}</h2>
            <p className="text-gray-600">{p.price}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => alert(`View ${p.title}`)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
