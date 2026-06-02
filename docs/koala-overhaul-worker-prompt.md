# Koala Overhaul Worker Prompt

Copy this prompt into a fresh worker when you are ready to start implementation.

```text
# Koala Website Complete Overhaul Implementation Worker

You are the implementation worker for the Koala Studios website overhaul in `koala-site-nextjs`.

This is a full product, technical, SEO/AEO, accessibility, performance, content, and visual overhaul. It is not a cosmetic reskin. The existing site was built quickly with shortcuts, so do not preserve old architecture, components, styles, dependencies, or route structure merely because they exist.

You must follow the visual reference at:

`C:/Users/Frank/Downloads/koala2.png`

You must also follow the implementation plan:

`docs/koala-redesign-implementation-plan.md`

Do not start by coding from memory. Inspect the repo, read the workflow docs, then implement in controlled slices with verification.

---

## Start Here

1. Run `git status --short --branch`.
2. Read `AGENTS.md`.
3. Read `.agent/project_state.yaml`, `.agent/current_slice.md`, `.agent/known_gaps.yaml`, and `.agent/verification_registry.yaml`.
4. Read `docs/project-scope.md`.
5. Read `docs/koala-redesign-implementation-plan.md`.
6. Read the closest local `AGENTS.md` before touching any area:
   - `app/AGENTS.md`
   - `components/AGENTS.md`
   - `content/AGENTS.md`
   - `lib/AGENTS.md`
   - `styles/AGENTS.md`

Current Windows command note:

Use full npm path commands unless npm is available on PATH:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

---

## Mission

Implement the complete Koala Studios website overhaul:

- modernize the technical foundation
- replace legacy visual patterns
- implement the new image-reference-driven design system
- rebuild public pages around the new brand direction
- improve SEO and AEO
- improve accessibility and performance
- clean up routes, content, metadata, sitemap, robots, and legacy surfaces
- remove unnecessary heavy dependencies such as Three.js after active imports are gone

The end state should be a modern, maintainable, fast, static-first marketing site with a coherent public route set and a clean implementation.

---

## Visual Reference Requirements

Use `C:/Users/Frank/Downloads/koala2.png` as the north star.

Target qualities:

- light warm off-white background
- bold black editorial typography
- deep green accent system
- rounded media frames where images need clipping
- soft borders with no decorative gradients or shadows
- circular green arrow buttons
- active nav underline
- simple mobile menu button
- image-led hero and page sections
- clean work grid cards
- services icon row
- about image pair with simple decorative line work
- contact paper-plane/green-shape composition
- no Three.js, no old dark 3D/video-heavy direction

Use SVG for deterministic icons, arrows, decorative lines, and simple paper-plane/vector elements.

Use image generation only for raster hero/page imagery after layout dimensions are known. If using `$imagegen`, selected project assets must be copied into the repo under `public/images/redesign/...`; never reference generated images from the tool's default output directory.

---

## Technical Overhaul Requirements

Do not let old code practices constrain the implementation.

You should actively evaluate and modernize:

- Next.js, React, TypeScript, ESLint, and package versions
- app-router route structure
- server-component-first page composition
- content and metadata architecture
- package scripts, including adding `typecheck` if missing
- unused dependency removal
- legacy pages-router `/home`
- legacy `/projects` surfaces
- old CSS modules and global styles

When upgrading framework/runtime packages, verify current stable versions and migration notes from official sources before changing package versions. If network access is blocked, document the limitation and choose the safest local modernization slice first.

Do not blindly rewrite everything in one giant patch. Implement in slices that build and can be reviewed.

---

## Public Route Target

Final public routes:

- `/`
- `/work`
- `/work/[slug]`
- `/services`
- `/about`
- `/contact`

Legacy route policy to implement after choosing the safest approach:

- Prefer redirecting `/projects` and project detail routes to `/work` or matching `/work/[slug]`.
- Keep `/blogs` draft/retired unless the user explicitly asks for a blog.
- Retire or redirect pages-router `/home`.
- Keep robots, sitemap, route constants, nav, footer, and metadata aligned.

---

## SEO And AEO Requirements

SEO/AEO is not optional closeout work. It is part of the implementation.

Every public page needs:

- unique title
- unique meta description
- canonical URL
- Open Graph metadata
- Twitter metadata
- visible concise summary content
- semantic heading structure
- meaningful image alt text

Add structured data where truthful and useful:

- `Organization` or `LocalBusiness`
- `WebSite`
- `BreadcrumbList` for case studies
- `CreativeWork` or article-like schema for case studies if appropriate
- `Service` schema if service content is specific enough
- `ContactPage` metadata

AEO requirements:

- clear top-of-page summaries
- direct service explanations
- visible contact details and response expectations
- case-study summaries with client, challenge, services, approach, and outcomes
- no critical content hidden only inside images
- no invented metrics, awards, client claims, or team scale

---

## Implementation Order

Follow this order unless inspection proves a better order:

1. Technical audit and baseline
   - dependency audit
   - route/import/style inventory
   - current build/lint/typecheck status
   - upgrade feasibility

2. Framework and code foundation
   - package/config modernization if approved by verified current docs
   - clean app shell
   - route/content/metadata architecture
   - `typecheck` script if missing

3. Design system foundation
   - tokens
   - global baseline
   - site shell
   - header/footer
   - UI primitives
   - icons and button states

4. Content, SEO, AEO, and routing alignment
   - content types and content source
   - route constants
   - navigation/footer content
   - metadata helpers
   - structured data helpers
   - robots and sitemap
   - restore `/about`

5. Asset production
   - generate or select final imagery
   - create SVG icons/decorations
   - store assets under `public/images/redesign/...`
   - connect alt text in typed content

6. Page implementation
   - `/`
   - `/work`
   - `/work/[slug]`
   - `/services`
   - `/about`
   - `/contact`
   - footer final pass

7. Legacy cleanup
   - route redirects/noindex
   - old CSS/component removal
   - unused asset cleanup
   - dependency removal

8. QA and polish
   - desktop/mobile browser verification
   - accessibility
   - performance
   - SEO/AEO output
   - structured data

---

## Page Requirements

### Home `/`

Build the new first impression from the reference:

- large hero frame
- KOALA logo/header
- headline similar in structure to "WEB EXPERIENCES THAT MOVE"
- green emphasis on the final phrase
- laptop/phone ecommerce hero imagery
- circular arrow CTA to work
- no old video hero
- no Three.js

Include:

- featured work preview
- services summary
- about proof strip
- contact CTA

### Work `/work`

Build:

- large `WORK` title
- category filters
- responsive card grid
- project cards with image, title, category, link
- active filter styling

Content must come from typed case-study data, not hard-coded duplicate arrays.

### Case Study `/work/[slug]`

Build:

- project hero
- client/category/services summary
- challenge, approach, outcomes
- media section
- related project
- breadcrumbs/structured data

Do not invent proof claims.

### Services `/services`

Build:

- large `SERVICES` title
- icon row: strategy, design, development, growth
- large rounded image panel
- service detail sections
- contact CTA

Replace old emoji/hard-coded service copy.

### About `/about`

Restore and build:

- large `ABOUT` title
- concise studio statement
- two image cards
- values/process
- contact CTA

Do not exaggerate company scale.

### Contact `/contact`

Build:

- large `CONTACT` title
- green shape / paper-plane composition
- contact CTA card
- visible contact details
- redesigned contact form

Preserve Netlify form behavior unless intentionally replaced:

- `name="contact"`
- hidden `form-name`
- form action
- honeypot if using redesigned form
- accessible labels

---

## Verification Requirements

Run verification after each meaningful slice.

Required when relevant:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run typecheck
```

