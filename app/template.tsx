"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

/** Remounts on navigation, giving every route a soft rise-in. */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
