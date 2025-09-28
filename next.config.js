/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'localhost'
    ],
  },
}

module.exports = nextConfig 