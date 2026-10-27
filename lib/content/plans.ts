/**
 * The monthly plans, worded as the audit decks word them (Newton's
 * marketing/pricing-and-estimates guide holds the prices). Publicly we show one
 * starting price; each plan's own fee is set on the call.
 */
export const plansContent = {
  title: "Three plans,",
  titleAccent: "month to month.",
  lede: "One small team runs your store, email and ads. Start with one plan and add the rest when it pays for itself.",
  startingPrice: "Plans start at 600 a month, billed in your store's currency.",
  plans: [
    {
      name: "Essentials",
      line: "Your Shopify store, run and improved.",
      points: [
        "A full store audit to start, turned into a ranked plan",
        "Store updates every month: products, banners, promos and fixes",
        "Conversion and search improvements from that plan",
        "A weekly store report and a monthly strategy call",
      ],
    },
    {
      name: "Meta ads",
      line: "Your Meta ads, run for you.",
      points: [
        "Campaigns, audiences and budgets managed",
        "New ad creative every month from your own products",
        "Spend moved to what sells, checked every week",
      ],
    },
    {
      name: "Growth",
      line: "Site, email and ads, working as one.",
      points: [
        "Everything in Essentials",
        "Email flows built and improved: welcome, cart, post-purchase and reorder",
        "Google and Meta ads run and improved every week",
        "A conversion test every month on a page or an email",
      ],
    },
  ],
  terms: [
    { title: "Month to month", copy: "No long contract. The accounts and the work stay yours." },
    { title: "Ad spend stays with you", copy: "Paid straight to Google and Meta. We agree a budget once we've seen what you spend today." },
  ],
} as const;
