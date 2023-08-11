import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Subscriber from "@/models/newsletter"
import { getQueryParams, isEmail } from "@/lib"
import { sendEmail } from "@/lib/email"
import jwt from 'jsonwebtoken'


export const GET = async (req: NextRequest) => {
    try {

        const { email } = getQueryParams(req.url)
        console.log(email)

        if (!email || !isEmail(email)) {
            return NextResponse.json({ success: false, message: "Invalid email address" })
        }

        await connectDB()
        const subscriber = await Subscriber.findOne({ email })

        if(subscriber) {
            if (subscriber?.subscribed) return NextResponse.json({ success: false, message: "Already subscribed" });
        } else {
            const newSubscriber = new Subscriber({ email });        
            await newSubscriber.save();
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${token}`;
        // An email template with button to confirm subscription
        const html = `
            <div style="text-align: center;">
                <h1>Confirm your subscription</h1>
                <p>Click the button below to confirm your subscription</p>
                <a href="${url}" style="cursor:pointer;">
                    <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
                        Confirm
                    </button>
                </a>
            </div>
        `

        const emailRes = await sendEmail({
            to: email,
            subject: "Confirm your subscription",
            html,
            text: 'Confirm your subscription for TheBFF newsletter'
        })

        if (emailRes.success) {
            return NextResponse.json({ success: true, message: "Please check your email to confirm your subscription" });
        } else {
            return NextResponse.json({ success: false, message: emailRes.message });
        }

    } catch (error: any) {
        return NextResponse.json({ success: false,  message: error.message ?? "Something went wrong" });
    }
}