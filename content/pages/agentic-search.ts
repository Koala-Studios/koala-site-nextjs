import { agenticAuditOffer } from "@/lib/content/audit";

const IMG = "/images/services/agentic-search";

/**
 * Copy and media for /services/agentic-search-optimization. The page has its
 * own layout; its index card, nav label and SEO title still come from
 * service-details.ts so the services index stays in one place.
 */
export const agenticSearchPage = {
  offer: agenticAuditOffer,

  hero: {
    folio: ["No. 05", "Agentic Search Optimization", "For Shopify brands"],
    headline: "Shoppers ask AI\nwhat to",
    accent: "buy.",
    lede: "When someone asks ChatGPT for the best whey isolate under $60, it doesn’t browse your homepage. It needs clear facts: price, ingredients, sizes, delivery and returns. We make those facts easy to find on your Shopify store, then plan how your brand shows up on agentic platforms.",
    note: "Free readiness audit · Shopify consumer brands · Canada and US",
    image: { src: `${IMG}/hero.webp`, alt: "A phone showing a shopper asking an AI assistant for a whey isolate under $60, with an IRONVOLT ISO Whey tub beside it" },
  },

  shift: {
    title: "The question",
    accent: "changed.",
    intro: "Shoppers used to type two words and scroll. Now they ask one detailed question and get a short answer that names a few products.",
    then: { label: "Then · a search box", query: "protein powder", result: "Ten blue links, four ads, and the shopper compares tabs." },
    now: {
      label: "Now · a question",
      query: "Best whey isolate under $60 with no sucralose that ships to Ontario in 3 days?",
      result: "One answer that names two or three products and says why.",
    },
    point: "That one question carries price, ingredients, delivery and returns at once. If your product page leaves one out, or says it three different ways, the assistant has no reason to pick you.",
  },

  reads: {
    title: "What AI reads on your",
    accent: "store.",
    image: { src: `${IMG}/product-page.webp`, alt: "An IRONVOLT ISO Whey product page on a laptop, showing price, flavours, ingredients, delivery and returns" },
    // Pin positions are percentages of the product-page image.
    points: [
      { title: "Product facts", copy: "Name, size, flavour and ingredients in plain words, the way a shopper would ask for them.", pin: { x: 53, y: 24 } },
      { title: "Price and variants", copy: "One price per variant, named the same way on the page, in the feed and in the cart.", pin: { x: 64, y: 35 } },
      { title: "Delivery and returns", copy: "Shipping times, costs and the returns window on the product page, not buried in a policy page.", pin: { x: 84, y: 45 } },
      { title: "Proof shoppers can check", copy: "Reviews, certifications and claims that match what the label and your listings say.", pin: { x: 71, y: 30 } },
      { title: "Structured data", copy: "Product, offer and review markup plus a clean product feed, so machines read what people see.", pin: { x: 59, y: 14 } },
    ],
  },

  categories: {
    title: "Built for brands that sell",
    accent: "products.",
    intro: "Every category gets its own questions. We start from the ones your shoppers actually ask.",
    items: [
      { name: "Supplements and nutrition", question: "Which creatine is third-party tested and ships to Canada?", image: { src: `${IMG}/cat-supplements.webp`, alt: "IRONVOLT ISO Whey tub with a scoop of powder and a shaker" } },
      { name: "Food and drink", question: "A high-protein granola with no added sugar, under $10 a bag?", image: { src: `${IMG}/cat-food.webp`, alt: "A kraft granola pouch beside a bowl of granola and a jar of nut butter" } },
      { name: "Skincare and beauty", question: "A fragrance-free vitamin C serum for sensitive skin?", image: { src: `${IMG}/cat-skincare.webp`, alt: "An amber serum bottle and a cream jar on stone" } },
      { name: "Home and lifestyle", question: "A dishwasher-safe stoneware mug to give as a gift?", image: { src: `${IMG}/cat-home.webp`, alt: "A Morrow Cove stoneware mug and vase with a linen napkin" } },
    ],
    fit: "For Shopify consumer brands with an established product range, selling in Canada and the US.",
  },

  included: {
    title: "What’s",
    accent: "included.",
    tracks: [
      { label: "01 · Product clarity", items: ["Product descriptions, variants and buying information review", "Product data and structured information checks"] },
      { label: "02 · Store readiness", items: ["Shipping, returns and availability clarity", "Readiness priorities and the improvements we agree"] },
      { label: "03 · Agentic platforms", items: ["Messaging and landing-page strategy for platforms such as ChatGPT", "Measurement tied to enquiries and purchases"] },
    ],
  },

  steps: {
    title: "How it",
    accent: "runs.",
    items: [
      { number: "01", title: "Review", copy: "We start with your store, your audience and the questions they ask. We find missing or conflicting buying facts." },
      { number: "02", title: "Prioritize", copy: "You get a short, ranked improvement plan. We agree scope, who does what and how we will measure it." },
      { number: "03", title: "Improve", copy: "We rewrite product and policy content, fix structured data and check the path from discovery to checkout." },
      { number: "04", title: "Measure", copy: "We track the signals your store can see, like referrals, enquiries and orders, and adjust from there." },
    ],
  },

  audit: {
    label: "Free · for Shopify brands",
    title: "Your free readiness",
    accent: "audit.",
    image: { src: `${IMG}/audit.webp`, alt: "A printed agentic search readiness audit with a numbered priority list" },
    checks: ["Product facts and variants", "Delivery and returns information", "The path from discovery to enquiry or purchase"],
    outcome: "You receive a prioritized list of improvements.",
  },

  faq: {
    title: "Straight",
    accent: "answers.",
    items: [
      {
        q: "What is Agentic Search Optimization?",
        a: "Making your products, prices and policies clear and consistent, so AI assistants such as ChatGPT can understand your store when shoppers ask what to buy. It also covers how your brand shows up on those platforms.",
      },
      {
        q: "How is it different from SEO?",
        a: "SEO aims for a place in a list of links. An AI assistant answers the question directly and often names only a few products. Both rely on clear pages, structured data and a site that can be crawled, so we work on them together.",
      },
      {
        q: "Can you guarantee ChatGPT will recommend my products?",
        a: "No, and nobody honestly can. Each platform decides its own answers, and they change. We fix what is in your control: clear facts, clean product data and a store assistants can read.",
      },
      {
        q: "Do I need to leave Shopify or rebuild my site?",
        a: "No. We work inside your existing Shopify store, theme and product data.",
      },
      {
        q: "Do you also run marketing on ChatGPT?",
        a: "We plan marketing for agentic platforms such as ChatGPT around the options available to your brand, and tell you plainly when a channel isn’t ready for you yet.",
      },
      {
        q: "What does the free audit cost?",
        a: "Nothing. Request it, we review your store and send you a prioritized list of improvements.",
      },
    ],
  },

  cta: {
    title: "How ready is your",
    accent: "store?",
    copy: "Send us your store. We’ll show you what an AI assistant can and can’t find on it.",
    image: { src: `${IMG}/cta.webp`, alt: "" },
  },
} as const;
