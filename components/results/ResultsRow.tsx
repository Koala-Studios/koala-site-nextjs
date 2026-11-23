import Link from "next/link";

import { MetricValue } from "@/components/animation/MetricValue";
import type { ResultItem } from "@/lib/content";

type ResultsRowProps = {
  items: ResultItem[];
  /** "row" sits the numbers side by side from tablet up; "stack" keeps them in one column. */
  layout?: "row" | "stack";
  /** Smaller numbers, for cards. */
  compact?: boolean;
  className?: string;
};

/** Big result numbers, each with one line saying what it measures. */
export function ResultsRow({ items, layout = "row", compact, className }: ResultsRowProps) {
  const classes = ["ks-results", layout === "stack" ? "ks-results--stack" : "", compact ? "ks-results--compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <dl className={classes}>
      {items.map((item) => (
        <div className="ks-results__item" key={`${item.value}-${item.label}`}>
          <dt className="ks-num ks-results__value">
            <MetricValue value={item.value} />
          </dt>
          <dd className="ks-results__label">
            {item.label}
            {item.client ? (
              item.href ? (
                <Link className="ks-results__client" href={item.href}>
                  {item.client} <span aria-hidden="true">↗</span>
                </Link>
              ) : (
                <span className="ks-results__client">{item.client}</span>
              )
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
