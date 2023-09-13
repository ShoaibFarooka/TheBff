import { NextRequest } from "next/server";
import { authenticate } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
    const auth = await authenticate()

    if (!auth.success || !auth.user?.email)
        return new Response("", { status: 401 })

    return new Response(JSON.stringify(auth.user), { status: 200 })
}