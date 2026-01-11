import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'newsdata.io',
      },
      {
        protocol: 'https',
        hostname: '**.newsdata.io',
      },
      {
        protocol: 'https',
        hostname: 'news.mypangandaran.com',
      },
      {
        protocol: 'https',
        hostname: '**.mypangandaran.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'amazingpangandaran.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazingpangandaran.com',
      },
    ],
  },
};

export default nextConfig;
