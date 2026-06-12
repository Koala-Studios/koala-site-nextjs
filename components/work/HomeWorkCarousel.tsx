"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./HomeWorkCarousel.module.css";

type HomeWorkCarouselProps = {
  caseStudies: CaseStudyContent[];
};

type SwiperInstance = InstanceType<typeof SwiperCore>;

export function HomeWorkCarousel({ caseStudies }: HomeWorkCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(caseStudies.length <= 1);

  const syncNavigationState = useCallback((instance: SwiperInstance) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    const progressBar = progressRef.current;
    let isActive = true;
    const instance = new SwiperCore(carouselRef.current, {
      slidesPerView: "auto",
      spaceBetween: 24,
      watchOverflow: false,
      on: {
        afterInit: syncNavigationState,
        fromEdge: syncNavigationState,
        reachBeginning: syncNavigationState,
        reachEnd: syncNavigationState,
        slideChange: syncNavigationState,
        progress: (_instance, progress) => {
          if (progressBar) {
            const clamped = Math.min(Math.max(progress, 0), 1);
            progressBar.style.transform = `scaleX(${0.18 + clamped * 0.82})`;
          }
        },
      },
    });

    setSwiper(instance);
    syncNavigationState(instance);
    window.requestAnimationFrame(() => {
      if (!isActive || instance.destroyed) {
        return;
      }

      instance.update();
      syncNavigationState(instance);
    });

    return () => {
      isActive = false;
      instance.destroy(true, false);
      setSwiper(null);
    };
  }, [syncNavigationState]);

  return (
    <div className={styles.host} data-cursor="drag">
      <div className={`swiper ${styles.carousel}`} ref={carouselRef}>
        <div className="swiper-wrapper">
          {caseStudies.map((caseStudy, index) => {
            const image = caseStudy.cardImage ?? caseStudy.media[0];

            return (
              <div className={`swiper-slide ${styles.slide}`} key={caseStudy.slug}>
                <Link
                  className={styles.card}
                  data-cursor="view"
                  href={getCaseStudyPath(caseStudy.slug)}
                >
                  <span className={styles.media}>
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 700px) 86vw, 44rem"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                    <span className={styles.shade} aria-hidden="true" />
                    <span className={styles.headlineWrap} aria-hidden="true">
                      <span className={styles.headline}>
                        {caseStudy.headline}
                      </span>
                    </span>
                  </span>
                  <span className={styles.bar}>
                    <span className={styles.barIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.barTitle}>{caseStudy.title}</span>
                    <span className={styles.barCategory}>
                      {caseStudy.category}
                    </span>
                    <span className={styles.barArrow} aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} ref={progressRef} />
        </div>
        <div className={styles.controls} aria-label="Work carousel controls">
          <button
            className={styles.control}
            type="button"
            aria-label="Previous work"
            disabled={!swiper || isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className={styles.control}
            type="button"
            aria-label="Next work"
            disabled={!swiper || isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
