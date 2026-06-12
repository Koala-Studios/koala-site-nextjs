export type ServiceDetail = {
  slug: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  accent: string;
  lede: string;
  deliverables: string[];
  steps: Array<{ number: string; title: string; copy: string }>;
  fit: string[];
  caseSlug: string;
  ctaTitle: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "shopify-design-and-build",
    navLabel: "Shopify design & build",
    seoTitle: "Shopify Design & Development Agency in Toronto",
    seoDescription:
      "Custom Shopify storefront design and theme development for ecommerce brands. Conversion-first design, clean builds, fast pages — from a Toronto studio that ships.",
    eyebrow: "Service — Build",
    headline: "Shopify stores\ndesigned to sell.",
    accent: "sell.",
    lede: "Storefront design, custom theme development, and conversion work for brands on Shopify and Shopify Plus. Designed around your product story, built clean, fast on every device.",
    deliverables: [
      "Store design",
      "Custom themes",
      "Conversion work",
      "Replatforming",
      "Apps & integrations",
      "Performance",
    ],
    steps: [
      {
        number: "01",
        title: "Discover",
        copy: "Offer, audience, and proof — we decide what the store must say before we design it.",
      },
      {
        number: "02",
        title: "Design",
        copy: "A storefront system with a point of view: homepage, product, collection, cart.",
      },
      {
        number: "03",
        title: "Build",
        copy: "A clean custom theme — fast pages, organized sections, easy to edit after launch.",
      },
      {
        number: "04",
        title: "Launch",
        copy: "QA on real devices, tracking wired, redirects mapped, and a tidy handoff.",
      },
    ],
    fit: [
      "Launching a new product line or brand",
      "Replatforming to Shopify from another cart",
      "A store that looks fine but converts badly",
      "A theme the team is afraid to touch",
    ],
    caseSlug: "ara",
    ctaTitle: "Have a store in mind?",
  },
  {
    slug: "meta-ads-management",
    navLabel: "Meta ad management",
    seoTitle: "Meta Ads Management for Ecommerce Brands",
    seoDescription:
      "Creative-first Facebook and Instagram ad management for ecommerce. We design the ads, run the structure, test weekly, and report in plain language.",
    eyebrow: "Service — Traffic",
    headline: "Meta ads with\ncreative that earns it.",
    accent: "creative",
    lede: "Facebook and Instagram campaigns for ecommerce brands. We design the ad creative ourselves, run a clean account structure, and report in plain language — no dashboard theatre.",
    deliverables: [
      "Ad creative",
      "Campaign structure",
      "Weekly testing",
      "Audience strategy",
      "Tracking & CAPI",
      "Plain reports",
    ],
    steps: [
      {
        number: "01",
        title: "Audit",
        copy: "Account, pixel, creative, and landing pages — we find what's actually limiting return.",
      },
      {
        number: "02",
        title: "Creative",
        copy: "Static and motion ads designed in-house, on brand, built to stop the scroll.",
      },
      {
        number: "03",
        title: "Run",
        copy: "Clean campaign structure with weekly creative and audience tests.",
      },
      {
        number: "04",
        title: "Report",
        copy: "What we spent, what it returned, what we're testing next — in plain language.",
      },
    ],
    fit: [
      "Stores doing steady organic sales that need scale",
      "Brands tired of agencies that don't touch creative",
      "Accounts stuck at the same return for months",
      "New launches that need their first paid traction",
    ],
    caseSlug: "magnum",
    ctaTitle: "Ready to scale traffic?",
  },
  {
    slug: "email-marketing",
    navLabel: "Email marketing",
    seoTitle: "Klaviyo Email Marketing Agency for Shopify Brands",
    seoDescription:
      "Email flows and campaigns that turn one-time buyers into repeat customers. Klaviyo strategy, design, and copy for Shopify brands — designed, written, and wired in.",
    eyebrow: "Service — Retention",
    headline: "Email that brings\nbuyers back.",
    accent: "back.",
    lede: "Klaviyo flows and campaigns for Shopify brands — designed, written, and wired into your store. Welcome, abandonment, post-purchase, and win-back working on autopilot.",
    deliverables: [
      "Klaviyo setup",
      "Core flows",
      "Campaign calendar",
      "Email design",
      "Segmentation",
      "Deliverability",
    ],
    steps: [
      {
        number: "01",
        title: "Audit",
        copy: "List health, current flows, and revenue per send — the baseline we'll beat.",
      },
      {
        number: "02",
        title: "Flows",
        copy: "The core five: welcome, browse, cart, post-purchase, win-back — designed and written.",
      },
      {
        number: "03",
        title: "Campaigns",
        copy: "A monthly calendar that sells without burning the list.",
      },
      {
        number: "04",
        title: "Compound",
        copy: "Segment, test, and tune so email becomes your most profitable channel.",
      },
    ],
    fit: [
      "Stores where email is under 15% of revenue",
      "Lists that only ever hear about discounts",
      "Flows set up once and never touched since",
      "Brands that want retention before more ad spend",
    ],
    caseSlug: "allo",
    ctaTitle: "Want your list working?",
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
