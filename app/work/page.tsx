import type { Metadata } from "next";

import { Folio } from "@/components/system";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Case Studies: Shopify Stores That Sell",
  description:
    "Selected Koala Studios case studies: Shopify stores, email and ads for supplement, wellness and food brands, plus packaging and 3D work.",
  path: "/work",
  keywords: ["Koala Studios work", "ecommerce case studies", "Shopify portfolio"],
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className="ks-page">
      <section className={styles.hero} aria-labelledby="work-title">
        <Folio items={["Koala Studios", `${caseStudies.length} brands`, "Selected work"]} />
        <h1 className={`ks-x ks-split ${styles.title}`} id="work-title">
          <span>Selected</span> <em>work</em>
        </h1>
        <p className={`ks-lede ${styles.lede}`}>
          Stores, email and ads for <em>supplement, wellness</em> and food brands, plus the packaging they sell with.
        </p>
      </section>
      <WorkGrid caseStudies={caseStudies} priorityCount={2} />
    </div>
  );
}
