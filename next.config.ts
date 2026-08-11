import type { NextConfig } from "next";

/**
 * When building for GitHub Pages (GITHUB_PAGES=true, set by the deploy
 * workflow) we produce a fully static export served from a repo subpath.
 * On any other host (Vercel, Netlify, local) we build normally.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "portifolio-v3";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath: `/${repo}`,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: { formats: ["image/avif", "image/webp"] },
    };

export default nextConfig;
