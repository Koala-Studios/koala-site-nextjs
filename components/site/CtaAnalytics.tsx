"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/lib/analytics";
import { trackEvent } from "@/lib/gtag";

// One delegated listener tracks every CTA tagged with `data-analytics-cta`
// (header, hero, footer marquee, …) without each call site wiring its own
// handler — and without forcing the shared Cta into a client boundary.
export function CtaAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const cta = target?.closest<HTMLElement>("[data-analytics-cta]");

      if (!cta) {
        return;
      }

      trackEvent({
        action: analyticsConfig.ctaEventName,
        category: "cta",
        label: cta.dataset.analyticsCta || "cta",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
