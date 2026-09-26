import type { CaseStudyContent, MarketingPageKey, PublicRoute } from "./types";

import {
  caseStudies,
  navigationContent,
  pageContent,
} from "./site-content";

const brandsBuiltForExclusions = new Set(["ara", "nektr"]);

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

/** Leads every work showcase, ahead of the newest-first order. */
export const leadCaseStudySlug = "mercato-di-bellina";

export function getPublishedCaseStudies() {
  // The source catalog is appended in addition order; show newest additions first.
  const published = caseStudies.filter((caseStudy) => caseStudy.status === "published").reverse();
  return [
    ...published.filter((caseStudy) => caseStudy.slug === leadCaseStudySlug),
    ...published.filter((caseStudy) => caseStudy.slug !== leadCaseStudySlug),
  ];
}

export function getBrandsBuiltFor() {
  return getPublishedCaseStudies().filter(
    (caseStudy) => !brandsBuiltForExclusions.has(caseStudy.slug)
  );
}

/** Best editorial image for a case study, whether it is a site screenshot, and its crop focal point. */
export function getCaseStudyCover(caseStudy: CaseStudyContent) {
  const image = caseStudy.coverImage ?? caseStudy.cardImage ?? caseStudy.media[0];
  const isScreenshot = !caseStudy.coverImage;
  return { image, isScreenshot, position: image?.position ?? (isScreenshot ? "top center" : "center") };
}

export function getCaseStudiesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => caseStudies.find((caseStudy) => caseStudy.slug === slug))
    .filter((caseStudy): caseStudy is CaseStudyContent => caseStudy?.status === "published");
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getPrimaryNavigation() {
  return navigationContent.primary;
}
