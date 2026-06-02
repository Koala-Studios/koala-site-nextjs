# Koala Website Complete Overhaul Implementation Plan

Status: implementation in progress. The public route visual foundation, case-study visual pass, dependency modernization, retired route cleanup, and legacy component/style/app-assets pruning are complete through 2026-05-29; use `docs/execution-ledger.md` for current evidence before starting the next slice.

Primary visual reference: `C:/Users/Frank/Downloads/koala2.png`

## 1. Overhaul Goal

Rebuild the public Koala Studios site as a full product, technical, content, SEO, AEO, and visual overhaul. This is not a cosmetic reskin of the existing codebase. The current site shipped quickly with shortcuts; future implementation should keep only the pieces that still serve the new site well.

The new visual direction comes from the reference: light editorial UI, bold black type, deep green accents, rounded browser-frame compositions, image-led page sections, and simple motion or state changes. The new technical direction should remove old code practices, legacy route duplication, unnecessary dependencies, weak content boundaries, and any architecture that slows down the redesign.

The overhaul should cover the whole public site, not only the home page:

- `/`
- `/work`
- `/work/[slug]`
- `/services`
- `/about`
- `/contact`
- footer and shared navigation
- route metadata, sitemap, robots, and legacy route handling
- technical stack, package health, rendering strategy, content architecture, analytics, and quality gates

## 2. Non-Negotiable Overhaul Principles

- Do not let existing architecture dictate the new implementation if it is clearly worse than a cleaner rebuild.
- Prefer replacing legacy surfaces over incrementally patching them when replacement is lower risk and easier to verify.
- Keep useful assets, copy, and project data where they are accurate, but do not preserve old component or style patterns by default.
- Treat performance, SEO, AEO, accessibility, maintainability, and content quality as first-class deliverables.
- Every public route should have a clear reason to exist, a clear content source, and a clear verification path.
- Remove Three.js and other unused heavy dependencies once active imports are gone.
- Ship the redesign through controlled slices, but the end state should be a modernized site, not a hybrid of old and new patterns.

## 3. Current Repo Baseline

Current stack and files are a baseline to inspect, not a constraint to preserve:

- Next.js 16 app router under `app/`.
- Shared route and SEO helpers under `lib/`.
- Current canonical content model under `lib/content/`.
- Re-export content helpers under `content/`.
- Shared UI under `components/`.
- Shared redesign tokens under `styles/site/tokens.css`.
- Route and component CSS modules colocated with active routes/components.

Important completed cleanup to preserve:

- `/work/[slug]` has a flat detail-page visual pass and uses async dynamic params for Next 16.
- `/projects`, `/blogs`, and `/home` route modules are removed; permanent redirects live in `next.config.js`.
- The current build, lint, typecheck, and npm audit pass cleanly.
- Three.js-related dependencies and imports have been removed.
- Legacy home/blog/project/section component islands, old `styles/` CSS modules, and stale `app/assets` JSON have been removed after import verification.

## 4. Technical Modernization Plan

### Framework And Runtime

Modernize the stack deliberately after checking current stable release notes and migration guides:

- Upgrade Next.js to the current stable major version that is compatible with the chosen React version.
- Upgrade React and React DOM with the framework upgrade.
- Upgrade TypeScript and type packages.
- Replace deprecated Next.js patterns and commands as needed.
- Keep the app router; remove or redirect the old pages-router `/home` surface.
- Re-evaluate `next.config.js` and use it only for real requirements.

Do not hard-code a target version in this plan. The implementation worker should verify the current stable versions before upgrading.

### Package And Dependency Health

- Audit all dependencies and remove unused packages.
- Remove `three`, `@react-three/fiber`, and `@react-three/drei` after active imports are gone.
- Replace old animation or visual dependencies with CSS transitions or small focused utilities only when needed.
- Keep `package-lock.json` aligned with `package.json`.
- Add explicit scripts for `typecheck`, `lint`, `build`, and any future test command.

### Code Architecture

Target architecture:

