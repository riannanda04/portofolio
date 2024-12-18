import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);

  switch (req.method) {
    case "POST":
        try{
            const body = JSON.parse(req.body)
            if(typeof body !== "object"){
                throw new Error('invalid request')
            }
            
            if( body.title == ""){
              throw new Error('title is required')
          }
            let myWork = await db.collection("work").insertOne(body);
            res.json({ data: myWork });
        }catch(err){
            res.status(422).json({ message: err.message});
        }
      
      break;
    case "GET":
      const allPosts = await db.collection("work").find({}).toArray();
      res.json({ data: allPosts });
      break;
    case "DELETE":
    const body = JSON.parse(req.body)

    const resDelete = await db.collection("work").deleteOne({
      _id: new  ObjectId(body.deleted_id)
    })

    res.json({ data: [resDelete], message:"data berhasil dihapus" });
    break;
    default:
        res.status(404).json({message: "page not found"});
        break;

  }
}