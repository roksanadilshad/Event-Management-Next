// scripts/seed.js
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // to read MONGODB_URI

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("eventdb"); // your DB name
    const collection = db.collection("items"); // your collection

    // Optional: delete existing documents
    await collection.deleteMany({});

    // Read JSON file
    const filePath = path.join(__dirname, "events.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const events = JSON.parse(data);

    const result = await collection.insertMany(events);
    console.log(`Inserted ${result.insertedCount} items!`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
