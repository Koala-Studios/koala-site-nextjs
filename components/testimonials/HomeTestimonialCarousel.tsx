"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import type { TestimonialContent } from "@/lib/content";

import styles from "./HomeTestimonialCarousel.module.css";

const ROTATE_MS = 6500;

type HomeTestimonialCarouselProps = {
  testimonials: TestimonialContent[];
};

/**
 * Single-quote spotlight. One oversized quote at a time, auto-advancing
 * with a progress line; arrows and dots take manual control.
 */
export function HomeTestimonialCarousel({
  testimonials,
}: HomeTestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<number>(0);
  const active = testimonials[index];

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + testimonials.length) % testimonials.length);
      setCycle((value) => value + 1);
    },
    [testimonials.length]
  );

  useEffect(() => {
    if (
      testimonials.length <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      goTo(index + 1);
    }, ROTATE_MS);

    return () => window.clearTimeout(timerRef.current);
  }, [cycle, goTo, index, testimonials.length]);

  if (!active) {
    return null;
  }

  return (
    <div className={styles.spotlight}>
      <span className={styles.glyph} aria-hidden="true">
        &ldquo;
      </span>

      <figure className={styles.figure} key={`${index}-${cycle}`}>
        <blockquote className={styles.quote}>
          <p>{active.quote}</p>
        </blockquote>
        <figcaption className={styles.author}>
          <strong>{active.author}</strong>
          <span>{active.role}</span>
        </figcaption>
      </figure>

      <div className={styles.footer}>
        <div
          className={styles.dots}
          role="group"
          aria-label="Choose testimonial"
        >
          {testimonials.map((testimonial, dotIndex) => (
            <button
              aria-label={`Testimonial ${dotIndex + 1}`}
              aria-pressed={dotIndex === index}
              className={`${styles.dot} ${
                dotIndex === index ? styles.dotActive : ""
              }`}
              key={`${testimonial.author}-${dotIndex}`}
              type="button"
              onClick={() => goTo(dotIndex)}
            >
              <span
                className={styles.dotProgress}
                key={dotIndex === index ? `progress-${cycle}` : "idle"}
              />
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.control}
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className={styles.control}
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
