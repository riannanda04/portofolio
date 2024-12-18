import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export interface ReplyComment {
  commentId: ObjectId;
  reply: string;
  date: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse request body
    const client = await clientPromise;
    const db = client.db();

    if (req.method === "POST") {
      const { reply, commentId } = req.body;
      if (!reply || reply.trim().length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Reply cannot be empty" });
      }
      if (!commentId || !ObjectId.isValid(commentId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid comment ID" });
      }

      const updateForm: ReplyComment = {
        commentId: commentId,
        reply: reply,
        date: new Date(),
      };

      const result = await db
        .collection("reply-comment")
        .insertOne(updateForm);

      if (!result.acknowledged) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add reply" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Reply added successfully" });
    } else if (req.method === "GET") {
      const result = await db.collection("reply-comment").find({}).toArray();
      return res.status(200).json({ success: true, data: result });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error while replying to comment:", {
      message: error.message,
      stack: error.stack,
    });

    return res
      .status(400)
      .json({ success: false, message: "Reply cannot be empty" });
  }
}
