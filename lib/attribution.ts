export const ATTRIBUTION_KEY = "koala:attribution:v1";
export const RETENTION_MS = 60 * 24 * 60 * 60 * 1000;

export type Touch = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  at: number;
};
export type Attribution = {
  first?: Touch;
  latest?: Touch;
  maya?: { at: number; evidence: string };
};

// Only campaign labels are retained, never whole URLs, queries, or form values.
function label(value: unknown): string {
  if (typeof value !== "string" || /@|https?:|%40/i.test(value)) return "";
  return value.replace(/[^a-zA-Z0-9_. -]/g, "").trim().slice(0, 100);
}

function validTime(at: unknown, now: number): at is number {
  return typeof at === "number" && Number.isFinite(at) && at <= now && now - at < RETENTION_MS;
}

export function pruneAttribution(value: unknown, now: number): Attribution {
  if (!value || typeof value !== "object") return {};
  const raw = value as Attribution;
  const result: Attribution = {};
  for (const key of ["first", "latest"] as const) {
    const touch = raw[key];
    if (touch && validTime(touch.at, now) && label(touch.source)) {
      result[key] = { source: label(touch.source), medium: label(touch.medium), campaign: label(touch.campaign), content: label(touch.content), at: touch.at };
    }
  }
  if (raw.maya && validTime(raw.maya.at, now) && label(raw.maya.evidence)) {
    result.maya = { at: raw.maya.at, evidence: label(raw.maya.evidence) };
  }
  return result;
}

export function updateAttribution(previous: unknown, href: string, referrer: string, now: number): Attribution {
  const result = pruneAttribution(previous, now);
  const url = new URL(href);
  const params = url.searchParams;
  let referringHost = "";
  try { referringHost = new URL(referrer).hostname.toLowerCase().replace(/^www\./, ""); } catch { /* No referrer. */ }
  const currentHost = url.hostname.toLowerCase().replace(/^www\./, "");
  const externalHost = referringHost !== currentHost && referringHost !== "koalastudios.ca" ? referringHost : "";
  const source = label(params.get("utm_source"));
  const campaign = source ? {
    source, medium: label(params.get("utm_medium")) || "referral",
    campaign: label(params.get("utm_campaign")), content: label(params.get("utm_content")), at: now,
  } : externalHost ? {
    source: externalHost === "mayaamani.com" ? "maya" : label(externalHost),
    medium: "referral", campaign: "", content: "", at: now,
  } : undefined;

  if (!result.first) result.first = campaign ?? { source: "direct", medium: "none", campaign: "", content: "", at: now };
  // Internal navigation and untagged return visits never erase a campaign.
  if (campaign) result.latest = campaign;
  else if (!result.latest) result.latest = result.first;

  const mayaCampaign = source.toLowerCase() === "maya";
  const mayaDomain = externalHost === "mayaamani.com";
  // A CTA from /maya is recorded as contact intent, not proof of acquisition.
  const mayaIntent = params.get("source") === "maya";
  if (mayaCampaign || mayaDomain) result.maya = { at: now, evidence: mayaCampaign ? "campaign" : "domain_referral" };
  else if (mayaIntent && !result.maya) result.maya = { at: now, evidence: "maya_contact_intent" };
  return result;
}

let memory: Attribution = {};
let capturedEntry = false;
let lastLocation = "";

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_KEY);
    memory = pruneAttribution(stored ? JSON.parse(stored) : memory, Date.now());
  } catch { memory = pruneAttribution(memory, Date.now()); }
  return memory;
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const previous = readAttribution();
  // Avoid refreshing timestamps on React re-renders of the same URL.
  if (capturedEntry && lastLocation === window.location.href) return previous;
  memory = updateAttribution(previous, window.location.href, capturedEntry ? "" : document.referrer, Date.now());
  capturedEntry = true;
  lastLocation = window.location.href;
  try { window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memory)); } catch { /* In-memory fallback; the form stays usable. */ }
  return memory;
}

export function attributionFields(value: Attribution): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of ["first", "latest"] as const) {
    const touch = value[key];
    for (const field of ["source", "medium", "campaign", "content"] as const) result[`${key}_${field}`] = touch?.[field] ?? "";
    result[`${key}_at`] = touch ? new Date(touch.at).toISOString() : "";
  }
  result.maya_associated = value.maya ? "yes" : "no";
  result.maya_evidence = value.maya?.evidence ?? "";
  result.maya_at = value.maya ? new Date(value.maya.at).toISOString() : "";
  return result;
}

export function attributionEventParams(value = readAttribution()): Record<string, string> {
  const { first_source, first_medium, first_campaign, latest_source, latest_medium, latest_campaign, maya_associated, maya_evidence } = attributionFields(value);
  return { first_source, first_medium, first_campaign, latest_source, latest_medium, latest_campaign, maya_associated, maya_evidence };
}
