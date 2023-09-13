/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'media.graphassets.com', 'loremflickr.com', 'picsum.photos']
    },
    reactStrictMode: false,
    env: {
        MONGO_URI: process.env.MONGO_URI,
        REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
    }
}

module.exports = nextConfig
