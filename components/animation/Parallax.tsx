"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** yPercent travel of the inner layer while scrolling past. */
  strength?: number;
  style?: CSSProperties;
};

/**
 * Scrub parallax for fill images. The host needs an aspect ratio or height
 * from `className`; children (usually next/image with `fill`) render into an
 * oversized inner layer that drifts as the host scrolls through the viewport.
 */
export function Parallax({
  children,
  className,
  strength = 7,
  style,
}: ParallaxProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const inner = innerRef.current;

    if (
      !host ||
      !inner ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const animation = gsap.fromTo(
      inner,
      { yPercent: -strength },
      {
        yPercent: strength,
        ease: "none",
        scrollTrigger: {
          trigger: host,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [strength]);

  return (
    <div
      className={className}
      ref={hostRef}
      style={{ overflow: "hidden", position: "relative", ...style }}
    >
      <div
        ref={innerRef}
        style={{ position: "absolute", inset: "-14% 0" }}
      >
        {children}
      </div>
    </div>
  );
}
