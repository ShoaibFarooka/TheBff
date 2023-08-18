import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Subscriber from "@/models/newsletter"
import { getQueryParams, isEmail } from "@/lib"
// import { sendEmail } from "@/lib/email"
import jwt from 'jsonwebtoken'


export const GET = async (req: NextRequest) => {
    try {
        const query = getQueryParams(req.url)
        const { token } = query

        if (!token) return NextResponse.json({ success: false, message: "Token not found" })

        const valid = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        if (!valid) return NextResponse.json({ success: false, message: "Invalid token" })

        const email = (valid as any).email

        await connectDB()
        const subscriber = await Subscriber.findOne({ email })

        if (!subscriber) return NextResponse.json({ success: false, message: "Subscriber not found" })

        if(subscriber.subscribed) return NextResponse.json({ success: false, message: "Already subscribed" });

        subscriber.subscribed = true
        await subscriber.save()
        
        return NextResponse.json({ success: true, message: "Successfully subscribed" });

    } catch (error: any) {
        return NextResponse.json({ success: false,  message: error.message ?? "Something went wrong" });
    }
}