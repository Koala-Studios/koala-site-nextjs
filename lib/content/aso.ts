/**
 * Agentic Search Optimization at /services/agentic-search-optimization.
 * Every platform fact below comes from the two help pages in `sources`, read
 * on 2026-11-10. Re-read them before changing a fact; never add a promise of
 * placement, ranking or sales.
 */
export const asoSources = {
  shopify: {
    label: "Shopify Help Center",
    href: "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts",
  },
  shopifyCatalog: {
    label: "Shopify Help Center",
    href: "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/products",
  },
  shopifyChatgpt: {
    label: "Shopify Help Center",
    href: "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/chatgpt",
  },
  openai: {
    label: "OpenAI Help Center",
    href: "https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search",
  },
  checked: "10 November 2026",
} as const;

export const asoPage = {
  slug: "agentic-search-optimization",
  path: "/services/agentic-search-optimization",
  navLabel: "Agentic Search Optimization",
  seoTitle: "Agentic Search Optimization for Shopify Stores",
  seoDescription:
    "Shoppers ask ChatGPT, Gemini and Copilot what to buy. We fix the product information those AI assistants read from your Shopify store.",
  cta: "Start a project",
  ctaHref: "/contact",

  hero: {
    title: "Sell where shoppers",
    accent: "ask\u00a0AI.",
    lede: "Shoppers now ask ChatGPT, Gemini and Copilot what to buy. We fix the product information those assistants read from your Shopify store, so they can describe and recommend your products accurately.",
  },

  why: {
    title: "AI already reads",
    accent: "your store.",
    facts: [
      {
        value: "On by default",
        copy: "Shopify's agentic storefronts are on for eligible stores, sending products to ChatGPT, Gemini, Copilot and Meta.",
        source: "shopify",
      },
      {
        value: "Not ads",
        copy: "ChatGPT picks its product results itself. They are not ads and not shaped by partnerships.",
        source: "openai",
      },
      {
        value: "Data decides",
        copy: "ChatGPT ranks sellers on availability, price, quality and whether they make or mainly sell the product.",
        source: "openai",
      },
    ],
  },

  reads: {
    title: "What AI reads",
    accent: "about you.",
    copy: "Shopify Catalog sends each product's title, description, options, images, price and availability. To sell through ChatGPT, your terms, privacy and returns policies also have to be filled in.",
  },

  fixes: {
    title: "What we",
    accent: "fix.",
    items: [
      "Titles that say what it is: product, flavour, size",
      "Descriptions with the facts shoppers ask about",
      "Flavours and sizes as real variants, not separate products",
      "A photo for every variant",
      "Shipping, returns and policies filled in and consistent",
      "AI channel settings checked and custom fields mapped",
    ],
  },

  steps: {
    title: "How it",
    accent: "works.",
    items: [
      { title: "We check", copy: "We read your products the way AI channels get them and rank the gaps." },
      { title: "We fix it", copy: "Titles, descriptions, variants, photos and policies, edited in your Shopify admin." },
      { title: "You keep it", copy: "No new app. Your products stay yours to edit, and Shopify keeps AI channels up to date." },
    ],
  },

  faq: {
    title: "Fair",
    accent: "questions.",
    items: [
      {
        q: "Can you guarantee ChatGPT picks us?",
        a: "No. ChatGPT picks its results itself and nobody can promise a spot. We make sure what it reads about you is complete and correct.",
      },
      {
        q: "We sell from Canada. Does this apply?",
        a: "Yes, with one rule: ChatGPT's Shopify channel needs your store to sell to US customers. It can be based anywhere.",
      },
      {
        q: "Is this the same as SEO?",
        a: "Related, not the same. SEO helps AI that reads the open web. Shopify Catalog sends your product data to AI channels directly. We cover both.",
      },
      {
        q: "Do we need Shopify?",
        a: "It's where we do this work. Stores on other platforms can reach the same AI channels through Shopify's Agentic plan, so ask us.",
      },
    ],
  },

  closing: {
    title: "Tell us what",
    accent: "you're selling.",
    copy: "Send us your store. We'll show you what AI channels read about your products today and the fixes worth making first.",
  },
} as const;

/** The demo product record shown on the page. IRONVOLT is Koala's invented example brand. */
export const asoExample = {
  before: [
    { field: "Title", value: "ISO WHEY - CHOC NEW!!" },
    { field: "Description", value: "The best protein you'll ever try." },
    { field: "Options", value: "Each flavour listed as its own product" },
    { field: "Returns", value: "Not filled in" },
  ],
  after: [
    { field: "Title", value: "ISO Whey Protein Isolate, Chocolate, 2 lb" },
    { field: "Description", value: "25 g protein per scoop, 30 servings" },
    { field: "Options", value: "5 flavours on one product, a photo each" },
    { field: "Returns", value: "Unopened products within 30 days" },
  ],
  price: "$49 CAD",
  availability: "In stock",
} as const;
