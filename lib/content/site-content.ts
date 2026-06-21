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
    "Shopify stores, Meta ads, and email marketing for brands that want to grow.",
  url: "https://koalastudios.ca",
  locale: "en-CA",
  defaultSeo: {
    title: "Shopify Design, Meta Ads & Email Marketing Agency",
    description:
      "Koala Studios helps ecommerce brands redesign storefronts, build Shopify features, and improve the way customers move through the site.",
    canonicalPath: "/",
  },
  // Add real profile URLs before linking socially anywhere (see docs/launch-blockers.md).
  social: {},
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
        "Shopify design and build, Meta ad management, and email marketing for ecommerce brands. One team across the full funnel.",
      canonicalPath: "/services",
    },
    hero: {
      eyebrow: "Services",
      headline: "Design. Build. Grow.",
      summary:
        "Three ways to work with us: build the store, drive the traffic, keep the customers. Most brands start with one and grow into the rest.",
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
    slug: "ara",
    status: "published",
    title: "Ara",
    client: "Ara",
    sector: "Ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Design", "Content"],
    featured: true,
    headline: "A calmer product story for a niche coffee ritual.",
    intro: "Ara needed a premium page that explained the offer fast.",
    services: ["Design", "Frontend", "Content"],
    challenge:
      "The old page took too long to explain the product and why it deserved trust.",
    approach:
      "We centered the daily ritual, tightened the rhythm, and made proof easier to scan.",
    deliverables: ["Product story", "Benefit flow", "Mobile proof"],
    outcomes: ["Clearer offer", "Better mobile scanning", "More premium feel"],
    metrics: [
      { label: "Priority", value: "Product clarity" },
      { label: "Scope", value: "Launch-ready narrative" },
    ],
    media: [
      {
        src: "/images/project/ara/ara_hero.webp",
        alt: "Ara hero image showing the product in a premium coffee setting",
      },
      {
        src: "/images/project/ara/ara_plants.jpg",
        alt: "Ara product and ingredient story image",
      },
      {
        src: "/images/project/ara/ara_product_desktop.png",
        alt: "Ara desktop product page layout",
      },
    ],
    cardImage: {
      src: "/images/project/ara/ara_hero.webp",
      alt: "Ara ecommerce case study card image",
    },
    relatedSlug: "magnum",
    seo: {
      title: "Ara Case Study",
      description:
        "Ara shows how Koala Studios turns a product-heavy page into a clearer proof story.",
      canonicalPath: "/work/ara",
    },
  },
  {
    slug: "magnum",
    status: "published",
    title: "Magnum",
    client: "Magnum",
    sector: "Brand ecommerce",
    category: "Design",
    tags: ["Design", "Strategy", "Development"],
    featured: true,
    headline: "A bolder ecommerce story with cleaner proof.",
    intro: "Magnum needed a premium presentation without a wall of visuals.",
    services: ["Strategy", "Design system", "Build"],
    challenge:
      "The strongest proof was hard to find inside a spectacle-heavy page.",
    approach:
      "We edited the page into a clearer hierarchy with fewer, stronger moments.",
    deliverables: ["Editorial layout", "Proof flow", "Related work"],
    outcomes: ["Better scanning", "Clearer proof", "More polished feel"],
    metrics: [
      { label: "Priority", value: "System confidence" },
      { label: "Scope", value: "Editorial case study" },
    ],
    media: [
      {
        src: "/images/project/magnum/magnum_desktop_gym.png",
        alt: "Magnum brand hero image",
      },
      {
        src: "/images/project/magnum/product_page_desktop_magnum.png",
        alt: "Magnum desktop product page",
      },
      {
        src: "/images/project/magnum/product_list_magum.png",
        alt: "Magnum product listing page",
      },
    ],
    cardImage: {
      src: "/images/project/magnum/magnum_desktop_gym.png",
      alt: "Magnum ecommerce design case study card image",
    },
    relatedSlug: "nektr",
    seo: {
      title: "Magnum Case Study",
      description:
        "Magnum shows the redesigned case-study structure in a concise proof-first format.",
      canonicalPath: "/work/magnum",
    },
  },
  {
    slug: "nektr",
    status: "published",
    title: "Nektr",
    client: "Nektr",
    sector: "Food ecommerce",
    category: "Lifestyle",
    tags: ["Lifestyle", "Design", "Development"],
    featured: true,
    headline: "A disciplined browse path for an expressive product line.",
    intro: "Nektr needed energy without sacrificing mobile clarity.",
    services: ["Strategy", "Direction", "Frontend"],
    challenge:
      "Oversized media made the work expressive but harder to understand quickly.",
    approach:
      "We tightened the pacing and made each image support a specific point.",
    deliverables: ["Case narrative", "Proof modules", "Mobile media flow"],
    outcomes: [
      "Cleaner story flow",
      "Better mobile comprehension",
      "Stronger media hierarchy",
    ],
    metrics: [
      { label: "Priority", value: "Mobile-first proof" },
      { label: "Scope", value: "Story pacing" },
    ],
    media: [
      {
        src: "/images/project/nektr/wide_hero_new3_ps.jpg",
        alt: "Nektr hero image with a strong product landscape composition",
      },
      {
        src: "/images/project/nektr/mobile_hero.jpg",
        alt: "Nektr mobile hero composition",
      },
      {
        src: "/images/project/nektr/nektr_plate.png",
        alt: "Nektr product plate and nutrients image",
      },
    ],
    cardImage: {
      src: "/images/project/nektr/wide_hero_new3_ps.jpg",
      alt: "Nektr food and beverage ecommerce case study card image",
    },
    relatedSlug: "allo",
    seo: {
      title: "Nektr Case Study",
      description:
        "Nektr shows how Koala Studios reframes energetic brand work into a clearer proof story.",
      canonicalPath: "/work/nektr",
    },
  },
  {
    slug: "allo",
    status: "published",
    title: "Allo",
    client: "Allo",
    sector: "Wellness ecommerce",
    category: "Development",
    tags: ["Development", "Design", "Shopify"],
    headline: "A calmer product story with stronger proof.",
    intro: "Allo needed a curated page that felt premium at a glance.",
    services: ["Design system", "Frontend", "Conversion"],
    challenge:
      "The old presentation repeated too much and hid the strongest moments.",
    approach:
      "We narrowed the story to the visuals, outcomes, and service decisions that mattered.",
    deliverables: ["Editorial structure", "Selected media", "Outcome framing"],
    outcomes: [
      "Stronger visual hierarchy",
      "Less repetition",
      "Clearer conversion story",
    ],
    metrics: [
      { label: "Priority", value: "Product education" },
      { label: "Scope", value: "Conversion refinement" },
    ],
    media: [
      {
        src: "/images/project/allo/allo_image_wide.jpg",
        alt: "Allo hero image",
      },
      {
        src: "/images/project/allo/allo-product-desktop.png",
        alt: "Allo desktop product page",
      },
      {
        src: "/images/project/allo/vanilla_noncreamer.webp",
        alt: "Allo vanilla non-creamer product image",
      },
    ],
    cardImage: {
      src: "/images/project/allo/allo_image_wide.jpg",
      alt: "Allo wellness ecommerce case study card image",
    },
    relatedSlug: "stlth",
    seo: {
      title: "Allo Case Study",
      description:
        "Allo highlights a more curated, conversion-aware case-study structure for Koala Studios.",
      canonicalPath: "/work/allo",
    },
  },
  {
    slug: "stlth",
    status: "published",
    title: "Stlth",
    client: "Stlth",
    sector: "Consumer ecommerce",
    category: "Shopify",
    tags: ["Shopify", "Content", "Development"],
    headline: "A tighter long-form story for a bold consumer brand.",
    intro: "Stlth needed rhythm and proof without a heavy page.",
    services: ["Content", "Interaction", "Frontend"],
    challenge:
      "The previous version was too long, making the best evidence harder to extract.",
    approach: "We tightened the sequence from challenge to craft to outcome.",
    deliverables: [
      "Long-form pacing",
      "Results modules",
      "Related-work handoff",
    ],
    outcomes: [
      "Less reading fatigue",
      "Better section rhythm",
      "Sharper proof",
    ],
    metrics: [
      { label: "Priority", value: "Long-form rhythm" },
      { label: "Scope", value: "Proof density" },
    ],
    media: [
      {
        src: "/images/project/stlth/home-page-new-photo.png",
        alt: "Stlth homepage redesign image",
      },
      {
        src: "/images/project/stlth/stlth-device.jpg",
        alt: "Stlth device-focused product image",
      },
      {
        src: "/images/project/stlth/stlth-new-menu.png",
        alt: "Stlth navigation and menu design",
      },
    ],
    cardImage: {
      src: "/images/project/stlth/stlth_bg.jpg",
      alt: "Stlth product devices on a dark studio background",
    },
    relatedSlug: "elikai",
    seo: {
      title: "Stlth Case Study",
      description:
        "Stlth demonstrates a more disciplined long-form case-study structure for Koala Studios.",
      canonicalPath: "/work/stlth",
    },
  },
  {
    slug: "elikai",
    status: "published",
    title: "Elikai",
    client: "Elikai",
    sector: "Lifestyle ecommerce",
    category: "Lifestyle",
    tags: ["Lifestyle", "Design", "Development"],
    headline: "A quiet product presentation for daily-use lifestyle.",
    intro:
      "Elikai needed a calm product story led by material detail and use context.",
    services: ["Direction", "Storytelling", "Frontend"],
    challenge:
      "The visuals worked best when simple, but the use case still needed structure.",
    approach:
      "We treated imagery as lead proof and kept the surrounding language restrained.",
    deliverables: ["Image-led direction", "Product details", "Mobile flow"],
    outcomes: [
      "Calmer product hierarchy",
      "Clearer lifestyle context",
      "More balanced work index",
    ],
    metrics: [
      { label: "Priority", value: "Product context" },
      { label: "Scope", value: "Lifestyle presentation" },
    ],
    media: [
      {
        src: "/images/project/elikai/elikai_bg.jpg",
        alt: "Elikai lifestyle product collage in a calm bathroom setting",
      },
      {
        src: "/images/project/elikai/shot4_3_ps.jpg",
        alt: "Elikai product detail with pastel accessories on marble",
      },
      {
        src: "/images/project/elikai/water1_test1_ps.jpg",
        alt: "Elikai product detail shown with running water",
      },
    ],
    cardImage: {
      src: "/images/project/elikai_list.webp",
      alt: "Elikai lifestyle ecommerce case study card image",
    },
    relatedSlug: "ara",
    seo: {
      title: "Elikai Case Study",
      description:
        "Elikai shows a restrained lifestyle ecommerce presentation with image-led product context.",
      canonicalPath: "/work/elikai",
    },
  },
];
