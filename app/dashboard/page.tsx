// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import toast from "react-hot-toast";

// interface Product {
//   _id: string;
//   title: string;
//   shortDesc: string;
//   fullDesc: string;
//   price: number;
//   imageUrl?: string;
//   createdAt: string;
//   createdBy: string;
// }

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editShortDesc, setEditShortDesc] = useState("");
//   const [editFullDesc, setEditFullDesc] = useState("");
//   const [editPrice, setEditPrice] = useState("");
//   const [editImageUrl, setEditImageUrl] = useState("");

//   const router = useRouter();

//   // Protect page
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (!firebaseUser) router.push("/login");
//       else setUser(firebaseUser);
//       setCheckingAuth(false);
//     });
//     return () => unsubscribe();
//   }, [router]);

//   // Fetch products
//   const fetchProducts = () => {
//     setLoading(true);
//     fetch("/api/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Failed to fetch products");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (!checkingAuth && user) fetchProducts();
//   }, [checkingAuth, user]);

//   if (checkingAuth) return <p className="p-6">Checking authentication...</p>;
//   if (loading) return <p className="p-6">Loading products...</p>;

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Product deleted!");
//         fetchProducts();
//       } else toast.error("Failed to delete");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting product");
//     }
//   };

//   const openEditModal = (product: Product) => {
//     setEditingProduct(product);
//     setEditTitle(product.title);
//     setEditShortDesc(product.shortDesc);
//     setEditFullDesc(product.fullDesc);
//     setEditPrice(product.price.toString());
//     setEditImageUrl(product.imageUrl || "");
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingProduct) return;

//     try {
//       const res = await fetch(`/api/products/${editingProduct._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: editTitle,
//           shortDesc: editShortDesc,
//           fullDesc: editFullDesc,
//           price: editPrice,
//           imageUrl: editImageUrl,
//         }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Product updated!");
//         setEditingProduct(null);
//         fetchProducts();
//       } else toast.error("Failed to update product");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating product");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <button
//           className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => router.push("/dashboard/add-product")}
//         >
//           Add Product
//         </button>
//       </div>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="bg-white rounded shadow p-4">
//               {product.imageUrl && (
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="h-40 w-full object-cover rounded mb-4"
//                 />
//               )}
//               <h2 className="text-lg font-bold">{product.title}</h2>
//               <p className="text-gray-600">{product.shortDesc}</p>
//               <p className="mt-2 font-semibold">${product.price}</p>
//               <p className="text-sm text-gray-400 mt-1">
//                 Added on: {new Date(product.createdAt).toLocaleDateString()}
//               </p>

//               <div className="flex gap-2 mt-4">
//                 <button
//                   className="flex-1 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                   onClick={() => openEditModal(product)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="flex-1 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   onClick={() => handleDelete(product._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
//             <h2 className="text-xl font-bold mb-4">Edit Product</h2>
//             <form className="space-y-4" onSubmit={handleEditSubmit}>
//               <input
//                 type="text"
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Title"
//                 required
//               />
//               <input
//                 type="text"
//                 value={editShortDesc}
//                 onChange={(e) => setEditShortDesc(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Short Description"
//                 required
//               />
//               <textarea
//                 value={editFullDesc}
//                 onChange={(e) => setEditFullDesc(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Full Description"
//                 rows={4}
//                 required
//               />
//               <input
//                 type="number"
//                 value={editPrice}
//                 onChange={(e) => setEditPrice(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Price"
//                 required
//               />
//               <input
//                 type="text"
//                 value={editImageUrl}
//                 onChange={(e) => setEditImageUrl(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Image URL (optional)"
//               />
//               <div className="flex gap-2 mt-2">
//                 <button
//                   type="submit"
//                   className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="flex-1 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                   onClick={() => setEditingProduct(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
