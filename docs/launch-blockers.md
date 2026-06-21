# Launch Blockers — Needs Owner Action

Items that code alone cannot finish. Everything else from
`docs/launch-readiness-report.md` has been implemented and re-verified (see the
"Launch-Readiness Fix Pass" and "Launch-Readiness Verification + Gap Closure"
entries in `docs/execution-ledger.md`). The `contact_submit` GA4 event now
actually fires on `/contact/success` (it previously did not) — it still needs
to be marked as a conversion in GA4 admin (item 5).

## Must do before DNS cutover

1. **Meta Pixel + Conversions API** — create the pixel in Meta Business
   Manager, then add to the site. Implementation when you have the ID:
   - Add `NEXT_PUBLIC_META_PIXEL_ID` to Netlify env.
   - Add a `MetaPixel` client component in `app/layout.tsx` next to
     `GoogleAnalytics` (standard `fbq` snippet + `fbq('track','PageView')`),
     and fire `fbq('track','Lead')` inside `handleSubmit` in
     `components/contact/ContactForm.tsx`.
   - For CAPI, easiest path is the Meta/Netlify server-side integration or
     a tag manager — decide once traffic spend starts.
2. **Verify the contact form end-to-end on the production deploy** — submit
   a real test; confirm it lands in Netlify Forms, email notifications are
   configured to a monitored inbox, the service checkboxes + budget field
   are captured, and `/contact/success` loads.
3. **Confirm `hello@koalastudios.ca` exists** and replies come from it.
   It is printed on home, contact, success, footer, menu, privacy policy,
   and in the Organization schema.
4. **Netlify env + domain**: set `NEXT_PUBLIC_SITE_URL` to the final origin,
   pick apex vs `www`, force HTTPS, and add the single-host 301.
5. **GA4**: property `G-3BWBGYMGHR` is hardcoded in `lib/gtag.ts` — confirm
   it's the right property, test real-time on the production domain, and
   mark the `contact form submit` event as a conversion in GA4 admin.
6. **Consent decision (PIPEDA / Quebec Law 25)**: GA loads unconditionally
   and the privacy page discloses it. If you will run Meta Pixel + serve
   Quebec traffic, add a lightweight consent banner before trackers fire.
   The privacy page (`/privacy`) was drafted by us — **have it reviewed**
   and confirm the retention/contact statements are accurate.

## Should do at launch

7. **Real social profiles** — `siteSettings.social` is now empty (the
   placeholder links were removed). Add real Instagram/LinkedIn URLs in
   `lib/content/site-content.ts`; they will automatically flow into the
   Organization `sameAs` schema.
8. **Google Business Profile** (Toronto) + link it to the site; submit the
   sitemap in Google Search Console and Bing Webmaster Tools.
9. **Budget ranges in the contact form** — we shipped neutral ranges
   (Under $5k / $5–15k / $15–50k / $50k+ / retainer). Confirm or adjust to
   your actual minimums in `components/contact/ContactForm.tsx`.
10. **Booking link** — add a Calendly/Cal.com "15-min intro call" URL; we
    recommend placing it on `/contact` beside the email and on
    `/contact/success`. Trivial to wire once the account exists.

## Content that needs real-world input (post-launch ok, high impact)

11. **Named testimonials** — current four are anonymous. Get permission for
    name + company (ideally photo). Swap in
    `lib/content/site-content.ts` → `homepageTestimonials`.
12. **Real client logos** — the homepage "Brands we've built for" carousel
    currently renders styled wordmarks of the six case-study brands. Swap
    to actual logo SVG/PNG files when you have usage permission (and
    confirm each brand is OK being listed).
13. **Case-study outcomes** — add one hard metric per case (conversion,
    ROAS, revenue lift) once clients approve numbers; until then the pages
    deliberately make no performance claims.
14. **Founder/team block** — a short bio with real names/photo on the
    homepage or services page (E-E-A-T signal lost when /about was removed).
15. **Service-page claims check** — `/services/meta-ads-management` and
    `/services/email-marketing` describe process, not results. Read once
    and confirm every sentence is deliverable as written.

## Verification to repeat after the above

- Lighthouse mobile/desktop on `/`, `/work`, `/services`,
  `/services/shopify-design-and-build`, `/contact` (3D + fonts changed
  since the last recorded audit).
- Share-card preview (Facebook debugger / LinkedIn inspector) — new
  `koala_meta.jpg` is 1200×630, current branding.
- Real-device pass: iPhone Safari + mid-range Android Chrome.
