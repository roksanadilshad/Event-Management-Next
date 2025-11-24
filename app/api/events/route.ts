import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eventsDB");

    const products = await db
      .collection("newEvent")
      .find()
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    // convert _id to string
    const serialized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt.toISOString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch new events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db.collection("newEvent").insertOne({
      title: body.title,
      shortDesc: body.shortDesc,
      fullDesc: body.fullDesc,
      price: Number(body.price),
      imageUrl: body.imageUrl || "",
      createdAt: new Date(),
      createdBy: body.userId,
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error inserting New Event:", error);
    return NextResponse.json(
      { success: false, message: "Error inserting new event" },
      { status: 500 }
    );
  }
}

