import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eventDB"); // your DB name
    const users = await db.collection("users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("eventDB");
    const result = await db.collection("users").insertOne({ name, email });

    return NextResponse.json({ _id: result.insertedId, name, email }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding user" }, { status: 500 });
  }
}
