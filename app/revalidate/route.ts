import consola from "consola"
import { revalidatePath, revalidateTag } from "next/cache"
import { headers } from 'next/headers'
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const headersList = headers()

        // get token from header
        const token = headersList.get('Token');

        if (!token || token !== process.env.REVALIDATE_TOKEN) return new Response("Invalid token", { status: 401 })

        const data = await req.json()
        // const { multiple } = data as { path: string | string[], multiple: boolean, isBlog: boolean }
        let path = data.path
        let tags = data.tags

        // console.log(data)
        revalidateTag('offers')

        const isBlog = req.headers.get('IsBlog') === 'true'

        if (isBlog && data?.__typename === 'Post') path = ['/blog', `/blog/${data?.slug}`]

        if (path) {
            if (Array.isArray(path)) {
                path.forEach((path => revalidatePath(path)))
            } else {
                revalidatePath(path as string)
            }
        }

        if (tags) {
            if (Array.isArray(tags)) {
                tags.forEach(tag => revalidateTag(tag))
            } else {
                revalidateTag(tags)
            }
        }

        return new Response(JSON.stringify({ message: "Revalidation successful" }), { status: 200 })

    } catch (error: any) {
        consola.error(error)
        return new Response(JSON.stringify({ message: error.message ?? "Something went wrong" }), { status: 500 })
    }
}