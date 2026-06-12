"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max drift toward the cursor, in px. */
  pull?: number;
};

/** Makes its child drift toward the cursor and spring back on leave. */
export function Magnetic({ children, className, pull = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!element || !finePointer || reducedMotion) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(element, {
        x: relativeX * pull * 2,
        y: relativeY * pull * 2,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);
      gsap.killTweensOf(element);
    };
  }, [pull]);

  return (
    <div className={className} ref={ref} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
