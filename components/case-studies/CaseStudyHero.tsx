import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { CaseStudyContent } from "@/lib/content";

import styles from "./CaseStudyHero.module.css";

type CaseStudyHeroProps = {
  caseStudy: CaseStudyContent;
};

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const media = caseStudy.media[0];
  const focusMetric = caseStudy.metrics[0];

  return (
    <section className={styles.hero} aria-labelledby="case-study-title">
      <Reveal className={styles.copy}>
        <Link className={styles.backLink} href="/work">
          Back to work
          <ArrowIcon />
        </Link>
        <p className={styles.eyebrow}>{caseStudy.category}</p>
        <h1 id="case-study-title">{caseStudy.title}</h1>
        <p className={styles.headline}>{caseStudy.headline}</p>
      </Reveal>

      <Reveal className={styles.visual} delay={0.08}>
        {media ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        ) : null}
      </Reveal>

      <div className={styles.meta} aria-label={`${caseStudy.title} project summary`}>
        <div>
          <span>Sector</span>
          <strong>{caseStudy.sector}</strong>
        </div>
        {focusMetric ? (
          <div>
            <span>Focus</span>
            <strong>{focusMetric.value}</strong>
          </div>
        ) : null}
        <div>
          <span>Services</span>
          <strong className={styles.serviceList}>
            {caseStudy.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </strong>
        </div>
      </div>
    </section>
  );
}
