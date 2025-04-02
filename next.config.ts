export default {
  async rewrites() {
    return [
      {
        source: "/storybook/:path*",
        destination: "/storybook-static/:path*",
      },
    ];
  },
};
