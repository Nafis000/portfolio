import type { NextConfig } from "next";

// Fail the build early with a clear instruction instead of an obscure error deep in prerendering.
const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] as const;
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  throw new Error(
    `Missing environment variable(s): ${missing.join(", ")}. ` +
      "Locally, copy .env.example to .env.local. On Vercel, add them under Project → Settings → Environment Variables, then redeploy.",
  );
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Media uploaded through the CMS is served from Supabase Storage's public "media" bucket.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/media/**" }],
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
