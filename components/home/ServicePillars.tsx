"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";

import styles from "./ServicePillars.module.css";

export type ServicePillar = {
  number: string;
  title: string;
  copy: string;
  chips: string[];
  image: { src: string; alt: string };
  href: string;
};

type ServicePillarsProps = {
  pillars: ServicePillar[];
};

/**
 * Numbered service rows with a cursor-following image preview on fine
 * pointers. The preview is decorative; rows stay plain links.
 */
export function ServicePillars({ pillars }: ServicePillarsProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const preview = previewRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!host || !preview || !finePointer) {
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
  }, []);

  return (
    <div
      className={styles.host}
      ref={hostRef}
      onPointerLeave={() => setActiveIndex(null)}
    >
      <div
        aria-hidden="true"
        className={`${styles.preview} ${
          activeIndex !== null ? styles.previewVisible : ""
        }`}
        ref={previewRef}
      >
        {pillars.map((pillar, index) => (
          <Image
            alt=""
            className={`${styles.previewImage} ${
              index === activeIndex ? styles.previewImageActive : ""
            }`}
            height={300}
            key={pillar.number}
            src={pillar.image.src}
            width={400}
            unoptimized
          />
        ))}
      </div>

      {pillars.map((pillar, index) => (
        <Link
          className={styles.row}
          data-cursor="open"
          href={pillar.href}
          key={pillar.number}
          onPointerEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(null)}
        >
          <span className={styles.number}>{pillar.number}</span>
          <span className={styles.body}>
            <span className={styles.title}>{pillar.title}</span>
            <span className={styles.copy}>{pillar.copy}</span>
            <span className={styles.chips}>
              {pillar.chips.map((chip) => (
                <span className="koala-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </span>
          </span>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
}
