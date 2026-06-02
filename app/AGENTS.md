# App Routes Agent Guide

## When To Read This

- Tasks touching `app/layout.tsx`, `app/page.tsx`, or any route under `app/`.
- Tasks touching `app/robots.ts`, `app/sitemap.ts`, route metadata, or route migration.
- Tasks deciding whether a page belongs under `/work`, `/projects`, `/services`, `/about`, or `/contact`.

## Read First

- `docs/project-scope.md`
- `.agent/project_state.yaml`
- `lib/routes.ts`
- `lib/content/site-content.ts`
- `app/layout.tsx`

## Local Rules

- Prefer app-router routes under `app/` for redesign work.
- Use `lib/metadata.ts`, `lib/seo.ts`, and `lib/site-config.ts` for metadata instead of building ad hoc metadata in route files.
- Keep public route decisions aligned with `lib/routes.ts`, `app/robots.ts`, and `app/sitemap.ts`.
- `/about` is restored and should remain aligned with typed page content.
- `/work` and `/work/[slug]` build on Next 16; dynamic route params must be awaited in `[slug]` pages.

## Verification

- `& 'C:\Program Files\nodejs\npm.cmd' run build`
- Check `app/robots.ts`, `app/sitemap.ts`, and `lib/routes.ts` together when routes change.
- Manually inspect affected pages in a browser after build succeeds for route or layout changes.

## Avoid Assumptions

- `/projects` is legacy; its app route modules are removed and matching URLs permanently redirect from `next.config.js`.
- `/blogs` and `/home` route modules are removed; matching URLs permanently redirect from `next.config.js`.
- `app/sitemap.ts` emits published case-study slug entries from typed content.
- `app/layout.tsx` renders the redesign `SiteHeader` and `SiteFooter`.
