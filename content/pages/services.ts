import { pageContent } from "@/lib/content";
import { asoPage } from "@/lib/content/aso";
import { mayaContent } from "@/lib/content/maya";

export const servicesContent = {
  ...pageContent.services,
  hero: {
    ...pageContent.services.hero,
    points: ["Shopify design & build", "Meta ad management", "Email marketing"],
  },
  proof: [
    {
      label: "Typical build",
      value: "6-12 weeks",
    },
    {
      label: "Growth retainers",
      value: "Monthly",
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
    },
    {
      number: "02",
      title: "Meta ad management",
      kicker: "Traffic",
      copy: "Full-service Facebook and Instagram advertising. We design the creative, build the campaign structure, test weekly, and report in plain language.",
      deliverables: [
        "Ad creative",
        "Campaign structure",
        "Audience testing",
        "Landing pages",
        "Plain-language reporting",
      ],
      note: "For brands with proven product demand that want traffic they can predict and scale.",
      href: "/services/meta-ads-management",
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
  ],
  /** Listed on /services and in the footer after the four above; the homepage list keeps those four. */
  moreOfferings: [
    {
      number: "05",
      title: asoPage.navLabel,
      kicker: "AI shopping",
      copy: "Shoppers now ask ChatGPT, Gemini and Copilot what to buy. We fix the product information those assistants read from your Shopify store.",
      deliverables: [
        "Product titles & descriptions",
        "Variants & photos",
        "Store policies",
        "AI channel settings",
        "Custom field mapping",
      ],
      note: "For Shopify brands that want AI assistants to get their products right.",
      href: asoPage.path,
      linkLabel: "Full service details",
    },
    {
      number: "06",
      title: "Consulting",
      kicker: "Growth",
      copy: `Ecommerce growth consulting with ${mayaContent.name}, our ${mayaContent.title}. ${mayaContent.intro}`,
      deliverables: [
        "Brand positioning",
        "Website & conversion",
        "Email & retention",
        "Subscriptions",
        "Retail & distribution",
      ],
      note: mayaContent.heroSummary,
      href: "/maya",
      linkLabel: `Meet ${mayaContent.name.split(" ")[0]}`,
      portrait: { src: mayaContent.portrait, alt: `${mayaContent.name}, ${mayaContent.title}` },
    },
  ],
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
  engagement: {
    project: {
      title: "Project",
      copy: "A scoped design and build with a clear start and finish. Strategy, design, development, launch.",
      points: ["Fixed scope", "6-12 weeks", "Launch-ready handoff"],
    },
    retainer: {
      title: "Growth retainer",
      copy: "Ongoing ads and email with monthly creative, testing, and reporting. Cancel any month.",
      points: ["Monthly creative", "Weekly testing", "Plain-language reports"],
    },
  },
  /** Monthly plans and fees from the house pricing guide (newton-brain marketing/pricing-and-estimates). */
  plans: {
    note: "Prices in Canadian dollars, plus tax. Monthly plans run month to month. Ad spend is separate and stays in your own ad account. Store builds and packaging are quoted per project after a free audit.",
    items: [
      {
        name: "Essentials",
        price: "$600",
        was: "$800",
        unit: "a month",
        copy: "We look after your Shopify store: fixes, updates and small improvements every month.",
      },
      {
        name: "Meta ads management",
        price: "$600",
        unit: "a month",
        copy: "We run your Facebook and Instagram ads: the creative, the campaigns, weekly testing and plain-language reports.",
      },
      {
        name: "Growth",
        price: "$1,500",
        unit: "a month",
        copy: "We run your store, your Meta ads and your Klaviyo email together, with a short weekly report and a monthly strategy meeting.",
      },
      {
        name: "Per promo",
        price: "$300",
        unit: "a promotion",
        copy: "One sale or launch planned and set up for you, when you don't need a monthly plan.",
      },
    ],
  },
  faq: [
    {
      question: "Who do you work with?",
      answer:
        "Food, supplement and wellness brands that sell on Shopify, from new launches to brands already in national retail. Brands we have worked with include Unity Supplements, Iron Brothers, Wellth Foods, Nosh Balls and Magnum Nutraceuticals.",
    },
    {
      question: "Where are you based?",
      answer: "Toronto, Canada. We work with brands across Canada and the United States.",
    },
    {
      question: "What does it cost?",
      answer:
        "Monthly plans start at $600: Essentials (Shopify upkeep) is normally $800 and $600 for you, Meta ads management is $600, and Growth, which runs your store, Meta ads and email together, is $1,500. A single promotion is $300. Prices are in Canadian dollars, plus tax, month to month. Store builds and packaging are quoted after a free audit.",
    },
    {
      question: "How fast can you start?",
      answer:
        "Monthly plans start as soon as you give us the go-ahead, with a first update by the end of week one. A full Shopify design and build typically takes 6 to 12 weeks.",
    },
    {
      question: "Is ad spend included?",
      answer:
        "No. Your ad budget is paid directly to Meta or Google from your own account. We agree the budget with you once we have seen what you spend today.",
    },
  ],
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
