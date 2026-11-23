import { getCaseStudyPath } from "../routes";

import type { ResultItem } from "./types";

/*
 * Headline marketing results shown outside the case pages. Multiples and percentages only:
 * never dollar amounts, order counts or customer counts. Sources: our monthly reports and
 * live Klaviyo, Meta and Shopify reads, Nov 2026.
 */
const ironBrothers = { client: "Iron Brothers", href: getCaseStudyPath("iron-brothers-ads-and-email") };
const dilligaf = { client: "DILLIGAF", href: getCaseStudyPath("dilligaf") };

export const homeResults: ResultItem[] = [
  { value: "3.7×", label: "Monthly email revenue, July to October 2026", ...ironBrothers },
  { value: "3.95×", label: "Return on ad spend from the Full Send flash sale on Meta", ...ironBrothers },
  { value: "+57%", label: "Store conversion rate after we built their email program", ...dilligaf },
];

export const serviceResults: Record<string, ResultItem[]> = {
  "meta-ads-management": [
    { value: "3.95×", label: "Return on ad spend, Full Send flash sale, Sep 15 to 19", ...ironBrothers },
    { value: "+120%", label: "New-customer orders a month, July to October", ...ironBrothers },
    { value: "2.1×", label: "Monthly store sales with ads and email together", ...ironBrothers },
  ],
  "email-marketing": [
    { value: "3.7×", label: "Monthly email revenue, July to October 2026", ...ironBrothers },
    { value: "3.7×", label: "Email revenue in the first 30 days of five new flows", ...dilligaf },
    { value: "+57%", label: "Store conversion rate, 1.45% to 2.28%", ...dilligaf },
  ],
};
