import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET /api/items
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("eventsDB");

    const rawItems = await db.collection("items").find().toArray();
    const rawNewEvents = await db.collection("newEvent").find().toArray();


    const items = rawItems.map(item => ({
      _id: item._id.toString(), // convert ObjectId to string
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location,
      image: item.image,
      price: item.cost
    }));

    const newEvents = rawNewEvents.map(event => ({
      _id: event._id.toString(),
      title: event.title,
      description: event.shortDesc || event.fullDesc || "", // match fields
      date: event.date || "",
      location: event.location || "",
      image: event.imageUrl || "",
      price: event.price || 0,
    }));

     const allItems = [...items, ...newEvents];

    return NextResponse.json(allItems);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}


