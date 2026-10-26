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

/** Before/after illustrations drawn by components/blog/LeakFigure. */
export type BlogFigureKey =
  | "shipping"
  | "soldOut"
  | "deadLink"
  | "samplePack"
  | "perMonth"
  | "summaryLine"
  | "reorderEmail"
  | "guideToProduct";

/** Where a figure's facts come from. Every chart and stat names one. */
export interface BlogSource {
  label: string;
  href?: string;
}

/** A number shown on a chart: "$" before, "%" after, and how many decimals. */
export interface BlogUnit {
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/** A picture: a photo, an ImageGen render or a screenshot, stored under public/images/blog/. */
export interface BlogImageFigure {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
}

/** One series compared across categories, as horizontal bars. */
export interface BlogBarChart {
  kind: "bar";
  title: string;
  subtitle?: string;
  unit?: BlogUnit;
  /** Bars marked highlight carry the colour; the rest stay quiet. */
  rows: { label: string; value: number; highlight?: boolean }[];
  source: BlogSource;
}

/** One or two series over time, as lines on one axis. */
export interface BlogLineChart {
  kind: "line";
  title: string;
  subtitle?: string;
  unit?: BlogUnit;
  /** Labels along the bottom, one per value. */
  x: string[];
  series: { name: string; values: number[] }[];
  source: BlogSource;
}

/** Two to four headline numbers in a row. */
export interface BlogStatsFigure {
  kind: "stats";
  items: { value: string; label: string }[];
  source: BlogSource;
}

export type BlogMedia = BlogImageFigure | BlogBarChart | BlogLineChart | BlogStatsFigure;

export interface BlogSection {
  /** Anchor id for the section heading. */
  id: string;
  /** Shown before the heading when the post is a numbered list. */
  number?: string;
  /** The closing section: big caps heading, no figures. */
  closing?: boolean;
  /** Where on the store this happens, e.g. "Product page". */
  area?: string;
  /** Rough time the fix takes. */
  fixTime?: string;
  heading: string;
  /** What we saw. */
  paragraphs: BlogParagraph[];
  figure?: BlogFigureKey;
  /** Charts, numbers and pictures, shown after the paragraphs. */
  media?: BlogMedia[];
  /** Why it matters. */
  why?: BlogParagraph[];
  /** What to do, in order. */
  steps?: BlogParagraph[];
  /** One test a reader can run on their own store. */
  check?: string;
}

/** A stage of the buyer's path on the post's opening map. */
export interface BlogMapStage {
  label: string;
  note: string;
  /** Section ids of the leaks at this stage. */
  sectionIds: string[];
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
  /** Word before each section number, e.g. "Leak" gives "Leak 1". */
  sectionLabel?: string;
  /** Headings over each section's why and steps. */
  whyHeading?: string;
  stepsHeading?: string;
  /** Cover image for the index, the post's opening and link previews. */
  cover?: { src: string; alt: string; width: number; height: number };
  intro: BlogParagraph[];
  map?: { title: string; stages: BlogMapStage[] };
  /** The few fixes to do first, shown after the intro. */
  takeaways?: { title: string; items: BlogParagraph[] };
  sections: BlogSection[];
  checklist?: { title: string; note: string; items: string[] };
  cta?: { title: string; text: string; label: string; href: string };
  /** Closing italic note about the studio. */
  signoff?: string;
  /** Every study, report or data set the post draws on. */
  sources?: BlogSource[];
  seo: SeoContent;
}

export interface BlogIndexContent {
  seo: SeoContent;
  title: string;
  titleAccent: string;
  lede: string;
  backLabel: string;
}
