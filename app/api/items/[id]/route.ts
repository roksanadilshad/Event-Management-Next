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

    const rawItem = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    if (!rawItem)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });

 
      const item = {
      _id: rawItem._id.toString(),
      title: rawItem.title,
      description: rawItem.description,
      date: rawItem.date,
      location: rawItem.location,
      image: rawItem.image,
      price: rawItem.cost,
    };

     return NextResponse.json(item);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
