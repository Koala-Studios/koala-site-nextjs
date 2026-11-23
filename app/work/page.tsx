import type { Metadata } from "next";

import { MarketingCase } from "@/components/results/MarketingCase";
import { Folio } from "@/components/system";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorkSwitch } from "@/components/work/WorkSwitch";
import { getPublishedCaseStudies, isMarketingCase } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./work.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies: Shopify Stores, Meta Ads & Email Results",
  description:
    "Selected Koala Studios case studies: Shopify storefronts, packaging and 3D renders, plus Meta ads and Klaviyo email with their results, for food, supplement, wellness and lifestyle brands.",
  path: "/work",
  keywords: ["Koala Studios work", "ecommerce case studies", "Shopify portfolio", "Meta ads case study", "Klaviyo email case study"],
});

export default function WorkPage() {
  const caseStudies = getPublishedCaseStudies();
  const stores = caseStudies.filter((caseStudy) => !isMarketingCase(caseStudy));
  const marketing = caseStudies.filter(isMarketingCase);
  const brands = new Set(caseStudies.map((caseStudy) => caseStudy.client)).size;

  return (
    <div className="ks-page">
      <section className={styles.hero} aria-labelledby="work-title">
        <Folio items={["Koala Studios", `${brands} brands`, "Selected work"]} />
        <h1 className={`ks-x ks-split ${styles.title}`} id="work-title">
          <span>Selected</span> <em>work</em>
        </h1>
        <p className={`ks-lede ${styles.lede}`}>
          Storefronts, packaging, ads and email for <em>food, wellness</em> and lifestyle brands.
        </p>
      </section>
      <WorkSwitch
        counts={{ stores: stores.length, marketing: marketing.length }}
        stores={<WorkGrid caseStudies={stores} priorityCount={2} />}
        marketing={
          <div className={styles.marketingList}>
            {marketing.map((caseStudy) => (
              <MarketingCase caseStudy={caseStudy} key={caseStudy.slug} />
            ))}
          </div>
        }
      />
    </div>
  );
}
