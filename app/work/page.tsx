import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Case Studies: Shopify Stores That Sell",
  description:
    "Selected Koala Studios case studies: Shopify storefront redesigns, brand systems, and ecommerce builds for consumer brands. Browse by category, then start your own.",
  path: "/work",
  keywords: [
    "Koala Studios work",
    "ecommerce case studies",
    "Shopify portfolio",
  ],
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className="koala-page koala-page--compact">
      <section
        className={`${styles.hero} koala-route-hero`}
        aria-labelledby="work-title"
      >
        <div className={styles.intro}>
          <SplitReveal
            accents={["shipped."]}
            as="h1"
            className="koala-page-title"
            id="work-title"
            text="Work we've shipped."
          />
        </div>
      </section>
      <div className={styles.explorerWrap}>
        <AmbientAccent
          className={`${styles.accent} ${styles.accentTop}`}
          shape="icosphere"
          side="right"
          parallax={9}
          opacity={0.24}
        />
        <AmbientAccent
          className={`${styles.accent} ${styles.accentMid}`}
          shape="torus"
          side="left"
          parallax={7}
          opacity={0.22}
        />
        <AmbientAccent
          className={`${styles.accent} ${styles.accentLow}`}
          shape="octa"
          side="right"
          parallax={8}
          opacity={0.24}
        />
        <Reveal>
          <WorkExplorer caseStudies={caseStudies} />
        </Reveal>
      </div>
    </div>
  );
}
