import { isEmail } from "@/lib"

import { sendEmail } from "@/lib/email"
import { NextRequest, NextResponse } from "next/server"
// import contactRequestTemplate from "@/lib/templates/contactRequest"
import contactRequestTemplate from "@/lib/email/templates/contactRequest"

export const POST = async (req: NextRequest) => {

    try {
            
            const { email, name, message } = await req.json() as any

            // console.log(email, name, message)
    
            if (!email || !name || !message) {
                return NextResponse.json({ error: "Missing fields" }, { status: 400 })
            }
    
            if (!isEmail(email)) {
                return NextResponse.json({ error: "Invalid email" }, { status: 400 })
            }
        
            const emailData = {
                to: process.env.EMAIL_USER!,
                subject: `New message from ${name}`,
                text: message,
                html: contactRequestTemplate({ name, email, message }),
                replyTo: email
            }

            await sendEmail(emailData)

            return NextResponse.json({ message: "Message sent" }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }

}