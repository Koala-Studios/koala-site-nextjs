import type { MarketingPageKey, PublicRoute } from "./types";

import {
  caseStudies,
  navigationContent,
  pageContent,
} from "./site-content";

export * from "./types";
export { caseStudies, navigationContent, pageContent, siteSettings } from "./site-content";

export function getPageContent(page: MarketingPageKey) {
  return pageContent[page];
}

export function getPageContentByRoute(route: Extract<PublicRoute, "/" | "/services" | "/about" | "/contact">) {
  switch (route) {
    case "/":
      return pageContent.home;
    case "/services":
      return pageContent.services;
    case "/about":
      return pageContent.about;
    case "/contact":
      return pageContent.contact;
  }
}

export function getPublishedCaseStudies() {
  return caseStudies.filter((caseStudy) => caseStudy.status === "published");
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getPrimaryNavigation() {
  return navigationContent.primary;
}
