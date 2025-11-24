// app/items/[id]/page.tsx
import React from "react";

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
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface Props {
  params: { id: string };
}

const ItemPage = async ({ params }: Props) => {
    const { id } = await params;
  const item = await getItem(id);
  console.log(item)

  if (!item) return <p>Item not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <img src={item.image} alt={item.title} className="w-full max-w-md my-4" />
      <p className="my-2">{item.description}</p>
      <p>Date: {item.date}</p>
      <p>Location: {item.location}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default ItemPage;