If `typecheck` does not exist, add it before relying on it.

Browser QA:

- home, work, case study, services, about, contact
- desktop 1440px and 1920px
- tablet around 768px
- mobile around 390px
- mobile menu open/close
- work filters
- contact form layout
- footer links

SEO/AEO checks:

- metadata exists per public route
- sitemap includes public routes and published case studies
- robots matches route policy
- structured data reflects visible content
- canonical URLs are correct

Performance checks:

- no Three.js on redesigned public routes
- no unnecessary client components
- stable image dimensions
- no layout shift caused by image frames
- route JS reviewed after cleanup

Accessibility checks:

- one visible `h1` per route
- semantic landmarks
- keyboard-accessible nav/menu/filter controls
- visible focus states
- image alt text
- form labels/autocomplete/error states
- reduced-motion handling

---

## Documentation And Handoff

Keep these updated as you work:

- `docs/koala-redesign-implementation-plan.md`
- `docs/execution-ledger.md`
- `.agent/project_state.yaml`
- `.agent/known_gaps.yaml`
- `.agent/verification_registry.yaml` if verification rules change
- local `AGENTS.md` files if routing or ownership changes

Every handoff must include:

1. What changed
2. Why it was done
3. Files added
4. Files updated
5. Verification run
6. Known limitations
7. Next recommended slice

Do not claim completion without verification evidence.

---

## Success Condition

The overhaul is complete only when:

- the public site follows the image reference direction
- the technical stack and package setup are intentionally modernized or explicitly deferred with rationale
- old architecture no longer controls redesigned routes
- `/`, `/work`, `/work/[slug]`, `/services`, `/about`, and `/contact` are complete
- legacy routes have explicit redirect/noindex behavior
- SEO, AEO, structured data, sitemap, robots, and metadata are aligned
- performance and accessibility checks pass
- build, lint, and typecheck pass
- no Three.js is used by redesigned public routes
- generated assets are saved in the repo with useful filenames and alt text
- workflow docs and known gaps are current
```
