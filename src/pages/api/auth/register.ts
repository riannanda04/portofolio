import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/session";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try{
                const body = JSON.parse(req.body)
                const hashPwd= await hashPassword(body.confirm_password)
                const userData = {
                    name: body.name,
                    email:body.email,
                    password: hashPwd,
                }

                let user = await db.collection("users").insertOne(userData);
                res.json({ data: user });

            } catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
        default:
            res.status(404).json({message: "page not found"});
        break;
    }
}