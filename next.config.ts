import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vignette.wikia.nocookie.net",
        pathname: "/starwars/**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/starwars/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
