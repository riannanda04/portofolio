import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

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

  // Validate `blogId`
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
          const comments = await db
            .collection("comments") // Specify the collection without typing here
            .find({ blogId: blogId as string }) // Ensure `blogId` is typed correctly as a string
            .sort({ createdAt: -1 })
            .toArray();

          // Explicitly cast the fetched data to the `Comment` type
          res.status(200).json({ data: comments as Comment[] });
        } catch (error) {
          console.error("Error fetching comments:", error);
          res.status(500).json({ error: "Failed to fetch comments" });
        }
        break;

      case "POST":
        try {
          const { email, name, comment } = req.body;

          // Validate input
          if (!name || !comment || !email) {
            res
              .status(422)
              .json({ error: "Name, Email, and Comment are required" });
            return;
          }

          const newComment: Comment = {
            blogId,
            email,
            name,
            comment,
            createdAt: new Date(),
          };

          const result = await db.collection("comments").insertOne(newComment);

          if (result.acknowledged) {
            res.status(201).json({ data: newComment });
          } else {
            throw new Error("Failed to insert comment");
          }
        } catch (error) {
          console.error("Error saving comment:", error);
          res.status(500).json({ error: "Failed to save comment" });
        }
        break;

      case "DELETE":
        try {
          const { commentId } = req.body;

          // Convert `commentId` to ObjectId
          const objectId = new ObjectId(commentId);

          // Delete the comment from the database
          const result = await db
            .collection("comments")
            .deleteOne({ _id: objectId, blogId });

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
