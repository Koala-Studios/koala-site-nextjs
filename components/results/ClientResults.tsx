import Link from "next/link";

import { PostMedia } from "@/components/blog/PostMedia";
import { getCaseStudyBySlug } from "@/lib/content";
import type { ClientResult } from "@/lib/content/results";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./ClientResults.module.css";

function Headline({ result, linked }: { result: ClientResult; linked: boolean }) {
  const client = getCaseStudyBySlug(result.slug)?.client ?? result.slug;
  return (
    <p className={styles.headline}>
      <span className={`ks-x ${styles.value}`}>{result.value}</span>
      <span className={styles.label}>
        {linked ? (
          <Link className="ks-tlink" href={getCaseStudyPath(result.slug)}>
            {client}
          </Link>
        ) : (
          client
        )}
        : {result.label}
      </span>
    </p>
  );
}

/**
 * Results with a chart sit two to a row; single numbers follow as a row of stats.
 * Case pages pass `linked={false}`.
 */
export function ClientResults({ results, linked = true }: { results: ClientResult[]; linked?: boolean }) {
  const charted = results.filter((result) => result.chart);
  const numbers = results.filter((result) => !result.chart);

  return (
    <div className={styles.wrap}>
      {charted.length ? (
        <div className={styles.grid}>
          {charted.map((result) => (
            <article className={styles.result} key={`${result.slug}-${result.value}`}>
              <Headline linked={linked} result={result} />
              {result.chart ? <PostMedia media={result.chart} /> : null}
            </article>
          ))}
        </div>
      ) : null}
      {numbers.length ? (
        <div className={styles.numbers}>
          {numbers.map((result) => (
            <article className={styles.number} key={`${result.slug}-${result.value}`}>
              <Headline linked={linked} result={result} />
              {result.source ? <p className={styles.source}>Source: {result.source}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
