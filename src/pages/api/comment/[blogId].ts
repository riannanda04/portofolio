import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export interface Comment {
  blogId: string;
  email: string;
  name: string;
  comment: string;
  createdAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogId } = req.query;

  // Validate `commentId`
  if (typeof blogId !== "string") {
    res.status(400).json({ error: "Invalid blogId parameter" });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
      case "GET":
        try {
          const comments = await db.collection("comments").find({ blogId: blogId as string }).sort({ createdAt: -1 }).toArray();
          res.status(200).json({ data: comments });
        } catch (error) {
          console.error("Error fetching comments:", error);
          res.status(500).json({ error: "Failed to fetch comments" });
        }
        break;
      case "POST":
        try {
          const { email, name, comment } = req.body;

          if (!email || !name || !comment) {
            res.status(400).json({ error: "Name, email, and comment are required" });
            return;
          }

          const newComment : Comment = {
            blogId,
            email,
            name,
            comment,
            createdAt: new Date(),
          };

          const result = await db.collection("comments").insertOne(newComment);

          if (result.acknowledged) {
            res.status(200).json({ data: newComment });
          } else {
            res.status(500).json({ error: "Failed to add comment" });
          }
        } catch (error) {
          console.error("Error adding comment:", error);
          res.status(500).json({ error: "Failed to add comment" });
        }
        break;
      case "DELETE":
        try {
          const { commentId } = req.query;

          const objectId = new ObjectId(commentId as string);

          const result = await db.collection("comments").deleteOne({
            _id: objectId,
            blogId
          });

          if (result.deletedCount === 1) {
            res.status(200).json({ message: "Comment deleted successfully" });
          } else {
            res.status(404).json({ error: "Comment not found" });
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
          res.status(500).json({ error: "Failed to delete comment" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}
