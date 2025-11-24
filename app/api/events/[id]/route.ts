import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request, { params }
  : { params: { id: string } }
) {
  try {
     const { id } = await params;

     if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db
    .collection("newEvent")
    .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error", error);
    return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params; 
  
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("eventsDB");

    const result = await db.collection("newEvent").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          shortDesc: body.shortDesc,
          fullDesc: body.fullDesc,
          price: Number(body.price),
          imageUrl: body.imageUrl || "",
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
  }
}
