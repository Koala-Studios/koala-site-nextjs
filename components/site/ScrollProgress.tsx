"use client";

import { useEffect, useRef } from "react";

import styles from "./ScrollProgress.module.css";

/** Thin lime bar under the header showing read progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;

    if (!bar) {
      return;
    }

    let frame = 0;

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(window.scrollY / max, 1);
      bar.style.transform = `scaleX(${progress})`;
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return <div aria-hidden="true" className={styles.bar} ref={ref} />;
}
