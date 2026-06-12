import { siteConfig } from "@/lib/site-config";

export const corePublicRoutes = {
  home: "/",
  workIndex: "/work",
  services: "/services",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export const draftOrRetiredRoutes = {
  admin: "/admin",
  blogs: "/blogs",
  contactSuccess: "/contact/success",
  internal: "/internal",
  legacyHome: "/home",
  process: "/process",
  projects: "/projects",
} as const;

export type CorePublicRouteKey = keyof typeof corePublicRoutes;

export function getCaseStudyPath(slug: string): string {
  return `${corePublicRoutes.workIndex}/${slug}`;
}

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalizedPath}`;
}

export const routeGroups = {
  public: Object.values(corePublicRoutes),
  retiredOrProtected: Object.values(draftOrRetiredRoutes),
} as const;
