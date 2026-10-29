import { RETENTION_MS } from "./attribution";

export const OPENAI_CLICK_KEY = "koala:openai-click:v1";
type ClickRef = { ref: string; at: number };
let memory: ClickRef | undefined;

// Opaque click identifiers stay separate from campaign labels and analytics.
// Session storage only: no Pixel, cookies, third-party calls or personal fields.
function token(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 2048 && /^[A-Za-z0-9_-]+={0,2}$/.test(value);
}

function valid(value: unknown, now: number): value is ClickRef {
  if (!value || typeof value !== "object") return false;
  const click = value as ClickRef;
  return token(click.ref) && Number.isFinite(click.at) && click.at <= now && now - click.at < RETENTION_MS;
}

export function readOpenAIClickRef(): string {
  if (typeof window === "undefined") return "";
  const now = Date.now();
  try {
    const raw = window.sessionStorage.getItem(OPENAI_CLICK_KEY);
    const stored: unknown = raw ? JSON.parse(raw) : memory;
    memory = valid(stored, now) ? stored : undefined;
  } catch {
    if (!valid(memory, now)) memory = undefined;
  }
  return memory?.ref ?? "";
}

export function captureOpenAIClickRef(): string {
  if (typeof window === "undefined") return "";
  const previous = readOpenAIClickRef();
  const value = new URL(window.location.href).searchParams.get("oppref");
  if (token(value) && value !== previous) {
    memory = { ref: value, at: Date.now() };
    try { window.sessionStorage.setItem(OPENAI_CLICK_KEY, JSON.stringify(memory)); } catch { /* In-memory fallback. */ }
  }
  return memory?.ref ?? "";
}

export function openAIClickFields(): Record<string, string> {
  return { oppref: captureOpenAIClickRef() };
}
