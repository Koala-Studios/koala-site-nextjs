import { pageContent } from "@/lib/content";

export const servicesContent = {
  ...pageContent.services,
  hero: {
    ...pageContent.services.hero,
    points: [
      "Shopify design & build",
      "Meta ad management",
      "Email marketing",
    ],
  },
  proof: [
    {
      label: "Core offers",
      value: "3",
    },
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
      copy: "Klaviyo flows and campaigns designed and written to sound like your brand. Welcome, abandoned cart, post-purchase, win-back — wired into your store and measured.",
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
      copy: "A storefront and creative system with a point of view — built around hierarchy, not decoration.",
    },
    {
      number: "03",
      title: "Build",
      copy: "Clean, fast Shopify work that your team can run without calling us every week.",
    },
    {
      number: "04",
      title: "Grow",
      copy: "Meta ads and email flows compound the build — one team, one story, every channel.",
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
  fitNotes: [
    "Ecommerce brands that need a clearer message",
    "Teams that want senior work without a heavy process",
    "Projects where design, traffic, and retention all matter",
  ],
  faq: [
    {
      question: "How long does a Shopify build take?",
      answer:
        "Most storefront projects run 6 to 12 weeks from kickoff to launch, depending on scope. Smaller conversion or redesign sprints can land in 3 to 4 weeks.",
    },
    {
      question: "Do you only work with Shopify?",
      answer:
        "Stores, yes — we design and build on Shopify and Shopify Plus. Meta ad management and email marketing work with whatever stack your store already runs on.",
    },
    {
      question: "Can you run ads or email for a store you didn't build?",
      answer:
        "Yes. We start with a short audit of your store, creative, and tracking, then take over campaigns or flows with a clear first-90-days plan.",
    },
    {
      question: "What does a project cost?",
      answer:
        "Builds are scoped per project and growth work runs as a monthly retainer. Share a budget range in the contact form and we'll tell you honestly what fits.",
    },
    {
      question: "Where are you based?",
      answer:
        "Toronto, Canada. We work remote-first with ecommerce brands across North America.",
    },
    {
      question: "What happens after I reach out?",
      answer:
        "A real person reads your note, replies within two business days, and books a short call to align on scope and the clearest next step.",
    },
  ],
  cta: {
    eyebrow: "Next step",
    title: "Tell us what you're selling.",
    summary:
      "Send the URL and the goal. We'll reply with the clearest next step we can offer.",
  },
};

export type ServicesContent = typeof servicesContent;
