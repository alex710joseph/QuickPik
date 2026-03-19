import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;
const DB_NAME = "quickpik";

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB at URI:", URI);
  }
  return db;
}

async function getCollection(name) {
  const database = await connectDB();
  return database.collection(name);
}

export { connectDB, getCollection };
