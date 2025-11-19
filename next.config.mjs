/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['maps.googleapis.com'] },
  experimental: {
    serverComponentsExternalPackages: ["gray-matter", "marked"],
  },
  output: "standalone"  // ← 重點！啟用 Node.js runtime
};

export default nextConfig;
