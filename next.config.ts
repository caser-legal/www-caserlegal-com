import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
