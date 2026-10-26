export type ContentStatus = "draft" | "published";

export type PublicRoute =
  | "/"
  | "/work"
  | "/work/[slug]"
  | "/services"
  | "/contact"
  | "/maya"
  | "/blog"
  | "/blog/[slug]";

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
  /** CSS object-position focal point for cropped displays. */
  position?: string;
}

export type CaseStudyLogo = CaseStudyMedia;

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
  heroImage?: CaseStudyMedia;
  cardImage?: CaseStudyMedia;
  /** Editorial photograph (product or campaign) used for arches and covers. */
  coverImage?: CaseStudyMedia;
  logo?: CaseStudyLogo;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedSlug?: string;
  externalUrl?: string;
  seo: SeoContent;
}

/** A run of post text: plain, or bold, italic or linked. */
export type BlogInline =
  | string
  | {
      text: string;
      strong?: boolean;
      em?: boolean;
      href?: string;
    };

/** A paragraph is plain text or a list of inline runs. */
export type BlogParagraph = string | BlogInline[];

export interface BlogSection {
  /** Anchor id for the section heading. */
  id: string;
  /** Shown before the heading when the post is a numbered list. */
  number?: string;
  heading: string;
  paragraphs: BlogParagraph[];
}

export interface BlogPostContent {
  slug: string;
  status: ContentStatus;
  /** Main title; `titleAccent` follows it in the italic serif. */
  title: string;
  titleAccent?: string;
  /** One line for the journal index and the meta description. */
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  intro: BlogParagraph[];
  sections: BlogSection[];
  /** Closing italic note about the studio. */
  signoff?: string;
  seo: SeoContent;
}

export interface BlogIndexContent {
  seo: SeoContent;
  title: string;
  titleAccent: string;
  lede: string;
  backLabel: string;
}
