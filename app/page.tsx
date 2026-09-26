import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { HeroReel } from "@/components/home/HeroReel";
import { BrandsBuiltFor } from "@/components/brands/BrandsBuiltFor";
import { Cta } from "@/components/site/Cta";
import { Arch, Folio, SectionHead } from "@/components/system";
import { Doodle } from "@/components/system/Doodle";
import { DrawOnView } from "@/components/system/DrawOnView";
import { Icon, serviceIcon } from "@/components/system/Icons";
import { LineArt } from "@/components/system/LineArt";
import { WorkGrid } from "@/components/work/WorkGrid";
import { servicesContent } from "@/content/pages/services";
import { getPublishedCaseStudies } from "@/lib/content";
import { auditOffer } from "@/lib/content/audit";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Design, Meta Ads & Email Marketing Agency",
  description:
    "Koala Studios is a Toronto ecommerce studio that designs and builds Shopify storefronts, packaging, 3D renders, Meta ads and email programs for consumer brands that want to grow. See the work, then start a project.",
  path: "/",
});

export default function Home() {
  const caseStudies = getPublishedCaseStudies().slice(0, 6);

  return (
    <div className="ks-page">
      <section aria-labelledby="home-title">
        <div className="ks-masthead-space" aria-hidden="true" />
        <Folio className={styles.folio} items={["Shopify · Packaging · Growth", "Toronto, Canada"]} />

        <h1 className={`ks-x ks-split ${styles.heroTitle}`} id="home-title">
          <span>Brands</span> <em>that sell.</em>
        </h1>
        <HeroReel
          className={styles.hero}
          label="Koala Studios reel: Shopify storefronts, product video and 3D work for Mercato di Bellina, Freezo, Wellth Foods, Whiskey Road and more"
        />
      </section>

      <section className={styles.intro} aria-label="The studio">
        <span className="ks-label">The studio</span>
        <div>
          <p className="ks-lede">
            We design and build <em>Shopify stores,</em> packaging, 3D renders and campaigns for consumer brands that want to{" "}
            <span className="ks-doodle-wrap">
              <em>sell more.</em>
              <Doodle className="ks-doodle-under" name="underline" />
            </span>
          </p>
          <div className={styles.actions}>
            <Cta href="/contact" data-analytics-cta="home-hero">
              Start a project
            </Cta>
            <Cta href="/work" variant="text">
              See the work
            </Cta>
          </div>
        </div>
      </section>

      <section className="ks-section" aria-labelledby="home-work-title">
        <SectionHead
          id="home-work-title"
          title={
            <>
              Selected <em>work</em>
            </>
          }
          aside={
            <span className={styles.workAside}>
              <Doodle name="arrow" />
              <Link className="ks-tlink" href="/work">
                All work <span aria-hidden="true">↗</span>
              </Link>
            </span>
          }
        />
        <WorkGrid caseStudies={caseStudies} variant="rail" />
      </section>

      <section className="ks-section" aria-labelledby="home-services-title">
        <SectionHead
          id="home-services-title"
          title={
            <>
              What we <em>do</em>
              <Doodle className="ks-doodle-spark" name="spark" />
            </>
          }
        />
        <div className={styles.services}>
          <Reveal className={styles.servicesArch}>
            <Arch src="/images/project/ara/ara_plants.jpg" alt="ÄRA protein coffee packaging among trailing plants" sizes="(max-width: 900px) 100vw, 36vw" />
            <Folio className={styles.archFolio} items={["ÄRA × Magnum", <em key="k" className="ks-it">Packaging</em>]} />
          </Reveal>
          <DrawOnView className="ks-index">
            {servicesContent.offerings.map((offering, index) => (
              <Link className={`ks-index__row ${styles.serviceRow}`} href={offering.href} key={offering.href} style={{ "--i": index } as CSSProperties}>
                <span className="ks-label">{offering.number}</span>
                <span>
                  <span className={styles.serviceTitle}>
                    <Icon name={serviceIcon(offering.href)} />
                    <span className="ks-x ks-index__name">{offering.title}</span>
                  </span>
                  <span className={styles.serviceCopy}>{offering.copy}</span>
                </span>
                <span className="ks-index__meta">{offering.kicker}</span>
              </Link>
            ))}
          </DrawOnView>
        </div>
      </section>

      <BrandsBuiltFor />

      <section className={`ks-section ${styles.audit}`} aria-labelledby="home-audit-title">
        <div className={styles.auditPanel}>
          <LineArt className={styles.auditArt} name="arches" />
          <span className="ks-label">{auditOffer.title}</span>
          <h2 className="ks-x ks-h2" id="home-audit-title">
            Not sure where <em>to start?</em>
          </h2>
          <p className="ks-body">{auditOffer.summary}</p>
          <Cta href={auditOffer.href} data-analytics-cta="home-audit">
            {auditOffer.cta}
          </Cta>
        </div>
      </section>
    </div>
  );
}
