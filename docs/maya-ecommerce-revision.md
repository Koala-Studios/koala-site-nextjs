# Maya ecommerce revision — 2026-09-23

Local review on `codex/maya-ecommerce-refinement`, based on main `61407e8`.

## Content and evidence

- Frank supplied Maya's two annotated brochure screenshots and website feedback on September 23. These support adding Allo's 300+ Canadian channels, international expansion/acquisition, the requested brand/channel experience, and ecommerce-first positioning.
- `public/documents/maya-amani-executive-profile.pdf` supports career duration, Allo acquisition by Magnum and Middle East expansion, Magnum 303%, Iron Brothers 45% / $1M+, and Mercato ecommerce work.
- Existing `lib/content/site-content.ts` supplies Koala's Unity, Nosh and Whiskey ecommerce project details. Six-month periods for Nosh/Whiskey were previously explicitly supplied by Frank.
- Bull's 350+ retail figure is **not reassigned to Mercato**. Mercato appears qualitatively pending confirmation of its exact result.
- Sammy D's is omitted pending exact brand identification. Search found a BBQ jerk sauce brand at sammydeez.com and a distinct Canadian coffee trademark. No placeholder logo is used.
- Retailers/distributors are labelled as commercialization channel experience, not presented as agency clients or promised placements.

## Logos

New original source URLs are recorded in `maya-logo-sources.json`. Amazon is the original inline footer SVG; UNFI is cropped from the official investor presentation. Existing prepared native-color assets are reused for Mercato, Unity, Nosh, Iron Brothers, Whiskey Road and Magnum. New marks were downloaded from their brand sites/CDNs. No AI-generated or typed replacement logos.

Product descriptors follow official product categories and existing project material. Canadian Nosh is `www.noshballs.ca`, distinct from the Swiss `noshballs.com` brand.

## Brochure build

Run `scripts/build-maya-brochure.py --source /absolute/path/to/Maya-Amani-Brochure.pdf` with reportlab, pypdf, Pillow, fonttools[woff] and Node/sharp available. Mac bundled Python was used; fonttools/woff dependency installed into `tmp/maya-revision/python` and supplied via PYTHONPATH.

The exact v4 source remains at `/Users/frank/Downloads/Maya-Amani-Brochure.pdf`, SHA-256 `34bb9f52719aef88cf7affdc411a814e90e0962376308c63118a442dc18274f6`. Its selected cover artwork is retained with an ecommerce-growth subtitle. Earlier files are preserved.

Outputs: `output/pdf/maya-brochure-v5/`, evergreen and CHFA reader PDFs (4 pages, 396 × 612 pt) and review spreads (2 pages, 792 × 612 pt; 4|1 and 2|3). CHFA edition only adds the CHFA logo. RGB review artwork, not printer-approved PDF/X. QR decoded from the final rendered page as `https://mayaamani.com`.

## Verification

- Production build, ESLint, TypeScript, `node scripts/check-attribution.cjs`, and `git diff --check` pass.
- Desktop 1440×1000 and mobile 390×844 inspected in the Codex browser: hero, services, results, channel marks, closing CTA. No horizontal overflow; no browser errors observed. CTA retains `/contact?interest=brand-growth-audit&source=maya`.
- All reader layouts rendered and inspected, including corrected portrait headroom and CHFA page 4. PDF counts, sizes and absence of Bull/350+ verified; QR decoded successfully.
- No public deploy, Git push, email send or Nextcloud sharing change. Local review server is `http://127.0.0.1:3037/maya`.
