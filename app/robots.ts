import type { MetadataRoute } from "next";

import { draftOrRetiredRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        draftOrRetiredRoutes.admin,
        draftOrRetiredRoutes.blogs,
        draftOrRetiredRoutes.contactSuccess,
        draftOrRetiredRoutes.process,
      ],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
