import { NextConfig } from 'next';

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/storybook/:path*",
        destination: "/storybook-static/:path*", // serves Storybook from the static directory
      },
    ];
  },
  // Optionally, add public directory for assets if required
  async headers() {
    return [
      {
        source: "/storybook-static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // cache Storybook assets for a long time
          },
        ],
      },
    ];
  },
};

export default config;
