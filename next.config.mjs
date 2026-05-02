/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: []
  },
  outputFileTracingIncludes: {
    "/analysis/[slug]": ["./content/analysis/**/*.mdx"]
  }
};
export default nextConfig;
