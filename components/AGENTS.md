# Components Agent Guide

## When To Read This

- Tasks touching reusable UI in `components/`.
- Tasks introducing or repairing the redesign component foundation.
- Tasks changing forms, navigation, case-study cards, or the public site shell.

## Read First

- `.agent/module_registry.yaml`
- `styles/site/tokens.css` and the `ks-*` utilities in `app/globals.css`
- `components/system/index.tsx` and `components/system/ArchWindow.tsx`
- `components/site/SiteHeader.tsx`, `components/site/SiteFooter.tsx`, `components/site/Cta.tsx`
- `components/work/WorkGrid.tsx`
- `components/contact/ContactForm.tsx`

## Local Rules

- Legacy home, blog, project, and section components were pruned; do not reintroduce old component islands unless an active route needs them.
- Before importing a shared component namespace, confirm the directory and export file exist and that its API matches all consumers.
- Build new UI from the Masthead system: `--ks-*` tokens, `ks-*` utilities and `components/system/`. The arch is the only curve; no pills, circles, brackets or rounded cards.
- Global `ks-*` classes used inside a CSS module selector must be wrapped in `:global(...)`.
- Never hide above-the-fold text with entry animations; `Reveal` only translates below-the-fold content.
- Route-specific header/footer behaviour (e.g. Maya's CTA and email) belongs in `lib/content/page-context.ts`.
- Contact form behavior depends on Netlify form attributes and analytics helpers; verify helper exports before wiring new client components.

## Verification

- `npm run build` (on the old Windows workstation: `& 'C:\Program Files\nodejs\npm.cmd' run build`)
- For interactive components, run the app and manually smoke the interaction after build succeeds.
- For forms, verify the hidden `form-name`, action, required fields, and analytics event helpers still line up.

## Avoid Assumptions

- `components/site`, `components/work`, `components/contact`, `components/forms`, `components/animation`, and `components/case-studies` and `components/system` are the current foundation.
- There is no active `components/sections` directory; keep new sections route-local until reuse is clear.
- `components/site/*` is wired into `app/layout.tsx` as the public redesign shell.
