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
   const [searchTerm, setSearchTerm] = useState(""); // input value
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);


  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then((data: Item[]) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(err => console.error(err));
  }, []);

   const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">All Items</h1>
      <p className="text-gray-600 mb-4">Browse all available items</p>

      {/* Search input + button */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="border rounded p-4 shadow">
            <img
              src={item.image}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            <p className="font-semibold text-blue-600 mt-2">${item.price}</p>

            <Link
              href={`/items/${item._id}`}
              className="mt-3 inline-block bg-blue-500 text-white px-3 py-1 rounded"
            >
              Details
            </Link>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No items found.</p>
      )}

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
