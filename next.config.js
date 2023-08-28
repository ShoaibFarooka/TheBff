/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'media.graphassets.com', 'loremflickr.com', 'picsum.photos']
    }
}

module.exports = nextConfig
