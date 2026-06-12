# Koala Studios — Launch Readiness Report

Date: 2026-06-11 · Scope: audit only (no changes made this pass)
Goal: launch-ready site optimized for SEO and new-client conversion.

This report is based on a direct audit of the codebase, rendered pages
(Playwright, desktop + mobile), metadata/SEO plumbing, analytics wiring, and
the asset folder. Items are grouped by priority:

- **P0 — launch blockers**: bugs, correctness, embarrassments. Do before DNS.
- **P1 — SEO foundations**: do before or within days of launch; these decide
  whether the site can rank at all.
- **P2 — conversion**: turns visitors into inquiries; highest revenue impact.
- **P3 — performance & QA hardening**: protects everything above.

Estimates: S = under an hour, M = half-day, L = 1–3 days, XL = a week+.

---

## Scorecard (current state)

| Area | State |
| --- | --- |
| Visual design / brand | Strong — redesigned, distinctive, interactive |
| Technical SEO plumbing | Good bones (canonical, sitemap, robots, JSON-LD) with several real defects (titles, OG image, placeholders) |
| Content for search intent | Weak — one services page, thin case copy, no geo signals |
| Conversion proof | Weak — anonymous testimonials, no client logos, no outcome numbers |
| Analytics / measurement | Partial — GA4 wired, no Meta Pixel, no defined conversions |
| Performance | Unknown post-3D — last Lighthouse audit predates three.js work |
| Asset hygiene | Poor — 165 MB in `public/images`, much of it unreferenced |

---

## P0 — Launch blockers

### 1. Duplicated brand in page titles (S) — *bug, visible in every tab/SERP*
`buildPageTitle()` appends `| Koala Studios`, but several pages already
include the brand in the title they pass in. Live results:

- Home: `Koala Studios | Shopify Stores, Meta Ads, Email Marketing | Koala Studios`
- Contact: `Contact | Koala Studios | Koala Studios` (same for Services)

Fix: strip the brand from titles in `app/page.tsx`, `content/pages/*.ts`
(`seo.title` values like `"Contact | Koala Studios"`), and let the template
add it once. Google truncates ~60 chars — the duplication wastes the most
valuable SERP real estate.

### 2. Placeholder social links (S) — *credibility risk*
`lib/content/site-content.ts` points `instagram` and `linkedin` at
`https://www.instagram.com/` and `https://www.linkedin.com/` (bare
homepages). These also feed Organization JSON-LD `sameAs`, which tells
Google nothing. Replace with real profile URLs or remove both the links and
the `sameAs` entries until profiles exist.

### 3. OG / share image predates the redesign (S–M)
`public/images/koala_meta.jpg` is the default share card for every page.
It must be verified: 1200×630, current blackout/lime branding, readable at
thumbnail size. A stale light-theme card on every LinkedIn/iMessage share
undercuts the new brand. Consider per-page OG images later (case studies
already pass their hero image — good).

### 4. End-to-end contact form verification on production (M) — *the money path*
The form is Netlify-native (honeypot + hidden `form-name` + new service
checkboxes). Before launch, on the production deploy:
- Submit a real test: confirm it appears in Netlify Forms **and** that email
  notifications are configured to a monitored inbox.
- Confirm the new checkbox fields (`interest-shopify`, `interest-meta-ads`,
  `interest-email`, `interest-unsure`) are captured (Netlify re-parses the
  form definition at deploy time).
- Confirm `hello@koalastudios.ca` actually exists, receives, and replies
  from a professional signature — it is now printed on the homepage,
  contact page, footer, and menu overlay.
- Confirm redirect to `/contact/success` works on the deployed host.

### 5. Asset bloat: 165 MB in `public/images` (M) — *deploy weight + accidental hotlinks*
- `public/images/FORUSE/` — 54 MB of staging assets, none referenced.
- `public/images/project/` — 92 MB including multi-MB files the current
  pages never reference (`magnum_desktop_blue.png` 10 MB, several 3–8 MB
  videos, a stray `venice_sunset_1k.hdr`).
