# Case Study Addition Guide

Last verified against the repo on 2026-06-24.

Use this guide when a worker is asked to add a new client case study to the Koala site, especially when the user provides a live client website and asks the worker to create the copy from that site.

## Ground Rules

- Start with `AGENTS.md`, `.agent/project_state.yaml`, `.agent/current_slice.md`, `.agent/verification_registry.yaml`, `docs/project-scope.md`, `docs/execution-ledger.md`, and the local guides for any touched directories.
- Run `git status --short --branch` before editing.
- Treat `/work` and `/work/[slug]` as the active case-study surfaces.
- Treat `/projects` as retired legacy URL space. Only add `/projects/<slug> -> /work/<slug>` redirects when an old or expected project URL needs to resolve.
- Keep canonical case-study data in `lib/content/site-content.ts`. Files under `content/` mostly re-export content and are not the primary edit point.
- Do not invent performance metrics, revenue lifts, client quotes, awards, team size, or hard outcomes. Use hard numbers only when the user provides or approves them.
- Do not copy long client-site text into the case study. Use the client site as source material, then write original, concise Koala copy.
- Confirm the client is allowed to be listed publicly. Publishing a case study also lists the client name in the homepage brand marquee.

## Current Implementation Map

### Canonical Data

- `lib/content/types.ts` defines `CaseStudyContent` and the allowed `category` values.
- `lib/content/site-content.ts` owns the `caseStudies` array. This is the main file to edit.
- `lib/content/index.ts` exports:
  - `getPublishedCaseStudies()`: returns `caseStudies` with `status === "published"`.
  - `getCaseStudyBySlug(slug)`: returns any matching case study by slug.
- `content/case-studies.ts` and `content/index.ts` re-export data from `lib/content`. Do not duplicate case-study entries there.

### Active Consumers

Publishing a case study in `lib/content/site-content.ts` automatically affects:

- Homepage brand marquee: `app/page.tsx` maps `getPublishedCaseStudies()` to visible client names in "Brands we've built for".
- Homepage featured work carousel: `app/page.tsx` passes the same published list to `components/work/FeaturedWork.tsx`, which renders `components/work/HomeWorkCarousel.tsx`.
- Work index: `app/work/page.tsx` passes the same published list to `components/work/WorkExplorer.tsx`.
- Service detail pages: `app/services/[slug]/page.tsx` passes the full published list to `FeaturedWork`.
- Case-study route generation: `app/work/[slug]/page.tsx` uses `getPublishedCaseStudies()` for `generateStaticParams()`.
- Case-study detail rendering: `app/work/[slug]/page.tsx` uses `getCaseStudyBySlug()` and renders `CaseStudyHero`, `CaseStudyStory`, and `CaseStudyRelated`.
- Metadata and JSON-LD: `app/work/[slug]/page.tsx` creates page metadata, `CreativeWork`, and `BreadcrumbList` from the case-study object.
- Sitemap: `app/sitemap.ts` uses `getPublishedCaseStudies()` and `getCaseStudyPath()` to emit `/work/<slug>` entries.

### Fields That Exist But Are Not Active Controls

- `featured?: boolean` exists on `CaseStudyContent`, and some entries set it, but no active component filters by it. Featured work currently means "all published case studies".
- `externalUrl?: string` exists but is not rendered by the active case-study components.
- `testimonial?: ...` exists but is not rendered by the active case-study components.
- `content/pages/service-details.ts` has a `caseSlug` field per service, but current service detail pages do not render it or use it to filter proof. Updating it has no visible effect unless the worker also implements and verifies that feature.
- `content/pages/home.ts` is not imported by the active homepage. Do not update it expecting homepage visible changes.
- `public/admin/config.yml` is Decap CMS blog-oriented config and does not manage case studies.

## End-To-End Addition Workflow

### 1. Collect Source Material

When the user gives a new client website, inspect it before writing copy.

Capture enough facts to answer:

- What does the client sell?
- What market/category are they in?
- What was Koala's visible or stated role?
- Which pages, flows, visuals, product stories, or ecommerce systems are relevant?
- What problem can be described without overclaiming?
- What deliverables are defensible from the source material or user notes?
- What outcomes can be stated safely?
- Are there approved metrics, quotes, or brand permissions?

Use the live site for factual orientation, not for copy-paste. If the user provides private notes or metrics, prefer those over guesses from the public site.

### 2. Capture Screenshots And Logos With Playwright

