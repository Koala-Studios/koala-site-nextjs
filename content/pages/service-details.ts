import { agenticAuditOffer } from "@/lib/content/audit";

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
  caseSlug?: string;
  showWork?: boolean;
  contactHref?: string;
  contactLabel?: string;
  showAudit?: boolean;
  introOffer?: { title: string; summary: string; qualification: string };
  ctaTitle: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "shopify-design-and-build",
    navLabel: "Shopify design & build",
    seoTitle: "Shopify Design & Development Agency in Toronto",
    seoDescription:
      "Custom Shopify storefront design and theme development for ecommerce brands. Conversion-first design, clean builds, and fast pages, from a Toronto studio that ships.",
    eyebrow: "Build",
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
        copy: "Offer, audience, and proof. We decide what the store needs to say before we design it.",
      },
      {
        number: "02",
        title: "Design",
        copy: "A storefront system with a point of view: homepage, product, collection, cart.",
      },
      {
        number: "03",
        title: "Build",
        copy: "A clean custom theme with fast pages, organized sections, and easy edits after launch.",
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
    eyebrow: "Traffic",
    headline: "Meta ads with\ncreative that earns it.",
    accent: "creative",
    lede: "Facebook and Instagram campaigns for ecommerce brands. We design the ad creative ourselves, run a clean account structure, and report in plain language, no dashboard theatre.",
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
        copy: "Account, pixel, creative, and landing pages. We find what's actually limiting return.",
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
        copy: "What we spent, what it returned, and what we're testing next, in plain language.",
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
      "Email flows and campaigns that turn one-time buyers into repeat customers. Klaviyo strategy, design, and copy for Shopify brands, designed, written, and wired in.",
    eyebrow: "Retention",
    headline: "Email that brings\nbuyers back.",
    accent: "back.",
    lede: "Klaviyo flows and campaigns for Shopify brands, designed, written, and wired into your store. Welcome, abandonment, post-purchase, and win-back working on autopilot.",
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
        copy: "List health, current flows, and revenue per send. That's the baseline we'll beat.",
      },
      {
        number: "02",
        title: "Flows",
        copy: "The core five: welcome, browse, cart, post-purchase, and win-back, designed and written.",
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
  {
    slug: "packaging-and-3d-renders",
    navLabel: "Packaging & 3D renders",
    seoTitle: "Packaging, Label Design & 3D Product Renders",
    seoDescription:
      "Packaging and label design plus photoreal 3D product renders for ecommerce brands. Shelf-ready artwork and store-ready hero visuals, designed in-house from a Toronto studio.",
    eyebrow: "Product",
    headline: "Packaging and renders\nthat sell the shelf.",
    accent: "shelf.",
    lede: "Label and packaging design paired with photoreal 3D product renders. Artwork that wins the shelf and hero visuals that make your storefront and ads look premium, no photoshoot required.",
    deliverables: [
      "Label design",
      "Packaging artwork",
      "3D modeling",
      "Photoreal renders",
      "Dielines & print files",
      "Render variations",
    ],
    steps: [
      {
        number: "01",
        title: "Brief",
        copy: "Product, format, and the story the pack has to tell on a crowded shelf.",
      },
      {
        number: "02",
        title: "Design",
        copy: "Label and packaging artwork built around hierarchy, legibility, and brand.",
      },
      {
        number: "03",
        title: "Render",
        copy: "Photoreal 3D models lit and staged for the store, ads, and email.",
      },
      {
        number: "04",
        title: "Deliver",
        copy: "Print-ready dielines plus high-res render sets in every size you need.",
      },
    ],
    fit: [
      "Launching a new product or refreshing tired packaging",
      "Selling a product you can't easily photograph yet",
      "Storefronts that need premium hero and product visuals",
      "Ad and email creative that needs clean product shots",
    ],
    caseSlug: "nektr",
    ctaTitle: "Have a product to show off?",
  },
  {
    slug: "agentic-search-optimization",
    navLabel: "Agentic Search Optimization",
    seoTitle: "Agentic Search Optimization for Ecommerce",
    seoDescription: "Product information, store readiness and marketing strategy for ecommerce brands exploring AI shopping and agentic platforms such as ChatGPT.",
    eyebrow: "Discovery",
    headline: "Make your products\neasier to understand.",
    accent: "understand.",
    lede: "When shoppers use AI to research what to buy, clear product information matters. Koala Studios offers Agentic Search Optimization for ecommerce: reviewing your store’s product facts and buying journey, then prioritizing practical improvements. We also plan marketing for agentic platforms such as ChatGPT around the opportunities available to your brand.",
    deliverables: [
      "Product descriptions, variants and buying information review",
      "Product data and structured information checks",
      "Shipping, returns and availability clarity",
      "Store readiness priorities and agreed improvements",
      "Agentic-platform messaging and landing-page strategy",
      "Measurement plan tied to enquiries and purchases",
    ],
    steps: [
      { number: "01", title: "Review", copy: "We start with your store URL, audience and current product information. We identify missing or conflicting buying facts." },
      { number: "02", title: "Prioritize", copy: "You get a practical improvement plan. We agree the scope, responsibilities and measurement before implementation." },
      { number: "03", title: "Improve", copy: "We clarify agreed product and policy content, strengthen supporting data and check the path from discovery to purchase." },
      { number: "04", title: "Measure", copy: "We review the signals available to your store. Platform visibility, ad access and results vary; no placement, ranking or sales outcome is guaranteed." },
    ],
    fit: [
      "Shopify brands with an established product range",
      "Stores where product details or buying policies need clarity",
      "Teams exploring AI shopping alongside existing acquisition channels",
      "Brands that want a scoped plan before committing to a new channel",
    ],
    showWork: false,
    showAudit: false,
    introOffer: agenticAuditOffer,
    contactHref: agenticAuditOffer.href,
    contactLabel: agenticAuditOffer.cta,
    ctaTitle: "How ready is your store?",
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
