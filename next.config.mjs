/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'i.imgur.com' },
            { hostname: 'api.imgur.com' }
        ]
    },

};

export default nextConfig;
