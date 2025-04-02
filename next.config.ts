import { NextConfig } from 'next';

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/storybook/:path*",
        destination: "/storybook-static/:path*", // serves the built Storybook files
      },
    ];
  },
};

export default config;