- `app/`: route files only, thin page composition, metadata, route loading/error files where useful.
- `components/site/`: shell, header, footer, navigation, mobile menu.
- `components/ui/`: durable primitives such as buttons, cards, frames, pills, icons, form controls.
- `components/sections/`: reusable marketing sections only if they are truly shared.
- `features/work/`: work index and case-study-specific components if the surface becomes substantial.
- `features/contact/`: form and contact-specific UI if the surface becomes substantial.
- `lib/content/`: typed content registry and content access.
- `lib/seo/` or `lib/metadata/`: metadata, structured data, sitemap helpers, route helpers.
- `styles/`: global tokens and minimal global baseline only.

Rules:

- Avoid route files full of inline styles and hard-coded content.
- Avoid a large generic component dumping ground.
- Avoid preserving old component names if they misrepresent their purpose.
- Prefer typed data and small components over copy-pasted page markup.

### TypeScript And Quality

- Keep `strict` TypeScript.
- Add a dedicated `typecheck` script if missing.
- Turn obvious current lint warnings into cleanup tasks, then move toward zero warnings for redesigned code.
- Avoid `any`, browser globals without guards, and stale client/server boundaries.
- Add focused tests only where they protect real behavior: routing helpers, content helpers, filtering, metadata generation, and form behavior.

### Rendering Strategy

- Prefer static rendering for marketing pages and case studies.
- Use server components by default.
- Use client components only for mobile menu state, filters, analytics events, and form interactions.
- Avoid client-side data fetching for static content.
- Keep image dimensions stable to prevent layout shift.

## 5. SEO And AEO Plan

SEO and AEO are part of the overhaul, not closeout polish.

### SEO Foundations

- One canonical public URL per page.
- Unique title and meta description per route.
- Open Graph and Twitter metadata for every public route.
- Sitemap includes `/`, `/work`, every published `/work/[slug]`, `/services`, `/about`, and `/contact`.
- Robots excludes only retired/draft surfaces.
- Legacy URLs redirect or noindex according to the approved route policy.
- Use optimized `next/image` wherever possible for public imagery.
- Add descriptive alt text for all meaningful images.

### Structured Data

Add JSON-LD where useful:

- `Organization` or `LocalBusiness` for Koala Studios.
- `WebSite` for the root site.
- `BreadcrumbList` for case-study detail pages.
- `CreativeWork` or `Article`-like schema for case studies where appropriate.
- `Service` schema for core services if the content is specific enough.
- `ContactPage` metadata for `/contact`.

Do not add schema that makes unsupported claims. Keep structured data aligned with visible page content.

### AEO

AEO means answer-engine optimization: making the site easy for assistants and search systems to understand and quote accurately.

Plan:

- Write clear, concise page summaries near the top of each page.
- Use semantic headings that answer real prospect questions.
- Add short service explanations with direct language, not vague marketing filler.
- Add an FAQ or "common questions" section only where it is useful and truthful.
- Make case-study pages summarize client, challenge, services, approach, and outcomes in structured visible content.
- Keep contact details, location, and response expectations machine-readable and visible.
- Avoid hiding key content only in images.

### Content Quality

- Replace vague or overbroad claims with specific positioning.
- Do not invent client metrics, awards, revenue claims, or team size.
- Make every case study answer: who it was for, what changed, what Koala did, and why it mattered.
- Ensure generated visuals are presentation assets, not proof of client results.

## 6. Performance And Accessibility Plan

### Performance

- Remove Three.js from redesigned public routes.
- Remove old video-heavy hero behavior unless a video has a measurable purpose.
- Use `next/image` for responsive images and known dimensions.
- Use modern image formats where practical.
- Preload only critical assets.
- Keep JavaScript low by using server components and CSS-driven interactions.
- Audit bundle size after route cleanup.
- Avoid layout shift by defining image/frame dimensions.

### Accessibility

