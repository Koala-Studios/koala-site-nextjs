import type { MetadataRoute } from "next";

import { serviceDetails } from "@/content/pages/service-details";
import { getPublishedCaseStudies } from "@/lib/content";
import { corePublicRoutes, getCaseStudyPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

// Bump when page content meaningfully changes; a per-build timestamp is a
// meaningless freshness signal to crawlers.
const LAST_CONTENT_UPDATE = new Date("2026-06-11");

function createStaticEntry(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteConfig.metadataBase).toString(),
    lastModified: LAST_CONTENT_UPDATE,
  };
}

function getCaseStudyEntries(): MetadataRoute.Sitemap {
  return getPublishedCaseStudies().map((caseStudy) =>
    createStaticEntry(getCaseStudyPath(caseStudy.slug))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries = Object.values(corePublicRoutes).map(createStaticEntry);
  const serviceEntries = serviceDetails.map((service) =>
    createStaticEntry(`/services/${service.slug}`)
  );

  return [...coreEntries, ...serviceEntries, ...getCaseStudyEntries()];
}
