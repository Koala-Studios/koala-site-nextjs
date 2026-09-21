"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/lib/analytics";
import { trackEvent } from "@/lib/gtag";
import { attributionEventParams } from "@/lib/attribution";

// One delegated listener tracks every CTA tagged with `data-analytics-cta`
// (header, hero, footer marquee, …) without each call site wiring its own
// handler — and without forcing the shared Cta into a client boundary.
export function CtaAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const direct = target?.closest<HTMLElement>("[data-contact-method]");
      if (direct) {
        trackEvent({ action: direct.dataset.contactMethod === "phone" ? "phone_click" : "email_click", category: "contact", label: "maya", params: attributionEventParams() });
        return;
      }
      const cta = target?.closest<HTMLElement>("[data-analytics-cta]");

      if (!cta) {
        return;
      }

      trackEvent({
        action: analyticsConfig.ctaEventName,
        category: "cta",
        label: cta.dataset.analyticsCta || "cta",
        params: attributionEventParams(),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
