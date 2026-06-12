import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import { AmbientScene } from "@/components/three/AmbientScene";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Case Studies — Shopify Stores That Sell",
  description:
    "Selected Koala Studios case studies: Shopify storefront redesigns, brand systems, and ecommerce builds for consumer brands. Browse by category, then start your own.",
  path: "/work",
  keywords: ["Koala Studios work", "ecommerce case studies", "Shopify portfolio"],
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className="koala-page koala-page--compact">
      <section className={`${styles.hero} koala-route-hero`} aria-labelledby="work-title">
        <AmbientScene variant="frames" />
        <div className={styles.intro}>
          <p className="koala-eyebrow">Selected cases</p>
          <SplitReveal
            accents={["works."]}
            as="h1"
            className="koala-page-title"
            id="work-title"
            text="Work that works."
          />
          <Reveal delay={0.1}>
            <p className={styles.heroSummary}>
              Storefronts, campaigns, and brand systems for ecommerce &mdash;
              built to be looked at, then bought from.
            </p>
          </Reveal>
        </div>
      </section>
      <div className={styles.explorerWrap}>
        <AmbientAccent
          className={styles.explorerAccent}
          shape="octa"
          side="left"
          parallax={8}
          opacity={0.26}
        />
        <Reveal>
          <WorkExplorer caseStudies={caseStudies} />
        </Reveal>
      </div>
    </div>
  );
}
