"use client";

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

    // power2.out
    const animation = element.animate([{ transform: "translateY(8px)" }, { transform: "none" }], {
      duration: 250,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    });

    return () => {
      animation.cancel();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
