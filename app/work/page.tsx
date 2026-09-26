import type { Metadata } from "next";

import { Folio } from "@/components/system";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Case Studies: Shopify Stores That Sell",
  description:
    "Selected Koala Studios case studies: Shopify storefronts, packaging, 3D renders and brand systems for food, wellness and lifestyle brands.",
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
          Storefronts, packaging, 3D renders and campaigns for <em>food, wellness</em> and lifestyle brands.
        </p>
      </section>
      <WorkGrid caseStudies={caseStudies} priorityCount={2} />
    </div>
  );
}
