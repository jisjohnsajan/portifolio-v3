import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required for `output: export` (GitHub Pages) so this emits a static file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
