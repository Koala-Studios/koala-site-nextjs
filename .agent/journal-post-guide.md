# Adding a Journal post

The Journal lives at `/blog`. Every post is typed data in `lib/content/blog.ts` (`BlogPostContent` in `lib/content/types.ts`); the page, index, sitemap, metadata and JSON-LD all come from that data. A new post needs no new component.

The editorial standard (topic, research, value bar, review and the weekly cadence) is Newton's `marketing/koala-journal` guide. This file covers only the mechanics.

## Steps

1. Branch from `main`: `journal/<slug>`. Pushing `main` deploys koalastudios.ca on Netlify, so never push `main` without Frank's go-ahead for that post.
2. Add the post at the **top** of `blogPosts` (newest first). Use `status: "draft"` until Frank approves it, then `"published"`. Set `publishedAt` to the day it goes live.
3. Put images under `public/images/blog/<slug>/`, as compressed JPEG (photos) or PNG (flat graphics):
   - cover: 1536×1024, under ~350 KB;
   - share image: 1200×630 crop of the cover, as `seo.ogImage`;
   - in-post pictures: up to 2000 px wide.
   If a file replaces another under the same name, delete `.next/cache/images` before checking it locally.
4. Run `npm run lint`, `npx tsc --noEmit -p .` and `npm run build`.
5. Look at the post with `npx next start -p 3311`, on desktop (1440 wide) and phone (390 wide). Headless Chrome ignores window widths under ~500 px, so load the post in a 390 px iframe for the phone check. Check every chart, picture and the cover.

## Building blocks

| Field | What it renders |
| --- | --- |
| `title` + `titleAccent` | Article headline; the accent follows in italic serif. Keep the whole title under ~60 characters. |
| `summary` | The deck under the title, the index summary and the meta description fallback. |
| `cover` | Opening picture, index thumbnail (3:2). |
| `intro` | Opening paragraphs. |
| `map` | Optional "where this happens" overview linking numbered sections (see the first post). |
| `takeaways` | "If you only have an hour" box: three items linking to sections with `#id`. |
| `sections[]` | The body. `number` + post `sectionLabel` give the kicker ("Leak 1"); `area` and `fixTime` are optional kicker parts. `why` and `steps` sit under `whyHeading` / `stepsHeading` (defaults "Why it matters" / "What to do"). `check` is a "Check yours:" callout. Set `closing: true` on the closing thought. |
| `sections[].media[]` | Charts, numbers and pictures (below). |
| `sections[].figure` | The first post's hand-built before/after mock-ups only (`components/blog/LeakFigure.tsx`). |
| `checklist` | Dark box of to-do items. |
| `cta` | Green call-to-action box, usually to `/contact`. |
| `sources` | Numbered source list at the end. List every study, report or data set the post uses. |

Paragraphs are a string or a list of runs: `{ text, strong?, em?, href? }`. An `href` starting with `#` stays on the page, `/` is an internal link, anything else opens in a new tab.

## Media

Every chart and stat row needs a `source`. Don't chart a number you can't source; invented brands (IRONVOLT, Morrow Cove) may only appear in clearly illustrative examples, never as data.

```ts
{ kind: "stats", items: [{ value: "70%", label: "of carts are abandoned before payment" }], source: { label: "Baymard Institute, 2025", href: "https://…" } }

{ kind: "bar", title: "Why shoppers abandon a checkout", subtitle: "Share of US shoppers, by reason", unit: { suffix: "%" },
  rows: [{ label: "Extra costs too high", value: 39, highlight: true }, { label: "Had to create an account", value: 19 }],
  source: { label: "Baymard Institute, 2025", href: "https://…" } }

{ kind: "line", title: "…", unit: { prefix: "$" }, x: ["Jan", "Feb", "Mar"],
  series: [{ name: "With a reorder flow", values: [18, 21, 24] }, { name: "Without", values: [9, 10, 12] }],
  source: { label: "…" } }

{ kind: "image", src: "/images/blog/<slug>/x.jpg", alt: "…", width: 2000, height: 1333, caption: "…", credit: "Image: Koala Studios" }
```

- **Stats:** two to four headline numbers.
- **Bar:** one series. Up to about eight rows, sorted by value unless the order means something. Highlight the one or two rows the paragraph is about.
- **Line:** one or two series on one axis, never two scales. On phones only the first and last x labels show when there are more than six.

Charts run a little wider than the text and pictures run full width. Each chart has a "See the numbers" table.
