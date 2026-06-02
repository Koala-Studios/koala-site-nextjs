# Content Agent Guide

## When To Read This

- Tasks touching marketing copy, navigation, page content, case studies, or site settings.
- Tasks changing which routes are considered public or published.
- Tasks replacing hard-coded copy in route files.

## Read First

- `lib/content/types.ts`
- `lib/content/site-content.ts`
- `content/index.ts`
- `lib/routes.ts`

## Local Rules

- `lib/content/site-content.ts` is the current canonical content store; files under `content/` mostly re-export or expose slices.
- Keep `MarketingPageKey`, `PublicRoute`, and published content aligned when adding or removing pages.
- Case studies should include SEO, media alt text, services, outcomes, and status before being treated as publishable.
- Navigation changes must be checked against actual route files under `app/`.

## Verification

- `& 'C:\Program Files\nodejs\npm.cmd' run build`
- Confirm every content media path exists under `public/`.
- Confirm navigation links point to existing app routes or are documented as legacy/draft.

## Avoid Assumptions

- Content for `/about` exists and `app/about/page.tsx` is restored.
- Published case studies are sourced from `getPublishedCaseStudies()`; the older JSON files under `app/assets` were removed.
- `app/sitemap.ts` uses `getPublishedCaseStudies()` for slug entries.
