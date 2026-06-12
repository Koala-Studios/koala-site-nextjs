"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType } from "react";
import { Fragment, useEffect, useRef } from "react";

import styles from "./SplitReveal.module.css";

type SplitRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words to render in the lime accent color. Case-insensitive, punctuation ignored. */
  accents?: string[];
  delay?: number;
  id?: string;
};

function normalizeWord(word: string) {
  return word.replace(/[^\w']/g, "").toLowerCase();
}

function isAccent(word: string, accents: string[]) {
  const normalized = normalizeWord(word);
  return accents.some((accent) => normalizeWord(accent) === normalized);
}

/**
 * Splits `text` into words and staggers them up on scroll.
 * Use "\n" inside `text` to force a line break.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  accents = [],
  delay = 0,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const words = element.querySelectorAll(`.${styles.word}`);
    const animation = gsap.fromTo(
      words,
      { yPercent: 112 },
      {
        yPercent: 0,
        delay,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, text]);

  const lines = text.split("\n");

  return (
    <Tag className={`${styles.host} ${className ?? ""}`} id={id} ref={ref}>
      {lines.map((line, lineIndex) => (
        <Fragment key={`${line}-${lineIndex}`}>
          {lineIndex > 0 ? <br /> : null}
          {line
            .split(/\s+/)
            .filter(Boolean)
            .map((word, wordIndex) => (
              <span className={styles.mask} key={`${word}-${wordIndex}`}>
                <span
                  className={`${styles.word} ${
                    isAccent(word, accents) ? styles.accent : ""
                  }`}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
        </Fragment>
      ))}
    </Tag>
  );
}
