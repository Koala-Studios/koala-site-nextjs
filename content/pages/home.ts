import { pageContent } from "@/lib/content";

export const homeContent = {
  ...pageContent.home,
  hero: {
    ...pageContent.home.hero,
    eyebrow: "Koala Studios",
    lead: "Web experiences",
    emphasis: "that move",
    tail: "",
    summary:
      "Koala Studios works with ecommerce teams on storefront redesigns, Shopify development, and support when the site needs to look better, read faster, and hold up as the brand grows.",
    ctas: [
      { label: "View work", href: "/work" },
      { label: "Start a conversation", href: "/contact" },
    ],
  },
  supportAreas: [
    {
      title: "Storefront redesigns",
      copy:
        "Redesign the homepage, product pages, and key landing pages so the brand reads clearly and the path to purchase feels tighter.",
    },
    {
      title: "Shopify development",
      copy:
        "Build sections, templates, merchandising blocks, and custom functionality that fit the way the store actually runs.",
    },
    {
      title: "Ongoing support",
      copy:
        "Handle launches, fixes, seasonal updates, and backlog work with direct senior support instead of a slow agency loop.",
    },
  ],
  capabilities: [
    {
      title: "Homepage and campaign pages",
      copy:
        "Rebuild the top of the funnel so the headline, merchandising, and first CTA work together instead of fighting each other.",
      imageSrc: "/images/project/magnum/magnum_desktop_gym.png",
      imageAlt: "Magnum homepage redesign preview",
      detail: "Brand hierarchy, product framing, and first-click clarity.",
    },
    {
      title: "Product and collection pages",
      copy:
        "Tighten product education, collection browsing, and mobile purchase flow so shoppers can make decisions with less friction.",
      imageSrc: "/images/project/ara/ara_product_desktop.png",
      imageAlt: "Ara product page preview",
      detail: "Sharper product stories, cleaner decision paths, and better mobile flow.",
    },
    {
      title: "Theme development",
      copy:
        "Build or extend Shopify themes with reusable sections and cleaner frontend patterns your team can actually keep working with.",
      imageSrc: "/images/project/stlth/stlth-shop-new.png",
      imageAlt: "Stlth storefront theme preview",
      detail: "Reusable sections, custom layouts, and durable frontend code.",
    },
    {
      title: "Launch support and ongoing updates",
      copy:
        "Support QA, rollout polish, and the steady stream of fixes and improvements that keep a storefront from sliding backward after launch.",
      imageSrc: "/images/project/allo/allo-shop-page.png",
      imageAlt: "Allo storefront support preview",
      detail: "Launch readiness, release support, and a direct senior working loop.",
    },
  ],
  processSteps: [
    {
      title: "Show us the current storefront",
      copy:
        "Send the live URL, explain what feels weak, and point out the pages or flows that are costing confidence or conversion.",
    },
    {
      title: "We define the right next move",
      copy:
        "We sort the problem into a focused redesign, a build sprint, or ongoing support so the work starts with a clean scope.",
    },
    {
      title: "We design, build, and refine",
      copy:
        "You work directly with the people making the design decisions and shipping the implementation, without the usual agency relay race.",
    },
  ],
  testimonialSection: {
    eyebrow: "What we keep hearing",
    title: "The usual reason a team reaches out.",
    summary:
      "Most enquiries start with a storefront problem that has been hanging around for too long. These are the patterns that come up again and again.",
  },
  testimonials: [
    {
      quote:
        "The brand feels strong everywhere else, but the storefront still looks dated the moment someone lands.",
      author: "",
      role: "",
    },
    {
      quote:
        "The team knows what needs to change, but the current theme is too messy to keep patching with confidence.",
      author: "",
      role: "",
    },
    {
      quote:
        "Every launch, fix, or campaign update takes more work than it should because the site has no clean system behind it.",
      author: "",
      role: "",
    },
  ],
  closingCta: {
    eyebrow: "Start with the problem",
    title: "Tell us what is not working on the site.",
    summary:
      "Send the current URL, what feels off, and what needs to improve. We will reply with the clearest next step.",
  },
} as const;

export type HomeContent = typeof homeContent;
