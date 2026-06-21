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
import { FeaturedWork } from "@/components/work/FeaturedWork";
import { getPublishedCaseStudies, homepageTestimonials } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Shopify Design, Meta Ads & Email Marketing Agency",
  description:
    "Koala Studios is a Toronto ecommerce studio that designs and builds Shopify storefronts, runs Meta ad campaigns, and writes email programs for brands that want to grow. See the work, then start a project.",
  path: "/",
});

const heroWords = [
  "Shopify stores",
  "Meta ads",
  "email flows",
  "packaging",
  "3D renders",
  "brands",
];

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
    copy: "Storefronts designed around your product story and built clean. Fast pages, sharp systems, easy to run after launch.",
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
    copy: "Flows and campaigns that turn one-time buyers into repeat customers, designed, written, and wired into your store.",
    chips: ["Klaviyo", "Flows", "Campaigns", "Segmentation"],
    image: {
      src: "/images/project/ara/ara_hero.webp",
      alt: "Calm product story imagery used in email design",
    },
    href: "/services/email-marketing",
  },
  {
    number: "04",
    title: "Packaging & 3D renders",
    copy: "Label and packaging design paired with photoreal 3D product renders. Shelf-ready artwork and store-ready hero visuals, no photoshoot required.",
    chips: ["Label design", "Packaging", "3D renders", "Print files"],
    image: {
      src: "/images/project/nektr/nektr_plate.png",
      alt: "Product packaging and 3D render work",
    },
    href: "/services/packaging-and-3d-renders",
  },
];

const stats = [
  { value: 6, padTo: 2, label: "Published case studies" },
  { value: 4, padTo: 2, label: "Service lines, one team" },
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
                data-analytics-cta="hero"
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
        <AmbientAccent
          className={styles.clientsAccent}
          shape="icosphere"
          side="right"
          parallax={4}
        />
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

      <FeaturedWork caseStudies={caseStudies} id="home-work-title" />

      {/* <section
        className={styles.testimonials}
        aria-labelledby="home-testimonials-title"
      >
        <div className={styles.sectionHead}>
          <SplitReveal
            as="h2"
            className="koala-section-title"
            id="home-testimonials-title"
            text="Testimonials."
          />
        </div>
        <HomeTestimonialCarousel testimonials={homepageTestimonials} />
      </section> */}

      <section className={styles.contact} aria-labelledby="home-contact-title">
        <div className={styles.contactInner}>
          <div className={styles.contactCopy}>
            <SplitReveal
              accents={["sells."]}
              as="h2"
              className={styles.contactTitle}
              id="home-contact-title"
              text={"Let's build something\nthat sells."}
            />
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
