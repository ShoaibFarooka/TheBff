import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Subscriber from "@/models/newsletter"
import { getQueryParams, isEmail } from "@/lib"
import { sendEmail } from "@/lib/email"
import jwt from 'jsonwebtoken'
import newsletterConfirmationTemplate from "@/lib/templates/newsletterConfirmation"

export const GET = async (req: NextRequest) => {
    try {

        const { email } = getQueryParams(req.url)

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
        const html = newsletterConfirmationTemplate(url)

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



export const dynamic = "force-dynamic"