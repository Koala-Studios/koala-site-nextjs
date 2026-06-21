import Image from "next/image";
import Link from "next/link";

import { Parallax } from "@/components/animation/Parallax";
import { SplitReveal } from "@/components/animation/SplitReveal";
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
      <div className={styles.stage}>
        <Parallax className={styles.media} strength={9}>
          {media ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </Parallax>
        <div className={styles.shade} aria-hidden="true" />

        <div className={styles.overlay}>
          <Link className={`${styles.back} koala-underline-link`} href="/work">
            <ArrowIcon direction="left" />
            All work
          </Link>

          <div className={styles.heading}>
            <SplitReveal
              as="h1"
              className={styles.title}
              id="case-study-title"
              text={caseStudy.title}
            />
            <p className={styles.headline}>{caseStudy.headline}</p>
          </div>
        </div>
      </div>

      <div
        className={styles.meta}
        aria-label={`${caseStudy.title} project summary`}
      >
        <div>
          <span className="koala-label">Client</span>
          <strong>{caseStudy.client}</strong>
        </div>
        <div>
          <span className="koala-label">Sector</span>
          <strong>{caseStudy.sector}</strong>
        </div>
        {focusMetric ? (
          <div>
            <span className="koala-label">Focus</span>
            <strong>{focusMetric.value}</strong>
          </div>
        ) : null}
        <div>
          <span className="koala-label">Services</span>
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
