/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    // workerThreads: true,
  },
  images: {},
  eslint: {
    ignoreDuringBuilds: false,
  },
  distDir: ".next",
  cleanDistDir: true,
  useFileSystemPublicRoutes: true,
  optimizeFonts: true,
};

export default nextConfig;
