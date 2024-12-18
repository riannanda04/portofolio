import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  switch (req.method) {
    case "POST":
      try {
        const body = req.body;

        if (typeof body !== "object" || Array.isArray(body)) {
          throw new Error("Invalid request format");
        }

        // Insert the new blog post
        const blogs = await db.collection("blogs").insertOne(body);
        res
          .status(200)
          .json({ data: blogs, message: "Blog successfully saved" });
      } catch (err) {
        console.error("Error during blog insertion:", err.message); // Log the error
        res.status(422).json({ message: err.message });
      }
      break;

    // Fetch all blogs (GET request)
    default:
      const blogsData = await db.collection("blogs").find({}).toArray();
      res.json({ data: blogsData });
      break;
  }
}
