import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { WorkFilterGrid } from "@/components/work/WorkFilterGrid";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore selected Koala Studios ecommerce case studies by category, service focus, and proof story.",
  path: "/work",
  keywords: ["Koala Studios work", "ecommerce case studies", "Shopify portfolio"],
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="work-title">
        <Reveal className={styles.intro}>
          <h1 id="work-title">Work</h1>
        </Reveal>
      </section>
      <Reveal>
        <WorkFilterGrid caseStudies={caseStudies} />
      </Reveal>
    </div>
  );
}
