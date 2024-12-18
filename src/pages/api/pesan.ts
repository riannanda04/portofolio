 // posts.js

 import clientPromise from "../../lib/mongodb";
 import type { NextApiRequest, NextApiResponse } from "next";
 
 export default async function handler(req:NextApiRequest, res:NextApiResponse) {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_NAME);
   switch (req.method) {
     // case "POST":
     // //   let bodyObject = JSON.parse(req.body);
     //   let myWork = await db.collection("user").insertOne(req.body);
     //   res.json({data: myWork});
     //   break;
     case "POST":
       try {
         const body = JSON.parse(req.body);
         if (typeof body !== "object") {
           throw new Error("invalid request");
         }
 
         if (body.title == "") {
           throw new Error("title is required");
         }
         let myWork = await db.collection("pesan").insertOne(body);
         res.json({ data: myWork });
       } catch (err) {
         res.status(422).json({ message: err.message });
       }
       break;
     case "GET":
       const allWork = await db.collection("pesan").find({}).toArray();
       res.json({ data: allWork });
       break;
     default:
       res.status(404).json({ message: "Page Not Found" });
       break;
   }
 }
 