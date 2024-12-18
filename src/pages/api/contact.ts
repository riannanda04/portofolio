import type { NextApiRequest, NextApiResponse } from 'next'
 
interface  ResponseData {
  location: Location | null,
  social: SocialMedia,
  phone: Phone
}

interface  Location {
  country: string;
  city: string;
  street: string;
}

interface  SocialMedia  {
  email: string;
  skype: string;
  telegram: string;
}

interface  Phone  {
  suport: string | null;
  office: string;
  personal: string;
}

 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response:ResponseData={
    location:{ 
      city:"Jakarta", 
      country:"Indonesia", 
      street:"Jl. Jalan"
    },
    phone:{
      office:"021 88989",
      personal:"0813 484994 999794", 
      suport: null
    },
    social: {
      email:"myname@mail.com",
      skype:"@myname",
      telegram:"@myname"
    }
  }
  res.status(200).json(response)
}