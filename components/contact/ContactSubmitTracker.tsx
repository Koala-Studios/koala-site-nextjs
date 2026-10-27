"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/lib/analytics";
import { consumePendingContactSubmit, trackEvent } from "@/lib/gtag";

// Fires the deferred conversion (`contact_submit` by default) once the
// confirmation page loads, completing the flag set by the form before it posts.
export function ContactSubmitTracker({
  action = analyticsConfig.contactSubmitEventName,
  label = "contact form submit",
}: { action?: string; label?: string }) {
  useEffect(() => {
    const params = consumePendingContactSubmit();
    if (params) {
      trackEvent({ action, category: "contact", label, params });
    }
  }, [action, label]);

  return null;
}
