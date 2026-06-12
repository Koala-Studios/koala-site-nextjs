import Image from "next/image";

import { MediaReveal } from "@/components/animation/MediaReveal";
import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import type { CaseStudyContent } from "@/lib/content";

import styles from "./CaseStudyStory.module.css";

type CaseStudyStoryProps = {
  caseStudy: CaseStudyContent;
};

export function CaseStudyStory({ caseStudy }: CaseStudyStoryProps) {
  const supportingMedia = caseStudy.media.slice(1);

  return (
    <div className={styles.story}>
      <section
        className={styles.statement}
        aria-label={`${caseStudy.title} case study summary`}
      >
        <AmbientAccent
          className={styles.statementAccent}
          shape="icosphere"
          side="right"
          parallax={5}
          opacity={0.22}
        />
        <SplitReveal
          as="p"
          className={styles.statementText}
          text={caseStudy.intro}
        />
      </section>

      <section className={styles.split} aria-label="Case study details">
        <aside className={styles.rail}>
          <div className={styles.railInner}>
            <div className={styles.railBlock}>
              <span className="koala-label">Metrics</span>
              <dl className={styles.railMetrics}>
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={styles.railBlock}>
              <span className="koala-label">Deliverables</span>
              <ul className={styles.railList}>
                {caseStudy.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className={styles.narrative}>
          <Reveal className={styles.narrativeBlock}>
            <span className={styles.narrativeNumber}>01</span>
            <h2 className={styles.narrativeTitle}>The challenge</h2>
            <p className={styles.narrativeCopy}>{caseStudy.challenge}</p>
          </Reveal>
          <Reveal className={styles.narrativeBlock} delay={0.06}>
            <span className={styles.narrativeNumber}>02</span>
            <h2 className={styles.narrativeTitle}>The approach</h2>
            <p className={styles.narrativeCopy}>{caseStudy.approach}</p>
          </Reveal>
          <Reveal className={styles.narrativeBlock} delay={0.12}>
            <span className={styles.narrativeNumber}>03</span>
            <h2 className={styles.narrativeTitle}>The outcome</h2>
            <ul className={styles.outcomes}>
              {caseStudy.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {supportingMedia.length ? (
        <section
          className={styles.mediaFlow}
          aria-label={`${caseStudy.title} supporting media`}
        >
          {supportingMedia.map((media, index) => (
            <div
              className={`${styles.mediaItem} ${
                index % 2 === 1 ? styles.mediaItemOffset : ""
              }`}
              key={media.src}
            >
              <MediaReveal>
                <Parallax
                  className={`${styles.mediaFrame} ${
                    index % 2 === 1 ? styles.mediaFrameTall : ""
                  }`}
                  strength={7}
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 70vw"
                    style={{ objectFit: "cover" }}
                  />
                </Parallax>
              </MediaReveal>
              <span className={styles.mediaCaption}>{media.alt}</span>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
