/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-04 06:44:57
 * @Description:
 */
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["localhost"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  ...(isProd ? { output: "standalone" } : {}),
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : "",
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : "",
  trailingSlash: true,
};

export default nextConfig;
