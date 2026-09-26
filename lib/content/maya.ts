export const mayaContent = {
  name: "Maya Amani",
  title: "Chief Marketing & Growth Officer",
  focus: "Ecommerce growth",
  hero: "Elevate your brand. Grow your online sales.",
  heroSummary: "Build a brand more people know, a store more people buy from, and a reason to come back.",
  portrait: "/images/maya/07-maya-approved.webp",
  email: "maya@koalastudios.ca",
  /** Trade-show greeting shown on /maya; remove or change after the event. */
  event: { greeting: "Hello, CHFA", closing: "Met at CHFA?" } as { greeting: string; closing: string } | null,
  intro: "15+ years taking consumer brands from shelf to cart across CPG, food, supplements and wellness.",
  linkedin: "https://ca.linkedin.com/in/mayaamani",
  profile: "/documents/maya-amani-executive-profile.pdf",
  beliefTitle: "More visibility. More sales.",
  belief: [
    "A stronger brand gives customers a reason to choose you. We connect that visibility to a better website, effective email marketing, and more repeat purchases, helping you grow direct-to-consumer sales and improve margins.",
    "The same recognition can help your products move more effectively through retail channels. My experience spans 15+ years across consumer packaged goods, food and beverage, supplements, and health and wellness, from ecommerce growth to commercialization and acquisition.",
  ],
  brandLife: {
    title: "Bring your brand to life.",
    copy: "Give people something to stop for. Distinctive packaging, vivid product imagery and a brand world that makes your product feel as good as it is.",
    detail: "Start with the brand, packaging and website. Then connect organic social content, Meta and Google ads, and email marketing to help turn that attention into sales.",
  },
  services: [
    { icon: "visibility", title: "Get noticed", copy: "Brand positioning, creative and organic social content that build awareness and give people a reason to choose you." },
    { icon: "store", title: "Turn visits into sales", copy: "Website and shopping experiences that help more customers complete their purchase." },
    { icon: "email", title: "Bring customers back", copy: "Email marketing, retention and subscriptions that build the next layer of revenue." },
  ],
  proof: [
    { value: "15+", label: "Years of experience", context: "Consumer brands and commerce" },
    { value: "1", label: "Brand built and acquired", context: "Allo Nutrition" },
    { value: "300+", label: "Canadian sales channels", context: "Allo Nutrition, before international expansion and acquisition" },
  ],
  stories: [
    { brand: "allo", metric: "300+", metricLabel: "Canadian sales channels", secondary: "International expansion. Successful acquisition.", bullets: ["Founded and commercialized the brand.", "Expanded into Dubai and the Middle East.", "Acquired by Magnum Nutraceuticals."] },
    { brand: "iron-brothers", metric: "45%", metricLabel: "Increase in DTC revenue", secondary: "More than $1M in online revenue", bullets: ["Ecommerce and conversion improvements.", "Paid media and lifecycle email marketing."] },
    { brand: "nosh-balls", metric: "37%", metricLabel: "Online revenue growth", secondary: "Within six months", bullets: ["Shopify and mobile shopping improvements.", "Retention and subscription strategy."] },
    { brand: "whiskey-road", metric: "34%", metricLabel: "Revenue growth", secondary: "Within six months", bullets: ["Shopify and mobile conversion improvements.", "Wholesale infrastructure and customer experience."] },
  ],
  engagements: [
    { brand: "mercato-di-bellina", title: "A clearer path from discovery to purchase.", copy: "Shopify optimization, email marketing and conversion improvements for a premium Italian food brand." },
    { brand: "unity-supplements", title: "Make the right product easier to find.", copy: "A clearer supplement storefront, with product education, flavour choice, bundles and repeat purchase paths." },
  ],
  channelTitle: "Experience taking brands to market.",
  channelCopy: "Our experience spans retail, distribution, marketplaces and direct-to-consumer ecommerce, including subscriptions that give customers a reason to come back.",
  auditTitle: "Unlock your next stage of ecommerce growth.",
  auditSummary: "A free brand and growth audit of your website, positioning and email marketing. Find practical opportunities to convert more visitors, bring customers back and grow online revenue.",
} as const;

/** Case studies shown on /maya, led by food, wellness and CPG work. */
export const mayaWork = ["mercato-di-bellina", "nosh-balls", "freezo", "hope-harvest", "nektr", "allo", "unity-supplements", "wellth-foods"];
