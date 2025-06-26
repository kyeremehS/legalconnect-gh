import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user-page',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: '__session',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
