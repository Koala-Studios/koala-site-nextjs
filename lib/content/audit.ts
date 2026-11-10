export const auditOffer = {
  title: "Get a free audit of your website",
  cta: "Get a free audit",
  href: "/free-audit",
  mayaHref: "/contact-short?interest=brand-growth-audit&source=maya",
  summary:
    "We shop your store like a first-time buyer, on desktop and phone, and send you a short PDF with the fixes worth making first. Free, and yours to keep.",
} as const;

/** The free-audit landing page at /free-audit. */
export const freeAuditPage = {
  title: "Get a free audit",
  titleAccent: "of your website.",
  lede:
    "Send us your store. You get a short PDF with the three to five things most likely costing you orders, screenshots from your own site and a sketch of each fix.",
  promise: ["Free, with no call needed", "Your public site only, no logins", "Yours to use, with or without us"],
  formTitle: "Where should we send it?",
  submitLabel: "Get my free audit",
  steps: [
    {
      title: "You send your website",
      copy: "Email, company and website. That's all we need.",
    },
    {
      title: "We shop it like a new customer",
      copy: "Homepage, a product page, the cart and the first email, on desktop and phone.",
    },
    {
      title: "You get the PDF",
      copy: "The fixes ranked by what they cost you, each with a screenshot and a sketch. If you'd like, a 2-minute video walking through it.",
    },
  ],
  sampleTitle: "What a finding looks like",
  sampleCopy:
    "Every finding shows what a shopper sees today and what we'd change, drawn on your own pages. This one is from IRONVOLT, the demo store we use for examples: the sample pack left out the bestselling flavour, so the next order had nowhere to go.",
  checksTitle: "What we look at",
  checks: [
    "Shipping and price messages that disagree",
    "Buttons that lead to sold-out or broken pages",
    "Subscription and bundle offers that hide the best deal",
    "Product pages that bury the reason to buy",
    "The path from a sample or first order to the next one",
    "Welcome, cart and reorder emails, if you have them",
  ],
  faq: [
    {
      q: "Is it really free?",
      a: "Yes. We make these because the best way to show how we work is on your own store. Use the fixes yourself, with us, or with anyone.",
    },
    {
      q: "Do you need access to my store?",
      a: "No. We only look at what any shopper can see. Nobody logs in, and we never ask for passwords.",
    },
    {
      q: "Who makes it?",
      a: "Frank and our small Toronto team, who run the Shopify store, email and ads for supplement, wellness and food brands.",
    },
    {
      q: "What happens after?",
      a: "We email you the PDF and offer a 2-minute video walking through it on your own site, or a 15-minute call. You don't need either to use it.",
    },
  ],
  againCopy: "Three fields, then we do the work. The PDF is yours either way.",
  thanksTitle: "Thanks.",
  thanksAccent: "It's on our list.",
  thanksCopy:
    "We'll shop your store and email the PDF from frank@koalastudios.ca. Add that address to your contacts so it doesn't land in spam.",
} as const;
