"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  /** Zero-pads to this many digits, e.g. 2 renders 6 as "06". */
  padTo?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

function format(value: number, padTo: number) {
  return String(Math.round(value)).padStart(padTo, "0");
}

/** Counts up from 0 when scrolled into view. */
export function CountUp({
  value,
  padTo = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = `${prefix}${format(value, padTo)}${suffix}`;
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          element.textContent = `${prefix}${format(value * eased, padTo)}${suffix}`;

          if (progress < 1) {
            frame = window.requestAnimationFrame(tick);
          }
        };

        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [duration, padTo, prefix, suffix, value]);

  return (
    <span className={className} ref={ref}>
      {prefix}
      {format(0, padTo)}
      {suffix}
    </span>
  );
}
