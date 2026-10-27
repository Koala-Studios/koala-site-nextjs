import { pageContent } from "@/lib/content";

export const servicesContent = {
  ...pageContent.services,
  hero: {
    ...pageContent.services.hero,
    points: ["Shopify design & build", "Meta ad management", "Email marketing"],
  },
  proof: [
    {
      label: "Plans from",
      value: "600 a month",
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
