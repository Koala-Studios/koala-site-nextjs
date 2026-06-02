# Styles Agent Guide

## When To Read This

- Tasks touching `app/globals.css`, `styles/site/tokens.css`, CSS modules, or route-level visual systems.
- Tasks preparing the full redesign visual foundation.
- Tasks adding or refactoring route-level styling.

## Read First

- `styles/site/tokens.css`
- `app/globals.css`
- The CSS module used by the route or component being changed.
- `components/AGENTS.md` for component conventions.

## Local Rules

- `app/globals.css` is the current global baseline.
- `styles/site/tokens.css` is imported from `app/globals.css`; use its variables for shared color, type, spacing, radius, and focus tokens.
- Keep route-level layout styles close to the route or component until a reusable pattern is clear.
- Old legacy CSS modules under `styles/` were pruned; keep this directory focused on shared tokens and local guidance.

## Verification

- `& 'C:\Program Files\nodejs\npm.cmd' run build`
- Browser smoke desktop and mobile viewports after visual changes.
- Check that global CSS changes do not break active public routes or legacy redirects.

## Avoid Assumptions

- Token variables in `styles/site/tokens.css` are loaded globally through `app/globals.css`.
- Do not re-add broad, global-looking CSS modules for one-off route styling.
