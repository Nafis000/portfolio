import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Media uploaded through the CMS is served from the Supabase Storage public bucket.
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/**`)],
  },
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
