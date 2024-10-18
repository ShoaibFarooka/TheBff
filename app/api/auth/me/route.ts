import { NextRequest } from "next/server";
import { authenticate, getAuthUser } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
    const user = await getAuthUser()
    if((user?.user?.role === 1 || user?.user?.role === 4) && user?.success){
        return new Response(JSON.stringify(user.user), { status: 200 })
    }
    const auth = await authenticate()

    if (!auth.success || !auth.user?.email)
        return new Response("", { status: 401 })

    return new Response(JSON.stringify(auth.user), { status: 200 })
}