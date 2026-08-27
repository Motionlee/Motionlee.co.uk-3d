import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep a local `next build` out of the dev server's .next directory —
  // sharing it corrupts the dev cache mid-session.
  //
  // Local only. Netlify's Next runtime looks for .next, so redirecting the
  // output on their builder would have produced a deploy with nothing in it.
  distDir:
    process.env.NODE_ENV === "production" && !process.env.CI && !process.env.NETLIFY
      ? ".next-build"
      : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
