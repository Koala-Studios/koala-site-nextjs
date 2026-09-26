import { auditOffer } from "./audit";
import { mayaContent } from "./maya";
import { navigationContent } from "./site-content";

export type PageContext = {
  ctaHref: string;
  ctaLabel: string;
  contactHref: string;
  email: string;
  /** Pages that end on their own dark call to action skip the footer headline. */
  footerLead: boolean;
};

const defaultContext: PageContext = {
  ctaHref: navigationContent.featuredCta.href,
  ctaLabel: navigationContent.featuredCta.label,
  contactHref: "/contact",
  email: "hello@koalastudios.ca",
  footerLead: true,
};

const mayaContext: PageContext = {
  ctaHref: auditOffer.mayaHref,
  ctaLabel: "Free growth audit",
  contactHref: auditOffer.mayaHref,
  email: mayaContent.email,
  footerLead: false,
};

/** Header, footer and menu actions for the current route. */
export function getPageContext(pathname: string | null): PageContext {
  if (pathname === "/maya" || pathname?.startsWith("/maya/")) return mayaContext;
  if (pathname?.startsWith("/contact")) return { ...defaultContext, footerLead: false };
  return defaultContext;
}
