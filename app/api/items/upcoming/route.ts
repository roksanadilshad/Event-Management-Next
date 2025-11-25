import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("eventsDB"); // change to your DB name
    const itemsCollection = db.collection("items");

    const today = new Date();

    // Find events with date >= today
    const upcomingEvents = await itemsCollection
      .find({ date: { $gte: today.toISOString() } })
      .sort({ date: 1 }) // earliest first
      .limit(6)
      .toArray();

    return NextResponse.json(upcomingEvents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  } finally {
    await client.close();
  }
}
