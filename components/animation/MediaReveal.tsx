"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./MediaReveal.module.css";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wipes media in from the left with a settle-down scale once scrolled into
 * view. The observed host stays unclipped — clip-path zeroes an element's
 * intersection ratio in Chrome, so clipping lives on an inner layer.
 */
export function MediaReveal({ children, className }: MediaRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setActive(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.host} ${active ? styles.active : ""} ${className ?? ""}`}
      ref={ref}
    >
      <div className={styles.clip}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
