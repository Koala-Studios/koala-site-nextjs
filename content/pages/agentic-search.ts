import { agenticAuditOffer } from "@/lib/content/audit";

const IMG = "/images/services/agentic-search";

/**
 * Copy and media for /services/agentic-search-optimization. The page has its
 * own layout; its index card, nav label and SEO title still come from
 * service-details.ts so the services index stays in one place.
 * Example brands are Koala's fictional brands (knowledge/fictional-brands in
 * the koala-studios project); none is a real company.
 */
export const agenticSearchPage = {
  offer: agenticAuditOffer,
  ctaLabel: "Get your free audit",

  hero: {
    label: "Agentic Search Optimization · for Shopify brands",
    headline: "Get your store ready for AI",
    accent: "shopping.",
    lede: "Shoppers can now ask ChatGPT what to buy. We make your Shopify product data complete, clear and consistent, so AI assistants have the right facts about your products.",
    points: [
      "Free audit with a prioritized fix list",
      "Product data, prices and policies fixed in your Shopify store",
      "No new platform, no rebuild",
    ],
    image: { src: `${IMG}/hero.webp`, alt: "A phone showing a shopper asking an AI assistant for a whey isolate under $60, with an IRONVOLT ISO Whey tub beside it" },
  },

  shift: {
    label: "Why now",
    title: "The question",
    accent: "changed.",
    then: { label: "Then", query: "protein powder", result: "A page of links and ads." },
    now: {
      label: "Now",
      query: "Best whey isolate under $60 with no sucralose that ships to Ontario in 3 days?",
      result: "A short set of product options, with details and links.",
    },
    point: "ChatGPT shows the products it judges relevant to the question, drawing on product data such as price and description. Missing or conflicting facts make that match harder.",
  },

  reads: {
    label: "What we fix",
    title: "What AI can",
    accent: "read.",
    image: { src: `${IMG}/product-page.webp`, alt: "An IRONVOLT ISO Whey product page on a laptop, showing price, flavours, ingredients, delivery and returns" },
    // Pin positions are percentages of the product-page image.
    points: [
      { title: "Product facts", copy: "Size, flavour and ingredients in plain words.", pin: { x: 53, y: 24 } },
      { title: "Price and variants", copy: "The same on your page, in your data and at checkout.", pin: { x: 64, y: 35 } },
      { title: "Delivery and returns", copy: "Clear times, costs and a complete returns policy.", pin: { x: 84, y: 45 } },
      { title: "Reviews and claims", copy: "Matching your label and listings. ChatGPT may summarize public reviews.", pin: { x: 71, y: 30 } },
      { title: "Structured product data", copy: "Complete in Shopify Catalog and on your pages.", pin: { x: 59, y: 14 } },
    ],
  },

  brands: {
    label: "Who it’s for",
    title: "Built for your",
    accent: "category.",
    note: "Shopify consumer brands in Canada and the US. Example brands shown are fictional.",
    items: [
      { brand: "IRONVOLT", category: "Supplements", question: "Which whey isolate is under $60 and ships fast?", image: { src: `${IMG}/cat-supplements.webp`, alt: "IRONVOLT ISO Whey tub with a scoop of powder and a shaker" } },
      { brand: "Oatwick", category: "Food", question: "A granola with no added sugar, under $10 a bag?", image: { src: `${IMG}/cat-oatwick.webp`, alt: "Oatwick Maple Pecan Granola pouch beside a bowl of granola" } },
      { brand: "Saltmere", category: "Skincare", question: "A fragrance-free serum for sensitive skin?", image: { src: `${IMG}/cat-saltmere.webp`, alt: "Saltmere Sea Mineral Serum and Barrier Cream on pale stone" } },
      { brand: "Wickloft", category: "Home", question: "A long-burning cedar candle to give as a gift?", image: { src: `${IMG}/cat-wickloft.webp`, alt: "A lit Wickloft No. 04 Cedar & Smoke candle with its gift box" } },
      { brand: "Brightling", category: "Drinks", question: "A low-sugar soda that comes in a variety pack?", image: { src: `${IMG}/cat-brightling.webp`, alt: "Brightling Grapefruit Yuzu and Lime Mint cans with a glass of ice" } },
    ],
  },

  included: {
    label: "What you get",
    title: "Three things,",
    accent: "done.",
    tracks: [
      { title: "Product clarity", items: ["Descriptions, variants and buying info rewritten", "Product data and structured information checked"] },
      { title: "Store readiness", items: ["Shipping, returns and availability made clear", "Fixes prioritized and agreed with you"] },
      { title: "Agentic platforms", items: ["Messaging and landing pages for platforms such as ChatGPT", "Measurement tied to enquiries and orders"] },
    ],
    steps: [
      { number: "01", title: "Review", copy: "Your store and your shoppers’ questions." },
      { number: "02", title: "Prioritize", copy: "A short, ranked fix list." },
      { number: "03", title: "Improve", copy: "We make the fixes in Shopify." },
      { number: "04", title: "Measure", copy: "Referrals, enquiries and orders." },
    ],
  },

  audit: {
    label: "Free for Shopify brands",
    title: "Your free",
    accent: "audit.",
    image: { src: `${IMG}/audit.webp`, alt: "A printed agentic search readiness audit with a numbered priority list" },
    checks: ["Product facts and variants", "Delivery and returns information", "The path from discovery to purchase"],
    outcome: "You get a prioritized list of fixes.",
  },

  faq: {
    label: "Questions",
    title: "Quick",
    accent: "answers.",
    items: [
      {
        q: "How is this different from SEO?",
        a: "SEO aims for a place in a list of links. In ChatGPT, a shopper gets a short set of product options chosen for their question, and not every product is shown. Shopify recommends the same groundwork for both: complete, well-structured product information and good SEO practice. So we work on them together.",
      },
      {
        q: "Can you guarantee ChatGPT will recommend my products?",
        a: "No, and nobody honestly can. ChatGPT chooses product results independently, and they change. We improve what is in your control: clear facts, accurate product data and a store assistants can read.",
      },
      {
        q: "Do I need to leave Shopify or rebuild my site?",
        a: "No. Eligible Shopify stores already share product data with ChatGPT through Shopify Catalog. We work inside your existing store, theme and product data to make that information complete and accurate.",
      },
      {
        q: "Do you also run marketing on ChatGPT?",
        a: "We plan marketing for agentic platforms such as ChatGPT around the options available to your brand, and tell you plainly when a channel isn’t ready for you yet.",
      },
      {
        q: "What does the audit cost?",
        a: "Nothing. Request it, we review your store and send you a prioritized list of fixes.",
      },
    ],
  },

  cta: {
    title: "Is your store",
    accent: "ready?",
    copy: "Send us your store. We’ll show you which product facts are missing, unclear or inconsistent.",
    image: { src: `${IMG}/cta.webp`, alt: "" },
  },
} as const;
