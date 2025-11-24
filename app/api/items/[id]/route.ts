import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await client.connect();
    const db = client.db("eventsDB");

    const rawItem = (await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) })) ||
     (await db
      .collection("newEvent")
      .findOne({ _id: new ObjectId(id) }));


    if (!rawItem)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });

 const item = {
      _id: rawItem._id.toString(),
      title: rawItem.title,
      fullDescription:
        rawItem.fullDescription || rawItem.fullDesc || "",
      shortDescription:
        rawItem.shortDescription || rawItem.shortDesc || "",
      date: rawItem.date || "",
      time: rawItem.time || "",
      location: rawItem.location || "",
      category: rawItem.category || "",
      image: rawItem.image || "", // <-- FIXED
      price: rawItem.price || 0,
      priority: rawItem.priority || 0,
    };

     return NextResponse.json(item);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