When the user provides a live website, use the local Playwright skill or Playwright CLI to capture source material before writing the case study.

Minimum screenshot set per website:

- homepage,
- at least one useful collection or category page when the live site has one worth showing,
- at least one product page,
- at least two additional useful views such as a second collection, second product, about/story page, wholesale page, custom order page, location page, FAQ page, or brand page.

Store at least five screenshots per website. Six is safer because the case-study detail page can use one hero image plus several supporting media frames.

Quality gate before saving assets:

- Do not keep or commit a screenshot just because it was captured from the sitemap. It must showcase something meaningful about the finished site.
- Reject empty, placeholder, footer-heavy, broken, black-video, unloaded-media, or mostly blank collection screenshots.
- If a collection page has too little content to sell the work, replace it with a stronger product, story, about, wholesale, FAQ, locator, fundraiser, or other supporting page.
- Wait for popovers to appear, close them, and confirm they are gone before the screenshot.
- Make a contact sheet or equivalent visual review for every new case-study asset set. Replace weak captures before referencing them in `lib/content/site-content.ts`.

Preferred paths:

```text
public/images/project/<slug>/01-home.jpg
public/images/project/<slug>/02-collection-<name>.jpg
public/images/project/<slug>/03-collection-<name>.jpg
public/images/project/<slug>/04-product-<name>.jpg
public/images/project/<slug>/05-product-<name>.jpg
public/images/project/<slug>/06-<supporting-page>.jpg
```

Use Playwright viewport screenshots rather than random downloaded product images when the goal is to show the finished website. A good default is desktop `1440 x 1100` with a short wait after load. Dismiss newsletter, chat, cookie, and country modals if they block the page; do not edit repo CSS to fix captures.

Also download the client logo while inspecting the site:

```text
public/images/project/<slug>/logo.png
public/images/project/<slug>/logo.webp
public/images/project/<slug>/logo.svg
```

Use the logo exposed by the site header, structured data, theme assets, or public CDN. If the logo is hard to read against the current Koala brand strip, use a typed content/rendering flag for inline inversion instead of editing site CSS.

Keep temporary inspection artifacts under `output/playwright/`. Do not commit random top-level screenshots.

### 3. Choose Slug, Status, Category, And Order

Use a short lowercase hyphen slug, for example `client-name`.

Set `status` deliberately:

- `published`: appears in homepage brand marquee, homepage carousel, `/work`, service detail carousels, static params, and sitemap.
- `draft`: excluded from `getPublishedCaseStudies()`, but do not treat it as private. The current detail route looks up by slug with `getCaseStudyBySlug()`, so a direct draft URL may still be resolvable depending on deployment behavior.

Choose one of the current `CaseStudyContent.category` values:

- `Shopify`
- `Design`
- `Development`
- `Lifestyle`

If the new case needs a different category, update the union type in `lib/content/types.ts` and verify every place that displays categories. The current work grid has no category filter, but the carousel displays `caseStudy.category`.

Decide insertion order in `caseStudies` carefully. Array order controls:

- homepage brand marquee order,
- homepage carousel order,
- `/work` grid order,
- service detail carousel order.

The current visual evidence often assumes six published cases. The code supports more, but adding a seventh changes the work grid and carousels, so browser QA is required.

### 4. Prepare Assets

Put client case-study images under:

```text
public/images/project/<slug>/
```

Use project-bound filenames with lowercase words and hyphens when adding new assets. Existing files are mixed, but new files should be predictable.

Recommended asset set:

- one strong hero image for `media[0]`,
- at least four supporting screenshots for `media[1+]`,
- one card crop for `cardImage` if the hero crop is not ideal in tiles/carousels.

Image path rules:

- Content paths must start with `/images/...`, not `public/images/...`.
- Every referenced file must exist under `public/` with exact casing.
- Prefer optimized `.webp` for screenshots/mockups when practical.
- Use `.png` only when transparency or exact UI screenshot fidelity matters.
- Keep files reasonably sized; do not add multi-megabyte source exports unless there is a clear reason.

Alt text rules:

- Write meaningful alt text for content images.
- Describe the visible image and client context, not "image of image".
- The related-work banner intentionally uses empty alt because the title and headline are visible next to the image.

### 5. Add The Case Study Object

Edit `lib/content/site-content.ts` and add one complete `CaseStudyContent` object to `caseStudies`.

Use this shape:

