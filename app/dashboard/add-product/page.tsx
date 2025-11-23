"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function AddProduct() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  // Protect the page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        title,
        shortDesc,
        fullDesc,
        price,
        imageUrl,
        createdAt: Timestamp.now(),
        createdBy: user?.uid,
      });
      alert("Product added successfully!");
      // Reset form
      setTitle("");
      setShortDesc("");
      setFullDesc("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Full Description"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
