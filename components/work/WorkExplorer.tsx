import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./WorkExplorer.module.css";

type WorkExplorerProps = {
  caseStudies: CaseStudyContent[];
};

export function WorkExplorer({ caseStudies }: WorkExplorerProps) {
  return (
    <>
      <div className={styles.grid}>
        {caseStudies.map((caseStudy, index) => {
          const cardImage = caseStudy.cardImage ?? caseStudy.media[0];

          return (
            <Link
              className={styles.tile}
              data-cursor="view"
              href={getCaseStudyPath(caseStudy.slug)}
              key={caseStudy.slug}
            >
              <span className={styles.tileMedia}>
                {cardImage ? (
                  <Image
                    src={cardImage.src}
                    alt={cardImage.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    priority={index === 0}
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
                <span className={styles.tileShade} aria-hidden="true" />
              </span>
              <span className={styles.caption}>
                <span className={styles.captionHead}>
                  <span className={styles.client}>{caseStudy.client}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </span>
                <span className={styles.tagline}>{caseStudy.headline}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