```ts
{
  slug: "client-slug",
  status: "published",
  title: "Client Name",
  client: "Client Name",
  sector: "Ecommerce",
  category: "Shopify",
  tags: ["Shopify", "Design", "Development"],
  headline: "One concise line about the work.",
  intro: "One short summary sentence for the detail page statement.",
  services: ["Strategy", "Design", "Frontend"],
  challenge: "Concrete problem, without overstating what was known.",
  approach: "What Koala changed, designed, built, clarified, or shipped.",
  deliverables: ["Homepage flow", "Product page system", "Mobile QA"],
  outcomes: ["Clearer offer", "Cleaner mobile path", "Easier editing"],
  metrics: [
    { label: "Priority", value: "Product clarity" },
    { label: "Scope", value: "Storefront redesign" },
  ],
  media: [
    {
      src: "/images/project/client-slug/hero.webp",
      alt: "Client Name storefront hero showing the main product story",
    },
    {
      src: "/images/project/client-slug/product-page.webp",
      alt: "Client Name product page layout with purchase details",
    },
  ],
  cardImage: {
    src: "/images/project/client-slug/card.webp",
    alt: "Client Name ecommerce case study card image",
  },
  logo: {
    src: "/images/project/client-slug/logo.png",
    alt: "Client Name logo",
    width: 220,
    height: 80,
  },
  relatedSlug: "next-existing-slug",
  seo: {
    title: "Client Name Case Study",
    description:
      "Client Name shows how Koala Studios created a clearer ecommerce experience for a specific product or audience.",
    canonicalPath: "/work/client-slug",
  },
}
```

Required content expectations:

- `title` is the visible case-study `h1`.
- `client` appears in the hero meta, work grid caption, and homepage brand marquee.
- `headline` appears on work tiles and the detail hero.
- `intro`, `challenge`, `approach`, `outcomes`, `deliverables`, and `metrics` power the detail page.
- `services` appears in the detail hero and metadata keywords.
- `media[0]` powers the detail hero and fallback card image.
- `cardImage` powers `/work`, homepage/service carousels, and related-work cards when provided.
- `logo` powers the homepage "Brands we've built for" strip when present; older entries can safely fall back to text.
- `seo.description` powers the case-study meta description and JSON-LD description.
- `seo.canonicalPath` should be `/work/<slug>`.

Use `metrics` for approved numbers when available. If no approved numbers exist, keep the current pattern of qualitative scope labels like `Priority`, `Scope`, or `Focus`.

### 6. Update Related-Work Flow

If the new case is published, decide how it fits into the related-work chain.

Current behavior:

- If `relatedSlug` points to an existing case, the detail page links to that next case.
- If `relatedSlug` is missing or invalid, `CaseStudyRelated` falls back to a "More work" banner linking to `/work`.

Recommended options:

- For a loop: update the previous last case's `relatedSlug` to the new slug, then set the new case's `relatedSlug` to the next intended case.
- For a standalone new case: omit `relatedSlug` and accept the fallback.

Always verify that every `relatedSlug` resolves to an existing case-study slug.

### 7. Decide Whether Legacy Redirects Are Needed

The public route is `/work/<slug>`.

Only edit `next.config.js` if a legacy project URL should redirect:

```js
{
  source: "/projects/client-slug",
  destination: "/work/client-slug",
  permanent: true,
}
```

Keep the generic `/projects -> /work` redirect. Do not recreate `app/projects`.

### 8. Check Homepage Brand And Featured Work Impact

No manual homepage addition is needed for featured work. Publishing a case study automatically adds it to the homepage and service-page carousels.

Publishing a case study automatically adds:

- the `logo` image to "Brands we've built for" when `logo` is present, otherwise the `client` text mark,
- the case to the homepage `FeaturedWork` carousel,
- the case to every service detail page `FeaturedWork` carousel.

If the user asks for real brand logos and the rendering path does not exist yet, that is a separate feature:

- create a typed logo data model rather than overloading `CaseStudyContent`,
- store approved logo files under a predictable `public/images/project/<slug>/` or `public/images/project/logos/` path,
- require explicit permission to list each logo,
- update `app/page.tsx` or shared rendering only as needed,
- do not edit site CSS for logo display unless the user explicitly approves it,
- verify accessibility and responsive behavior.

`docs/launch-blockers.md` already records real client logos and approved outcomes as owner-input follow-ups.

### 9. Optional Service Proof Mapping

Do not assume service pages need manual proof updates.

