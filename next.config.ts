import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user-landing/messaging/conversations",
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
