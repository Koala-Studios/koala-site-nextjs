import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import { getPageContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./about.module.css";

const aboutContent = getPageContent("about");

export const metadata: Metadata = createPageMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: aboutContent.seo.canonicalPath ?? "/about",
});

const values = [
  "Clarity",
  "Craft",
  "Momentum",
  "Clean handoff",
];

const steps = [
  "Frame",
  "Design",
  "Build",
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <Reveal className={styles.heroCopy}>
          <h1 id="about-title">About</h1>
        </Reveal>
        <Reveal className={styles.heroStatement} delay={0.08}>
          <p>{aboutContent.hero.headline}</p>
        </Reveal>
      </section>

      <svg
        className={styles.flightAccent}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 520 180"
      >
        <path
          className={styles.flightPath}
          d="M78 40 C148 92 206 12 290 58 C346 90 372 146 452 92"
        />
        <path
          className={styles.flightPlane}
          d="M42 18 L76 34 L50 42 L40 74 L30 40 L42 18 Z"
        />
      </svg>

      <section className={styles.imageSplit} aria-label="Koala Studios work style">
        <div className={styles.mediaPair}>
          <Reveal className={styles.imageWrap}>
            <Image
              className={styles.image}
              src="/images/redesign/about/koala-about-studio-interior.png"
              alt="Koala Studios studio interior with a Koala wall mark"
              width={1664}
              height={945}
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </Reveal>
          <Reveal className={styles.imageWrap} delay={0.04}>
            <Image
              className={styles.image}
              src="/images/redesign/about/koala-about-workshop.png"
              alt="Koala Studios project workshop reviewing ecommerce layouts"
              width={1672}
              height={941}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </Reveal>
        </div>
        <Reveal className={styles.imageCtaWrap} delay={0.08}>
          <Link className={styles.imageCta} href="/contact">
            <span className={styles.imageCtaIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
            <span>Start a project</span>
          </Link>
        </Reveal>
      </section>

      <section className={styles.values} aria-label="Studio values">
        {values.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </section>

      <section className={styles.process} aria-labelledby="about-process-title">
        <Reveal>
          <h2 id="about-process-title">How we work</h2>
          <p>{aboutContent.body.sections.find((section) => section.id === "process")?.copy}</p>
        </Reveal>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <Reveal className={styles.step} key={step} delay={index * 0.04}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
