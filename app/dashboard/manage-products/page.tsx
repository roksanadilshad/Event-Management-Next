"use client";

import { useEffect, useState } from "react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((item: any) => (
          <div key={item._id} className="p-4 border rounded">
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.shortDesc}</p>

            <button className="text-blue-600 mt-2">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
