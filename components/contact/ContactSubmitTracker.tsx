"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/lib/analytics";
import { consumePendingContactSubmit, trackEvent } from "@/lib/gtag";

// Fires the deferred `contact_submit` conversion once the confirmation page
// loads, completing the flag set in ContactForm before the native form POST.
export function ContactSubmitTracker() {
  useEffect(() => {
    if (consumePendingContactSubmit()) {
      trackEvent({
        action: analyticsConfig.contactSubmitEventName,
        category: "contact",
        label: "contact form submit",
      });
    }
  }, []);

  return null;
}
