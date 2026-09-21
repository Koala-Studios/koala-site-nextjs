# Koala Site Project Scope

## Durable Goal

Koala Studios is preparing for a complete website overhaul. The next worker should treat this repository as a marketing site in transition from legacy project pages and rushed implementation shortcuts toward a modernized, maintainable, SEO/AEO-aware site centered on content, case studies, services, and contact conversion.

## Current Stack Baseline

- Next.js 16.2.6 with the app router.
- React 19.2.6 and TypeScript 6.0.3 with `strict` enabled.
- ESLint 9 with Next flat-config presets.
- Route/component CSS modules, global CSS, and a shared token file under `styles/site/tokens.css`.
- Static public assets under `public/`.
- Netlify-style contact form markup is present in the contact surface.

The current stack is not a hard constraint. The overhaul may upgrade framework/runtime packages, remove outdated dependencies, restructure components, and replace legacy pages when the slice is planned and verified.

## Target Source Boundaries

- Routes live under `app/`.
- Shared route, SEO, metadata, analytics, and content helpers live under `lib/`.
- Canonical editable marketing content should live in `lib/content/site-content.ts` and typed helpers under `lib/content/`.
- Re-exporting convenience entry points live under `content/`.
- Reusable UI lives under `components/`.
- Shared design tokens live under `styles/site/tokens.css`; route and component CSS modules live next to active routes/components.

## Redesign Direction

Latest review (2026-09-21): Frank superseded the warm palette and partnership framing. Use near-white/light-gray backgrounds, native scrolling, no cursor follower, no redundant eyebrows, and describe Maya as part of Koala Studios. `/maya` now uses a shorter rotating hero, morphing SVG portrait, immediately following brand carousel with individually prepared logo assets, side-by-side introductory heading/body, and 2x2 desktop growth results. Keep the private-only publication boundary.

The current Maya/local palette slice is governed by `docs/maya-implementation-proposal.md` and `docs/maya-local-review.md`. Frank authorized off-white/nude surfaces and selective green accents while preserving existing fonts, navigation, button treatment, and general copy, except the agreed audit offer and form changes. This narrower scope takes precedence over the older overhaul guidance below. Publication and flyer production are not authorized in this slice.

- Treat the project as a technical and visual overhaul, not a visual reskin.
- Prefer `/work` and `/work/[slug]` for the new case-study experience.
- Treat `/projects`, `/blogs`, and `/home` as retired URL surfaces handled by redirects in `next.config.js`.
- Keep navigation, sitemap, robots, and route constants aligned before promoting a route as public.
- Build pages from typed content and shared components instead of hard-coded duplicate copy where practical.
- Include SEO, AEO, performance, accessibility, and package modernization in the implementation plan.

## Non-Negotiable Invariants

- Do not claim a route is live or complete without a successful build or a documented build blocker.
- Do not duplicate durable route, metadata, or content values across unrelated files when a helper or cleaner content model should exist.
- Do not weaken contact form behavior while redesigning UI; preserve form submission fields, action, and spam trap behavior unless intentionally replaced.
- Keep media paths and alt text accurate for case-study and marketing content.
- Preserve user work already in the working tree unless explicitly asked to revert it.
- Do not preserve legacy architecture merely because it exists.

## Current Scope Caveat

The repository is currently mid-transition. The current build passes on Next 16, `/about` has been restored, `/projects`, `/blogs`, and `/home` have permanent redirects, and sitemap/robots are aligned with the redesign route set. Three.js has been removed, lint is clean, npm audit reports 0 vulnerabilities, and legacy compatibility components, old style modules, and stale `app/assets` JSON have been pruned after import verification.
