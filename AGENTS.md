# Koala Site Agent Guide

## Start Here

1. Run `git status --short --branch` before changing files.
2. Read `.agent/project_state.yaml` and `.agent/current_slice.md`.
3. Read the closest local `AGENTS.md` for the surface you will touch.
4. Use `docs/project-scope.md` for durable product, stack, and architecture rules.
5. Use `docs/execution-ledger.md` for current state, verification evidence, blockers, and handoffs.
6. Use `docs/operator-guide.md` for local run, build, deploy, and environment notes.

## Source Of Truth

- `docs/project-scope.md` is the durable target-state contract for the redesign.
- `docs/execution-ledger.md` is the current execution record and must include evidence before status claims move forward.
- `.agent/*.yaml` files are compact routing, verification, and known-gap registries for workers.
- Code wins over docs when they disagree about what exists now. Update the docs in the same slice when you find drift.

## Repo-Wide Rules

- Treat the current Next.js 16 app-router stack as the verified baseline. Future framework/runtime upgrades are allowed only when a planned modernization slice verifies the migration.
- Keep marketing copy, navigation, site settings, case-study data, and SEO data in the content and lib helpers where possible instead of duplicating values in routes.
- Treat `/work` as the redesign-era case-study surface and `/projects` as legacy until the overhaul resolves the route split.
- Do not mark a route, component system, or content migration complete without a successful build or an explicitly documented build blocker.
- Keep future worker guidance short and local. Add a directory `AGENTS.md` only when it prevents repeated mistakes.
- Do not preserve legacy code organization, dependencies, or styling patterns merely because they already exist.

## Verification

- Use `.agent/verification_registry.yaml` to choose checks for the touched surface.
- In this Windows workspace, `npm` is not available on PATH; use `& 'C:\Program Files\nodejs\npm.cmd' run build` and similar full-path commands.
- For docs-only workflow changes, verify referenced paths exist and the source-of-truth roles do not contradict each other.
- For UI, route, content, metadata, or asset changes, run a build unless a known blocker prevents it and record the blocker.

## Routing

- `app/AGENTS.md`: app-router routes, metadata, sitemap, robots, and route migration.
- `components/AGENTS.md`: reusable UI, legacy components, redesign components, and missing component boundaries.
- `content/AGENTS.md`: marketing copy, navigation, site settings, and case-study data.
- `lib/AGENTS.md`: content access helpers, route constants, SEO, metadata, and analytics utilities.
- `styles/AGENTS.md`: global CSS, legacy CSS modules, and redesign tokens.
