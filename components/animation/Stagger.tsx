"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useRef } from "react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  "aria-label"?: string;
};

/**
 * Fans its children in one after another once the group scrolls into view.
 * Content renders visible; it is only held back when the group starts below the
 * fold with motion allowed, so nothing hides without JavaScript. See `.ks-stagger` in globals.css.
 */
export function Stagger({ children, className, as: Tag = "div", ...rest }: StaggerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    [...element.children].forEach((child, index) => (child as HTMLElement).style.setProperty("--i", String(index)));
    element.dataset.stagger = "wait";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        element.dataset.stagger = "in";
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag className={["ks-stagger", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
