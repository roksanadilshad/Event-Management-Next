import BackButton from "@/components/BackButton";

interface Item {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
}

async function getItem(id: string): Promise<Item | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/items/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch item:", error);
    return null;
  }
}

export default async function ItemDetails({ params }: { params : { id: string } | Promise<{ id: string }> }) {
  const {id} = await params;
  const item = await getItem(id);

  if (!item) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center text-red-500">
        Item not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton />

      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{item.title}</h1>
      <p className="text-gray-700 mt-2">{item.description}</p>

      <p className="text-xl font-semibold mt-4 text-blue-600">${item.price}</p>
      <p className="text-gray-500 mt-1">Date: {item.date}</p>
      <p className="text-gray-500 mt-1">Location: {item.location}</p>
    </div>
  );
}
