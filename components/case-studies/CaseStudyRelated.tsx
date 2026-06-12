import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./CaseStudyRelated.module.css";

type CaseStudyRelatedProps = {
  current: CaseStudyContent;
  related?: CaseStudyContent;
};

export function CaseStudyRelated({ current, related }: CaseStudyRelatedProps) {
  const target = related ?? current;
  const href = related ? getCaseStudyPath(related.slug) : "/work";
  const image = target.cardImage ?? target.media[0];

  return (
    <section className={styles.related} aria-labelledby="case-study-next-title">
      <Link className={styles.banner} data-cursor="view" href={href}>
        {image ? (
          <Image
            className={styles.image}
            src={image.src}
            alt=""
            fill
            sizes="100vw"
          />
        ) : null}
        <span className={styles.shade} aria-hidden="true" />
        <span className={styles.content}>
          <span className="koala-eyebrow">
            {related ? "Next case" : "More work"}
          </span>
          <span className={styles.title} id="case-study-next-title">
            {related ? related.title : "Back to all work"}
          </span>
          {related ? (
            <span className={styles.headline}>{related.headline}</span>
          ) : null}
          <span className={styles.action}>
            {related ? "Read next case" : "Browse the index"}
            <span className={styles.actionArrow} aria-hidden="true">
              <ArrowIcon />
            </span>
          </span>
        </span>
      </Link>
    </section>
  );
}