- Action: inventory what the active pages actually reference (the content
  files list every used path), move the rest out of the repo, and re-export
  the referenced PNGs as WebP/AVIF at sane dimensions. This is also a CDN
  cost and cache-efficiency issue, and an SEO one if crawlers find orphaned
  10 MB files.

### 6. Internal experiment routes ship to production (S)
`/internal/commerce-glass-hero` and `/internal/resend-forward-gradient`
build as public static pages. They are robots-disallowed but reachable, and
they carry test code (shader canvas, 3D pipeline experiments). Delete from
the production build or gate behind an env flag before launch.

### 7. Canonical host + env decision (S)
`NEXT_PUBLIC_SITE_URL` falls back to `https://koalastudios.ca`. On the host
(Netlify): set the env var explicitly, pick apex vs `www`, force HTTPS and
a single-host 301, and confirm `metadataBase`, sitemap, and robots all emit
the same origin. Mixed hosts split link equity.

### 8. Old fonts still shipped; active fonts are TTF (S–M)
`public/fonts/` still contains unused Poppins and IntegralCF woff2 files,
while the *active* fonts (Bebas Neue, Roboto Condensed ×3) are uncompressed
`.ttf`. Convert the four active fonts to woff2 (~60–70 % smaller, faster
LCP since Bebas renders every headline) and delete the unused families.
Add `<link rel="preload">` for Bebas Neue.

---

## P1 — SEO foundations

### 9. Dedicated service landing pages (XL) — *the single biggest SEO lever*
Everything sells from one `/services` page. The three offers target three
completely different search intents and deserve their own URLs:

- `/services/shopify-design-and-build` — "shopify agency", "shopify store
  design", "shopify theme development", "replatform to shopify"
- `/services/meta-ads-management` — "meta ads agency", "facebook ads
  management for ecommerce", "instagram ads agency"
- `/services/email-marketing` — "klaviyo agency", "email marketing for
  shopify", "ecommerce email flows"

Each page: intent-matched H1/title/description, its own `Service` JSON-LD,
process, deliverables, FAQ block (with `FAQPage` schema), one case study,
one CTA. Link them from the homepage pillars (which currently all point at
`/services`), the services overview, and the footer services column.
Without these pages the site can realistically rank for its brand name and
little else.

### 10. Geographic signals (M) — *currently almost zero*
The studio is Toronto-based (the contact page shows a Toronto clock) but no
crawlable text says so. "Shopify agency" is unwinnable; "Shopify agency
Toronto" is winnable.
- Add location to footer (e.g., "Toronto, Canada"), contact page copy, and
  service-page copy where natural.
- Upgrade Organization JSON-LD to `ProfessionalService` with
  `address`/`areaServed`, real `logo` URL, and real `sameAs`.
- Create a Google Business Profile and link it both ways.

### 11. Title/description rewrite with intent keywords (M)
After fixing P0-1, rewrite for search intent + click-through, e.g.:
- Home: `Shopify Design, Meta Ads & Email Marketing Agency — Koala Studios`
- Work: `Ecommerce Case Studies — Shopify Stores That Sell | Koala Studios`
- Case studies: lead with outcome, not "Case Study" (`Ara — A Calmer
  Product Story for a Coffee Ritual | Koala Studios`).
Meta descriptions should carry a value claim + call to action; several are
currently generic. Drop the `keywords` meta entirely (ignored by Google,
mild spam signal) or keep — low stakes either way.

