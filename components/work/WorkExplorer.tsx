"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Parallax } from "@/components/animation/Parallax";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./WorkExplorer.module.css";

const categories = ["All", "Shopify", "Design", "Development", "Lifestyle"] as const;

type Category = (typeof categories)[number];
type ViewMode = "grid" | "index";

type WorkExplorerProps = {
  caseStudies: CaseStudyContent[];
};

function matchesCategory(caseStudy: CaseStudyContent, category: Category) {
  return (
    category === "All" ||
    caseStudy.category === category ||
    caseStudy.tags.includes(category)
  );
}

export function WorkExplorer({ caseStudies }: WorkExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const indexHostRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const map = new Map<Category, number>();

    for (const category of categories) {
      map.set(
        category,
        caseStudies.filter((caseStudy) => matchesCategory(caseStudy, category))
          .length
      );
    }

    return map;
  }, [caseStudies]);

  const filtered = useMemo(
    () =>
      caseStudies.filter((caseStudy) =>
        matchesCategory(caseStudy, activeCategory)
      ),
    [activeCategory, caseStudies]
  );

  useEffect(() => {
    const host = indexHostRef.current;
    const preview = previewRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!host || !preview || !finePointer || view !== "index") {
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      const ease = reducedMotion ? 1 : 0.12;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    frame = window.requestAnimationFrame(render);
    host.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", handleMove);
    };
  }, [view]);

  return (
    <>
      <div className={styles.controls}>
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
              <sup className={styles.filterCount}>{counts.get(category)}</sup>
            </button>
          ))}
        </div>

        <div className={styles.viewToggle} role="group" aria-label="Layout">
          <button
            className={`${styles.viewButton} ${
              view === "grid" ? styles.viewButtonActive : ""
            }`}
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`${styles.viewButton} ${
              view === "index" ? styles.viewButtonActive : ""
            }`}
            type="button"
            aria-pressed={view === "index"}
            onClick={() => setView("index")}
          >
            Index
          </button>
        </div>
      </div>

      {!filtered.length ? (
        <p className={styles.empty}>
          No published work is tagged for this category yet.
        </p>
      ) : view === "grid" ? (
        <div className={styles.grid} key={activeCategory}>
          {filtered.map((caseStudy, index) => {
            const cardImage = caseStudy.cardImage ?? caseStudy.media[0];
            const wide = index % 4 === 0 || index % 4 === 3;

            return (
              <Link
                className={`${styles.tile} ${wide ? styles.tileWide : ""}`}
                data-cursor="view"
                href={getCaseStudyPath(caseStudy.slug)}
                key={caseStudy.slug}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <Parallax
                  className={`${styles.tileMedia} ${
                    wide ? styles.tileMediaWide : ""
                  }`}
                  strength={6}
                >
                  {cardImage ? (
                    <Image
                      src={cardImage.src}
                      alt={cardImage.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 44vw"
                      priority={index === 0}
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                  <span className={styles.tileShade} aria-hidden="true" />
                </Parallax>
                <span className={styles.tileBar}>
                  <span className={styles.tileIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.tileTitle}>{caseStudy.title}</span>
                  <span className={styles.tileCategory}>
                    {caseStudy.category}
                  </span>
                  <span className={styles.tileArrow} aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className={styles.index}
          key={`index-${activeCategory}`}
          ref={indexHostRef}
          onPointerLeave={() => setActiveRow(null)}
        >
          <div
            aria-hidden="true"
            className={`${styles.preview} ${
              activeRow !== null ? styles.previewVisible : ""
            }`}
            ref={previewRef}
          >
            {filtered.map((caseStudy, index) => {
              const cardImage = caseStudy.cardImage ?? caseStudy.media[0];

              return cardImage ? (
                <Image
                  alt=""
                  className={`${styles.previewImage} ${
                    index === activeRow ? styles.previewImageActive : ""
                  }`}
                  height={300}
                  key={caseStudy.slug}
                  src={cardImage.src}
                  width={400}
                  unoptimized
                />
              ) : null;
            })}
          </div>

          {filtered.map((caseStudy, index) => (
            <Link
              className={styles.row}
              data-cursor="view"
              href={getCaseStudyPath(caseStudy.slug)}
              key={caseStudy.slug}
              onPointerEnter={() => setActiveRow(index)}
              onFocus={() => setActiveRow(index)}
              onBlur={() => setActiveRow(null)}
            >
              <span className={styles.rowIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.rowTitle}>{caseStudy.title}</span>
              <span className={styles.rowMeta}>{caseStudy.sector}</span>
              <span className={styles.rowCategory}>{caseStudy.category}</span>
              <span className={styles.rowArrow} aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.footerCta}>
        <p className={styles.footerNote}>
          {String(filtered.length).padStart(2, "0")} case
          {filtered.length === 1 ? "" : "s"} shown, more in production.
        </p>
        <Cta href="/contact" icon="circle" size="medium" variant="transparent">
          Start a project
        </Cta>
      </div>
    </>
  );
}
