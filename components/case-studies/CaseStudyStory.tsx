import Image from "next/image";

import { MediaReveal } from "@/components/animation/MediaReveal";
import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import type { CaseStudyContent, CaseStudyMedia } from "@/lib/content";

import styles from "./CaseStudyStory.module.css";

type CaseStudyStoryProps = {
  caseStudy: CaseStudyContent;
};

type ChapterMediaProps = {
  chapterIndex: number;
  media: CaseStudyMedia[];
};

function ChapterMedia({ chapterIndex, media }: ChapterMediaProps) {
  if (!media.length) {
    return null;
  }

  return (
    <div className={styles.chapterMedia}>
      {media.map((item, index) => {
        const width = item.width ?? 1440;
        const height = item.height ?? 1100;
        const isPortrait = height > width;
        const isTallPortrait = isPortrait && width / height < 0.65;
        const sequenceIndex = chapterIndex + index * 3;

        return (
          <div
            className={`${styles.mediaItem} ${
              sequenceIndex % 2 === 1 && !isPortrait
                ? styles.mediaItemOffset
                : ""
            } ${isPortrait ? styles.mediaItemPortrait : ""} ${
              isTallPortrait ? styles.mediaItemTallPortrait : ""
            }`}
            key={item.src}
          >
            <MediaReveal>
              <div className={styles.mediaFrame}>
                <Image
                  className={styles.mediaImage}
                  src={item.src}
                  alt={item.alt}
                  width={width}
                  height={height}
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              </div>
            </MediaReveal>
            <span className={styles.mediaCaption}>{item.alt}</span>
          </div>
        );
      })}
    </div>
  );
}

export function CaseStudyStory({ caseStudy }: CaseStudyStoryProps) {
  const supportingMedia =
    caseStudy.heroImage && caseStudy.heroImage.src !== caseStudy.media[0]?.src
      ? caseStudy.media
      : caseStudy.media.slice(1);
  const mediaByChapter = [0, 1, 2].map((chapterIndex) =>
    supportingMedia.filter((_, index) => index % 3 === chapterIndex),
  );

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
          <section className={styles.chapter}>
            <Reveal className={styles.narrativeBlock}>
              <span className={styles.narrativeNumber}>01</span>
              <h2 className={styles.narrativeTitle}>The challenge</h2>
              <p className={styles.narrativeCopy}>{caseStudy.challenge}</p>
            </Reveal>
            <ChapterMedia chapterIndex={0} media={mediaByChapter[0]} />
          </section>

          <section className={styles.chapter}>
            <Reveal className={styles.narrativeBlock} delay={0.06}>
              <span className={styles.narrativeNumber}>02</span>
              <h2 className={styles.narrativeTitle}>The approach</h2>
              <p className={styles.narrativeCopy}>{caseStudy.approach}</p>
            </Reveal>
            <ChapterMedia chapterIndex={1} media={mediaByChapter[1]} />
          </section>

          <section className={styles.chapter}>
            <Reveal className={styles.narrativeBlock} delay={0.12}>
              <span className={styles.narrativeNumber}>03</span>
              <h2 className={styles.narrativeTitle}>The outcome</h2>
              <ul className={styles.outcomes}>
                {caseStudy.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <ChapterMedia chapterIndex={2} media={mediaByChapter[2]} />
          </section>
        </div>
      </section>
    </div>
  );
}
