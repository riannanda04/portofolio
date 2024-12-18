import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try{
                // const body = JSON.parse(req.body)
                const body = req.body
                if(typeof body !== "object"){
                    throw new Error('invalid request')
                }
                
                if( body.nama_kampus == ""){
                  throw new Error('nama_kampus is required')
                }

                if( body.alamat_kampus == ""){
                    throw new Error('alamat_kampus is required')
                }

                if( body.tahun_lulus == ""){
                    throw new Error('tahun_lulus is required')
                }

                if( body.ipk == ""){
                    throw new Error('ipk is required')
                }

                let education = await db.collection("education").insertOne(body);
                res.status(200).json({ data: education, message:'data berhasil di simpan' });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;

        case "PUT":
            
        break;
        default:
            const allEducation = await db.collection("education").find({}).toArray();
            res.json({ data: allEducation });
        break;
    }
}

