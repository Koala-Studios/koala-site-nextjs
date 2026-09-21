# Maya flyer review and private access

## Access

- Site: https://desktop-0t205dj.tailf000ee.ts.net:3038/maya
- Portraits: https://desktop-0t205dj.tailf000ee.ts.net:3038/maya/portraits
- Flyer proofs and downloads: https://desktop-0t205dj.tailf000ee.ts.net:3038/maya/flyers

Tailscale must be connected on the MacBook and this Windows machine must remain running. Tailnet-only Serve was added on its own port, preserving existing mappings. No Funnel or public hosting was enabled. The source site is unchanged publicly.

The compiled local-preview server listens on 127.0.0.1:3039. It retains local-only form behavior and disables live GA. Development remains available on 3037. Restart the review server from this worktree with:

```powershell
& 'C:\Program Files\nodejs\node.exe' node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3039
& 'C:\Program Files\Tailscale\tailscale.exe' serve --bg --https=3038 http://127.0.0.1:3039
```

Rebuild before restarting after code changes. The ignored `.env.local` preview flag is required for this review build. To remove only this private proxy: `tailscale serve --https=3038 off`. Do not reset unrelated Serve mappings.

## Files

All outputs are in `output/pdf/maya`:

- `maya-evergreen-screen.pdf` and `maya-chfa-screen.pdf`: two-page RGB proofs at 4 x 6 inches.
- `maya-evergreen-print.pdf` and `maya-chfa-print.pdf`: two-page CMYK review exports, 4 x 6 trim, 0.125-inch bleed, external crop marks.
- `manifest.json`: payload, dimensions, photo selection, logo provenance and color profile.
- `evergreen-1.png`, `chfa-1.png`, `evergreen-2.png`: web review renders.

Rebuild script: `scripts/build-maya-flyers.py`. It uses the original portrait, existing site fonts, and retained official logo. Dependencies: ReportLab, Pillow with LittleCMS, fontTools/Brotli, qrcode, pypdf. Render using Poppler. The original PNG is about 269 ppi at its 3.5-inch placed width; no artificial resolution claim is made.

## Design and provenance

Front: Maya, exact title, provisional seated taupe portrait, approved hero statement and Koala logo. Back: Iron Brothers 45% DTC increase/$1M+ online; Bull 350+ Canadian stores; Nosh Balls 37% online revenue growth within six months; Whiskey Road 34% revenue growth within six months; first-person partnership statement; free brand and growth audit; phone/email; domain and QR. Numbers follow the website's source record. No new performance claim or timeline was introduced.

Only difference in the CHFA edition: official CHFA NOW logo added to front. No booth, event date, attendance claim or tagline was authored. Asset retrieved from https://www.chfanow.ca/wp-content/uploads/now-toronto-2026-logo-full.png, linked by https://www.chfanow.ca/toronto/. Original asset retained as `chfa-official-logo.png`. No redraw or logo recoloring.

Both editions encode exactly `https://mayaamani.com` in the same vector QR with four-module quiet zone. No campaign query string was invented. The later domain redirect must establish Maya source attribution. QR decoding is verified; the future redirect journey is not live or verified by this flyer work.

## Verification and remaining review

Rendered screen and print pages inspected. QR decoding succeeds. Back renders are byte-identical between editions. Print boxes are correct, embedded raster assets are DeviceCMYK, and fonts are embedded. Agfa SWOP is the available generic CMYK output profile used for review; no printer-specific profile was supplied and no PDF/X certification is claimed. Final photo choice and printer/profile approval remain pending before a print order.

The preview page is noindex and is disabled without `NEXT_PUBLIC_LOCAL_PREVIEW=true`. Files are served through an explicit filename whitelist from the output folder, not copied into public assets. Neither files nor site were pushed live.
