# Library Agent Guide

## When To Read This

- Tasks touching `lib/content`, route constants, SEO metadata, site config, or analytics helpers.
- Tasks that need canonical route, metadata, or content access decisions.
- Tasks investigating build failures from shared helper imports.

## Read First

- `lib/content/types.ts`
- `lib/content/site-content.ts`
- `lib/content/index.ts`
- `lib/routes.ts`
- `lib/seo.ts`
- `lib/metadata.ts`
- `lib/analytics.ts`
- `lib/gtag.ts`

## Local Rules

- Keep route constants in `lib/routes.ts` aligned with real routes under `app/`.
- Keep SEO URL generation centralized in `lib/seo.ts` and `lib/metadata.ts`.
- Do not add browser-only code to server helpers unless the file is explicitly client-only.
- Analytics config belongs in `lib/analytics.ts`; browser event dispatch helpers belong in `lib/gtag.ts`.

## Verification

- `& 'C:\Program Files\nodejs\npm.cmd' run build`
- For route or metadata changes, check generated pages, sitemap, and robots together.
- For helper API changes, inspect every import with `rg`.

## Avoid Assumptions

- `lib/gtag.ts` contains both the legacy `pageview`/`event` helpers and newer `trackEvent`/`markPendingContactSubmit` helpers.
- `siteConfig.defaultOgImage` points to the existing `/images/koala_meta.jpg`.
