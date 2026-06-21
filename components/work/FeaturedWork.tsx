import Link from "next/link";

import { SplitReveal } from "@/components/animation/SplitReveal";
import { HomeWorkCarousel } from "@/components/work/HomeWorkCarousel";
import type { CaseStudyContent } from "@/lib/content";

import styles from "./FeaturedWork.module.css";

type FeaturedWorkProps = {
  caseStudies: CaseStudyContent[];
  /** Unique heading id so aria-labelledby stays valid per page. */
  id?: string;
};

/**
 * The "Featured Work" slider section shared by the homepage and every service
 * page. Always shows the full set of published case studies passed in — we
 * build trust with the overall quality of the work, not a per-service filter.
 */
export function FeaturedWork({
  caseStudies,
  id = "featured-work-title",
}: FeaturedWorkProps) {
  return (
    <section className={styles.work} aria-labelledby={id}>
      <div className={styles.sectionHeadRow}>
        <div>
          <SplitReveal
            accents={["Work"]}
            as="h2"
            className="koala-section-title"
            id={id}
            text="Featured Work"
          />
        </div>
        <Link className={`${styles.sectionLink} koala-underline-link`} href="/work">
          See all cases
        </Link>
      </div>
      <HomeWorkCarousel caseStudies={caseStudies} />
    </section>
  );
}
