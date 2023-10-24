/**
 * see - https://nextjs.org/docs/app/api-reference/next-config-js
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {},
  experimental: {
    typedRoutes: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
