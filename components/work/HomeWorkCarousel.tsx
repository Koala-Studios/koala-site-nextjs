"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper";

import { Cta } from "@/components/site/Cta";
import type { CaseStudyContent } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./HomeWorkCarousel.module.css";

type HomeWorkCarouselProps = {
  caseStudies: CaseStudyContent[];
};

type SwiperInstance = InstanceType<typeof SwiperCore>;

export function HomeWorkCarousel({ caseStudies }: HomeWorkCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
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

    let isActive = true;
    const instance = new SwiperCore(carouselRef.current, {
      slidesPerView: "auto",
      spaceBetween: 18,
      watchOverflow: false,
      on: {
        afterInit: syncNavigationState,
        fromEdge: syncNavigationState,
        reachBeginning: syncNavigationState,
        reachEnd: syncNavigationState,
        slideChange: syncNavigationState,
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
    <div>
      <div className={`swiper ${styles.carousel}`} ref={carouselRef}>
        <div className="swiper-wrapper">
          {caseStudies.map((caseStudy) => {
            const image = caseStudy.cardImage ?? caseStudy.media[0];

            return (
              <div className={`swiper-slide ${styles.slide}`} key={caseStudy.slug}>
                <Link className="koala-work-tile" href={getCaseStudyPath(caseStudy.slug)}>
                  <span className="koala-work-tile__image">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 700px) 82vw, 34rem"
                      />
                    ) : null}
                  </span>
                  <span className="koala-work-tile__meta">
                    <strong>{caseStudy.title}</strong>
                    <span>{caseStudy.category}</span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls} aria-label="Work carousel controls">
        <Cta
          className="koala-work-prev"
          type="button"
          aria-label="Previous work"
          arrowDirection="left"
          disabled={!swiper || isBeginning}
          iconPosition="left"
          onClick={() => swiper?.slidePrev()}
          size="small"
          variant="outlined"
        >
          Previous
        </Cta>
        <Cta
          className="koala-work-next"
          type="button"
          aria-label="Next work"
          disabled={!swiper || isEnd}
          onClick={() => swiper?.slideNext()}
          size="small"
          variant="outlined"
        >
          Next
        </Cta>
      </div>
    </div>
  );
}
