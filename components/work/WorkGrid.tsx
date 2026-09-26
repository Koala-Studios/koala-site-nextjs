import Image from "next/image";
import Link from "next/link";

import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyCover } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./WorkGrid.module.css";

type WorkGridProps = {
  caseStudies: CaseStudyContent[];
  /** "index" is the full editorial grid; "rail" swipes on phones and sits in three columns on desktop. */
  variant?: "index" | "rail";
  priorityCount?: number;
};

export function WorkGrid({ caseStudies, variant = "index", priorityCount = 0 }: WorkGridProps) {
  return (
    <div className={variant === "rail" ? styles.rail : styles.grid}>
      {caseStudies.map((caseStudy, index) => {
        const { image, position } = getCaseStudyCover(caseStudy);
        const number = String(index + 1).padStart(2, "0");

        return (
          <Link className={styles.card} href={getCaseStudyPath(caseStudy.slug)} key={caseStudy.slug}>
            <span className={styles.media}>
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < priorityCount}
                  sizes={variant === "rail" ? "(max-width: 900px) 80vw, 30vw" : "(max-width: 900px) 100vw, 50vw"}
                  style={{ objectPosition: position }}
                />
              ) : null}
            </span>
            <span className={`ks-folio ks-label ${styles.meta}`}>
              <span>No. {number}</span>
              <span>{caseStudy.client}</span>
              <span className={styles.category}>{caseStudy.category}</span>
            </span>
            <span className={styles.headline}>{caseStudy.headline}</span>
          </Link>
        );
      })}
    </div>
  );
}
