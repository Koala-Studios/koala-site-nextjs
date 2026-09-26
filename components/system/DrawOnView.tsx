"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view; drives the line draw-in CSS. */
export function useDrawn(ref: RefObject<Element | null>, threshold = 0.35) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return drawn;
}

/** Wrapper whose `.ks-icon` strokes draw in once it is on screen. */
export function DrawOnView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const drawn = useDrawn(ref, 0.2);

  return (
    <div className={className} data-draw="" data-drawn={drawn || undefined} ref={ref}>
      {children}
    </div>
  );
}
