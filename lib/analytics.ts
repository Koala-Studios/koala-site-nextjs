const measurementId =
  process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const analyticsConfig = {
  measurementId: measurementId?.trim() || null,
  plausibleDomain: plausibleDomain?.trim() || null,
  pageViewEventName: "page_view",
  ctaEventName: "cta_click",
  contactSubmitEventName: "contact_submit",
} as const;

export function isAnalyticsEnabled(): boolean {
  return Boolean(
    analyticsConfig.measurementId || analyticsConfig.plausibleDomain
  );
}

export function getAnalyticsProvider(): "google-analytics" | "plausible" | null {
  if (analyticsConfig.measurementId) {
    return "google-analytics";
  }

  if (analyticsConfig.plausibleDomain) {
    return "plausible";
  }

  return null;
}
