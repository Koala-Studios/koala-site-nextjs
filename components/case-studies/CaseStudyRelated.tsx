import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
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
        <p>Next</p>
        {related ? (
          <>
            <h2 id="case-study-next-title">{related.title}</h2>
            <Link className={styles.cta} href={getCaseStudyPath(related.slug)}>
              <span className={styles.ctaIcon} aria-hidden="true">
                <ArrowIcon />
              </span>
              <span>Read next case</span>
            </Link>
          </>
        ) : (
          <>
            <h2 id="case-study-next-title">More work after {current.title}</h2>
            <Link className={styles.cta} href="/work">
              <span className={styles.ctaIcon} aria-hidden="true">
                <ArrowIcon />
              </span>
              <span>Back to work</span>
            </Link>
          </>
        )}
      </Reveal>

      {related && relatedImage ? (
        <Reveal className={styles.imageWrap} delay={0.08}>
          <Image
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
