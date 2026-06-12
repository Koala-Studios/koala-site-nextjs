import Link from "next/link";
import type { Metadata } from "next";

import { CountUp } from "@/components/animation/CountUp";
import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { CyclingWord } from "@/components/home/CyclingWord";
import { HeroField } from "@/components/home/HeroField";
import { HeroScene } from "@/components/home/HeroScene";
import type { ServicePillar } from "@/components/home/ServicePillars";
import { ServicePillars } from "@/components/home/ServicePillars";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { Marquee } from "@/components/site/Marquee";
import { RotatingBadge } from "@/components/site/RotatingBadge";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import { HomeTestimonialCarousel } from "@/components/testimonials/HomeTestimonialCarousel";
import { HomeWorkCarousel } from "@/components/work/HomeWorkCarousel";
import { getPublishedCaseStudies, homepageTestimonials } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Design, Meta Ads & Email Marketing Agency",
  description:
    "Koala Studios is a Toronto ecommerce studio that designs and builds Shopify storefronts, runs Meta ad campaigns, and writes email programs for brands that want to grow. See the work, then start a project.",
  path: "/",
});

const heroWords = ["Shopify stores", "Meta ads", "email flows", "brands"];

const marqueeItems = [
  "Shopify design & build",
  "Meta ad management",
  "Email marketing",
  "Brand & content",
  "Conversion design",
];

const pillars: ServicePillar[] = [
  {
    number: "01",
    title: "Shopify design & build",
    copy: "Storefronts designed around your product story and built clean — fast pages, sharp systems, easy to run after launch.",
    chips: ["Store design", "Theme build", "CRO", "Migrations"],
    image: {
      src: "/images/redesign/services/koala-services-desk-1600.webp",
      alt: "Shopify storefront design work on a studio desk",
    },
    href: "/services/shopify-design-and-build",
  },
  {
    number: "02",
    title: "Meta ad management",
    copy: "Creative-first campaigns on Facebook and Instagram. We design the ads, run the structure, and report in plain language.",
    chips: ["Creative", "Campaigns", "Testing", "Reporting"],
    image: {
      src: "/images/project/nektr/wide_hero_new3_ps.jpg",
      alt: "Bold ecommerce product creative",
    },
    href: "/services/meta-ads-management",
  },
  {
    number: "03",
    title: "Email marketing",
    copy: "Flows and campaigns that turn one-time buyers into repeat customers — designed, written, and wired into your store.",
    chips: ["Klaviyo", "Flows", "Campaigns", "Segmentation"],
    image: {
      src: "/images/project/ara/ara_hero.webp",
      alt: "Calm product story imagery used in email design",
    },
    href: "/services/email-marketing",
  },
];

const stats = [
  { value: 6, padTo: 2, label: "Published case studies" },
  { value: 3, padTo: 2, label: "Service lines, one team" },
  { value: 4, padTo: 2, label: "Steps from idea to launch" },
  { value: 2, padTo: 2, label: "Business days to a reply" },
];

export default function Home() {
  const caseStudies = getPublishedCaseStudies();

  return (
    <div className={`koala-page ${styles.homePage}`}>
      <section className={styles.hero} aria-labelledby="home-title">
        <HeroField />
        <div className={styles.heroInner}>
          <p className={`koala-eyebrow ${styles.heroEyebrow}`}>
            Ecommerce studio
          </p>
          <h1 id="home-title">
            <span className={styles.heroLineMask}>
              <span className={styles.heroLine}>
                We build <CyclingWord words={heroWords} />
              </span>
            </span>
            <span className={styles.heroLineMask}>
              <span className={`${styles.heroLine} ${styles.heroLineSecond}`}>
                that sell.
              </span>
            </span>
          </h1>
          <div className={styles.heroCtas}>
            <Magnetic>
              <Cta
                href="/work"
                icon="circle"
                iconPosition="left"
                size="large"
                variant="transparent"
              >
                See our work
              </Cta>
            </Magnetic>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <HeroScene />
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      <Marquee className={styles.marquee} duration={26}>
        {marqueeItems.map((item) => (
          <span className={styles.marqueeItem} key={item}>
            {item}
            <span className={styles.marqueeTick} aria-hidden="true" />
          </span>
        ))}
      </Marquee>

      <section className={styles.pillars} aria-labelledby="home-services-title">
        <div className={styles.sectionHead}>
          <p className="koala-eyebrow">What we do</p>
          <SplitReveal
            accents={["first", "repeat"]}
            as="h2"
            className="koala-section-title"
            id="home-services-title"
            text={"One team from first click\nto repeat order."}
          />
        </div>
        <ServicePillars pillars={pillars} />
      </section>

      <section className={styles.clients} aria-label="Brands we have built for">
        <p className={`koala-eyebrow ${styles.clientsEyebrow}`}>
          Brands we&apos;ve built for
        </p>
        <Marquee className={styles.clientsMarquee} duration={38}>
          {caseStudies.map((caseStudy) => (
            <span className={styles.clientMark} key={caseStudy.slug}>
              {caseStudy.client}
            </span>
          ))}
        </Marquee>
      </section>

      <section className={styles.work} aria-labelledby="home-work-title">
        <div className={styles.sectionHeadRow}>
          <div>
            <p className="koala-eyebrow">Selected work</p>
            <SplitReveal
              accents={["works."]}
              as="h2"
              className="koala-section-title"
              id="home-work-title"
              text="Work that works."
            />
          </div>
          <Link
            className={`${styles.sectionLink} koala-underline-link`}
            href="/work"
          >
            See all cases
          </Link>
        </div>
        <HomeWorkCarousel caseStudies={caseStudies} />
      </section>

      <section className={styles.stats} aria-label="Studio facts">
        <AmbientAccent
          className={styles.statsAccent}
          shape="icosphere"
          side="right"
          parallax={7}
        />
        {stats.map((stat, index) => (
          <Reveal className={styles.stat} delay={index * 0.06} key={stat.label}>
            <span className={styles.statValue}>
              <CountUp padTo={stat.padTo} value={stat.value} />
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </Reveal>
        ))}
      </section>

      <section
        className={styles.testimonials}
        aria-labelledby="home-testimonials-title"
      >
        <div className={styles.sectionHead}>
          <p className="koala-eyebrow">Kind words</p>
          <SplitReveal
            as="h2"
            className="koala-section-title"
            id="home-testimonials-title"
            text="Clients keep it simple."
          />
        </div>
        <HomeTestimonialCarousel testimonials={homepageTestimonials} />
      </section>

      <section className={styles.contact} aria-labelledby="home-contact-title">
        <div className={styles.contactInner}>
          <div className={styles.contactCopy}>
            <p className="koala-eyebrow">Next</p>
            <SplitReveal
              accents={["sells."]}
              as="h2"
              className={styles.contactTitle}
              id="home-contact-title"
              text={"Let's build something\nthat sells."}
            />
            <div className={styles.contactActions}>
              <Magnetic>
                <Cta
                  href="/contact"
                  icon="circle"
                  iconPosition="left"
                  size="large"
                  variant="transparent"
                >
                  Start your project
                </Cta>
              </Magnetic>
              <a
                className={`${styles.contactEmail} koala-underline-link`}
                href="mailto:hello@koalastudios.ca"
              >
                hello@koalastudios.ca
              </a>
            </div>
          </div>
          <Link
            aria-label="Start a project with Koala Studios"
            className={styles.contactBadge}
            data-cursor="open"
            href="/contact"
          >
            <RotatingBadge />
          </Link>
        </div>
      </section>
    </div>
  );
}
