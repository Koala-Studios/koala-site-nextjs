import type { BlogIndexContent, BlogPostContent } from "./types";

export const blogIndexContent: BlogIndexContent = {
  seo: {
    title: "Journal: Notes From Our Ecommerce Store Audits",
    description:
      "Notes from Koala Studios store audits and client work: where Shopify stores lose the sale, and the small fixes that win it back.",
    canonicalPath: "/blog",
  },
  title: "Studio",
  titleAccent: "journal",
  lede: "What we find in store audits and client work, written up so you can fix it on your own store.",
  backLabel: "All journal posts",
};

/** Posts in publication order; the journal lists them newest first. */
export const blogPosts: BlogPostContent[] = [
  {
    slug: "supplement-store-sales-leaks",
    status: "published",
    title: "Where supplement stores",
    titleAccent: "lose the sale",
    summary:
      "We went through ten supplement and wellness stores on a phone, the way a first-time buyer shops. The same eight leaks came up again and again. Here’s what each one looks like, why it costs sales, and how to fix it on Shopify.",
    publishedAt: "2026-10-26",
    author: "Koala Studios",
    tags: ["Shopify", "Supplements", "Conversion", "Store audit", "Klaviyo"],
    sectionLabel: "Leak",
    whyHeading: "Why it costs sales",
    stepsHeading: "How to fix it",
    cover: {
      src: "/images/blog/supplement-store-sales-leaks.jpg",
      alt: "A phone showing a protein product page beside two protein tubs, a shaker, a shipping box and a receipt.",
      width: 1536,
      height: 1024,
    },
    intro: [
      "This month we audited ten supplement and wellness stores on Shopify. We didn’t run a tool over them. We opened each one on a phone and tried to buy, the way someone who just tapped an Instagram ad would.",
      "They were good brands: real products, real reviews and founders who clearly care. And most of them were losing sales in the same places. Not in the ads, and not because of the design, but in small gaps between what one page promises and what the shopper finds next.",
      "None of the fixes below needs a redesign or a new app. Each one is a change to a setting, a page, a link or an email, and each comes with a quick test you can run on your own store today.",
    ],
    map: {
      title: "Where the eight leaks sit on the buyer’s path",
      stages: [
        { label: "Homepage", note: "Where ads and links land", sectionIds: ["buy-now-sold-out", "link-to-a-draft"] },
        { label: "Guides", note: "Where shoppers decide", sectionIds: ["guide-to-product"] },
        {
          label: "Product page",
          note: "Where they choose and pay",
          sectionIds: ["two-delivery-promises", "sample-pack-best-seller", "totals-not-months", "choices-no-summary"],
        },
        { label: "After the order", note: "Where the second sale comes from", sectionIds: ["reorder-reminder"] },
      ],
    },
    takeaways: {
      title: "If you only have an hour, start here",
      items: [
        [{ text: "Make shipping say one thing", href: "#two-delivery-promises" }, " across the banner, product page, cart and checkout."],
        [{ text: "Tap every link on your homepage", href: "#link-to-a-draft" }, " and menu on your own phone."],
        [{ text: "Show a price per month", href: "#totals-not-months" }, " next to every option on your best seller."],
      ],
    },
    sections: [
      {
        id: "two-delivery-promises",
        number: "1",
        area: "Product page",
        fixTime: "30 minutes",
        heading: "Two delivery promises on one page",
        paragraphs: [
          "The banner at the top says free shipping on every order. Under the Add to cart button, the same page says free shipping over a threshold that one tub doesn’t reach. The shopper now has two answers to the one question they care about at that moment: what will this cost me in total?",
        ],
        figure: "shipping",
        why: [
          "Unexpected extra costs, shipping above all, are the reason shoppers give most often for leaving a checkout in Baymard Institute’s long-running checkout research. A contradiction is worse than a surprise: the shopper starts to wonder what else on the page isn’t true.",
          "It almost always happens by accident. A promotion ends, someone changes the shipping rate in settings, and the banner, a product description and a free-shipping bar app each keep their own copy of the old rule.",
        ],
        steps: [
          [{ text: "Decide the real rule first", strong: true }, ", in Settings → Shipping and delivery. That’s the one checkout will charge."],
          [{ text: "Update the announcement bar", strong: true }, " to match, in Online Store → Themes → Customize."],
          [{ text: "Search for old copies.", strong: true }, " Look through product descriptions and theme text for “free shipping” and “ships free”."],
          [{ text: "Match any cart app.", strong: true }, " If an app shows a free-shipping progress bar, set its threshold to the same number."],
          [{ text: "Say it once, under the price:", strong: true }, " “Free shipping over $75. You’re $26 away.”"],
        ],
        check:
          "Add one product to the cart on your phone and go to the last step before payment. The shipping line should be exactly what the banner promised.",
      },
      {
        id: "buy-now-sold-out",
        number: "2",
        area: "Homepage",
        fixTime: "20 minutes",
        heading: "A “Shop now” that lands on Sold out",
        paragraphs: [
          "The homepage sends people to a trial pack, and the trial pack is sold out. A starter bundle that suits the same buyer is on the same site, but nothing points to it. The shopper who was ready to try the brand meets a grey button and leaves.",
        ],
        figure: "soldOut",
        why: [
          "Homepage features are set once and forgotten, while stock changes every week. The most-clicked button on the store ends up pointing at the one thing nobody can buy, often while ads are still paying to send people there.",
        ],
        steps: [
          [{ text: "Swap the feature.", strong: true }, " When a featured product sells out, point the homepage block at something in stock."],
          [
            { text: "Turn the sold-out page into a bridge:", strong: true },
            " “The trial pack is back on November 12. Most people start with the Starter Bundle instead,” with a button to it.",
          ],
          [{ text: "Catch the people who wanted it.", strong: true }, " Klaviyo’s Back in Stock flow emails them the day it returns."],
          [{ text: "Set a low-stock alert", strong: true }, " for anything your homepage or your ads point to."],
        ],
        check: "Click every product your homepage and your running ads point to. Each one should be buyable today.",
      },
      {
        id: "link-to-a-draft",
        number: "3",
        area: "Navigation",
        fixTime: "10 minutes a month",
        heading: "A link that still points to a draft",
        paragraphs: [
          [
            "One homepage button went to an address ending in ",
            { text: "-draft", em: true },
            " and opened “Page not found”. The page had been republished under a new address, but the button still pointed at the old one.",
          ],
        ],
        figure: "deadLink",
        why: [
          "You can’t see this from the admin, where the button looks fine. Every shopper who taps it sees the error, and on a phone most of them don’t go back to look for another way in.",
        ],
        steps: [
          [{ text: "Tap everything, monthly.", strong: true }, " Open the store on your phone and tap every link on the homepage, in the menu and in the footer."],
          [{ text: "Fix links where they live:", strong: true }, " menus in Online Store → Navigation, section buttons in the theme editor."],
          [
            { text: "Redirect old addresses.", strong: true },
            " When a page or product changes address, add a URL redirect from the old one (search “URL redirects” in your Shopify admin).",
          ],
          [
            { text: "Let Google tell you.", strong: true },
            " If the store is in Google Search Console, its Pages report lists every address Google found returning “Not found (404)”.",
          ],
        ],
        check: "Ten minutes, once a month, on a phone. Put it in the calendar now.",
      },
      {
        id: "sample-pack-best-seller",
        number: "4",
        area: "Bundles",
        fixTime: "1 hour",
        heading: "The sample pack leaves out the best seller",
        paragraphs: [
          "A sample pack held four flavours, and the flavour with thousands of reviews wasn’t one of them. The reviews on the sample pack itself asked for more flavours: buyers telling the brand, in public, that the pack doesn’t do its job.",
        ],
        figure: "samplePack",
        why: [
          "A sample pack exists to turn a curious buyer into a regular one. If it leaves out the flavour most regulars buy, the person who would have loved it never tries it, and the second order goes somewhere else.",
        ],
        steps: [
          [{ text: "Put the best seller in.", strong: true }, " Even if it means dropping a slower flavour."],
          [{ text: "Point to the full size.", strong: true }, " A card in the box or a line on the page: “Liked one? Here’s the full tub.”"],
          [
            { text: "Ask which one they liked.", strong: true },
            " Email sample buyers a week after delivery with one button per flavour, each going to its full-size product.",
          ],
        ],
        check: "Compare the flavours in your sample with your top three sellers by orders. Most of them should overlap.",
      },
      {
        id: "totals-not-months",
        number: "5",
        area: "Product page",
        fixTime: "1–2 hours",
        heading: "Totals where the buyer thinks in months",
        paragraphs: [
          "Take a typical set of options: one-time at $45, subscribe at $40.50, or a 3-month supply at $114. The 3-month supply is the cheapest per month, at $38, but the page shows only its total, so it reads as the most expensive choice on the screen.",
        ],
        figure: "perMonth",
        why: [
          "People buying something they take every day think in cost per month. Asking them to do division on a phone asks them to stop and think, and the bigger number usually loses.",
        ],
        steps: [
          [{ text: "Show a monthly price", strong: true }, " (or a price per serving) under every option: “$38 a month”."],
          [{ text: "Mark the best value", strong: true }, " with the saving in dollars, not a percentage: “Save $21”."],
          [
            { text: "Check the app first.", strong: true },
            " If a subscription app draws the options, its settings may already offer a per-delivery or per-unit price.",
          ],
        ],
        check: "Can a shopper see which option is cheapest per month without doing any maths?",
      },
      {
        id: "choices-no-summary",
        number: "6",
        area: "Product page",
        fixTime: "1 hour",
        heading: "Too many choices, no summary",
        paragraphs: [
          "Flavour, size, one-time or subscribe, delivery frequency, plus a free gift. Five decisions spread down a long phone screen. By the time the shopper reaches Add to cart, everything they picked has scrolled out of sight.",
        ],
        figure: "summaryLine",
        why: [
          "Shoppers who can’t see what they picked scroll back up to check, which is where many of them drift off, or they add the wrong thing and turn into a refund or a support email.",
        ],
        steps: [
          [{ text: "Add one plain line", strong: true }, " right above the button that repeats the choices and the total: “2 tubs · Chocolate · every 4 weeks · $78”."],
          [{ text: "Keep it live.", strong: true }, " Update the line every time an option changes."],
          [{ text: "Use the same words in the cart", strong: true }, " so nothing changes between the page and checkout."],
        ],
        check: "Pick options on your phone and scroll to the button. Can you see everything you chose and what it costs?",
      },
      {
        id: "reorder-reminder",
        number: "7",
        area: "Email",
        fixTime: "2 hours, once",
        heading: "No reminder when the tub runs low",
        paragraphs: [
          "A tub lasts 30 days. Nothing reaches the customer around day 25: no reorder email, no nudge to subscribe. They run out, get busy, and either forget or pick something up at the pharmacy.",
        ],
        figure: "reorderEmail",
        why: [
          "For a consumable product, the second order is where the profit is. A reminder timed to the supply reaches people at the exact moment they need more, which is why it’s often one of the best-earning emails a supplement brand sends.",
        ],
        steps: [
          [{ text: "Start a flow in Klaviyo", strong: true }, " triggered by Placed Order."],
          [{ text: "Time it to the supply:", strong: true }, " the supply length minus five days. For a 30-day tub, wait 25 days."],
          [
            { text: "Filter it.", strong: true },
            " Send only to people who haven’t ordered again since the flow started, and leave out active subscribers.",
          ],
          [
            { text: "Keep it short:", strong: true },
            " the product they bought, “Running low?”, the one-time and subscription prices, and one button.",
          ],
          [{ text: "Branch by size.", strong: true }, " If you sell 30- and 90-day supplies, give each its own timing."],
        ],
        check: "Look at your Klaviyo flows. Is anything timed to when your customers run out?",
      },
      {
        id: "guide-to-product",
        number: "8",
        area: "Guides",
        fixTime: "30 minutes per guide",
        heading: "A great guide that doesn’t lead to the product",
        paragraphs: [
          "One brand had written a genuinely helpful guide to choosing between its products. By the end, the reader knew exactly which one suited them, and then the page simply ended. The matching starter pack was on another page, below the fold.",
        ],
        figure: "guideToProduct",
        why: [
          "A reader who finishes a buying guide is as ready to buy as anyone on your site. If the next step isn’t right there, the guide has done the selling and let them leave.",
        ],
        steps: [
          [
            { text: "End every guide with the product", strong: true },
            " it recommends, as a card: photo, what’s in the box, price and an Add to cart button.",
          ],
          [{ text: "One card per answer.", strong: true }, " If the guide recommends different products for different people, put each card under its answer."],
          [{ text: "Link both ways.", strong: true }, " On the product page: “Not sure which one? Read our guide.”"],
        ],
        check: "Open your three most-read guides or posts. Does each one end with something to buy?",
      },
      {
        id: "the-pattern",
        closing: true,
        heading: "None of these is a traffic problem",
        paragraphs: [
          "Every store we looked at had already paid to bring people in, through ads, email, influencers and word of mouth. The sales were lost in the last few seconds of the visit, in the gap between what one page promised and what the next one delivered.",
          "That’s good news. Closing those gaps doesn’t need a bigger ad budget, a redesign or another app. It needs someone to go through the store the way a buyer does and fix what they trip over.",
        ],
      },
    ],
    checklist: {
      title: "Your monthly store check",
      note: "Fifteen minutes on your phone, logged out, the way a new customer would shop.",
      items: [
        "Shipping says the same thing on the banner, product page, cart and checkout.",
        "Everything your homepage and ads link to is in stock.",
        "Every homepage, menu and footer link opens a real page.",
        "Your sample pack includes your best seller.",
        "Every option shows a price per month.",
        "A line above Add to cart repeats the shopper’s choices and total.",
        "A reorder email goes out before the supply runs out.",
        "Every guide ends with a product to buy.",
      ],
    },
    cta: {
      title: "Want us to go through your store?",
      text: "We’ll open it on a phone, try to buy, and send you what we find, with a fix for each one.",
      label: "Get in touch",
      href: "/contact",
    },
    signoff:
      "Koala Studios helps consumer brands with their Shopify store, Klaviyo email and Meta and Google ads, from Toronto.",
    seo: {
      title: "8 Places Supplement Stores Lose the Sale (and How to Fix Each)",
      description:
        "From 10 supplement store audits on a phone: the eight places Shopify stores lose the sale, with before-and-after examples and step-by-step fixes.",
      canonicalPath: "/blog/supplement-store-sales-leaks",
      ogImage: "/images/blog/supplement-store-sales-leaks-og.jpg",
    },
  },
];
