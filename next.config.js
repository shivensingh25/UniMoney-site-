/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'localhost',
      'raw.githubusercontent.com',
      'github.com'
    ],
  },
}

module.exports = nextConfig 