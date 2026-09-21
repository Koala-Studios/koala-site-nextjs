# Maya and Koala local review

## Current private MacBook preview

Frank subsequently authorized Tailscale and flyer work. Use https://desktop-0t205dj.tailf000ee.ts.net:3038/maya with Tailscale connected. Flyer review is at `/maya/flyers`; photo options remain at `/maya/portraits`. This supersedes the flyer deferral below. The private proxy now uses a built preview on localhost:3039; the development server is still on localhost:3037. See `maya-flyer-review.md` for PDFs and restart instructions.

## Review links

- Maya: http://localhost:3037/maya
- Four portrait options: http://localhost:3037/maya/portraits
- Homepage palette: http://localhost:3037/
- Audit form: http://localhost:3037/contact?interest=brand-growth-audit&source=maya

Portrait 03, seated in taupe, is provisional. The two original variants are preserved and two full-torso variants have been added. Master PNGs are in `output/maya-portraits`; web assets are in `public/images/maya`. No flyer has been started.

## Implemented scope

- Existing fonts, navigation, button geometry and general copy retained. Off-white and nude surfaces, ink text and selective green replace the dark/lime palette, including the existing homepage scene.
- First-person Maya page: approved hero, belief, prominent results, four executive growth stories, existing brand carousel, integrated Koala partnership, executive-profile PDF, audit CTA and direct phone/email.
- Shared free brand and growth audit offer on Maya, home, services and the audit contact entry. All audit CTAs lead to `/contact` with interest preselected. Header/footer Start a project labels remain unchanged as agreed.
- Website input is required plain text. No domain, protocol, URL-format, or reachability validation.
- Browser attribution stores first touch, latest campaign and independent Maya association for 60 days. Untagged internal navigation preserves provenance. A competing campaign updates latest touch without erasing Maya association. Direct visits to `/maya` alone are not misreported as proven Maya referrals.
- Attribution fields accompany the existing Netlify form. Successful-submit, CTA and direct-contact event integration uses the existing GA setup. Live GA reporting configuration has not been changed.

## Local preview behavior

Ignored `.env.local` contains `NEXT_PUBLIC_LOCAL_PREVIEW=true`. This suppresses live analytics and form delivery, makes submissions inspectable under browser session-storage key `koala:preview-submission`, and exposes the noindex portrait review route. Data entered here is not delivered to Koala. The photo gallery returns notFound when this flag is absent. Gallery source images remain ordinary public assets.

Restart from this worktree if needed:

```powershell
& 'C:\Program Files\nodejs\node.exe' node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3037
```

This is a local review build. Do not deploy it. A later approved release requires rebuilding without the local-preview flag and confirming the actual form/analytics path in the deployment environment.

## Verification and limits

- Production build: passed, 38 static pages. Existing multiple-lockfile root warning remains nonblocking.
- ESLint: passed.
- `node scripts/check-attribution.cjs`: passed first/latest touch, return visits, 60-day expiry, competing campaigns, Maya evidence, blocked storage and static form-field parity.
- Browser: desktop 1440px and mobile 390px checks across seven page surfaces, no horizontal overflow. Images load when scrolled into view. Screenshots: `output/playwright/maya-review`.
- Form: missing website rejected; arbitrary text accepted; Maya campaign survived Services navigation; local success retained attribution and selected audit. No live post or GA event sent.
- Source: original four-page `Maya_Amani_Executive_Profile July 2026.pdf`; figures use that CV plus Frank's six-month instruction for Nosh Balls/Whiskey Road. Final portrait likeness and copy selection are awaiting Frank's review.

## Deferred work and access

- Website/portrait alignment comes before either flyer version.
- No git push, production deploy, DNS changes, QR generation, printing, email sending, or live analytics configuration performed.
- Later domain work needs the offered GoDaddy access and hosting/redirect configuration access. One eventual QR points to `mayaamani.com`, then redirects to `koalastudios.ca/maya`; preserve campaign tags and cover www. Exact redirect settings are not implemented here.
- GA4 administrative access is needed to inspect/register reporting dimensions and conversion settings; GTM access only if the existing setup requires it. No new account or container is assumed.
- Hosting/form access is needed to verify actual Netlify submission capture, notifications and attribution fields after a separately approved deployment.
- Browser-local attribution does not follow people between devices, after storage clearing, or when persistent storage is blocked. Blocked storage falls back to the current page session in memory.
