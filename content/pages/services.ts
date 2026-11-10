import type { PlatformId } from "@/components/brands/PlatformLogos";
import type { IconName } from "@/components/system/Icons";
import { pageContent } from "@/lib/content";

export type ServiceOffering = {
  number: string;
  title: string;
  kicker: string;
  copy: string;
  deliverables: string[];
  note: string;
  href: string;
  /** Link text on /services; defaults to "Full service details". */
  linkLabel?: string;
  platforms?: PlatformId[];
  /** Icon on the homepage list when the service has no line drawing of its own. */
  icon?: IconName;
  /** A photo instead of the line drawing, for services without one. */
  image?: { src: string; alt: string };
};

export const servicesContent = {
  ...pageContent.services,
  hero: {
    ...pageContent.services.hero,
    points: ["Shopify design & build", "Ads & ad creative", "Email marketing"],
  },
  proof: [
    {
      label: "Start with",
      value: "A free audit",
    },
    {
      label: "Contract",
      value: "Month to month",
    },
  ],
  offerings: [
    {
      number: "01",
      title: "Shopify design & build",
      kicker: "Build",
      copy: "Storefront design, custom theme build, and conversion work for brands on Shopify. Designed around your product story, built clean, and fast on every device.",
      deliverables: [
        "Store design",
        "Custom themes",
        "Conversion work",
        "Migrations",
        "Apps & integrations",
      ],
      note: "For brands launching, replatforming, or stuck with a store that looks fine and converts badly.",
      href: "/services/shopify-design-and-build",
      platforms: ["shopify"],
    },
    {
      number: "02",
      title: "Ads & ad creative",
      kicker: "Traffic",
      copy: "Meta and Google ads, run for you. We make the ad creative ourselves: image and video ads for Facebook, Instagram, Google and TikTok.",
      deliverables: [
        "Ad creative",
        "Meta ads: Facebook & Instagram",
        "Google Ads",
        "TikTok ad creative",
        "Weekly tests, plain reports",
      ],
      note: "For brands with products people want that need more of the right traffic.",
      href: "/services/meta-ads-management",
      platforms: ["meta", "instagram", "facebook", "googleads", "tiktok"],
      image: { src: "/images/services/ads-creative.webp", alt: "Three printed IRONVOLT ads taped to a concrete wall" },
    },
    {
      number: "03",
      title: "Email marketing",
      kicker: "Retention",
      copy: "Klaviyo flows and campaigns designed and written to sound like your brand. Welcome, abandoned cart, post-purchase, and win-back, wired into your store and measured.",
      deliverables: [
        "Klaviyo setup",
        "Core flows",
        "Campaign calendar",
        "Segmentation",
        "Design & copy",
      ],
      note: "For brands getting orders but not repeat orders, or where email is an untapped channel.",
      href: "/services/email-marketing",
    },
    {
      number: "04",
      title: "SEO & Google Maps",
      kicker: "Search",
      copy: "Search basics done properly on your Shopify store, and a Google Business Profile that puts your hours, photos and reviews on Google Search and Maps.",
      deliverables: [
        "Technical SEO",
        "Product & collection pages",
        "Google Business Profile",
        "Google Maps listing",
        "Search Console",
      ],
      note: "Often the small project that starts a bigger one.",
      href: "/contact?interest=seo",
      linkLabel: "Ask about SEO",
      icon: "eye",
      platforms: ["google", "googlemaps"],
      image: { src: "/images/services/local-shop.webp", alt: "A small nutrition shop on a quiet Toronto street in the morning" },
    },
    {
      number: "05",
      title: "Agentic Search Optimization",
      kicker: "AI shopping",
      copy: "Shoppers now ask ChatGPT, Gemini and Copilot what to buy. We fix the product information those assistants read from your Shopify store.",
      deliverables: [
        "Product titles & descriptions",
        "Variants & photos",
        "Store policies",
        "AI channel settings",
        "Free AI shopping check",
      ],
      note: "For Shopify brands that want AI assistants to get their products right.",
      href: "/services/agentic-search-optimization",
      icon: "cart",
      image: { src: "/images/aso/aso-lineup.webp", alt: "Five IRONVOLT ISO Whey flavours in a row" },
    },
    {
      number: "06",
      title: "Packaging & 3D renders",
      kicker: "Product",
      copy: "Label and packaging design paired with photoreal 3D product renders. Shelf-ready artwork and store-ready hero visuals, designed in-house, no photoshoot required.",
      deliverables: [
        "Label design",
        "Packaging artwork",
        "3D modeling",
        "Photoreal renders",
        "Print-ready files",
      ],
      note: "For brands launching new products, refreshing packaging, or needing premium product visuals before a photoshoot is possible.",
      href: "/services/packaging-and-3d-renders",
    },
  ] as ServiceOffering[],
  delivery: [
    {
      number: "01",
      title: "Discover",
      copy: "We pin down the offer, the audience, and the proof before anything gets designed.",
    },
    {
      number: "02",
      title: "Design",
      copy: "A storefront and creative system with a point of view, built around hierarchy, not decoration.",
    },
    {
      number: "03",
      title: "Build",
      copy: "Clean, fast Shopify work that your team can run without calling us every week.",
    },
    {
      number: "04",
      title: "Grow",
      copy: "Meta ads and email flows compound the build. One team, one story, every channel.",
    },
  ],
  projects:
    "Need a one-off build instead? We also design and build Shopify stores, packaging and 3D renders as fixed-scope projects.",
  fitNotes: [
    "Ecommerce brands that need a clearer message",
    "Teams that want senior work without a heavy process",
    "Projects where design, traffic, and retention all matter",
  ],
  cta: {
    eyebrow: "Next step",
    title: "Tell us what you're selling.",
    summary:
      "Send the URL and the goal. We'll reply with the clearest next step we can offer.",
  },
};

export type ServicesContent = typeof servicesContent;
