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
  faq: Array<{ question: string; answer: string }>;
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
    faq: [
      {
        question: "How long does a Shopify build take?",
        answer:
          "Most storefront builds run 6 to 12 weeks from kickoff to launch. A focused redesign or conversion sprint can ship in 3 to 4 weeks.",
      },
      {
        question: "Do you work on Shopify Plus?",
        answer:
          "Yes. We design and build on both Shopify and Shopify Plus, including custom themes, app integrations, and checkout extensions on Plus.",
      },
      {
        question: "Can you replatform our store to Shopify?",
        answer:
          "We migrate from WooCommerce, Magento, BigCommerce, and custom carts. Products, content, and SEO move with redirects mapped so rankings hold.",
      },
      {
        question: "Can our team edit the store after launch?",
        answer:
          "Yes. We build organized, clearly named theme sections and hand off with a short walkthrough so your team can update pages without touching code.",
      },
    ],
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
    faq: [
      {
        question: "Do you make the ad creative or just run the account?",
        answer:
          "Both. We design the static and motion creative in-house, on brand, then build and run the campaign structure and testing around it.",
      },
      {
        question: "Is there a minimum ad spend?",
        answer:
          "We work best with brands already spending or ready to commit a steady monthly budget. Share your range in the contact form and we'll tell you honestly if it's a fit.",
      },
      {
        question: "Can you manage ads for a store you didn't build?",
        answer:
          "Yes. We start with an audit of your account, pixel, creative, and landing pages, then take over with a clear first-90-days plan.",
      },
      {
        question: "How do you report on performance?",
        answer:
          "Plain-language monthly reporting: what we spent, what it returned, and what we're testing next. No dashboard theatre.",
      },
    ],
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
    faq: [
      {
        question: "Which email platform do you use?",
        answer:
          "We build on Klaviyo for Shopify brands, so the flows, segments, and campaigns all live where your store and customer data already do.",
      },
      {
        question: "Which flows do you set up first?",
        answer:
          "The core five: welcome, browse abandonment, abandoned cart, post-purchase, and win-back, designed, written, and wired into your store.",
      },
      {
        question: "Can you take over an existing Klaviyo account?",
        answer:
          "Yes. We audit list health, current flows, and revenue per send, then rebuild and expand campaigns from that baseline.",
      },
      {
        question: "How is email marketing priced?",
        answer:
          "Email runs as a monthly retainer alongside campaigns and testing. Share your list size and goals in the contact form for a scoped quote.",
      },
    ],
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
    faq: [
      {
        question: "Do you design the packaging and the renders, or just one?",
        answer:
          "Both, and they're better together. We design the label and packaging artwork, then build photoreal 3D renders from the same files so your pack and your store visuals always match.",
      },
      {
        question: "Can you render a product before it's manufactured?",
        answer:
          "Yes. That's one of the biggest reasons to use 3D. We can model and render packaging from your dielines and artwork before a single unit is printed, so you can launch and market early.",
      },
      {
        question: "Do you provide print-ready files?",
        answer:
          "We hand off print-ready dielines and packaging files set up to your printer's specs, alongside high-resolution renders for web, ads, and email.",
      },
      {
        question: "Can renders replace product photography?",
        answer:
          "For packaged products, often yes. 3D renders give you consistent lighting, infinite angles, and easy variations without a photoshoot. We'll tell you honestly when a real photo is the better call.",
      },
    ],
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
