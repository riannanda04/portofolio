import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

export interface ReplyComment {
  reply: string;
  date: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { replycommentId } = req.query;

  // Validate `commentId`
  if (typeof replycommentId !== "string" || !ObjectId.isValid(replycommentId)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing replycommentId parameter" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
      case "GET":
        try {
          const replies = await db
            .collection("reply-comment") // Specify the collection without typing here
            .find({ commentId: replycommentId }) // Use ObjectId for the query
            .sort({ createdAt: -1 })
            .toArray();

          console.log(replies);

          // Return the replies
          res.status(200).json({ data: replies as ReplyComment[] });
        } catch (error) {
          console.error("Error fetching replies:", error);
          res.status(500).json({ error: "Failed to fetch replies" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}
