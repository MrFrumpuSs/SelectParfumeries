/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', 'parfum.beknazaryanstudio.ru'],
  },
}

module.exports = nextConfig
