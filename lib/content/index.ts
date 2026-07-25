import type { MarketingPageKey, PublicRoute } from "./types";

import {
  caseStudies,
  navigationContent,
  pageContent,
} from "./site-content";

const brandsBuiltForExclusions = new Set(["ara", "nektr", "elikai"]);

export * from "./types";
export {
  caseStudies,
  homepageTestimonials,
  navigationContent,
  pageContent,
  siteSettings,
} from "./site-content";

export function getPageContent(page: MarketingPageKey) {
  return pageContent[page];
}

export function getPageContentByRoute(route: Extract<PublicRoute, "/" | "/services" | "/contact">) {
  switch (route) {
    case "/":
      return pageContent.home;
    case "/services":
      return pageContent.services;
    case "/contact":
      return pageContent.contact;
  }
}

export function getPublishedCaseStudies() {
  return caseStudies.filter((caseStudy) => caseStudy.status === "published");
}

export function getBrandsBuiltFor() {
  return getPublishedCaseStudies().filter(
    (caseStudy) => !brandsBuiltForExclusions.has(caseStudy.slug)
  );
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getPrimaryNavigation() {
  return navigationContent.primary;
}
