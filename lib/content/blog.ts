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
    title: "8 places supplement stores lose the sale",
    titleAccent: "(from 10 store audits)",
    summary:
      "We went through ten supplement and wellness stores on a phone, the way a first-time buyer would. Most were losing sales in the same handful of places.",
    publishedAt: "2026-10-26",
    author: "Koala Studios",
    tags: ["Shopify", "Supplements", "Conversion", "Store audit"],
    intro: [
      "This month we went through ten supplement and wellness stores, page by page, on a phone, the way a first-time buyer would. They were good brands: real products, real reviews, and people who clearly care. Most of them were still losing sales in the same handful of places.",
      "None of these fixes needs a redesign. Each one is a change to a page, an email or a link, and most take less than a day.",
    ],
    sections: [
      {
        id: "two-delivery-promises",
        number: "1",
        heading: "Two delivery promises on one page",
        paragraphs: [
          "A banner says free shipping on every order. Under the Add to cart button, the page says free shipping over a threshold that one pack doesn’t reach. A buyer who sees both stops trusting either.",
          [
            { text: "Fix:", strong: true },
            " pick one rule and show it in one place, right next to the price. Then check that the banner, the product page, the cart and the shipping settings all say the same thing.",
          ],
        ],
      },
      {
        id: "buy-now-sold-out",
        number: "2",
        heading: "A “Buy now” that lands on Sold out",
        paragraphs: [
          "The homepage sends people to a trial pack, and the trial pack is sold out. The next-best option is on the same page, but nothing points to it.",
          [
            { text: "Fix:", strong: true },
            " when a featured product sells out, change the button, or turn the product page into a bridge: “The trial is back on [date]. Most people start with this instead.”",
          ],
        ],
      },
      {
        id: "link-to-a-draft",
        number: "3",
        heading: "A link that still points to a draft page",
        paragraphs: [
          [
            "One homepage link went to a page address ending in ",
            { text: "-draft", em: true },
            " and opened a 404. It’s invisible from the admin and obvious to every shopper who clicks it.",
          ],
          [
            { text: "Fix:", strong: true },
            " once a month, click every link on the homepage and in the menu on a phone. It takes ten minutes.",
          ],
        ],
      },
      {
        id: "sample-pack-best-seller",
        number: "4",
        heading: "The sample pack leaves out the best seller",
        paragraphs: [
          "A sample pack holds four flavours, and the flavour with thousands of reviews isn’t one of them. The reviews on the sample pack ask for more flavours.",
          [
            { text: "Fix:", strong: true },
            " put the best seller in the sample, or give sample buyers a clear path to the full-size version of the flavour they liked best.",
          ],
        ],
      },
      {
        id: "totals-not-months",
        number: "5",
        heading: "Totals where a buyer thinks in months",
        paragraphs: [
          "A three-month supply shows only its total price, beside the one-time and subscription prices. The three-month option is actually the cheapest per month, but nobody does that maths in a product page.",
          [
            { text: "Fix:", strong: true },
            " show the price per month next to every option. Let the page do the division.",
          ],
        ],
      },
      {
        id: "choices-no-summary",
        number: "6",
        heading: "Too many choices with no summary",
        paragraphs: [
          "Flavour, quantity, one-time or subscription, plus a gift. By the time a buyer reaches Add to cart, they’ve lost track of what they picked.",
          [
            { text: "Fix:", strong: true },
            " one plain line beside the button that repeats their choice: “2 bags, Chocolate, every 4 weeks, $X.” It also reduces wrong-flavour orders.",
          ],
        ],
      },
      {
        id: "reorder-reminder",
        number: "7",
        heading: "No reminder when the tin runs low",
        paragraphs: [
          "A tin lasts 30 days, but there’s no email around day 25. The customer runs out, forgets and doesn’t come back.",
          [
            { text: "Fix:", strong: true },
            " a reorder email timed to the product’s supply, with the one-time and subscription prices and a single button. On a consumable product, it’s often the highest-earning email in the account.",
          ],
        ],
      },
      {
        id: "guide-to-product",
        number: "8",
        heading: "A great guide that doesn’t lead to the product",
        paragraphs: [
          "A brand writes a clear guide on which product to choose, and the matching starter pack sits a row below, out of sight.",
          [
            { text: "Fix:", strong: true },
            " end every guide with the product it recommends, shown in full: what’s in the box and the price, before the click.",
          ],
        ],
      },
      {
        id: "the-pattern",
        heading: "The pattern",
        paragraphs: [
          "None of these is a traffic problem. The brands already paid to bring those visitors in, through ads, email and word of mouth. The sale was lost in the last few seconds of the visit.",
          [
            "If you run a Shopify store and want a second pair of eyes on yours, we’ll go through it the same way and send you what we find. ",
            { text: "Get in touch", href: "/contact" },
            ".",
          ],
        ],
      },
    ],
    signoff:
      "Koala Studios helps consumer brands with their Shopify store, Klaviyo email and Meta and Google ads, from Toronto.",
    seo: {
      title: "8 Places Supplement Stores Lose the Sale",
      description:
        "From 10 supplement and wellness store audits on a phone: the eight places most stores lose the sale, and a fix for each that takes less than a day.",
      canonicalPath: "/blog/supplement-store-sales-leaks",
    },
  },
];
