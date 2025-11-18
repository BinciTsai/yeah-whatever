/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["maps.googleapis.com"],
  },

  // 讓 Vercel 打包 markdown（否則 posts 頁面在正式環境會讀不到 .md）
  experimental: {
    outputFileTracingIncludes: {
      "/app/posts/[slug]/page": ["posts/**/*.md"],
    },
  },
};

export default nextConfig;