- Semantic landmarks: header, nav, main, footer.
- One visible `h1` per page.
- Keyboard-accessible mobile menu and filters.
- Visible focus states.
- Sufficient color contrast for green accents.
- Alt text for meaningful images and empty alt for decorative imagery.
- Contact form labels, autocomplete attributes, required states, and error states.
- Respect reduced-motion preferences.

## 7. Visual Direction

### Core Style

- Light warm background, close to ivory or soft off-white.
- Black editorial typography with strong uppercase page titles.
- Deep green accents for active nav, arrow buttons, hero forms, and key calls to action.
- Rounded media frames where images need clipping, but avoid card-heavy section framing.
- Thin borders and strong spacing for separation; do not use decorative gradients or shadows in the public UI.
- Image-led compositions with laptop, product, studio, desk, and paper-plane imagery.
- Simple SVG icons for arrows, menu, service icons, decorative route lines, and brand details.
- No Three.js, 3D canvas, or physics-driven effects in the redesigned public experience.

### Color Tokens

Replace the current mixed legacy palette with a small token set:

- `--koala-color-bg`: warm off-white.
- `--koala-color-surface`: slightly lifted ivory.
- `--koala-color-ink`: near black.
- `--koala-color-muted`: warm grey text.
- `--koala-color-line`: soft border grey.
- `--koala-color-green`: primary deep green.
- `--koala-color-green-dark`: dark forest green for large shapes.
- `--koala-color-green-soft`: muted green for hovers and active states.
- Shadow tokens should remain `none` unless a future slice proves a specific functional need.

Avoid a one-note green palette. Green should be an accent and spatial anchor, not the only visual idea.

### Typography

The reference uses large, clean, confident sans-serif typography. Recommended plan:

- Keep a bold display face for page titles and hero statements.
- Use a clean sans-serif body face for navigation, cards, forms, and supporting copy.
- Audit current local fonts in `public/fonts/` before adding new font files.
- Avoid negative letter spacing and viewport-width font scaling.
- Use uppercase for main labels where the reference calls for it, but keep body copy readable.

### Shape Language

- Main desktop viewport sections use a rounded outer frame with a subtle border.
- Large green organic shapes can be CSS/SVG, not raster, when they are simple background arcs.
- Navigation arrow buttons are circular, deep green, with a white arrow icon.
- Large CTA cards can use outlined rounded rectangles with an embedded circular icon.
- Service icons should be SVG line icons in green.

## 8. Asset Strategy

Use image generation later for raster assets only after the layout and required crop ratios are known. Do not generate final assets before the component dimensions are settled.

### Project Asset Directory

Save project-bound generated assets under:

- `public/images/redesign/home/`
- `public/images/redesign/work/`
- `public/images/redesign/services/`
- `public/images/redesign/about/`
- `public/images/redesign/contact/`

Do not reference assets from the default imagegen output location. Any selected generated image must be copied into the repo.

### Imagegen Candidates

Use `$imagegen` in a later asset slice for:

- Home hero: clean laptop and phone ecommerce mockup on a soft studio background with deep green surface shape.
- Services hero: desk setup with monitor and laptop, warm natural light, ecommerce/design/dev cues.
- About gallery: studio interior with Koala mark and team meeting image.
- Contact visual: paper-plane scene can be split between SVG plane/path and generated green landscape or paper texture.
- Work cards: either use real project images from `public/images/project/*` or generate consistent presentation mockups per case study.

### SVG Candidates

Create repo-native SVGs for:

- KOALA logo mark if the current raster logo is not sufficient at all sizes.
- Arrow icons.
- Menu icon.
- Service icons: strategy, design, development, growth.
- Decorative curved lines and active nav underline.
- Contact paper-plane if a crisp vector look is preferred.

## 9. Route And Information Architecture Plan

### Public Routes

The redesigned public route set should be:

- `/`: landing page.
- `/work`: work index with filters and project grid.
- `/work/[slug]`: case-study detail pages.
- `/services`: services overview.
- `/about`: studio story and proof.
- `/contact`: contact CTA and form.

### Legacy Routes

Decide and implement one route policy:

