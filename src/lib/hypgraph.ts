// methods to get posts by various filters from graphcms
import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { Author, Post } from '../types/blog'
const graphcms = new GraphQLClient(process.env.HYGRAPH_ENDPOINT! ?? 'https://ap-south-1.cdn.hygraph.com/content/cllt2ecg034pw01ue6nuw42kd/master')

const getString = (value: string | undefined) => value ? `"${value}"` : undefined

/**
 * @description get queries for graphcms
*/
const sanitizeQueries = (queries?: Record<string, string | number | boolean | undefined>) => {
    const query = queries ?
        Object.entries(queries)
            .map(([key, value]) => ({ key, value }))
        : []

    const q = query.filter((q) => q.value !== undefined)

    // if type is string, wrap it in quotes
    const qString = q.map((q) => `${q.key}: ${typeof q.value === 'string' ? getString(q.value) : q.value}`).join(', ')

    return qString ? `where: {${qString}},` : ''
}


/**
 * @description get options for graphcms
*/
const getOptions = (options?: Record<string, string | number | boolean | undefined>) => {
    const option = options ?
        Object.entries(options)
            .map(([key, value]) => ({ key, value }))
        : []

    const o = option.filter((o) => o.value !== undefined)
    return o.length ? `${o.map((o) => `${o.key}: ${o.value}`).join(', ')}` : ''
}


const properties = `
    id
    title
    slug
    excerpt 
    coverImage {
        url
    }
    content {
        raw
    }
    author {
        name
        picture {
            url
        }
        title
        biography
    }
    seoOverride {
        title
        description
        image { 
            url
        }
    } 
    featured
    createdAt
    updatedAt
`

type IGetPostQueries = {
    featured?: boolean
    author?: string
    slug?: string
}

type IGetPostOptions = {
    limit?: number
    skip?: number
    orderBy?: string
} & ( { first?: number, after?: string, } | { last?: number, before?: string })

type ReturnType = { posts: Post[], postsConnection: { aggregate: { count: number } } }


const genrateSearchQuery = (search: string): string => {

    const searchString = getString(search)

    const q = [
        { title_contains: searchString },
        { excerpt_contains: searchString },
    ]

    const qString = `[ ${q.map(q => `{${Object.keys(q)[0]}: ${Object.values(q)[0]}}`)} ]`

    return q.length ? qString : ''
}


const getPosts = cache(async (queries?: IGetPostQueries, options?: IGetPostOptions): Promise<ReturnType> => {

    try {
        const query = `
            query GetPosts {
                posts(${sanitizeQueries({
            ...queries,
            slug_contains: queries?.slug ?? undefined,
            slug: undefined,
        })} ${getOptions({ ...options, orderBy: options?.orderBy ?? 'createdAt_DESC' })}
                ) {
                    ${properties}
                }
                postsConnection {
                    aggregate {
                        count
                    }
                }
            }
        `

        const data = await graphcms.request(query) as ReturnType
        return data
    } catch (error: any) {
        console.error(error.message)
        return {
            posts: [], postsConnection: { aggregate: { count: 0 } }
        } as { posts: Post[], postsConnection: { aggregate: { count: number } } }
    }
})


const searchPosts = async (search: string, options?: IGetPostOptions): Promise<ReturnType> => {
    try {
        const query = `
        query SearchPosts {
            posts(where: {OR: ${genrateSearchQuery(search)}} ${getOptions({ ...options, orderBy: options?.orderBy ?? 'createdAt_DESC' })}) {
                ${properties}
            }
            postsConnection {
                aggregate {
                    count
                }
            }
        }
    `

        const data = await graphcms.request(query) as ReturnType
        return data
    } catch (error: any) {
        console.error(error.message)
        return {
            posts: [], postsConnection: { aggregate: { count: 0 } }
        }
    }
}


const getPost = async (slug: string): Promise<Post | null> => {
    try {
        const query = `
            query GetPost {
                post(where: {slug: "${slug}"}) {
                    ${properties}
                }
            }
        `

        const data = await graphcms.request(query) as { post: Post | null }
        return data.post
    } catch (error: any) {
        console.error(error.message)
        return null
    }
}

const getAuthors = async () => {
    try {
        const query = `
            query GetAuthors {
                authors {
                    name
                    picture {
                        url
                    }
                    title
                    biography
                }
            }
        `

        const data = await graphcms.request(query) as { authors: Author[] }
        return data.authors
    } catch (error: any) {
        console.error(error.message)
        return []
    }
}

// getPosts({  slug: '3' }).then(console.log)

export { getAuthors, getPost, getPosts, searchPosts }

