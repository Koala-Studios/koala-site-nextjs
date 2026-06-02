import type { MetadataRoute } from "next";

import { getPublishedCaseStudies } from "@/lib/content";
import { corePublicRoutes, getCaseStudyPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

function createStaticEntry(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteConfig.metadataBase).toString(),
    lastModified: new Date(),
  };
}

function getCaseStudyEntries(): MetadataRoute.Sitemap {
  return getPublishedCaseStudies().map((caseStudy) =>
    createStaticEntry(getCaseStudyPath(caseStudy.slug))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries = Object.values(corePublicRoutes).map(createStaticEntry);

  return [...coreEntries, ...getCaseStudyEntries()];
}