- Preferred: redirect `/projects` and `app/projects/*` to `/work` or matching `/work/[slug]` routes once work pages are ready.
- Temporary option: keep `/projects` available but noindex it and remove it from public navigation.
- `/blogs` should remain draft/retired unless there is a redesign requirement for a blog.
- `/home` from the pages router should be retired or redirected after the app-router home is complete.

### Routing Files To Update

- `lib/routes.ts`
- `app/robots.ts`
- `app/sitemap.ts`
- `content/navigation.ts` and `lib/content/site-content.ts`
- any footer navigation source

Acceptance criteria:

- Public navigation points only to routes that exist.
- Sitemap includes all public static routes and published `/work/[slug]` routes.
- Robots disallows retired/draft routes only.
- Legacy route behavior is explicit.

## 10. Shared Component Plan

### Site Shell

Create or refactor:

- `components/site/SiteShell.tsx`
- `components/site/SiteHeader.tsx`
- `components/site/SiteFooter.tsx`
- `components/site/NavMenu.tsx`

Header requirements:

- Logo left.
- Desktop nav centered or right-aligned depending on viewport.
- Active route underline.
- Circular menu button on compact screens.
- Circular arrow CTA on the home hero where appropriate.

Footer requirements:

- Use the same light editorial system, not the old dark footer.
- Include logo, concise studio statement, nav links, email/contact link, social links, and copyright.
- Include a clear contact CTA, but do not repeat the full contact form.

### Shared Components

Keep the shared foundation focused on active route needs:

- `components/site`: header, footer, shell-level controls, service icons, smooth scroll.
- `components/work`: work grid and home carousel.
- `components/case-studies`: case-study detail sections.
- `components/contact` and `components/forms`: Netlify contact flow.
- `components/animation`: GSAP reveal behavior.

Rules:

- Primitives should be small and stable.
- Avoid nested cards.
- Keep layout primitives unopinionated enough for all pages.
- Prefer CSS modules or a scoped global redesign stylesheet rather than large inline style blocks.

## 11. Page-by-Page Plan

### Home Page `/`

Reference: large first viewport with logo/nav, huge left-aligned headline, green emphasis, ecommerce laptop/phone visual, curved white/green shape, circular arrow CTA, slider dots.

Sections:

1. Hero
   - Headline: "Web experiences that move" or approved final copy.
   - Green emphasis on the final phrase.
   - Hero image: generated or composited ecommerce laptop/phone scene.
   - Primary CTA: circular arrow plus "Work".
   - Optional slide dots if multiple hero visuals are planned; otherwise omit dots.

2. Work preview
   - 3 to 6 featured project cards.
   - Link to `/work`.

3. Services summary
   - Strategy, design, development, growth icons.
   - Link to `/services`.

4. About proof strip
   - Short studio positioning statement.
   - Link to `/about`.

5. Contact CTA
   - Reuse contact visual language without duplicating the full contact page.

Implementation notes:

- Replace `components/home/HomepageHero.tsx` rather than patching the old video hero.
- Remove old video hero dependency from the redesigned home route.
- No Three.js or video requirement for the new home hero.
- Include a concise top-of-page value proposition that works for SEO and AEO.
- Add structured metadata and Open Graph image.

### Work Index `/work`

Reference: top nav, large "WORK" page title, category filters, 2x3 card grid, active category underline or green pill, circular arrow bottom right.

Sections:

1. Page title and filters
   - Categories: all, Shopify, design, development, lifestyle or approved taxonomy.
   - Filter state can be client-side if needed, but keep data static.

2. Work grid
   - Cards use image, project title, category label, and link.
   - Use consistent card ratios.
   - Keep card text minimal.

3. CTA or pagination
   - If all projects fit, use a bottom CTA.
   - If future volume grows, add simple category filtering first, not pagination.

Data requirements:

- Add category/tags to `CaseStudyContent`.
- Confirm each published case study has card image, detail image, alt text, and category.
- Add clear index copy explaining what kind of work Koala does and for whom.

