export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-3BWBGYMGHR";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  sessionStorage?: Storage;
};

export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  params?: Record<string, string>;
};

export const pageview = (url: string) => {
  const browserWindow = window as GtagWindow;

  browserWindow.gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  const browserWindow = window as GtagWindow;

  browserWindow.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export function trackEvent({
  action,
  category,
  label,
  value,
  params,
}: AnalyticsEvent) {
  if (typeof window === "undefined" || process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true") {
    return;
  }

  const browserWindow = window as GtagWindow;

  if (!browserWindow.gtag) {
    return;
  }

  browserWindow.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  });
}

const CONTACT_SUBMIT_PENDING_KEY = "koala:contact-submit-pending";

export function markPendingContactSubmit(params: Record<string, string> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(CONTACT_SUBMIT_PENDING_KEY, JSON.stringify({ params, at: Date.now() }));
  } catch {
    // Storage can be blocked; analytics should not prevent form submission.
  }
}

// Mark only after a successful form response. The confirmation page consumes
// the marker once so refreshes do not report duplicate conversions.
export function consumePendingContactSubmit(): Record<string, string> | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.sessionStorage.getItem(CONTACT_SUBMIT_PENDING_KEY);
    if (stored) {
      window.sessionStorage.removeItem(CONTACT_SUBMIT_PENDING_KEY);
      const pending = JSON.parse(stored);
      if (pending.at && Date.now() - pending.at < 10 * 60 * 1000) return pending.params;
    }
  } catch {
    // Storage can be blocked; treat as no pending submit.
  }

  return null;
}
