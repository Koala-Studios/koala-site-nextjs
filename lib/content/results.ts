import type { BlogBarChart, BlogLineChart, ContentStatus } from "./types";

/**
 * Client results for the home page and case studies. Growth only, as an index
 * or a percentage, never money. A result shows publicly once Frank has cleared
 * that client's number (`status: "published"`); drafts show only in a build
 * with NEXT_PUBLIC_SHOW_DRAFT_RESULTS=true, for review.
 */
export interface ClientResult {
  /** Case study slug the result belongs to. */
  slug: string;
  status: ContentStatus;
  /** The headline number, e.g. "+48%". */
  value: string;
  /** What the number counts, over what period. */
  label: string;
  chart?: BlogLineChart | BlogBarChart;
  /** Where the number comes from, when there is no chart to carry it. */
  source?: string;
}

// Candidates from Newton's Shopify and Klaviyo reads on 2026-10-27. The three
// single numbers are the ones already public on /maya (from Maya's CV). All
// wait for Frank's OK.
export const clientResults: ClientResult[] = [
  {
    slug: "mercato-di-bellina",
    status: "draft",
    value: "1% → 8%",
    label: "of store revenue now comes from the automated emails we built, a year after they went live",
    chart: {
      kind: "line",
      title: "Share of the store coming from automated emails",
      subtitle: "Welcome, cart, browse and post-purchase flows, by quarter",
      unit: { suffix: "%" },
      x: ["Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026"],
      series: [
        { name: "Share of revenue", values: [1, 6, 5, 6, 8] },
        { name: "Share of orders", values: [1, 7, 6, 9, 9] },
      ],
      source: { label: "Mercato di Bellina's Shopify and Klaviyo, Placed Order attribution" },
    },
  },
  {
    slug: "mercato-di-bellina",
    status: "draft",
    value: "+24%",
    label: "more online orders in the holiday quarter than the year before, with December up 36%",
    chart: {
      kind: "bar",
      title: "Online orders, Oct to Dec 2025",
      subtitle: "Each month against the same month of 2024 (2024 = 100)",
      rows: [
        { label: "October", value: 95 },
        { label: "November", value: 115 },
        { label: "December", value: 136, highlight: true },
      ],
      source: { label: "Mercato di Bellina's Shopify orders" },
    },
  },
  {
    slug: "iron-brothers",
    status: "draft",
    value: "+45%",
    label: "direct-to-consumer revenue",
  },
  {
    slug: "nosh-balls",
    status: "draft",
    value: "+37%",
    label: "online revenue within six months",
  },
  {
    slug: "whiskey-road",
    status: "draft",
    value: "+34%",
    label: "revenue within six months",
  },
];

const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFT_RESULTS === "true";

export function getVisibleResults(slug?: string) {
  return clientResults.filter(
    (result) => (result.status === "published" || showDrafts) && (!slug || result.slug === slug),
  );
}