### Case Study Detail `/work/[slug]`

The reference does not show detail pages, so derive them from the new system.

Sections:

1. Case-study hero
   - Large project title.
   - Category, services, short headline.
   - One strong image or mockup.

2. Challenge / approach / outcomes
   - Editorial blocks with strong white space.
   - Metrics if real and defensible.

3. Media section
   - 2 to 4 image frames using current project assets or generated mockups.

4. Related work
   - One next project card and link back to `/work`.

Rules:

- Do not invent performance metrics.
- Keep claims grounded in available project content.
- Use generated mockups only as presentation assets, not evidence.
- Add structured data and breadcrumbs.
- Include visible summary fields: client, sector, services, challenge, approach, outcomes.

### Services Page `/services`

Reference: large "SERVICES", four icon columns, large rounded image section with arrow button.

Sections:

1. Page title
2. Service icon row
   - Strategy
   - Design
   - Development
   - Growth
3. Hero image panel
   - Generated desk/monitor/laptop scene.
   - Circular arrow CTA.
4. Service detail sections
   - Brief explanation per service.
   - Deliverables or outcomes.
5. Contact CTA

Implementation notes:

- Replace hard-coded old service copy and emoji artifacts.
- Keep service content in `lib/content/site-content.ts` or a new typed service content object.
- Use SVG service icons.
- Use content that answers concrete buyer questions: what the service includes, when it is useful, and what the client gets.

### About Page `/about`

Reference: large "ABOUT", short studio statement, two image cards, green paper-plane accent and curved line.

Sections:

1. Page title and short statement
   - "We're a digital studio that builds with clarity, craft, and momentum." or approved final copy.
2. Image pair
   - Studio interior image.
   - Team or meeting image.
3. Values
   - Clarity, craft, momentum, follow-through.
4. Process / how we work
   - Brief 3-step flow.
5. Contact CTA

Implementation notes:

- Restore `app/about/page.tsx`.
- Use generated about imagery if real studio imagery is unavailable.
- Avoid making the page sound larger than the studio really is.
- Write the page for trust and clarity, not generic agency filler.

### Contact Page `/contact`

Reference: large "CONTACT", green curved hill, paper plane, large outlined CTA card with circular arrow.

Sections:

1. Contact hero
   - Title.
   - Paper-plane visual.
   - CTA card.
2. Contact details
   - Email, location, timezone.
3. Contact form
   - Preserve Netlify form behavior.
   - Keep hidden `form-name`.
   - Keep honeypot if using the redesigned `ContactForm`.
4. Response expectation
   - Concise reply timing and fit statement.

Implementation notes:

- Decide whether to replace the current legacy form markup with `components/contact/ContactForm.tsx`.
- Preserve analytics helpers and form submission semantics.
- Do not turn contact into only a mailto link unless explicitly approved.
- Use clear visible contact details and response expectations for AEO.

## 12. Content Model Plan

Update content types where they support the new architecture, not merely the existing implementation.

Potential additions:

- `CaseStudyContent.category`
- `CaseStudyContent.cardImage`
- `CaseStudyContent.featured`
- `ServiceContent`
- `FooterContent`
- page-level `visual` or `heroImage` fields
- `SeoContent` fields for structured data and AEO summaries
- `FaqItem` where a page has useful buyer questions
- `RedirectMapping` if legacy route redirects are content/config driven

Rules:

- Keep copy centralized in `lib/content/site-content.ts`.
- Avoid duplicating nav labels in components.
- Use typed content for filters and footer links.
- Keep generated image paths and alt text in content data.
- Keep page summaries visible on the page, not only in metadata.

## 13. Styling Plan

Preferred styling direction:

- Move redesign-wide tokens into `styles/site/tokens.css`.
- Import redesign tokens globally from `app/globals.css` or a dedicated redesign global stylesheet.
- Use component-level CSS modules for complex page layouts.
- Gradually retire old CSS modules after their routes are retired.

Files likely involved:

- `styles/site/tokens.css`
- `app/globals.css`
- `components/site/*.module.css`
- route-specific modules where needed.

