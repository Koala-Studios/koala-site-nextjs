import type { MetadataRoute } from "next";

import { serviceDetails } from "@/content/pages/service-details";
import { getPublishedBlogPosts, getPublishedCaseStudies } from "@/lib/content";
import { corePublicRoutes, getBlogPostPath, getCaseStudyPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

// Bump when page content meaningfully changes; a per-build timestamp is a
// meaningless freshness signal to crawlers.
const LAST_CONTENT_UPDATE = new Date("2026-09-24");

function createStaticEntry(
  path: string,
  lastModified: Date = LAST_CONTENT_UPDATE
): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, siteConfig.metadataBase).toString(),
    lastModified,
  };
}

function postDate(post: { publishedAt: string; updatedAt?: string }): Date {
  return new Date(post.updatedAt ?? post.publishedAt);
}

function getCaseStudyEntries(): MetadataRoute.Sitemap {
  return getPublishedCaseStudies().map((caseStudy) =>
    createStaticEntry(getCaseStudyPath(caseStudy.slug))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedBlogPosts();
  // The journal index changes when a post does, not with the rest of the site.
  const newestPost = posts.map(postDate).sort((a, b) => b.getTime() - a.getTime())[0];
  const coreEntries = Object.values(corePublicRoutes).map((path) =>
    path === corePublicRoutes.blog && newestPost
      ? createStaticEntry(path, newestPost)
      : createStaticEntry(path)
  );
  const postEntries = posts.map((post) =>
    createStaticEntry(getBlogPostPath(post.slug), postDate(post))
  );
  const serviceEntries = serviceDetails.map((service) =>
    createStaticEntry(`/services/${service.slug}`)
  );

  return [...coreEntries, ...serviceEntries, ...getCaseStudyEntries(), ...postEntries];
}
