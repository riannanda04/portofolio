import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
   
    switch(req.method){
        case "POST":
        try{
            deleteCookie(`${process.env.AUTH_COOKIE_NAME}`)
            deleteCookie(`${process.env.AUTH_COOKIE_NAME}`,{req,res});

            res.status(200).json({message:'logout berhasil'});
        }catch(err){
            res.status(422).json({message:err.message});
        }
        break;
        default:
            res.status(404).json({message:"page not found"});
            break;
    }
}