Do not rewrite all legacy CSS before the public redesign routes stop using it.

## 14. Dependency And Cleanup Plan

No Three.js in the redesigned public site.

Steps:

1. Search imports for `three`, `@react-three/fiber`, and `@react-three/drei`.
2. Remove usage from redesigned routes first.
3. Retire or isolate legacy pages that still need old visual dependencies.
4. Remove dependencies from `package.json` only after no active route imports them.
5. Run build after dependency removal.

Do not remove dependencies just because the target design does not need them; remove them only after imports are gone.

## 15. Implementation Phases

### Phase 0 - Approval And Slice Selection

Goal: confirm this plan, final public routes, modernization approach, and first implementation slice.

Decisions needed:

- Final headline/copy direction.
- Whether `/projects` redirects to `/work`.
- Whether `/blogs` remains hidden.
- Whether generated imagery is acceptable for About team/studio visuals.
- Font choice: use existing local fonts or add a new licensed font.
- How aggressive the framework upgrade should be in the first slice versus after route cleanup.
- Whether to introduce tests in the same modernization slice or after the content model settles.

### Phase 1 - Technical Audit And Upgrade Plan

Touch paths:

- `package.json`
- `package-lock.json`
- `next.config.js`
- `tsconfig.json`
- `.eslintrc.json`
- `app`
- `pages`
- `components`
- `styles`

Deliverables:

- Dependency audit.
- Current import map for Three.js, legacy routes, old CSS modules, and unused components.
- Upgrade target list after checking current stable framework/package versions.
- Decision on whether to upgrade before or after removing legacy pages.
- Added scripts for `typecheck` and any required verification commands.

Verification:

- Current build and lint baseline.
- `rg` evidence for heavy or legacy imports.
- Documented migration risks before package changes.

### Phase 2 - Framework And Code Foundation

Goal: create a modern, clean base that can support the redesign without old architecture dragging it down.

Touch paths:

- package/config files.
- `app/layout.tsx`
- `app/globals.css`
- `components/site`
- `components/ui` or renamed primitive foundation.
- `lib/seo` or equivalent metadata helpers.

Deliverables:

- Framework/runtime upgrade if approved.
- Clean app shell.
- Server-component-first route pattern.
- Modern metadata/structured-data helpers.
- Retired or isolated old pages-router surface.

Verification:

- Build.
- Lint.
- Typecheck.
- Home route smoke.

### Phase 3 - Design System Foundation

Touch paths:

- `styles/site/tokens.css`
- `app/globals.css`
- `components/site`
- `components/work`
- `components/case-studies`
- `components/contact`

Deliverables:

- Final tokens.
- Header and footer foundation.
- Buttons, arrow buttons, filter pills, frames, and cards.
- Active nav state.

Verification:

- Build.
- Lint.
- Desktop and mobile browser smoke for shell.

### Phase 4 - Content, SEO, AEO, And Route Alignment

Touch paths:

- `lib/content/types.ts`
- `lib/content/site-content.ts`
- `lib/routes.ts`
- metadata or structured-data helpers
- `app/robots.ts`
- `app/sitemap.ts`
- `content/*`

Deliverables:

- Final public route map.
- Restored `/about`.
- Case-study categories and sitemap entries.
- Navigation and footer content aligned with actual routes.
- Page-level SEO metadata and AEO summaries.
- Structured data plan implemented for root, organization, service, contact, and case-study pages where useful.

Verification:

- Build.
- Typecheck.
- Confirm all nav links resolve.
- Confirm sitemap includes public routes and published case studies.
- Validate that structured data only reflects visible content.

### Phase 5 - Asset Production

Touch paths:

- `public/images/redesign`
- content image path fields
- SVG/icon components

Deliverables:

- Home hero image.
- Services hero image.
- About image pair.
- Contact visual assets.
- Work card image set.
- SVG icons and arrow/menu assets.

Verification:

