# Components Agent Guide

## When To Read This

- Tasks touching reusable UI in `components/`.
- Tasks introducing or repairing the redesign component foundation.
- Tasks changing forms, navigation, case-study cards, or the public site shell.

## Read First

- `.agent/module_registry.yaml`
- `styles/site/tokens.css`
- `components/site/SiteHeader.tsx`
- `components/site/SiteFooter.tsx`
- `components/work/HomeWorkCarousel.tsx`
- `components/work/WorkFilterGrid.tsx`
- `components/contact/ContactForm.tsx`

## Local Rules

- Legacy home, blog, project, and section components were pruned; do not reintroduce old component islands unless an active route needs them.
- Before importing a shared component namespace, confirm the directory and export file exist and that its API matches all consumers.
- Redesign components should use the token names in `styles/site/tokens.css` rather than adding unrelated one-off palettes.
- Contact form behavior depends on Netlify form attributes and analytics helpers; verify helper exports before wiring new client components.

## Verification

- `& 'C:\Program Files\nodejs\npm.cmd' run build`
- For interactive components, run the app and manually smoke the interaction after build succeeds.
- For forms, verify the hidden `form-name`, action, required fields, and analytics event helpers still line up.

## Avoid Assumptions

- `components/site`, `components/work`, `components/contact`, `components/forms`, `components/animation`, and `components/case-studies` are the current redesign foundation.
- There is no active `components/sections` directory; keep new sections route-local until reuse is clear.
- `components/site/*` is wired into `app/layout.tsx` as the public redesign shell.
