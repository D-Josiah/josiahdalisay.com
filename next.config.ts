import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route here is static; Cache Components keeps it that way by
  // flagging anything that would silently opt a page into dynamic rendering.
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
