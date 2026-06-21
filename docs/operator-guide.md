# Operator Guide

## Local Commands

In this Windows workspace, `npm` is not available on PATH. Use the installed npm command directly:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

If your shell has `npm` on PATH, the package scripts are:

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## Runtime

- Development server: `next dev`
- Default local URL: `http://localhost:3000`
- Production validation: `next build`
- Production server after build: `next start`
- Netlify production builds use the Node version pinned in `.nvmrc` (`22`).

## Environment

- `NEXT_PUBLIC_SITE_URL` optionally overrides the canonical site URL.
- `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` can configure analytics in `lib/analytics.ts`.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` can configure Plausible analytics.

## Current Build Health

The current working tree audits with 0 vulnerabilities, lints with no warnings, typechecks, and builds successfully on Next 16.2.6 after legacy pruning plus the Chrome reference refinement pass. Use `& 'C:\Program Files\nodejs\npm.cmd' audit --json`, `run lint`, `run typecheck`, and `run build` for the full package and production verification gate.

## Browser QA Note

The Codex in-app browser bridge failed during the 2026-05-28 public route foundation slice with a Windows sandbox startup error. Headless Chrome screenshots were used instead for visual smoke checks. Re-test with the in-app browser when the bridge is available.

## Worker Closeout

- Record commands run and exact failures in `docs/execution-ledger.md`.
- Update `.agent/known_gaps.yaml` when a blocker is fixed or a new evidence gap is discovered.
- Keep `AGENTS.md`, local guides, and `.agent` registries aligned when workflow expectations change.
