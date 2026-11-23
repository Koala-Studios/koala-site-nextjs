import type {
  CaseStudyContent,
  NavigationContent,
  MarketingPageKey,
  PageContent,
  SiteSettings,
  TestimonialContent,
} from "./types";

export const siteSettings: SiteSettings = {
  name: "Koala Studios",
  description:
    "Shopify stores, Meta ads and email marketing for food, supplement and wellness brands. Toronto, Canada.",
  url: "https://koalastudios.ca",
  locale: "en-CA",
  defaultSeo: {
    title: "Shopify Design, Meta Ads & Email Marketing Agency",
    description:
      "Koala Studios is a Toronto studio for food, supplement and wellness brands: Shopify stores, Meta ads, Klaviyo email, packaging and 3D renders.",
    canonicalPath: "/",
  },
  // Only real profile URLs. An empty slot stays out of the page and the structured data.
  social: {
    linkedin: "https://www.linkedin.com/company/koala-studios",
    // Google Business Profile: Frank to paste the profile's share URL here once it exists.
    googleBusinessProfile: "",
  },
  cta: {
    primaryLabel: "Start a conversation",
    primaryHref: "/contact",
    secondaryLabel: "See the work",
    secondaryHref: "/work",
  },
};

export const navigationContent: NavigationContent = {
  primary: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  featuredCta: {
    label: "Start a project",
    href: "/contact",
  },
};

export const pageContent: Record<MarketingPageKey, PageContent> = {
  home: {
    route: "/",
    status: "published",
    seo: {
      title: "Shopify Design, Meta Ads & Email Marketing Agency",
      description:
        "Ecommerce design and build for brands that want a clearer offer, stronger proof, and a better path to contact.",
      canonicalPath: "/",
    },
    hero: {
      eyebrow: "Ecommerce studio",
      headline: "Web experiences that move.",
      summary:
        "Koala Studios designs and builds ecommerce sites with clearer stories, stronger product paths, and a public face that feels considered from the first click.",
      ctas: [
        { label: "See the work", href: "/work" },
        { label: "Start a conversation", href: "/contact" },
      ],
    },
    body: {
      sections: [
        {
          id: "positioning",
          heading: "A message that lands quickly",
          copy: "The homepage should say who we help, what we do, and why it matters without making people work for it.",
        },
        {
          id: "proof",
          heading: "Proof that backs it up",
          copy: "Selected work, a short service list, and a direct contact path should all point to the same promise.",
        },
        {
          id: "craft",
          heading: "A site that stays useful",
          copy: "The site should stay easy to update, easy to read, and solid after launch.",
        },
      ],
    },
  },
  services: {
    route: "/services",
    status: "published",
    seo: {
      title: "Shopify Design, Meta Ads & Email Marketing Services",
      description:
        "Shopify design and build, Meta ad management and Klaviyo email marketing for food, supplement and wellness brands. One Toronto team across the full funnel, with monthly plans from $600.",
      canonicalPath: "/services",
    },
    hero: {
      eyebrow: "Services",
      headline: "Design. Build. Grow.",
      summary:
        "For food, supplement and wellness brands on Shopify. Four ways to work with us: build the store, make the product shine, drive the traffic and keep the customers. Most brands start with one and grow into the rest.",
      ctas: [
        { label: "See the work", href: "/work" },
        { label: "Contact", href: "/contact" },
      ],
    },
    body: {
      sections: [
        {
          id: "strategy",
          heading: "Strategy",
          copy: "We clarify the offer, audience, and proof.",
        },
        {
          id: "delivery",
          heading: "Design and build",
          copy: "We shape the layout, visuals, and frontend.",
        },
        {
          id: "fit",
          heading: "Best fit",
          copy: "Best when positioning, design, and build all matter.",
        },
      ],
    },
  },
  contact: {
    route: "/contact",
    status: "published",
    seo: {
      title: "Contact: Start a Project",
      description:
        "Start a conversation about a redesign, new build, or cleaner ecommerce site.",
      canonicalPath: "/contact",
    },
    hero: {
      eyebrow: "Contact",
      headline: "Start a conversation.",
      summary:
        "Tell us what you are building, what feels stuck, and what needs to change.",
      ctas: [
        { label: "Email us", href: "mailto:hello@koalastudios.ca" },
        { label: "See the work", href: "/work" },
      ],
    },
    body: {
      sections: [
        {
          id: "expectations",
          heading: "What happens next",
          copy: "We review the note, check fit, and reply with the clearest next step we can offer.",
        },
        {
          id: "brief",
          heading: "What helps most",
          copy: "A short summary, the current URL, and your timeline are usually enough.",
        },
      ],
    },
  },
};

