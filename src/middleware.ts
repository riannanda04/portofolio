import type { NextRequest } from 'next/server'
import {  NextResponse } from 'next/server'
import {  jwtVerify } from 'jose'

const protectedRoutes = [
    '/admin',
    "/admin/work",
    "/admin/message"
]

export default async function middleware(req: NextRequest) {

        const cookie = await req.cookies.get(`${process.env.AUTH_COOKIE_NAME}`) || null
        const path = req.nextUrl.pathname
        const isProtectedRoute = protectedRoutes.includes(path)
        let userId:any = ''
        if(cookie?.value){
            
            // const secretKey = process.env.SESSION_SECRET
            // const encodedKey = new TextEncoder().encode(secretKey)
            try{
                // const { payload } = await jwtVerify(cookie?.value, encodedKey, {
                //     algorithms: ['HS256'],
                // })
                // userId = payload.id || ''
                userId = cookie?.value
            }catch(er){
                userId = ""
            }
        }

        if (isProtectedRoute &&  userId ==='') {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }

        return NextResponse.next()
   
}