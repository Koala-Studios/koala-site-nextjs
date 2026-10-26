import type { BlogParagraph, BlogPostContent, CaseStudyContent, MarketingPageKey, PublicRoute } from "./types";

import { blogPosts } from "./blog";

import {
  caseStudies,
  navigationContent,
  pageContent,
} from "./site-content";

const brandsBuiltForExclusions = new Set(["ara", "nektr"]);

export * from "./types";
export { blogIndexContent, blogPosts } from "./blog";
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

/** Published journal posts, newest first. */
export function getPublishedBlogPosts() {
  return blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug && post.status === "published");
}

export function getBlogPostTitle(post: BlogPostContent) {
  return post.titleAccent ? `${post.title} ${post.titleAccent}` : post.title;
}

const postDateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

/** "October 26, 2026" from an ISO date, independent of the server time zone. */
export function formatPostDate(isoDate: string) {
  return postDateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

function paragraphText(paragraph: BlogParagraph) {
  return typeof paragraph === "string"
    ? paragraph
    : paragraph.map((run) => (typeof run === "string" ? run : run.text)).join("");
}

/** Whole minutes at 220 words a minute, never less than one. */
export function getReadingMinutes(post: BlogPostContent) {
  const text = [
    ...post.intro,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ]
    .map(paragraphText)
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}