Current service detail pages render the full published case-study carousel, not service-specific case studies. The `caseSlug` field in `content/pages/service-details.ts` is currently dormant.

If a task explicitly asks to connect a new case to a service page:

- either implement the existing `caseSlug` field in the service detail template,
- or add a typed `proofCaseSlugs` field if multiple cases per service are needed,
- then verify service detail pages, sitemap, metadata, and visual layout.

Without that implementation, changing `caseSlug` is only a future-facing content edit.

## Copy Guidance For New Case Studies

Write in the current site's concise style. Favor short, concrete sentences.

Strong case-study copy answers:

- who the client is,
- what they sell,
- what was unclear, slow, hard to browse, hard to maintain, or hard to trust,
- what Koala changed,
- what the shopper or internal team can now do more easily.

Avoid:

- vague filler such as "elevated digital experience" without explaining the work,
- fake performance claims,
- copying client marketing language as if Koala wrote it,
- implying Koala built parts of the site that are not in scope,
- long paragraphs that fight the current compact case-study layout.

Suggested field style:

- `headline`: one sharp visible line, usually under 12 words.
- `intro`: one sentence that summarizes the case.
- `challenge`: one concrete problem sentence.
- `approach`: one concrete action sentence.
- `outcomes`: three short qualitative outcomes unless approved metrics exist.
- `deliverables`: three short nouns or noun phrases.
- `seo.description`: one sentence that includes the client, Koala Studios, and what the case demonstrates.

## Verification Checklist

Use the `content_or_copy_changes`, `asset_or_media_changes`, and possibly `route_or_metadata_changes` profiles in `.agent/verification_registry.yaml`.

Minimum checks for a published case study:

```powershell
git status --short --branch
rg -n "client-slug|/work/client-slug|/projects/client-slug" lib content app components next.config.js
Test-Path public\images\project\client-slug\hero.webp
Get-ChildItem public\images\project\client-slug\*.jpg
Test-Path public\images\project\client-slug\logo.png
& 'C:\Program Files\nodejs\npm.cmd' run typecheck
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Manual checks:

- Confirm every referenced media path exists under `public/`.
- Confirm each new website has at least five Playwright-captured screenshots.
- Confirm each new website has a downloaded logo or a documented reason a suitable logo could not be found.
- Confirm all image alt text is useful and accurate.
- Confirm `seo.canonicalPath` is `/work/<slug>`.
- Confirm `relatedSlug` values resolve.
- Confirm `/work/<slug>` appears in the built sitemap for published cases.
- If adding a legacy redirect, confirm `/projects/<slug>` returns a permanent redirect to `/work/<slug>`.
- Inspect `/`, `/work`, `/work/<slug>`, and at least one `/services/<slug>` page at desktop and true 390px mobile.
- On `/work/<slug>`, confirm there is one visible `h1`, no blank image panels, no horizontal overflow, and the related-work CTA is sensible.
- On `/`, use Playwright to confirm the brand marquee logos/text marks and selected-work carousel still look balanced after the new case count.
- On `/work`, confirm the grid still reads well with the new case count.

Browser QA notes:

- In this Windows workspace, use the full npm path.
- For hydrated Next dev visual QA, existing project notes recommend `http://localhost:3029` rather than `http://127.0.0.1:3029`.
- The Codex in-app browser bridge has been unreliable in this workspace. Chrome DevTools Protocol or another real Chrome path is the established fallback.
- PowerShell `Start-Job` servers may not persist across tool calls here. Prefer an explicit visible terminal/server session when sustained browser QA is needed.

Closeout:

- Record verification evidence in `docs/execution-ledger.md` for real content, route, asset, or UI changes.
- Update `.agent/known_gaps.yaml` only if the work creates or resolves a real blocker.
- Do not claim the new case study is live unless build and route/media checks have passed or a blocker is documented.

## Quick File Checklist

Usually edit:

- `lib/content/site-content.ts`
- `public/images/project/<slug>/...`
- `next.config.js` only when a legacy `/projects/<slug>` redirect is needed
- `docs/execution-ledger.md` for verification evidence after the implementation

Usually do not edit:

- `content/case-studies.ts`
- `content/index.ts`
- `app/work/[slug]/page.tsx`
- `app/sitemap.ts`
- `components/work/*`
- `components/case-studies/*`
- `app/page.tsx`
- `app/work/page.tsx`
- `app/services/[slug]/page.tsx`

Edit the usually-do-not-edit list only when changing the case-study system itself, not when adding ordinary new content.
