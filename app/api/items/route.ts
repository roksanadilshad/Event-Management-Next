import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET /api/items
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("eventsDB");

    const rawItems = await db.collection("items").find().toArray();

    const items = rawItems.map(item => ({
      _id: item._id.toString(), // convert ObjectId to string
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      image: item.image,
      price: item.cost
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
