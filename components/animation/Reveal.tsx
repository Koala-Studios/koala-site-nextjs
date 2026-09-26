"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animation: Animation | undefined;
    element.style.transform = "translateY(24px)";

    // Rise once its top passes 88% of the viewport height.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        element.style.transform = "";
        // power3.out
        animation = element.animate([{ transform: "translateY(24px)" }, { transform: "none" }], {
          delay: delay * 1000,
          duration: 800,
          easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          fill: "backwards",
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
      element.style.transform = "";
    };
  }, [delay]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
