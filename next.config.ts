import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/v1/docket-search': ['./data/courts/**/*'],
    '/api/caser/search': ['./data/courts/**/*'],
    '/v1/case-insights': ['./data/apple-roots/*'],
    '/v1/case-research': ['./data/apple-roots/*'],
    '/v1/case-question': ['./data/apple-roots/*'],
    '/v1/case-question-stream': ['./data/apple-roots/*'],
    '/v1/usage': ['./data/apple-roots/*'],
    '/v1/credits/redeem': ['./data/apple-roots/*'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
