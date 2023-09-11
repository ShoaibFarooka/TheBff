import { NextRequest } from "next/server"
import { authenticate } from "@/lib/auth"
import { addClass } from "@/lib/dbHelpers"

export const POST = async (req: NextRequest) => {    
    const auth = await authenticate()

    if (!auth.success || !auth.user?.email) 
        return new Response(" ", { status: 404 })

    const body = await req.json()
    const res = await addClass(auth.user.email, body)


    // if (!res)
    //     return new Response(JSON.stringify(res), { status: 400 })

    return new Response(JSON.stringify(res), {
        status: res ? 200 : 400,
    })
}