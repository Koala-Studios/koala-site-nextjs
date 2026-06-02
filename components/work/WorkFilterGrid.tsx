"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./WorkFilterGrid.module.css";

const categories = ["All", "Shopify", "Design", "Development", "Lifestyle"] as const;

type Category = (typeof categories)[number];

type WorkFilterGridProps = {
  caseStudies: CaseStudyContent[];
};

export function WorkFilterGrid({ caseStudies }: WorkFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredCaseStudies = useMemo(() => {
    if (activeCategory === "All") {
      return caseStudies;
    }

    return caseStudies.filter(
      (caseStudy) =>
        caseStudy.category === activeCategory ||
        caseStudy.tags.includes(activeCategory)
    );
  }, [activeCategory, caseStudies]);

  return (
    <>
      <div className={styles.filters} aria-label="Work categories">
        {categories.map((category) => (
          <button
            className={`${styles.filter} ${
              activeCategory === category ? styles.filterActive : ""
            }`}
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredCaseStudies.length ? (
        <div className={styles.grid}>
          {filteredCaseStudies.map((caseStudy, index) => {
            const cardImage = caseStudy.cardImage ?? caseStudy.media[0];
            const isPriorityImage = index === 0;

            return (
              <Link
                className={styles.item}
                href={getCaseStudyPath(caseStudy.slug)}
                key={caseStudy.slug}
              >
                <span className={styles.image}>
                  {cardImage ? (
                    <Image
                      src={cardImage.src}
                      alt={cardImage.alt}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 30vw"
                      priority={isPriorityImage}
                      fetchPriority={isPriorityImage ? "high" : undefined}
                    />
                  ) : null}
                </span>
                <span className={styles.meta}>
                  <strong>{caseStudy.title}</strong>
                  <span>{caseStudy.category}</span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className={styles.empty}>No published work is tagged for this category yet.</p>
      )}

      <div className={styles.footerCta}>
        <Link className={styles.footerLink} href="/contact">
          <span>Start a project</span>
          <span className={styles.footerIcon} aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </>
  );
}
