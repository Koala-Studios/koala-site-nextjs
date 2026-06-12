# Koala 2026 Visual Lift — Direction + Progress Log

Owner intent (2026-06-10, from Frank): big, visible improvements across homepage,
services, work, case-study detail, and contact. Full creative control granted.
Keep only: the font (Bebas Neue display), the logo, and the hard-edge CTA with
its expanding-pill hover animation. Micro-interactivity everywhere — the site
must not feel static. The studio now sells **Meta ad management** and **email
marketing** alongside the core **Shopify design + build** work, and the site
must say so. "We make websites and designs, so our website should show that."

Any new worker: read this file top to bottom, then check the Progress Log at
the end for the last completed step before touching anything.

## Creative direction — "Blackout editorial, signal green"

- Base stays near-black; the lift comes from **structure, not decoration**:
  hairline rules, numbered sections, oversized Bebas display type, and one
  electric green accent family. No gradients-as-mood (the purple haze canvas
  comes off the homepage), no white image panels that punch holes in the dark
  theme (the paper-plane WebP goes).
- Palette: layered blacks (#0a0a09 base, #131410 / #1a1c17 surfaces), warm
  off-white ink (#f4f3ee), readable muted (#a09d92), brand green (#4f9b2b),
  lime highlight (#a3e635) used sparingly for labels/underlines/hover, deep
  green panel (#14351c) retained.
- Type: Bebas Neue display pushed much larger (clamp to ~11rem hero), tight
  uppercase Roboto Condensed labels with letter-spacing for the "spec sheet"
  voice. Outlined (text-stroke) display words as section backdrops.
- The three service lines are the brand story: **Build (Shopify) → Traffic
  (Meta ads) → Retention (email/Klaviyo)**. The homepage and services page
  are organized around that funnel.

## Micro-interaction inventory (site-wide)

1. Hero: pointer-reactive dot-field canvas (vanilla canvas, brand greens,
   respects prefers-reduced-motion) + staggered headline reveal + a cycling
   word that rotates SHOPIFY STORES / META ADS / EMAIL FLOWS / BRANDS.
2. Marquee strips (pure CSS keyframes, aria-hidden duplicates, paused for
   reduced motion): services ticker under the hero, "START A PROJECT" strip
   above the footer.
3. Work tiles: image zoom + darkening, meta bar slides up, arrow chip fades
   in, index numbers (01–06).
4. Link underline sweep utility (`.koala-underline-link`) for nav + inline links.
5. Service offer rows: hover/focus expands deliverable chips (grid-rows
   transition), number flips to lime.
6. Testimonials: restyled slider, oversized quote glyph, animated progress.
7. Count-up stats where honest (services count, case studies, founded year).
8. Existing kept: Cta expanding-pill hover, GSAP Reveal-on-scroll, Lenis
   smooth scrolling, Swiper carousels.

## V2 mandate (2026-06-10, owner feedback)

The first pass was judged **too conservative** — several sections were styled
rather than reimagined. The bar is now: every one of the five routes (home,
work, services, case study, contact) must feel custom-designed and alive, the
kind of site a design studio would enter into awards. Minimal lifts are
explicitly rejected. `/about` is removed entirely (redirects to `/`); the
homepage, services, and work must carry the full sales story.

### Signature interactive systems (build once, use everywhere)

1. `SplitReveal` — headlines split into words and stagger up on scroll
   (GSAP). Every major heading uses it; this sets the "crafted" feel.
2. `CursorDot` — custom cursor (desktop, fine pointers only): lime dot that
   grows over links, shows labels (`VIEW`, `DRAG`, `OPEN`) over work tiles
   and carousels via `data-cursor` attributes.
3. `HoverPreviewList` pattern — list rows that float a cursor-following
   image preview (home service pillars, work index view).
4. `Parallax` — subtle scrub translate on images (work tiles, case media).
5. `Magnetic` — CTAs drift toward the cursor.
6. `CountUp` — stats count up when scrolled into view.
7. `app/template.tsx` — route-mount reveal (fade/rise) so navigation feels
   app-like.
8. Grain overlay (CSS) — fixed noise layer over everything, very low alpha.
9. Scroll progress bar on case studies.

### V2 per-route specs

- **Home**: dot-field hero + cycling word stays, add SplitReveal entrance,
  magnetic CTAs; service pillars become a hover-preview list with floating
  imagery; selected work becomes an oversized drag carousel (custom DRAG
  cursor, progress bar); add honest count-up stats strip (case studies,
  service lines, process steps); testimonials become a single-quote
  spotlight slider; contact band gets a repeating marquee headline.
- **Work**: two views — editorial asymmetric grid (default) and an index
  list view with cursor-following preview images; animated filter tabs with
  counts; VIEW cursor over tiles.
- **Services**: offers stay editorial but gain hover floods + numbered
  Bebas scale; add an animated SVG funnel (BUILD → TRAFFIC → RETENTION)
  that draws in on scroll; process and engagement cards get hover floods.
- **Case study**: full-bleed parallax hero with overlaid display title;
  sticky meta rail on desktop; alternating-width parallax media; full-width
  interactive next-case banner (image zoom + giant title); scroll progress.
- **Contact**: split stays; add project-type chip checkboxes (Netlify-safe),
  availability note + live Toronto clock, outlined backdrop word, magnetic
  submit.

### Ambient 3D layer (V3.4)

`components/three/AmbientScene.tsx` is the shared three.js backdrop:
variants `blueprint` (/services hero), `frames` (/work hero), `dart`
(/contact + /contact/success), `cube` (404). All variants: fog to the page
background, radial mask, pointer + scroll parallax, paused offscreen,
reduced-motion = single static frame. To add one to a new section: render
`<AmbientScene variant="..." />` as the section's first child, give the
section `position: relative; isolation: isolate`, and put content at
z-index 1. Keep it to one per route — it's seasoning, not the meal.

`components/three/AmbientAccent.tsx` (V3.5) is the mid-page companion: a
single small rotating wireframe (icosphere/torus/octa/box) hugging a
section's left or right margin, scrubbed by GSAP so it drifts vertically at
a different rate than the scroll. Placed on home (stats, right), services
(process, left), work (explorer, bottom-left), and case-study statements
(right). Same rules: hosting section gets `position: relative; isolation:
isolate`; accents sit at z-index -1, bleed at most 1rem, hide under 700px.
Budget: at most one Scene plus one or two Accents per route.

## Page-by-page plan

- **Tokens/global**: new palette + bigger type scale + utilities (eyebrow with
  green tick, marquee, sweep underline, outlined display text, section shell
  with hairline top rule + number). Keep radius 0 everywhere (hard edges).
- **Header**: nav links get sweep underline + lime active tick; otherwise keep.
- **Footer**: rebuild — marquee CTA strip, giant Bebas wordmark line, columns
  (nav / services / contact email), copyright bar.
- **Homepage** (`app/page.tsx`): hero (dot field, cycling word, two CTAs) →
  services marquee → numbered "What we do" pillars (3 offers, each links to
  /services) → Selected Work (restyled carousel) → funnel band (Build/Traffic/
  Retention) → testimonials → big contact band ("LET'S BUILD SOMETHING THAT
  SELLS.") with email + CTA. Purple shader wrapper removed (left intact at
  /internal/resend-forward-gradient).
- **Services** (`app/services/page.tsx` + `content/pages/services.ts`): three
  flagship offers — 01 Shopify Design & Build, 02 Meta Ad Management, 03 Email
  Marketing & Retention — as editorial rows with deliverable chips + "good fit
  if" notes; 4-step process; closing CTA. JSON-LD picks up new offerings
  automatically from the content file.
- **Work index**: keep filter logic; restyle tiles globally (zoom/overlay/
  arrow/index), tighten grid, bottom CTA band.
- **Case study detail**: bigger hero with overlay title on full-bleed image,
  bordered facts grid, larger story type, media hover zoom, huge next-case
  footer link.
- **Contact**: form-first split — left: big headline, direct email link,
  "what happens next" steps; right: restyled underline inputs with green focus.
  Netlify form semantics (name, action, honeypot, hidden form-name) MUST be
  preserved. White paper-plane image removed.
- **Copy**: rewritten around the funnel story; site description + SEO updated
  in `lib/content/site-content.ts`. No invented client metrics.

## Constraints / invariants

- Keep route map, redirects, sitemap, robots, JSON-LD presence, Netlify form.
- npm path: `& 'C:\Program Files\nodejs\npm.cmd' run <script>`.
- Dev server: a long-running `next dev` is already on port 3000 (PID may
  vary); use `http://localhost:3000`. Browser QA via Playwright MCP.
- Verify with lint + typecheck + build + desktop/390px screenshots before
  claiming done; log evidence in `docs/execution-ledger.md`.

## Progress log (append entries; newest last)

- 2026-06-10 — Baseline audit done. Screenshots in `.playwright-mcp/`
  (`baseline-home-full-1440.jpeg`, `baseline-work-full-1440.jpeg`,
  `baseline-services-full-1440.jpeg`, `baseline-contact-full-1440.jpeg`,
  `baseline-case-ara-full-1440.jpeg`). Pain points: purple haze hero, empty
  vertical gaps, white paper-plane panel clash, services page doesn't mention
  Meta ads/email, weak hover states outside the CTA, low-contrast muted text.
- 2026-06-10 — This direction doc written. Next: tokens/global utilities.
- 2026-06-10 — Foundation shipped: tokens palette/type/lime accent, global
  utilities (eyebrow, chip, sweep underline, outline text, marquee), upgraded
  `.koala-work-tile` (zoom/meta slide/index/arrow), `Marquee`, `HeroField`,
  `CyclingWord` primitives.
- 2026-06-10 — Homepage rebuilt (hero dot field + cycling word, marquee,
  pillar rows, work carousel, process grid, testimonials, contact band);
  header lime sweep nav; footer rebuilt (marquee CTA, columns, giant outlined
  wordmark).
- 2026-06-10 — Services rebuilt around the three offers (Shopify build /
  Meta ads / email marketing) with chips, fit notes, process, project-vs-
  retainer cards; content + JSON-LD updated in `content/pages/services.ts`.
- 2026-06-10 — Work hero lifted; case-study hero + next-case scaled to
  display type; contact rebuilt form-first with hard-edge inputs and
  "what happens next" rail; success page rebuilt; paper-plane image retired.
- 2026-06-10 — Verified: lint, typecheck, build pass; all routes HTTP 200;
  no 390px horizontal overflow on checked routes. Evidence + handoff notes in
  `docs/execution-ledger.md` ("Blackout Editorial Visual Lift").
  Remaining ideas for a future pass: /about creative pass, count-up stats,
  custom cursor, case-study media hover zoom, services row expand-on-hover.
- 2026-06-10 — V2 mandate executed. `/about` removed (redirects to `/`,
  nav/footer/types/content cleaned). All signature systems shipped:
  SplitReveal, CursorDot, Parallax, Magnetic, CountUp, ScrollProgress,
  RotatingBadge, route-mount template transition, grain overlay. Home
  (hover-preview pillars, drag carousel with progress bar, stats strip,
  testimonial spotlight, rotating badge), Work (filter counts, grid/index
  views, asymmetric parallax grid, cursor-preview index), Services (funnel
  diagram that draws in), Case study (full-bleed parallax hero, sticky facts
  rail, numbered narrative, alternating parallax media, full-width next-case
  banner, scroll progress), Contact (TALK backdrop, live Toronto clock +
  booking status, service checkbox chips in the Netlify form, magnetic
  submit). Lint/typecheck/build pass; desktop + 390px QA evidence in
  `docs/execution-ledger.md` ("V2 Reimagining" entry). Next ideas: page-leave
  transitions, work-tile image distortion shaders, case-study before/after
  sliders, footer marquee hover interaction.
- 2026-06-11 — V3 polish executed: full-screen mobile takeover menu
  (staggered giant links, body scroll lock, Escape close, auto-close on
  navigation), desktop nav sweep underlines, footer marquee lime-flood
  hover, contact-success v2 (SENT backdrop, pulsing inbox row), branded 404
  ("This page doesn't convert."), MediaReveal clip-path wipes on case-study
  media, skip-to-content link. Evidence in ledger "V3 Polish" entry.
  Gotcha for future workers: keep the menu overlay OUTSIDE `.headerWrap` —
  its backdrop-filter breaks position:fixed descendants. Remaining ideas:
  page-leave transitions, WebGL image distortion, before/after sliders,
  OG image art pass.
- 2026-06-11 — V3.1: MediaReveal fixed (clip-path on an IO target zeroes its
  intersection ratio in Chrome — clip an inner layer, observe the host);
  contact TALK backdrop removed; hero rebalanced into two columns with a
  synced three.js scene (`components/home/HeroScene.tsx`): four primitive
  vignettes matching the cycling words, fog + radial mask blend into the
  background, pointer parallax, lazy-loaded, desktop-only, reduced-motion
  safe. Evidence in ledger "V3.1" entry.
- 2026-06-11 — V3.2: hero copy simplified (no sub-headline, single "See our
  work" CTA, larger title); HeroScene v2 with per-scene interactivity —
  storefront + orbiting coins, climbing ad bar chart whose bars react to
  the pointer with a rising trend arrow, pointer-chasing email dart with
  pulsing trail and orbiting envelopes, brand mark with counter-rotating
  shells and speed-reactive satellites; 3D now also renders on mobile
  (stacked under the headline). Evidence in ledger "V3.2" entry.
