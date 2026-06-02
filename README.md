# Koala Site Next.js

Koala Studios marketing site built with Next.js 13, React, TypeScript, and static public assets. The repo is currently preparing for a complete redesign, so workers should start with the project workflow files before changing product code.

## Worker Start

1. Read `AGENTS.md`.
2. Read `.agent/project_state.yaml` and `.agent/current_slice.md`.
3. Read the closest local `AGENTS.md` for the area you will touch.
4. Use `docs/project-scope.md` for durable scope, `docs/execution-ledger.md` for current state, and `docs/operator-guide.md` for local commands.

## Current Architecture

- `app/` contains Next.js app-router routes.
- `components/` contains reusable and legacy UI components.
- `lib/content/` contains the typed marketing content model and current canonical content.
- `content/` contains convenience re-exports for content slices.
- `lib/` contains route, SEO, metadata, site config, analytics, and content helpers.
- `styles/` contains legacy global/CSS module styles plus redesign tokens under `styles/site/tokens.css`.
- `public/` contains images, videos, fonts, Decap CMS admin files, and other static assets.

## Getting Started

In this Windows workspace, use the installed npm command directly:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run dev
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run lint
```

If `npm` is available on your PATH, the normal scripts are:

```bash
npm run dev
npm run build
npm run lint
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Build Note

`next build` currently completes successfully. The build still reports existing lint warnings in legacy project pages and shared components; see `.agent/known_gaps.yaml` and `docs/execution-ledger.md`.

## Verification Discipline

Use `.agent/verification_registry.yaml` to choose checks by change type. Do not mark a route, component, content migration, or workflow change complete without recording verification evidence or a specific blocker in `docs/execution-ledger.md`.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
