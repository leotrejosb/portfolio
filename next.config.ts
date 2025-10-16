import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'back.leonardotrejos.cerebria.co',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'back.leonardotrejos.cerebria.co',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
