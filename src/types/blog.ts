export interface Post {
    id: number;
    title: string;
    slug: string;
    date: string | Date;
    excerpt: string;
    coverImage: {
        url: string;
    }
    content: {
        raw: Object;
    }
    author: Author;
    seoOverride?: SeoOverride;
    featured: boolean;
}


export interface Author {
    name: string;
    posts: Post[];
    picture: {
        url: string;
    }
    title: string;
    biography: string;
}

export interface SeoOverride {
    title?: string;
    description?: string;
    image?: {
        url?: string;
    }
}

export interface PostConnection {
    aggregate: {
        count: number;
    }
    edges: {
        node: Post;
    }[]
}