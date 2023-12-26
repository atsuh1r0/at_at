/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // 画像を置いているドメイン
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