export const homepageTestimonials: TestimonialContent[] = [
  {
    quote:
      "Koala helped us turn a messy storefront into something clearer, faster, and much easier for the team to keep improving.",
    author: "Ecommerce founder",
    role: "Growth-stage brand",
  },
  {
    quote:
      "The work finally connected our product story, visuals, and Shopify build instead of treating each piece like a separate problem.",
    author: "Marketing lead",
    role: "Consumer ecommerce",
  },
  {
    quote:
      "We needed direct senior help, not another long handoff loop. Koala kept decisions moving and shipped with care.",
    author: "Operations lead",
    role: "Shopify team",
  },
  {
    quote:
      "The site now feels sharper at the first click, and the editing system is much easier to work with after launch.",
    author: "Brand team",
    role: "Lifestyle commerce",
  },
];

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "magnum",
    status: "published",
    title: "Magnum",
    client: "Magnum Nutraceuticals",
    sector: "Sports nutrition",
    category: "Design",
    tags: ["Design", "Shopify", "Product UX"],
    featured: true,
    headline: "A sports-nutrition store that gets athletes to the right tub.",
    intro:
      "Magnum Nutraceuticals makes proteins, pre-workouts, fat burners and greens for athletes. We designed store pages that put the products first: best-sellers by goal, product pages with flavours, sizes and subscriptions laid out plainly, and a buy button that stays in reach.",
    services: ["Store design", "Product pages", "Collections"],
    challenge:
      "Magnum has a deep catalogue and loyal customers who know exactly what they want. The store had to get them to the right product fast, and still give a first-time buyer enough to choose between a dozen tubs.",
    approach:
      "We organised the catalogue around best-sellers and goals, gave every product card its one-line job, built a product page where flavour, size and subscribe-and-save sit together, and kept the add-to-cart bar on screen as people scroll.",
    deliverables: ["Best-seller collection", "Product page template", "Subscribe-and-save options", "Phone product list"],
    outcomes: ["A faster path to the right product", "A clear choice between one-time and subscription", "The buy button always in reach"],
    metrics: [
      { label: "Focus", value: "Product pages and collections" },
      { label: "Scope", value: "Store design" },
    ],
    media: [
      {
        src: "/images/project/magnum/magnum_desktop_gym.png",
        alt: "Magnum protein, pre-workout and fat-burner tubs on a gym bench",
      },
      {
        src: "/images/project/magnum/product_page_desktop_magnum.png",
        alt: "Magnum Vegan Quattro product page with size, flavour and subscribe-and-save options",
        width: 1919,
        height: 952,
      },
      {
        src: "/images/project/magnum/product_list_magum.png",
        alt: "Magnum best-sellers on a phone, each card with its one-line job",
        width: 388,
        height: 843,
      },
    ],
    cardImage: {
      src: "/images/project/magnum/magnum_desktop_gym.png",
      alt: "Magnum Nutraceuticals supplement tubs on a gym bench",
    },
    logo: {
      src: "/images/project/magnum/logo.png",
      alt: "Magnum logo",
      width: 878,
      height: 125,
    },
    relatedSlug: "nektr",
    seo: {
      title: "Magnum Nutraceuticals Case Study",
      description:
        "How Koala Studios designed store pages for Magnum Nutraceuticals, a sports-nutrition brand: best-sellers by goal, product pages with flavours, sizes and subscribe-and-save, and a phone layout that keeps the buy button in reach.",
      canonicalPath: "/work/magnum",
    },
  },
  {
    slug: "nektr",
    status: "published",
    title: "Nektr",
    client: "NEKTR by Magnum",
    sector: "Greens supplement",
    category: "Design",
    tags: ["Design", "3D renders", "Product graphics"],
    featured: true,
    headline: "Launch visuals for a daily greens powder.",
    intro:
      "NEKTR is Magnum Nutraceuticals' daily greens and superfoods powder. We made its launch visuals: photoreal 3D renders of the tubs in bright fruit scenes, and a graphic that shows what is inside at a glance.",
    services: ["3D renders", "Art direction", "Product graphics"],
    challenge:
      "A greens powder is hard to sell in a picture: a tub, a scoop, a green drink. NEKTR needed images that said flavour and freshness on the store, in ads and on social, before a photoshoot was possible.",
    approach:
      "We modelled the tubs in 3D and set them in fruit-and-splash scenes for each flavour, cropped for wide banners, phones and square posts, and designed a nutrient plate that turns the ingredient list into something you can read in a second.",
    deliverables: ["3D tub models", "Flavour renders", "Wide, phone and square crops", "Ingredient graphic"],
    outcomes: ["Launch images with no photoshoot", "One look across store, ads and social", "Ingredients explained in one picture"],
    metrics: [
      { label: "Focus", value: "3D renders and launch graphics" },
      { label: "Scope", value: "Product launch visuals" },
    ],
    media: [
      {
        src: "/images/project/nektr/wide_hero_new3_ps.jpg",
        alt: "NEKTR daily greens tubs rendered in 3D with pineapple, peach and splash",
      },
      {
        src: "/images/project/nektr/mobile_hero.jpg",
        alt: "Square crop of the NEKTR tub renders for phones and social posts",
        width: 1080,
        height: 1080,
      },
      {
        src: "/images/project/nektr/nektr_plate.png",
        alt: "NEKTR ingredient graphic: a plate of greens labelled spirulina, fibre, leafy and cruciferous vegetables",
        width: 1456,
        height: 901,
      },
    ],
    coverImage: {
      src: "/images/project/nektr/mobile_hero.jpg",
      alt: "Nektr greens tubs in a 3D render with fruit and splash",
    },
    cardImage: {
      src: "/images/project/nektr/wide_hero_new3_ps.jpg",
      alt: "NEKTR daily greens 3D render",
    },
    relatedSlug: "allo",
    seo: {
      title: "NEKTR Daily Greens Case Study",
      description:
        "Koala Studios made the launch visuals for NEKTR, Magnum Nutraceuticals' daily greens powder: photoreal 3D tub renders in fruit scenes for the store, ads and social, plus an ingredient graphic.",
      canonicalPath: "/work/nektr",
    },
  },
  {
    slug: "allo",
    status: "published",
    title: "Allo",
    client: "Allo Nutrition",
    sector: "Protein for coffee",
    category: "Shopify",
    tags: ["Shopify", "Packaging", "3D renders"],
    featured: true,
    headline: "Protein for coffee, from Allo to ÄRA.",
    intro:
      "Allo made a protein powder you stir into coffee. We worked on it under two names: Allo's own Shopify store, then ÄRA, the same product relaunched by Magnum Nutraceuticals after it acquired Allo.",
    services: ["Shopify", "Packaging", "3D renders"],
    challenge:
      "A new kind of product has seconds to explain itself: what it is, how it goes in your coffee, and why it beats a creamer. After the acquisition it also had to move to a new name and a new store without losing what customers already knew.",
    approach:
      "On Allo's store we led with the cup: the product in coffee, flavours up front, and a plain choice between creamer and non-creamer. For ÄRA we designed the packaging, made photoreal 3D renders of the sachet, tub and box, and built its product page on Magnum's store.",
    deliverables: ["Allo Shopify store", "Product pages and flavour picker", "ÄRA packaging design", "3D product renders", "ÄRA product page"],
    outcomes: ["The product explained at a glance", "One look carried across two names", "Launch images ready before any photoshoot"],
    metrics: [
      { label: "Brands", value: "Allo, then ÄRA by Magnum" },
      { label: "Scope", value: "Store, packaging and renders" },
    ],
    media: [
      {
        src: "/images/project/allo/allo-product-desktop.png",
        alt: "Allo vanilla protein powder product page with flavour picker and a coffee cup",
        width: 1910,
        height: 1007,
      },
      {
        src: "/images/project/ara/ara_hero.webp",
        alt: "ÄRA protein powder sachet, mug and box rendered in 3D in warm morning light",
        width: 2318,
        height: 982,
      },
      {
        src: "/images/project/allo/allo-shop-page.png",
        alt: "Allo shop page on a phone with creamer and non-creamer protein powders",
        width: 401,
        height: 869,
      },
      {
        src: "/images/project/ara/ara_product_desktop.png",
        alt: "ÄRA creamer product page on the Magnum Nutraceuticals store",
        width: 1900,
        height: 950,
      },
      {
        src: "/images/project/ara/ara_plants.jpg",
        alt: "ÄRA protein powder tub rendered among trailing plants",
        width: 1365,
        height: 1706,
      },
    ],
    coverImage: {
      src: "/images/project/allo/allo_image_wide.jpg",
      alt: "Allo protein for coffee packaging on sand-coloured plinths",
    },
    cardImage: {
      src: "/images/project/allo/allo_image_wide.jpg",
      alt: "Allo protein for coffee packaging",
    },
    relatedSlug: "nosh-balls",
    seo: {
      title: "Allo and ÄRA Case Study",
      description:
        "Koala Studios' work for Allo, a protein powder for coffee: the Allo Shopify store, then packaging, 3D renders and a product page for its relaunch as ÄRA by Magnum Nutraceuticals.",
      canonicalPath: "/work/allo",
    },
  },
  {
    slug: "mercato-di-bellina",
    status: "published",
    title: "Mercato di Bellina",
    client: "Mercato di Bellina",
    sector: "Italian gourmet ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Catalog UX", "Content"],
    headline: "A specialty Italian market organized for confident discovery.",
    intro:
      "Mercato di Bellina needed a storefront that could carry pantry shopping, brand education, recipes, and restaurant context in one calm path.",
    services: ["Shopify", "Catalog architecture", "Content design"],
    challenge:
      "The catalog spans olive oil, vinegar, pasta, tomatoes, salts, seafood, recipes, and restaurant touchpoints, so shoppers needed faster ways to understand quality and move by category.",
    approach:
      "We shaped the experience around ingredient-led collections, product education, and supporting pages that keep the Bellina story close to the buying path.",
    deliverables: [
      "Collection hierarchy",
      "Product detail templates",
      "Brand and restaurant pages",
      "Mobile shopping flow",
    ],
    outcomes: [
      "Cleaner pantry navigation",
      "More confident product discovery",
      "Stronger gift and restaurant context",
    ],
    metrics: [
      { label: "Priority", value: "Gourmet catalog clarity" },
      { label: "Scope", value: "Storefront + content system" },
    ],
    media: [
      {
        src: "/images/project/mercato-di-bellina/01-home.jpg",
        alt: "Mercato di Bellina homepage presenting premium Italian gourmet gifts",
      },
      {
        src: "/images/project/mercato-di-bellina/02-collection-olive-oil.jpg",
        alt: "Mercato di Bellina extra virgin olive oil collection page",
      },
      {
        src: "/images/project/mercato-di-bellina/03-collection-pasta.jpg",
        alt: "Mercato di Bellina short pasta collection with pantry product cards",
      },
      {
        src: "/images/project/mercato-di-bellina/04-product-pici.jpg",
        alt: "Mercato di Bellina Pici Pasta product page with product options",
      },
      {
        src: "/images/project/mercato-di-bellina/05-product-olive-oil.jpg",
        alt: "Mercato di Bellina olive oil product page with origin details",
      },
      {
        src: "/images/project/mercato-di-bellina/06-brands-page.jpg",
        alt: "Mercato di Bellina brands page and customer support content",
      },
    ],
    coverImage: {
      src: "/images/project/mercato-di-bellina/gift-baskets.webp",
      alt: "Mercato di Bellina gift boxes filled with Italian pantry goods on a sunlit patio table",
      position: "center 62%",
    },
    cardImage: {
      src: "/images/project/mercato-di-bellina/01-home.jpg",
      alt: "Mercato di Bellina ecommerce case study card image",
    },
    logo: {
      src: "/images/project/mercato-di-bellina/logo.png",
      alt: "Mercato di Bellina logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "unity-supplements",
    externalUrl: "https://mercatodibellina.com/",
    seo: {
      title: "Mercato di Bellina Case Study",
      description:
        "Mercato di Bellina shows how Koala Studios organized a premium Italian grocery storefront around catalog clarity, product education, and brand context.",
      canonicalPath: "/work/mercato-di-bellina",
    },
  },
  {
    slug: "unity-supplements",
    status: "published",
    title: "Unity Supplements",
    client: "Unity Supplements",
    sector: "Supplement ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Redesign", "Product UX"],
    headline: "The same brand, rebuilt as a premium supplement store.",
    intro:
      "Unity Supplements, based in Laval, Quebec, makes clear whey protein, creatine and collagen. In November 2026 we redesigned their Shopify store to look as premium as the product, keeping their colours and logo.",
    services: ["Shopify redesign", "Product pages", "Lifestyle imagery"],
    challenge:
      "The store sold the products but not the brand. The homepage was one promo banner over a product grid, product pages were a list of options, and nothing showed people actually using what Unity makes.",
    approach:
      "We kept Unity's navy, sky blue and logo and rebuilt the theme around them: a first screen with the numbers that sell clear protein (27 g of protein, 0 g of sugar), shop-by-category tiles, new product templates for CLEAR ISO, creatine and collagen with benefit tags and a nutrition-facts popup, a matching icon family, and new lifestyle images of athletes with the real packs.",
    deliverables: [
      "Homepage redesign",
      "Product templates for protein, creatine and collagen",
      "Collection pages",
      "Lifestyle imagery",
      "Icon family",
      "Phone layouts",
    ],
    outcomes: [
      "A store that looks as premium as the product",
      "The key numbers on the first screen",
      "Product pages that answer what is in it and who it is for",
    ],
    metrics: [
      { label: "Launched", value: "November 5, 2026" },
      { label: "Scope", value: "Homepage, product and collection redesign" },
    ],
    beforeAfter: {
      note: "Before: the store as it stood in June 2026. After: the redesign we launched on November 5, 2026.",
      pairs: [
        {
          label: "Home page",
          before: {
            src: "/images/project/unity-supplements/01-home.jpg",
            alt: "Unity Supplements home page before the redesign, led by a single Clear ISO promo banner",
            width: 1440,
            height: 1100,
          },
          after: {
            src: "/images/project/unity-supplements/2026-home-desktop.jpg",
            alt: "Unity Supplements home page after the redesign, with a CLEAR ISO hero video and tiles for 27 g of protein and 0 g of sugar",
            width: 1440,
            height: 1100,
          },
        },
        {
          label: "Product page",
          before: {
            src: "/images/project/unity-supplements/05-product-creatine.jpg",
            alt: "Unity creatine product page before the redesign, with a plain list of flavours and purchase options",
            width: 1440,
            height: 1100,
          },
          after: {
            src: "/images/project/unity-supplements/2026-product-desktop.jpg",
            alt: "Unity creatine product page after the redesign, with benefit tags, a nutrition-facts button and flavour cards",
            width: 1440,
            height: 1100,
          },
        },
      ],
      phone: [
        {
          src: "/images/project/unity-supplements/2026-home-phone.jpg",
          alt: "The redesigned Unity home page on a phone",
          width: 780,
          height: 1688,
        },
        {
          src: "/images/project/unity-supplements/2026-product-phone.jpg",
          alt: "The redesigned Unity creatine product page on a phone",
          width: 780,
          height: 1688,
        },
        {
          src: "/images/project/unity-supplements/2026-collection-phone.jpg",
          alt: "The redesigned Unity protein collection on a phone",
          width: 780,
          height: 1688,
        },
      ],
    },
    media: [
      {
        src: "/images/project/unity-supplements/2026-category-tiles.jpg",
        alt: "Shop-by-category tiles for protein, creatine and collagen on the new Unity home page",
        width: 1440,
        height: 810,
      },
      {
        src: "/images/project/unity-supplements/2026-clear-iso-section.jpg",
        alt: "CLEAR ISO section with protein by weight, calories, how to mix and the five fruit flavours",
        width: 1440,
        height: 1236,
      },
      {
        src: "/images/project/unity-supplements/2026-creatine-dosage.jpg",
        alt: "Creatine product page chart showing the optional loading phase and one scoop a day after",
        width: 1440,
        height: 775,
      },
    ],
    coverImage: {
      src: "/images/project/unity-supplements/shaker.webp",
      alt: "Woman drinking a pink Clear Iso shake from a Unity shaker in front of a graffiti wall",
      position: "center 12%",
    },
    cardImage: {
      src: "/images/project/unity-supplements/2026-home-desktop.jpg",
      alt: "Unity Supplements redesigned home page",
    },
    logo: {
      src: "/images/project/unity-supplements/logo-white.png",
      alt: "Unity Supplements logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "iron-brothers",
    externalUrl: "https://unitysupplements.com/",
    seo: {
      title: "Unity Supplements Case Study",
      description:
        "How Koala Studios redesigned the Shopify store of Unity Supplements, a Quebec supplement brand, in November 2026: a premium home page, new product pages for clear protein, creatine and collagen, and lifestyle imagery, shown before and after.",
      ogImage: "/images/project/unity-supplements/2026-home-desktop.jpg",
      canonicalPath: "/work/unity-supplements",
    },
  },
  {
    slug: "iron-brothers",
    status: "published",
    title: "Iron Brothers",
    client: "Iron Brothers",
    sector: "Performance supplements",
    category: "Shopify",
    tags: ["Shopify", "Performance", "Product UX"],
    headline: "A harder-hitting supplement store with a cleaner product path.",
    intro:
      "Iron Brothers needed a storefront that matched the intensity of the brand while keeping supplement categories, product benefits, and purchase options easy to scan.",
    services: ["Shopify", "Visual direction", "Product templates"],
    challenge:
      "The brand is built on training intensity, but the store still had to explain pre-workout, nootropic, amino, and support products with enough discipline for shoppers to make fast choices.",
    approach:
      "We paired a bold gym-led visual system with plain collection structure, direct product pages, and recurring FAQ/detail blocks that support informed purchases.",
    deliverables: [
      "Bold homepage direction",
      "Supplement collections",
      "Product purchase modules",
      "About and mission page",
    ],
    outcomes: [
      "Stronger brand impact",
      "Faster product comparison",
      "More credible supplement education",
    ],
    metrics: [
      { label: "Priority", value: "Performance product clarity" },
      { label: "Scope", value: "Storefront + detail pages" },
    ],
    media: [
      {
        src: "/images/project/iron-brothers/01-home.jpg",
        alt: "Iron Brothers homepage with a train harder recover smarter hero",
      },
      {
        src: "/images/project/iron-brothers/02-collection-all-supplements.jpg",
        alt: "Iron Brothers all supplements collection page",
      },
      {
        src: "/images/project/iron-brothers/03-collection-pre-workout.jpg",
        alt: "Iron Brothers pre-workout collection page with FAQ content",
      },
      {
        src: "/images/project/iron-brothers/04-product-ruthless.jpg",
        alt: "Iron Brothers Ruthless pre-workout product page",
      },
      {
        src: "/images/project/iron-brothers/05-product-prodigy.jpg",
        alt: "Iron Brothers Prodigy nootropic product page",
      },
      {
        src: "/images/project/iron-brothers/06-about.jpg",
        alt: "Iron Brothers about page with mission content",
      },
    ],
    coverImage: {
      src: "/images/project/iron-brothers/cover.webp",
      alt: "Athlete holding an Iron Brothers protein tub in the gym",
    },
    cardImage: {
      src: "/images/project/iron-brothers/01-home.jpg",
      alt: "Iron Brothers ecommerce case study card image",
    },
    logo: {
      src: "/images/project/iron-brothers/logo.png",
      alt: "Iron Brothers logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "bull-nutrition",
    externalUrl: "https://ironbrothers.com/",
    seo: {
      title: "Iron Brothers Case Study",
      description:
        "Iron Brothers shows how Koala Studios balanced a bold performance supplement brand with clearer collections, product pages, and purchase modules.",
      canonicalPath: "/work/iron-brothers",
    },
  },
  {
    slug: "bull-nutrition",
    status: "published",
    title: "Bull Nutrition",
    client: "Bull Nutrition",
    sector: "Canadian supplement ecommerce",
    category: "Development",
    tags: ["Development", "Shopify", "Retail"],
    headline: "A Canadian supplement storefront built for stacks and retail reach.",
    intro:
      "Bull Nutrition needed a product-led Shopify experience that could sell performance formulas online while also supporting store discovery for retail buyers.",
    services: ["Shopify", "Product UX", "Retail locator"],
    challenge:
      "The site had to make supplement stacks, pre-workouts, creatine, and shaker accessories easy to shop while keeping a strong Canadian performance identity visible.",
    approach:
      "We used a direct collection system, product pages with concrete formula details, and a find-us experience that connects ecommerce demand with retail availability.",
    deliverables: [
      "Product collection system",
      "Formula-led product pages",
      "Retail locator page",
      "Mobile shopping QA",
    ],
    outcomes: [
      "Clearer supplement stack browsing",
      "More useful product education",
      "Better retail discovery support",
    ],
    metrics: [
      { label: "Priority", value: "Online + retail product flow" },
      { label: "Scope", value: "Storefront and locator" },
    ],
    media: [
      {
        src: "/images/project/bull-nutrition/01-home.jpg",
        alt: "Bull Nutrition homepage with a supplement stack promotion",
      },
      {
        src: "/images/project/bull-nutrition/02-collection-shop.jpg",
        alt: "Bull Nutrition shop collection with supplement product cards",
      },
      {
        src: "/images/project/bull-nutrition/03-collection-pre-workout.jpg",
        alt: "Bull Nutrition pre-workout collection page",
      },
      {
        src: "/images/project/bull-nutrition/04-product-pre-workout.jpg",
        alt: "Bull Nutrition 12Strong pre-workout product page",
      },
      {
        src: "/images/project/bull-nutrition/05-product-creatine.jpg",
        alt: "Bull Nutrition creatine product page with formula details",
      },
      {
        src: "/images/project/bull-nutrition/06-find-us.jpg",
        alt: "Bull Nutrition find us page with a retail location map",
      },
    ],
    coverImage: {
      src: "/images/project/bull-nutrition/cover.webp",
      alt: "Bull Nutrition pre-workout tub on a bed of cherries",
    },
    cardImage: {
      src: "/images/project/bull-nutrition/01-home.jpg",
      alt: "Bull Nutrition ecommerce case study card image",
    },
    logo: {
      src: "/images/project/bull-nutrition/logo-white.png",
      alt: "Bull Nutrition logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "whiskey-road",
    externalUrl: "https://www.bullnutrition.com/",
    seo: {
      title: "Bull Nutrition Case Study",
      description:
        "Bull Nutrition shows how Koala Studios built a Canadian supplement storefront around product stacks, formula detail, and retail discovery.",
      canonicalPath: "/work/bull-nutrition",
    },
  },
  {
    slug: "whiskey-road",
    status: "published",
    title: "Whiskey Road",
    client: "Whiskey Road",
    sector: "Headwear ecommerce",
    category: "Lifestyle",
    tags: ["Lifestyle", "Shopify", "Custom products"],
    headline: "A western headwear catalog shaped for patches, hats, and custom orders.",
    intro:
      "Whiskey Road needed an ecommerce experience that could sell ready-made caps, browse hundreds of patches, and introduce a custom hat program without losing its country-club personality.",
    services: ["Shopify", "Catalog architecture", "Custom order flow"],
    challenge:
      "The product system includes hats, patches, collections, accessories, and custom-program leads, so the browsing path had to stay organized while keeping the brand voice visible.",
    approach:
      "We brought collection browsing, patch detail pages, and the custom-hat inquiry path into one clear storefront rhythm built around fast scanning and strong product imagery.",
    deliverables: [
      "Patch and cap collections",
      "Product detail layouts",
      "Custom hat program page",
      "Lifestyle homepage direction",
    ],
    outcomes: [
      "Easier patch discovery",
      "Clearer custom-order path",
      "Stronger lifestyle merchandising",
    ],
    metrics: [
      { label: "Priority", value: "Catalog depth + custom leads" },
      { label: "Scope", value: "Storefront and inquiry flow" },
    ],
    media: [
      {
        src: "/images/project/whiskey-road/01-home.jpg",
        alt: "Whiskey Road homepage with country club headwear merchandising",
      },
      {
        src: "/images/project/whiskey-road/02-collection-caps.jpg",
        alt: "Whiskey Road caps collection page with hat product grid",
      },
      {
        src: "/images/project/whiskey-road/03-collection-patches.jpg",
        alt: "Whiskey Road patches collection page with western patch products",
      },
      {
        src: "/images/project/whiskey-road/04-product-copenhagen.jpg",
        alt: "Whiskey Road Copenhagen patch product page",
      },
      {
        src: "/images/project/whiskey-road/05-product-coors.jpg",
        alt: "Whiskey Road Coors Banquet patch product page",
      },
      {
        src: "/images/project/whiskey-road/06-custom-hat-program.jpg",
        alt: "Whiskey Road custom hat program inquiry page",
      },
    ],
    coverImage: {
      src: "/images/project/whiskey-road/cover.webp",
      alt: "Two people wearing Whiskey Road hats outdoors in autumn",
    },
    cardImage: {
      src: "/images/project/whiskey-road/01-home.jpg",
      alt: "Whiskey Road ecommerce case study card image",
    },
    logo: {
      src: "/images/project/whiskey-road/logo-white.png",
      alt: "Whiskey Road logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "medicrunch",
    externalUrl: "https://whiskeyroadhatco.com/",
    seo: {
      title: "Whiskey Road Case Study",
      description:
        "Whiskey Road shows how Koala Studios organized a headwear storefront around patch browsing, cap merchandising, and custom hat inquiries.",
      canonicalPath: "/work/whiskey-road",
    },
  },
  {
    slug: "medicrunch",
    status: "published",
    title: "Medi-Crunch",
    client: "Medi-Crunch",
    sector: "Pet health ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Product education", "Wholesale"],
    headline: "A pet-health product story that makes medication treats easy to understand.",
    intro:
      "Medi-Crunch needed a storefront that could explain a specific medication-treat product, support quick ordering, and make wholesale interest feel legitimate.",
    services: ["Shopify", "Product education", "Wholesale flow"],
    challenge:
      "The product solves a practical pet-care problem, so the site had to explain the benefit, ingredients, trust points, subscription path, and wholesale program without burying the purchase.",
    approach:
      "We built the experience around a direct product promise, quick ordering, clear why-it-works content, and a wholesale path for clinics and retail partners.",
    deliverables: [
      "Product education flow",
      "Quick order collection",
      "Wholesale landing page",
      "Story and trust pages",
    ],
    outcomes: [
      "Clearer product understanding",
      "Faster repeat ordering",
      "More credible wholesale path",
    ],
    metrics: [
      { label: "Priority", value: "Simple pet-care explanation" },
      { label: "Scope", value: "DTC + wholesale storefront" },
    ],
    media: [
      {
        src: "/images/project/medicrunch/01-home.jpg",
        alt: "Medi-Crunch homepage explaining dog medication treats",
      },
      {
        src: "/images/project/medicrunch/02-collection-quick-order.jpg",
        alt: "Medi-Crunch quick order collection page",
      },
      {
        src: "/images/project/medicrunch/03-product-treat-box.jpg",
        alt: "Medi-Crunch Treat Box product page with benefit details",
      },
      {
        src: "/images/project/medicrunch/04-why.jpg",
        alt: "Medi-Crunch why page explaining the medication treat product",
      },
      {
        src: "/images/project/medicrunch/05-wholesale.jpg",
        alt: "Medi-Crunch wholesale partner page",
      },
      {
        src: "/images/project/medicrunch/06-about.jpg",
        alt: "Medi-Crunch about page with founder story content",
      },
    ],
    coverImage: {
      src: "/images/project/medicrunch/cover.webp",
      alt: "Black lab sitting beside Medicrunch treat boxes on a blue set",
    },
    cardImage: {
      src: "/images/project/medicrunch/01-home.jpg",
      alt: "Medi-Crunch ecommerce case study card image",
    },
    logo: {
      src: "/images/project/medicrunch/logo-white.png",
      alt: "Medi-Crunch logo",
      width: 300,
      height: 52,
    },
    relatedSlug: "wellth-foods",
    externalUrl: "https://www.medicrunch.com/",
    seo: {
      title: "Medi-Crunch Case Study",
      description:
        "Medi-Crunch shows how Koala Studios shaped a pet health storefront around product education, quick ordering, and wholesale trust.",
      canonicalPath: "/work/medicrunch",
    },
  },
  {
    slug: "wellth-foods",
    status: "published",
    title: "Wellth Foods",
    client: "Wellth Foods",
    sector: "Functional food ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Food ecommerce", "Product education"],
    headline: "A polished food storefront built around product trust.",
    intro:
      "Wellth Foods shows how a focused Shopify experience can make a technical food product feel simple, premium, and easy to buy.",
    services: ["Shopify", "Product storytelling", "Wholesale support"],
    challenge:
      "High-protein, grain-free pasta has to earn trust quickly. The store needs to explain nutrition, ingredients, taste, wholesale availability, and where to buy without making the shopping path feel clinical.",
    approach:
      "We shaped the experience around clear product proof, simple collection browsing, strong nutrition education, and support pages that keep retail and wholesale audiences moving toward the next step.",
    deliverables: [
      "Homepage product positioning",
      "Product detail page",
      "Nutrition and story pages",
      "Wholesale and store-locator flows",
    ],
    outcomes: [
      "Stronger product credibility",
      "Cleaner path from education to purchase",
      "Better support for retail and wholesale discovery",
    ],
    metrics: [
      { label: "Priority", value: "Trust-first food shopping" },
      { label: "Scope", value: "DTC + wholesale storefront" },
    ],
    media: [
      {
        src: "/images/project/wellth-foods/01-home.jpg",
        alt: "Wellth Foods homepage presenting high protein healthy pasta",
      },
      {
        src: "/images/project/wellth-foods/02-our-story.jpg",
        alt: "Wellth Foods story page with product positioning and lifestyle imagery",
      },
      {
        src: "/images/project/wellth-foods/03-product-yellow-pea-pasta.jpg",
        alt: "Wellth Foods yellow pea pasta product page",
      },
      {
        src: "/images/project/wellth-foods/04-nutrition.jpg",
        alt: "Wellth Foods nutrition page explaining product benefits",
      },
      {
        src: "/images/project/wellth-foods/05-wholesale-partner.jpg",
        alt: "Wellth Foods wholesale partner page",
      },
      {
        src: "/images/project/wellth-foods/06-store-locator.jpg",
        alt: "Wellth Foods store locator page",
      },
    ],
    coverImage: {
      src: "/images/project/wellth-foods/cover.webp",
      alt: "Wellth Foods pasta boxes with rotini and spinach in the air",
    },
    cardImage: {
      src: "/images/project/wellth-foods/01-home.jpg",
      alt: "Wellth Foods ecommerce case study card image",
    },
    logo: {
      src: "/images/project/wellth-foods/logo-white.png",
      alt: "Wellth Foods logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "freezo",
    externalUrl: "https://wellth-foods.com/",
    seo: {
      title: "Wellth Foods Case Study",
      description:
        "Wellth Foods shows how Koala Studios shaped a food ecommerce storefront around product trust, nutrition education, quick ordering, and wholesale discovery.",
      canonicalPath: "/work/wellth-foods",
    },
  },
  {
    slug: "freezo",
    status: "published",
    title: "Freezo",
    client: "Freezo",
    sector: "Beverage ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Beverage", "Commercial sales"],
    headline: "An iced coffee storefront with retail and commercial range.",
    intro:
      "Freezo balances a bright at-home ordering experience with a credible commercial story for cafes, restaurants, and food-service buyers.",
    services: ["Shopify", "Product UX", "Commercial sales flow"],
    challenge:
      "The brand has to sell the everyday appeal of a blended iced coffee while also giving commercial buyers a more practical path to understand the offer and get in touch.",
    approach:
      "We kept the storefront visually refreshing and product-led, then gave the commercial side its own supporting page so consumer shoppers and business buyers both have a clear route.",
    deliverables: [
      "Homepage and product presentation",
      "Order-now collection",
      "Product education sections",
      "Commercial buyer page",
    ],
    outcomes: [
      "Clearer beverage merchandising",
      "More direct at-home purchase flow",
      "Stronger commercial inquiry support",
    ],
    metrics: [
      { label: "Priority", value: "Retail + commercial clarity" },
      { label: "Scope", value: "Storefront and buyer path" },
    ],
    media: [
      {
        src: "/images/project/freezo/01-home.jpg",
        alt: "Freezo homepage showing iced coffee product packaging",
      },
      {
        src: "/images/project/freezo/02-collection-order-now.jpg",
        alt: "Freezo order now collection page",
      },
      {
        src: "/images/project/freezo/03-product-details.jpg",
        alt: "Freezo product detail section with certifications and preparation steps",
      },
      {
        src: "/images/project/freezo/04-product-coffee-freezo.jpg",
        alt: "Freezo Classic product page with pack options",
      },
      {
        src: "/images/project/freezo/05-commercial.jpg",
        alt: "Freezo commercial sales page for business buyers",
      },
      {
        src: "/images/project/freezo/06-about.jpg",
        alt: "Freezo about page with brand story content",
      },
    ],
    coverImage: {
      src: "/images/project/freezo/cover.webp",
      alt: "Freezo coffee frappe mix pouch beside a finished frappe",
    },
    cardImage: {
      src: "/images/project/freezo/01-home.jpg",
      alt: "Freezo ecommerce case study card image",
    },
    logo: {
      src: "/images/project/freezo/logo.png",
      alt: "Freezo logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "hope-harvest",
    externalUrl: "https://www.drinkfreezo.com/",
    seo: {
      title: "Freezo Case Study",
      description:
        "Freezo shows how Koala Studios shaped a beverage ecommerce storefront around at-home ordering, product merchandising, and commercial buyer confidence.",
      canonicalPath: "/work/freezo",
    },
  },
  {
    slug: "hope-harvest",
    status: "published",
    title: "Hope Harvest",
    client: "Hope Harvest",
    sector: "Purpose-led food ecommerce",
    category: "Lifestyle",
    tags: ["Lifestyle", "Shopify", "Fundraising"],
    headline: "A purpose-led snack storefront with trust built in.",
    intro:
      "Hope Harvest connects snackable product merchandising with farmer stories, fundraising tools, and a mission customers can understand at a glance.",
    services: ["Shopify", "Mission storytelling", "Fundraising UX"],
    challenge:
      "The experience has to sell cashews, explain the purpose behind the brand, and support fundraising audiences without splitting the site into disconnected stories.",
    approach:
      "We organized the storefront around a clear snack offer, strong mission proof, farmer-story content, and fundraising pages that make the program feel simple to run and easy to share.",
    deliverables: [
      "Mission-led homepage",
      "Product detail page",
      "Farmer story page",
      "Fundraising program pages",
    ],
    outcomes: [
      "Stronger purpose-led positioning",
      "Clearer product and impact connection",
      "More usable fundraising journey",
    ],
    metrics: [
      { label: "Priority", value: "Product, story, and impact" },
      { label: "Scope", value: "Storefront + fundraiser flow" },
    ],
    media: [
      {
        src: "/images/project/hope-harvest/01-home.jpg",
        alt: "Hope Harvest homepage showing snack with purpose positioning",
      },
      {
        src: "/images/project/hope-harvest/02-product-cashews.jpg",
        alt: "Hope Harvest cashews product page",
      },
      {
        src: "/images/project/hope-harvest/03-farmer-stories.jpg",
        alt: "Hope Harvest farmer stories page",
      },
      {
        src: "/images/project/hope-harvest/04-fundraise.jpg",
        alt: "Hope Harvest fundraising page",
      },
      {
        src: "/images/project/hope-harvest/05-how-fundraiser-works.jpg",
        alt: "Hope Harvest how the fundraiser works page",
      },
      {
        src: "/images/project/hope-harvest/06-fundraising-toolkit.jpg",
        alt: "Hope Harvest fundraising toolkit page",
      },
    ],
    coverImage: {
      src: "/images/project/hope-harvest/cover.webp",
      alt: "Cashew farmer holding fresh cashews in the orchard",
    },
    cardImage: {
      src: "/images/project/hope-harvest/01-home.jpg",
      alt: "Hope Harvest ecommerce case study card image",
    },
    logo: {
      src: "/images/project/hope-harvest/logo.png",
      alt: "Hope Harvest logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "nosh-balls",
    externalUrl: "https://hopeharvest.ca/",
    seo: {
      title: "Hope Harvest Case Study",
      description:
        "Hope Harvest shows how Koala Studios shaped a purpose-led snack storefront around product clarity, farmer stories, and a fundraising journey.",
      canonicalPath: "/work/hope-harvest",
    },
  },
  {
    slug: "nosh-balls",
    status: "published",
    title: "Nosh Balls",
    client: "Nosh Balls",
    sector: "Natural snack ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Snack ecommerce", "Wholesale"],
    headline: "A clean snack catalog built for flavor, bundles, and wholesale.",
    intro:
      "Nosh Balls turns a playful snack lineup into a polished ecommerce experience with clear product discovery, bundle shopping, and wholesale support.",
    services: ["Shopify", "Catalog UX", "Wholesale support"],
    challenge:
      "A natural snack brand has to make flavor choice, grab-and-go formats, bundles, and partner inquiries easy to navigate while keeping the experience bright and appetizing.",
    approach:
      "We shaped the storefront around fast product scanning, clear collection paths, bundle merchandising, and a wholesale page that gives retail partners a confident next step.",
    deliverables: [
      "Snack collection structure",
      "Product detail pages",
      "Bundle shopping path",
      "Wholesale partner page",
    ],
    outcomes: [
      "Clearer flavor discovery",
      "Stronger bundle merchandising",
      "More credible wholesale path",
    ],
    metrics: [
      { label: "Priority", value: "Flavor choice + partner leads" },
      { label: "Scope", value: "DTC + wholesale storefront" },
    ],
    media: [
      {
        src: "/images/project/nosh-balls/01-home.jpg",
        alt: "Nosh Balls homepage with natural snack products",
      },
      {
        src: "/images/project/nosh-balls/02-collection-all-products.jpg",
        alt: "Nosh Balls all products collection page",
      },
      {
        src: "/images/project/nosh-balls/03-collection-grab-go.jpg",
        alt: "Nosh Balls grab and go collection page",
      },
      {
        src: "/images/project/nosh-balls/04-product-hazelbomb.jpg",
        alt: "Nosh Balls Hazelbomb product page",
      },
      {
        src: "/images/project/nosh-balls/05-product-mix-match-bundle.jpg",
        alt: "Nosh Balls mix and match bundle product page",
      },
      {
        src: "/images/project/nosh-balls/06-wholesale-partner.jpg",
        alt: "Nosh Balls wholesale partner page",
      },
    ],
    coverImage: {
      src: "/images/project/nosh-balls/cover.webp",
      alt: "Nosh Balls cookie dough pouch with energy bites on a teal set",
    },
    cardImage: {
      src: "/images/project/nosh-balls/01-home.jpg",
      alt: "Nosh Balls ecommerce case study card image",
    },
    logo: {
      src: "/images/project/nosh-balls/logo.png",
      alt: "Nosh Balls logo",
      width: 220,
      height: 80,
    },
    relatedSlug: "wuxly",
    externalUrl: "https://www.noshballs.ca/",
    seo: {
      title: "Nosh Balls Case Study",
      description:
        "Nosh Balls shows how Koala Studios shaped a natural snack storefront around flavor discovery, bundle merchandising, and wholesale partner support.",
      canonicalPath: "/work/nosh-balls",
    },
  },
  {
    slug: "wuxly",
    status: "published",
    title: "Wuxly",
    client: "Wuxly",
    sector: "Canadian outerwear ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Outerwear", "Made in Canada"],
    headline: "A performance outerwear storefront built around proof and provenance.",
    intro:
      "Wuxly brings Canadian-made, animal-free outerwear into a technical ecommerce experience where warmth, materials, certification, and product confidence work together.",
    services: ["Shopify", "Catalog UX", "Product storytelling"],
    challenge:
      "Performance outerwear has to make warmth, fit, materials, manufacturing standards, and price feel credible before a shopper can confidently choose a parka or jacket.",
    approach:
      "We structured the storefront around fast gender and collection paths, temperature-led product proof, Canadian manufacturing, materials education, and detailed product pages that carry technical credibility without losing the fashion story.",
    deliverables: [
      "Homepage and collection architecture",
      "Product merchandising system",
      "Materials and certification story",
      "Brand and provenance pages",
    ],
    outcomes: [
      "Clearer outerwear discovery",
      "Stronger performance and quality proof",
      "More confident path from story to product",
    ],
    metrics: [
      { label: "Priority", value: "Performance + provenance" },
      { label: "Scope", value: "DTC outerwear storefront" },
    ],
    media: [
      {
        src: "/images/project/wuxly/01-home.jpg",
        alt: "Wuxly consumer outerwear homepage with performance-led campaign imagery",
      },
      {
        src: "/images/project/wuxly/02-collection-womens.jpg",
        alt: "Wuxly women's outerwear collection and filtering experience",
      },
      {
        src: "/images/project/wuxly/03-collection-mens.jpg",
        alt: "Wuxly men's outerwear collection and product merchandising",
      },
      {
        src: "/images/project/wuxly/04-product-union-parka.jpg",
        alt: "Wuxly Union Parka product page with product gallery and buying options",
      },
      {
        src: "/images/project/wuxly/05-materials.jpg",
        alt: "Wuxly materials page explaining insulation and Canadian manufacturing standards",
      },
      {
        src: "/images/project/wuxly/06-our-story.jpg",
        alt: "Wuxly apparel brand story page with Canadian outerwear imagery",
      },
    ],
    coverImage: {
      src: "/images/project/wuxly/cover.webp",
      alt: "Model in a Wuxly jacket against a limestone wall",
    },
    cardImage: {
      src: "/images/project/wuxly/01-home.jpg",
      alt: "Wuxly consumer outerwear ecommerce case study card image",
    },
    relatedSlug: "magnum",
    externalUrl: "https://wuxly.com/",
    seo: {
      title: "Wuxly Case Study",
      description:
        "Wuxly shows how Koala Studios shaped a Canadian outerwear storefront around technical product proof, collection discovery, materials education, and Made-in-Canada credibility.",
      canonicalPath: "/work/wuxly",
    },
  },
];
