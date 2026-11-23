import Link from "next/link";

import { Cta } from "@/components/site/Cta";
import type { CaseStudyContent } from "@/lib/content";
import { getLeadCreative } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import { Creative } from "./Creative";
import { ResultsRow } from "./ResultsRow";
import styles from "./MarketingCase.module.css";

/** One marketing case on /work: who, what we ran, three numbers, and the real ads and emails. */
export function MarketingCase({ caseStudy, priority }: { caseStudy: CaseStudyContent; priority?: boolean }) {
  const path = getCaseStudyPath(caseStudy.slug);
  const lead = getLeadCreative(caseStudy);
  const second = caseStudy.creatives?.[1]?.items[0] ?? caseStudy.creatives?.[0]?.items[1];
  const creatives = [lead, second].filter((item) => item !== undefined);

  return (
    <article className={styles.case} aria-labelledby={`case-${caseStudy.slug}`}>
      <div className={styles.text}>
        <p className="ks-label">
          {caseStudy.sector} · {caseStudy.channels}
        </p>
        <h2 className={`ks-x ${styles.client}`} id={`case-${caseStudy.slug}`}>
          <Link href={path}>{caseStudy.client}</Link>
        </h2>
        <p className={`ks-it ${styles.headline}`}>{caseStudy.headline}</p>
        <ResultsRow className={styles.results} items={caseStudy.results ?? []} compact />
        <Cta className={styles.cta} href={path} variant="text">
          Read the case
        </Cta>
      </div>
      <Link className={styles.media} href={path} tabIndex={-1} aria-hidden="true">
        {creatives.map((item, index) => (
          <Creative item={item} key={item.src} aspect="4 / 5" bare priority={priority && index === 0} sizes="(max-width: 900px) 46vw, 22vw" />
        ))}
      </Link>
    </article>
  );
}
