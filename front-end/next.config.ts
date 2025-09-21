import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["mylabparfume.com"],
    unoptimized: true,
  },
  distDir: "dist",
};

export default nextConfig;
