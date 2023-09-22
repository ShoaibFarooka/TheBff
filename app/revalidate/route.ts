import { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { headers } from 'next/headers'

export const POST = async (req: NextRequest) => {
    try {
        const headersList = headers()

        // get token from header
        const token = headersList.get('Token');
        console.log(token)
        if (!token || token !== process.env.REVALIDATE_TOKEN) return new Response("Invalid token", { status: 401 })

        const data = await req.json()
        const { multiple } = data as { path: string | string[], multiple: boolean, isBlog: boolean }
        let path = data.path

        console.log(data)

        const isBlog = req.headers.get('IsBlog') === 'true'

        if (isBlog && data?.__typename === 'Post') path = ['/blog', `/blog/${data?.slug}`]

        if (!path || (Array.isArray(path) && !path.length)) return new Response("Invalid path", { status: 400 })


        if (multiple) {
            if (!Array.isArray(path)) return new Response("Invalid path", { status: 400 })

            await Promise.all(path.map((path => revalidatePath(path))))
        } else {
            await revalidatePath(path as string)
        }

        return new Response(JSON.stringify({ message: "Revalidation successful" }), { status: 200 })

    } catch (error: any) {
        return new Response(JSON.stringify({message: error.message ?? "Something went wrong"}), { status: 500 })
    }
}