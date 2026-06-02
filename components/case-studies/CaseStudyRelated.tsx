import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Cta } from "@/components/site/Cta";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./CaseStudyRelated.module.css";

type CaseStudyRelatedProps = {
  current: CaseStudyContent;
  related?: CaseStudyContent;
};

export function CaseStudyRelated({ current, related }: CaseStudyRelatedProps) {
  const relatedImage = related?.cardImage ?? related?.media[0];

  return (
    <section className={styles.related} aria-labelledby="case-study-next-title">
      <Reveal className={styles.copy}>
        <p className="koala-label">Next</p>
        {related ? (
          <>
            <h2 className="koala-section-title" id="case-study-next-title">{related.title}</h2>
            <Cta
              href={getCaseStudyPath(related.slug)}
              icon="circle"
              iconPosition="left"
              size="small"
              variant="outlined"
            >
              Read next case
            </Cta>
          </>
        ) : (
          <>
            <h2 className="koala-section-title" id="case-study-next-title">
              More work after {current.title}
            </h2>
            <Cta href="/work" icon="circle" iconPosition="left" size="small" variant="outlined">
              Back to work
            </Cta>
          </>
        )}
      </Reveal>

      {related && relatedImage ? (
        <Reveal className={`${styles.imageWrap} koala-media-frame`} delay={0.08}>
          <Image
            className="koala-media-image"
            src={relatedImage.src}
            alt={relatedImage.alt}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </Reveal>
      ) : null}
    </section>
  );
}
