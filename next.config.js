/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: { domains: ["maps.googleapis.com"] },
  reactStrictMode: true
};
module.exports = nextConfig;