### 12. Case-study content depth (L) — *SEO and conversion in one*
Current case pages run ~120–150 words of fairly abstract copy ("clearer
proof", "tighter rhythm"). Thin pages don't rank and don't persuade.
For each of the six: what the client sells, what was broken (concrete),
what was shipped (concrete — sections, features, flows), and what changed
(numbers if at all possible — see P2-15). 300–600 words each, with
descriptive image captions. This also feeds long-tail queries like
"[category] shopify redesign".

### 13. E-E-A-T / trust content after removing /about (M)
The about page is gone by design — but its trust signals (who you are,
where you are, how long you've operated) must resurface somewhere crawlable:
a short founder/team block on the homepage or services page (real names,
photo, one-liner), founded year, location. Anonymous studios convert and
rank worse in 2026's experience-weighted results.

### 14. Technical SEO odds and ends (S each)
- **Sitemap `lastModified`** is `new Date()` on every build — meaningless
  freshness signal. Use real content dates or omit.
- **Cycling H1**: SSR emits "We build Shopify stores that sell." (good).
  Add `aria-hidden` on the swapping word plus an sr-only static phrase so
  screen readers aren't re-announced every 3 s; crawlers already see the
  static first word.
- **`unoptimized` images** remain on the hover-preview thumbs
  (`ServicePillars`, `WorkExplorer`); verify Netlify's Next image
  optimization is active for everything else (`next/image` needs the
  Netlify Runtime v5 image CDN — confirm in deploy logs).
- **Decorative canvases & accents** are `aria-hidden` (verified) — keep it
  that way for new scenes.
- Submit sitemap in **Google Search Console + Bing Webmaster** at launch;
  GSC is also how you'll catch the title duplication regressions.

---

## P2 — Conversion optimization

### 15. Real proof (L–XL, requires client outreach) — *highest revenue impact*
Current state: testimonials are anonymous ("Ecommerce founder,
growth-stage brand") and case studies list qualitative outcomes ("Clearer
offer"). New clients buy numbers and names.
- Get permission for **named testimonials** (name, company, role, ideally
  a face) — even two beat six anonymous ones.
- Add a **client logo strip** (the six case-study brands) near the homepage
  hero or above the carousel.
- Add **one hard metric per case study** (conversion rate, revenue lift,
  ROAS, load-time delta). If real numbers are unavailable, use concrete
  scope facts (e.g., "32 templates shipped", "4-week build") — never
  invent performance claims.

### 16. Lower-friction conversion path (M)
The only conversion action is a form. Add a **calendar booking link**
(Calendly/Cal.com "15-min intro call") as a parallel CTA on /contact and
the success page. Ecommerce founders comparison-shopping agencies book
calls far more readily than they write briefs.

### 17. Lead qualification + expectation setting (M)
- Add a **budget range select** to the form (qualifies leads, deflects
  mismatches politely).
- Add a short **FAQ** on /services (or per service page): typical timeline,
  starting budget ("projects from $X", "retainers from $Y/mo"), who it's
  for / not for, what happens after you write. Pricing anchors filter out
  unqualified leads and build trust with qualified ones. Mark up with
  `FAQPage` schema (also a P1 win).

### 18. Measurement for a paid-traffic agency (M) — *credibility requirement*
You sell Meta ads; your own site should be instrumented like you'd
instrument a client's.
- **Meta Pixel** + Conversions API (Netlify function or server-side via a
  tag manager) with a Lead event on form submit.
- **GA4**: define `contact_submit` as a conversion (event exists via
  `markPendingContactSubmit` — verify it fires on the production domain),
  add events for header CTA, hero CTA, footer marquee, and booking clicks.
- **Consent**: Canada (PIPEDA / Quebec Law 25) — add a lightweight consent
  notice before GA/Pixel fire, or at minimum a privacy page that discloses
  them (see 19).
- UTM conventions documented for your own campaigns so attribution works
  from day one.

### 19. Legal/trust pages (S–M)
There is no privacy policy or terms page. For a business collecting
personal data through a form and running analytics in Canada, a privacy
page is required in practice. Footer-link a simple `/privacy` (and
optionally `/terms`). Also makes ad platforms (Meta especially) happier
when you run traffic to the site.

### 20. Success-page momentum (S)
`/contact/success` says "talk soon" and offers the work index. Add the
booking link ("skip the wait — grab a 15-minute slot") and set the
expectation explicitly ("reply within 2 business days from
hello@koalastudios.ca — add us to your contacts").

### 21. Optional: lead magnet (L, post-launch)
A "free 10-point Shopify store teardown" (PDF or recorded Loom) traded for
an email is the classic agency wedge — it feeds the email-marketing story
you sell and gives the Meta-ads team a warm audience. Post-launch, but
design the form field now if you want it.

---

## P3 — Performance & QA hardening

### 22. Fresh Lighthouse / Web Vitals audit (M)
The recorded 91+/100 scores predate: three.js on every route (hero scene,
ambient scenes, accents), GSAP split-text, custom cursor, grain overlay.
three.js is lazy-loaded and shared across routes (one chunk), canvases
pause offscreen, and accents hide under 700 px — but **measure again** on
mobile emulation and a real mid-range Android. Budgets to hold: LCP < 2.5 s
(watch the Bebas TTF — see P0-8), INP < 200 ms (drag carousel + cursor
listeners), CLS ≈ 0 (hero canvas reserves space — verify on slow 3G).

### 23. Accessibility pass (M)
Known-good: skip link, focus rings, aria labels on controls, reduced-motion
guards everywhere, single H1 per page. Remaining:
- **Menu overlay has no focus trap** — Tab can walk out of the open overlay
  into the page behind it. Trap focus while open.
- Cycling word announcement (see P1-14).
- Color-contrast spot-check: muted text `#a09d92` on `#0a0a09` passes AA
  (~7:1), but lime-on-black labels at 0.78 rem should be verified, and
  lime-on-lime hover states on chips.
- Keyboard walk of: work view toggle, testimonial dots, carousel buttons,
  form chips (focus-visible styles exist — verify order).

### 24. Cross-browser/device matrix (M)
Chrome/Edge verified via Playwright. Before launch: Safari macOS + iOS
(backdrop-filter, `mask-image`, `clip-path` transitions, WebGL on older
iPhones), Firefox (custom cursor, marquee), and a 360-px-wide Android
(headline fit fixed at 320 px — re-verify on device with real browser UI).

### 25. Failure modes & monitoring (S–M)
- WebGL-blocked browsers: handled (try/catch, sections render without 3D) —
  verify visually once with WebGL disabled.
- JS disabled: SSR markup is complete (good); SplitReveal text is visible
  because masking only applies via JS classes — verify once.
- Add uptime monitoring + Netlify deploy notifications; consider Sentry for
  client errors (the 3D code is the most failure-prone surface).

### 26. Housekeeping (S)
- Commit discipline: the working tree carries the entire redesign
  uncommitted ("ahead 5, behind 1" + dozens of modified files). Commit in
  logical slices and reconcile with the remote before launch-day pressure.
- Delete dead component files if any remain (e.g., legacy ServiceIcon if
  unreferenced), and the unused `public/objects/*` test files if nothing
  imports them.
- favicon set: only `app/favicon.ico` exists — add `icon.png` (192/512),
  `apple-icon.png`, and a `manifest` for a complete head.

---

## Suggested execution order

| Wave | Items | Outcome |
| --- | --- | --- |
| 1 (pre-launch, ~2 days) | P0 1–8 | Correct, professional, deployable |
| 2 (launch week) | 10, 11, 14, 18, 19, 20, 22, 23 | Indexable, measurable, compliant |
| 3 (weeks 1–3) | 9, 12, 13, 15, 16, 17, 24 | Rankable + persuasive |
| 4 (ongoing) | 21, content cadence, new case studies | Compounding acquisition |

The two highest-leverage investments for *new clients* specifically:
**dedicated service landing pages (9)** — they create the search surface —
and **named proof with numbers (15)** — it converts the traffic those pages
earn. Everything else supports those two.
