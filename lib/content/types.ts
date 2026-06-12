export type ContentStatus = "draft" | "published";

export type PublicRoute =
  | "/"
  | "/work"
  | "/work/[slug]"
  | "/services"
  | "/contact";

export type MarketingPageKey = "home" | "services" | "contact";

export interface SeoContent {
  title: string;
  description: string;
  ogImage?: string;
  canonicalPath?: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  url: string;
  locale: string;
  defaultSeo: SeoContent;
  social: {
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
  cta: {
    primaryLabel: string;
    primaryHref: PublicRoute | string;
    secondaryLabel: string;
    secondaryHref: PublicRoute | string;
  };
}

export interface NavItem {
  label: string;
  href: PublicRoute | string;
}

export interface NavigationContent {
  primary: NavItem[];
  footer: NavItem[];
  featuredCta: NavItem;
}

export interface PageContent {
  route: PublicRoute;
  status: ContentStatus;
  seo: SeoContent;
  hero: {
    eyebrow?: string;
    headline: string;
    summary: string;
    ctas: NavItem[];
  };
  body: {
    sections: Array<{
      id: string;
      heading: string;
      copy: string;
    }>;
  };
}

export interface CaseStudyMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface TestimonialContent {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudyContent {
  slug: string;
  status: ContentStatus;
  title: string;
  client: string;
  sector: string;
  category: "Shopify" | "Design" | "Development" | "Lifestyle";
  tags: string[];
  featured?: boolean;
  headline: string;
  intro: string;
  services: string[];
  challenge: string;
  approach: string;
  deliverables: string[];
  outcomes: string[];
  metrics: CaseStudyMetric[];
  media: CaseStudyMedia[];
  cardImage?: CaseStudyMedia;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedSlug?: string;
  externalUrl?: string;
  seo: SeoContent;
}
