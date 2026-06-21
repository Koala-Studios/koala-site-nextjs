"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./FunnelDiagram.module.css";

const stages = [
  {
    number: "01",
    label: "Build",
    title: "Shopify store",
    copy: "A storefront that earns trust at first scroll.",
  },
  {
    number: "02",
    label: "Traffic",
    title: "Meta ads",
    copy: "Creative that puts the product in the feed.",
  },
  {
    number: "03",
    label: "Retention",
    title: "Email flows",
    copy: "Flows that bring buyers back on autopilot.",
  },
] as const;

/** BUILD → TRAFFIC → RETENTION rail that draws itself in on scroll. */
export function FunnelDiagram() {
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
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Build, traffic, retention: one connected funnel"
      className={`${styles.funnel} ${active ? styles.active : ""}`}
      ref={ref}
      role="group"
    >
      {stages.map((stage, index) => (
        <div
          className={styles.stage}
          key={stage.number}
          style={{ transitionDelay: `${index * 180}ms` }}
        >
          <span className={styles.node} aria-hidden="true">
            <span className={styles.nodeDot} />
          </span>
          {index < stages.length - 1 ? (
            <span
              aria-hidden="true"
              className={styles.connector}
              style={{ transitionDelay: `${index * 180 + 140}ms` }}
            />
          ) : null}
          <span className={styles.stageLabel}>{stage.label}</span>
          <span className={styles.stageTitle}>{stage.title}</span>
        </div>
      ))}
    </div>
  );
}
