import { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { getQueryParams } from "@/lib"

export const GET = async (req: NextRequest) => {
    const searchParams = getQueryParams<{ page: string | string[], key: string }>(req.url)

    if (!searchParams.key || searchParams.key !== process.env.REVALIDATE_TOKEN) return new Response("", { status: 401 })

    const page = searchParams.page
    if (!page) return new Response("Invalid page", { status: 400 })

    revalidatePath(page as string)

    return new Response("Revalidation successful", { status: 200 })
}

export const dynamic = 'force-dynamic'