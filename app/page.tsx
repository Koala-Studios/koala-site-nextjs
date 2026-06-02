import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import {
  ServiceIcon,
  type ServiceIconName,
} from "@/components/site/ServiceIcon";
import { HomeWorkCarousel } from "@/components/work/HomeWorkCarousel";
import { getPublishedCaseStudies } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Koala Studios | Ecommerce Design and Build",
  description:
    "Koala Studios designs and builds sharp ecommerce websites, Shopify storefronts, and visual systems for brands that need to stand out.",
  path: "/",
});

const services: { label: string; icon: ServiceIconName }[] = [
  { label: "Strategy", icon: "strategy" },
  { label: "Design", icon: "design" },
  { label: "Development", icon: "development" },
  { label: "Growth", icon: "growth" },
];

export default function Home() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <Reveal className={styles.heroText}>
          <h1 id="home-title">
            Web experiences <span>that move.</span>
          </h1>
          <Link className={styles.heroCta} href="/work">
            <span className={styles.heroCtaIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>View work</span>
          </Link>
        </Reveal>

        <Reveal className={styles.heroIntro} delay={0.08}>
          <div className={styles.heroImageWrap}>
            <Image
              className={styles.heroImage}
              src="/images/redesign/home/koala-home-hero-devices-v2.png"
              alt="Laptop and mobile ecommerce mockups created for Koala Studios"
              width={1586}
              height={992}
              sizes="(max-width: 900px) 100vw, 60vw"
              fetchPriority="high"
              priority
            />
            <span className={styles.heroDots} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>
        </Reveal>
      </section>

      <section className={styles.strip} aria-label="Services">
        {services.map((service) => (
          <span key={service.label}>
            <ServiceIcon name={service.icon} />
            {service.label}
          </span>
        ))}
      </section>

      <section className={styles.work} aria-labelledby="home-work-title">
        <Reveal className={styles.sectionHeading}>
          <h2 id="home-work-title">Featured Work</h2>
          <Link href="/work">See all cases</Link>
        </Reveal>
        <HomeWorkCarousel caseStudies={caseStudies} />
      </section>

      <section
        className={styles.splitSection}
        aria-labelledby="home-services-title"
      >
        <Reveal className={styles.splitCopy}>
          <h2 id="home-services-title">Design. Build. Launch.</h2>
          <Link className={styles.secondaryCta} href="/services">
            View services
            <ArrowIcon />
          </Link>
        </Reveal>
        <Reveal className={styles.splitImageWrap} delay={0.08}>
          <Image
            className={styles.splitImage}
            src="/images/redesign/services/koala-services-desk-1600.webp"
            alt="Agency desk setup showing design and code work"
            width={1600}
            height={900}
            sizes="(max-width: 900px) 100vw, 58vw"
            unoptimized
          />
        </Reveal>
      </section>

      <section className={styles.contact} aria-labelledby="home-contact-title">
        <Reveal className={styles.contactImageWrap}>
          <Image
            className={styles.contactImage}
            src="/images/redesign/contact/koala-contact-paper-plane-v4-1500.webp"
            alt="Paper plane visual representing a project inquiry"
            width={1500}
            height={938}
            loading="eager"
            sizes="(max-width: 900px) 100vw, 58vw"
            unoptimized
          />
        </Reveal>
        <Reveal className={styles.contactCopy} delay={0.08}>
          <h2 id="home-contact-title">Contact.</h2>
          <Link className={styles.primaryCta} href="/contact">
            <span className={styles.primaryCtaIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>Start your project</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
