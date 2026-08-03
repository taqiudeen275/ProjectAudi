import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@audilink/contracts", "@audilink/ui"],
};

export default nextConfig;

