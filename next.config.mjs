/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'i.imgur.com' }
        ]
    },

};

export default nextConfig;
