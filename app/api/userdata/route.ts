import { NextRequest } from "next/server"
import { authenticate } from "@/lib/auth"
import { getUserData } from "@/lib/dbHelpers"

export const GET = async (req: NextRequest) => {    
    const auth = await authenticate()

    if (!auth.success || !auth.user?.email) 
        return new Response(" ", { status: 404 })

    const userData = await getUserData(auth.user.email)

    userData?.forEach((user: any, i: number) => {
        // calculate expiry date using createdAt and plan validity
        const expiryDate = new Date(user.membership?.createdAt)
        expiryDate.setDate(expiryDate.getDate() + user.plan?.duration)

        // calculate remaining days
        const remainingDays = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))

        userData[i].membership = {
            ...user.membership,
            expiryDate,
            remainingDays
        }
    })

    return new Response(JSON.stringify(userData), {
        headers: {
            "Content-Type": "application/json",
        },
    })
}