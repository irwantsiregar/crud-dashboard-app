import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
        protocol: "https",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
