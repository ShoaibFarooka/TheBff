// import { NextRequest, NextResponse } from "next/server"

// export const GET = async (req: NextRequest) => {
//     try {
//         const { slug } = req.params
//         const { page } = req.query
//         const { data } = await fetch(`https://api.themoviedb.org/3/${slug}?api_key=${process.env.TMDB_API_KEY}&page=${page}`)
//         return NextResponse.json(data)
//     } catch (error) {
//         return NextResponse.error(error)
//     }
// }