- Confirm every referenced asset exists.
- Check image dimensions and crop behavior in target components.
- Confirm alt text for content images.
- Confirm generated images are stored under `public/images/redesign`.

### Phase 6 - Page Implementation

Recommended order:

1. Home.
2. Work index.
3. Case-study detail.
4. Services.
5. About.
6. Contact.
7. Footer final pass.

Reasoning:

- Home and Work establish the visual language.
- Case-study detail validates content and media rules.
- Services/About/Contact can reuse the same page shell and primitives.

Verification after each page:

- Build.
- Route loads.
- Mobile and desktop screenshot review.
- Navigation state works.
- No text overflow.
- Metadata renders as expected.
- Meaningful content is visible in HTML, not only in images.

### Phase 7 - Legacy Cleanup And Dependency Removal

Touch paths:

- `app/projects`
- `app/blogs`
- `pages/home`
- old CSS modules under `styles/`
- `package.json`

Deliverables:

- Redirect or noindex legacy pages per approved route policy.
- Remove unused legacy components and styles only after confirming they have no imports.
- Remove Three.js dependencies only after active imports are gone.
- Remove stale assets only after confirming no route or content references them.
- Remove compatibility shims that were only needed during migration.

Verification:

- Build.
- Lint.
- Typecheck.
- `rg` checks for retired imports.
- Route smoke for redirects or noindex behavior.

### Phase 8 - Performance, SEO, AEO, Accessibility, And Polish QA

Checks:

- Desktop 1440px and 1920px.
- Tablet around 768px.
- Mobile around 390px.
- Header menu open and close.
- Contact form layout and submit path.
- Work filters.
- Case-study links.
- Footer links.
- Lighthouse-style accessibility/performance pass if available.
- Metadata and social share previews.
- Sitemap and robots output.
- Structured data output.
- Bundle size and route JavaScript review.

Acceptance:

- Build passes.
- Lint and typecheck pass.
- All public routes render.
- No overlapping text or broken image frames.
- No missing alt text on redesigned pages.
- No Three.js on redesigned public routes.
- No unnecessary client-side JavaScript on static marketing pages.
- Core SEO/AEO content is present in semantic HTML.

## 16. Risks And Guardrails

- Do not treat the old architecture as sacred.
- Do not implement the visual redesign directly inside legacy CSS modules unless a temporary migration slice requires it.
- Do not generate images before dimensions are known; otherwise assets may need to be regenerated.
- Do not invent case-study results or client claims.
- Do not remove `/projects` until the redirect/noindex policy is chosen.
- Do not break Netlify contact form submission while restyling.
- Do not leave generated assets outside the repo if code references them.
- Do not remove package dependencies until active imports are gone.
- Do not upgrade packages blindly; verify current stable versions and migration notes first.
- Do not hide SEO/AEO-critical copy inside generated images.
- Do not ship a route that only looks complete but lacks metadata, sitemap coverage, accessibility, and mobile QA.

## 17. Definition Of Done

The overhaul is complete when:

- `/`, `/work`, `/work/[slug]`, `/services`, `/about`, and `/contact` all use the new visual system.
- Header, footer, buttons, filters, image frames, and cards are consistent.
- Legacy `/projects`, `/blogs`, and `/home` behavior is explicit.
- Generated and SVG assets are stored in the repo with clear names and alt text.
- Sitemap, robots, route constants, navigation, and content are aligned.
- Framework, React, TypeScript, linting, and package scripts are intentionally modernized or documented with a reason for deferral.
- The app has a clean route/component/content architecture that does not depend on legacy shortcuts.
- SEO metadata, Open Graph data, canonical URLs, structured data, and AEO-friendly visible summaries are present.
- Redesigned routes avoid unnecessary client JavaScript and heavy visual dependencies.
- Accessibility and reduced-motion requirements are met.
- Build passes.
- Typecheck passes.
- Lint has no new warnings, and redesigned code should be warning-free.
- Browser QA confirms desktop and mobile layouts.
- The workflow docs and `.agent` known gaps are updated to remove resolved blockers.
