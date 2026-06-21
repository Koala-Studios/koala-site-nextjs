export const GA_TRACKING_ID: string | undefined = "G-3BWBGYMGHR";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  sessionStorage?: Storage;
};

export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
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
}: AnalyticsEvent) {
  if (typeof window === "undefined") {
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
  });
}

const CONTACT_SUBMIT_PENDING_KEY = "koala:contact-submit-pending";

export function markPendingContactSubmit() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(CONTACT_SUBMIT_PENDING_KEY, "true");
  } catch {
    // Storage can be blocked; analytics should not prevent form submission.
  }
}

// The contact form is a native POST that navigates to /contact/success before a
// synchronous event reliably reaches GA, so the conversion is deferred: marked
// here and fired once the confirmation page reads (and clears) this flag.
export function consumePendingContactSubmit(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    if (window.sessionStorage.getItem(CONTACT_SUBMIT_PENDING_KEY)) {
      window.sessionStorage.removeItem(CONTACT_SUBMIT_PENDING_KEY);
      return true;
    }
  } catch {
    // Storage can be blocked; treat as no pending submit.
  }

  return false;
}
