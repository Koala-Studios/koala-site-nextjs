import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import type { CaseStudyContent } from "@/lib/content";

import styles from "./CaseStudyStory.module.css";

type CaseStudyStoryProps = {
  caseStudy: CaseStudyContent;
};

export function CaseStudyStory({ caseStudy }: CaseStudyStoryProps) {
  const supportingMedia = caseStudy.media.slice(1);

  return (
    <div className={styles.story}>
      <section className={styles.summary} aria-label={`${caseStudy.title} case study summary`}>
        <Reveal className={styles.intro}>
          <p>{caseStudy.intro}</p>
        </Reveal>
        <Reveal className={styles.metrics} delay={0.08}>
          {caseStudy.metrics.map((metric) => (
            <div key={metric.label}>
              <span className="koala-label">{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </Reveal>
      </section>

      <section className={styles.narrative} aria-label="Challenge and approach">
        <Reveal className={styles.narrativeItem}>
          <span className="koala-label">Challenge</span>
          <p className="koala-muted-copy">{caseStudy.challenge}</p>
        </Reveal>
        <Reveal className={styles.narrativeItem} delay={0.08}>
          <span className="koala-label">Approach</span>
          <p className="koala-muted-copy">{caseStudy.approach}</p>
        </Reveal>
      </section>

      <section className={styles.lists} aria-label="Deliverables and outcomes">
        <Reveal className={styles.listGroup}>
          <span className="koala-label">Deliverables</span>
          <ul>
            {caseStudy.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className={styles.listGroup} delay={0.08}>
          <span className="koala-label">Outcomes</span>
          <ul>
            {caseStudy.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      {supportingMedia.length ? (
        <section className={styles.mediaGrid} aria-label={`${caseStudy.title} supporting media`}>
          {supportingMedia.map((media, index) => (
            <Reveal
              className={`${styles.mediaFrame} koala-media-frame`}
              key={media.src}
              delay={index * 0.04}
            >
              <Image
                className="koala-media-image"
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </Reveal>
          ))}
        </section>
      ) : null}
    </div>
  );
}
