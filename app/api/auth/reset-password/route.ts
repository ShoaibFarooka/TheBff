import { resetPassword, sendResetPasswordEmail } from "@/lib/auth";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    const { email } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 })

    const res = await sendResetPasswordEmail(email);

    if (!res.success) return new Response(JSON.stringify({ message: res.message }), { status: 400 })

    return new Response(JSON.stringify({ success: true, message: res.message ?? 'Password reset link sent successfully!' }), { status: 200 })
}


export const PUT = async (req: NextRequest) => {
    const { newPass, token } = await req.json();

    if (!newPass || !token) return new Response(JSON.stringify({ message: "New Password and Token are required" }), { status: 400 })

    const res = await resetPassword({ newPass, token });
    // console.log(res)
    if (!res.success) return new Response(JSON.stringify({ message: res.message }), { status: 400 })

    return new Response(JSON.stringify({ success: true, message: res.message ?? 'Password reset successfully!' }), { status: 200 })
}