import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
      case "POST":
        try {
          const body = JSON.parse(req.body);
          if (typeof body !== "object") {
            throw new Error('invalid request');
          }
          if (body.title == "") {
            throw new Error('title is required');
          }
          let myWork = await db.collection("work").insertOne(body);
          res.json({ data: myWork });
        } catch (err) {
          console.error("Error in POST request:", err);
          res.status(422).json({ message: err.message });
        }
        break;
      case "GET":
        try {
          const allPosts = await db.collection("work").find({}).toArray();
          res.json({ data: allPosts });
        } catch (err) {
          console.error("Error in GET request:", err);
          res.status(500).json({ message: "Failed to fetch data" });
        }
        break;
      default:
        res.status(404).json({ message: "page not found" });
        break;
    }
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
