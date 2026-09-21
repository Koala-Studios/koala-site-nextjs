# Maya and Koala: discovery record and implementation proposal

## Status and authority

### Subsequent authorization: Tailscale and flyers

Frank next instructed: "serve through tailscale so i can see in the macbook. proceed with the flyer autonomously". Private Tailscale preview and both agreed flyer editions are now authorized. The earlier flyer hold is superseded. No public launch, DNS change, print order, or final portrait approval was included.

### Subsequent authorization: local implementation

Frank subsequently authorized the Maya portraits, website page, and general site changes, with a local preview only. He instructed us to continue from portraits into the site, select a provisional portrait, and let him choose the final photo once the site is ready. Nothing may be pushed live. Flyer work is deferred until the website is aligned. The original discovery-only status below is historical and is superseded within this local scope. See `maya-local-review.md` for implementation and verification.

### Original proposal status

This document records the agreed direction and proposes the work needed to deliver it. It is not authorization to start implementation. Frank explicitly stopped implementation and requested this Markdown document instead.

Current authorized action: create this proposal. Do not change site code, generate further portraits, create flyers, publish, or change DNS on the strength of this document alone. Resume implementation only when Frank instructs it.

Two portrait previews were generated prematurely. Frank explicitly said to keep them. They are retained outside the repository, have not been selected for use, and must not be deleted or treated as approved portraits.

The Q&A below is a consolidated record, not a verbatim transcript. It includes corrections and superseded choices so earlier answers cannot accidentally override later instructions. Implementation detail is distinguished from approved outcomes. Unselected technical details are not presented as user decisions.

## 1. Agreed question and answer record

### Purpose, positioning, and page content

| Question or decision | Agreed answer |
| --- | --- |
| Is Maya's page event-specific or evergreen? | Evergreen executive consulting presence. CHFA is a use case for the collateral. |
| Who is the audience? | Founders and senior leaders at established consumer and ecommerce brands. |
| What is Maya's public title? | Chief Marketing & Growth Officer. Do not add a fractional qualifier. |
| How are Maya and Koala related? | An integrated business partnership, with Maya remaining involved. Do not describe a handoff from Maya to Koala. |
| What is the canonical page? | `https://koalastudios.ca/maya`. |
| What happens to Maya's domain? | `mayaamani.com` redirects to the Koala `/maya` page. Include `www.mayaamani.com`. |
| What voice does the page use? | Maya in first person. |
| What kind of narrative? | Emotional and outcome-led, not a service list. A curated executive story, not a complete career timeline. |
| What is the hero statement? | "I build brands customers love, retailers trust, investors value, and acquirers want to buy." |
| Should results be prominent? | Yes. Numbers sell and strengthen the value proposition. Tie them to their context. |
| Which engagements anchor the story? | Iron Brothers, Bull, Nosh Balls, and Whiskey Road. |
| What timeframes must be stated? | Nosh Balls: 37% growth within six months. Whiskey Road: 34% growth within six months. |
| What belief should drive the story? | Ambitious brands deserve an experienced growth partner who sees their potential and remains involved in realizing it. The concept is approved; final prose must follow the plain-language copy rules. |
| What narrative themes are approved? | Brand growth, commercialization, and omnichannel expansion. Present as parts of the story, not service cards. |
| Which brand carousel? | Reuse the same carousel and brands already on Koala's homepage. |
| What page sequence? | Portrait/name/title/hero/CTA; first-person belief; prominent results; four growth stories; existing brand carousel; Maya and Koala partnership; final CTA. |
| Should the full CV be available? | Yes, a discreet public executive-profile PDF link below the partnership section. |
| What copy rules apply? | No AI-sounding stock copy and no em dashes throughout Maya's page and flyers. Use plain, specific language. |
| Should Maya's contact details appear online? | Yes, on `/maya` as well as both flyers. |

### Existing Koala site and visual system

| Question or decision | Agreed answer |
| --- | --- |
| Is the new palette only for Maya? | No. Change Koala's site-wide palette; Maya's page and flyers follow it. |
| What visual direction? | Light, clean, Sephora-inspired, with off-white/nude surfaces and the deep green in the supplied reference. |
| Should typography change? | No. Keep the existing fonts. |
| Should existing buttons, navigation, and copy change? | Keep them for now, apart from the explicitly approved audit copy and contact-form changes. The main existing-site change is color. |
| Large green sections? | No. Green is a selective accent. |
| Is the proposed palette final? | It is an approved working palette, to be perfected later. |
| Does the global header CTA change? | No. Keep "Start a project". Update existing audit-specific copy and CTAs, not the global navigation. |

### Audit offer, conversion, and form

| Question or decision | Agreed answer |
| --- | --- |
| What free offer? | A free brand and growth audit, replacing the existing narrower website/conversion audit offer throughout the site. |
| What does it cover? | Positioning, ecommerce, retail readiness, and growth opportunities. |
| What does the prospect receive? | Three highest-impact growth opportunities and a 30-minute conversation with Maya and Koala. |
| Is an audit automatic? | No. Review requests for fit before scheduling. |
| What is the primary CTA on Maya's page and flyers? | "Request a free brand and growth audit." This supersedes the earlier "Contact Maya" primary CTA. |
| Where do website audit buttons go? | The existing `/contact` page, with Brand and growth audit preselected and still editable. |
| Does Maya get a separate inquiry form or booking page? | No. Use the existing Koala contact flow. |
| What happens to the Site audit checkbox? | Rename it to Brand and growth audit. |
| Is the website field required? | Yes. A normal required text field, with no URL-format validation or check that the website exists or works. |
| Is there already a website field? | Frank recalled an optional field. The inspected worktree does not contain one. Reconcile this during implementation so the final form has one required field, not duplicates. |
| What phone number? | `+1 (416) 660-9626`. |
| What email? | `maya@koalastudios.ca`, explicitly confirmed. |
| Are direct contact clicks measured? | Yes. Track email and telephone clicks separately from actual form submissions. |

### Flyers, QR, attribution, and domain

| Question or decision | Agreed answer |
| --- | --- |
| Flyer format? | Double-sided, vertical, 4 x 6 inches. |
| How will it be used? | Maya will hand it out at CHFA while circulating independently. |
| One edition or two? | Two: evergreen and CHFA. |
| How does the CHFA edition differ? | Add only the CHFA logo. No event tagline, dates, booth details, or meeting prompt. |
| Flyer front? | Maya's portrait and hero line. |
| Flyer back? | Strong results, a short partnership statement, the audit offer, and response details. |
| Include phone/email or only QR? | Include phone, email, printed `mayaamani.com`, and QR. |
| Separate QR per edition? | No. One shared QR code. Do not distinguish the two editions through different codes. |
| Where does the QR go? | **`mayaamani.com`**, reaffirmed explicitly. It must not directly encode a Koala `/maya` or `/contact` URL. The domain redirect then takes the visitor to `/maya`. |
| Should navigation to other Koala pages lose Maya attribution? | No. Preserve it through browsing and return visits within the agreed retention period. |
| What retention period? | 60 days, replacing the suggested 90 days. |
| What source information is preserved? | First-touch and latest-touch campaign data, plus a separate Maya referral record so later campaigns do not erase Maya's involvement within the retention period. |
| Should this reach the lead record? | Yes. Submit attribution with the contact form and also use GA4 for reporting. |
| Is Google Tag Manager required? | No migration was agreed. The existing Google tag can support the proposed tracking. |
| Is the domain available for the change? | Yes. Frank agreed to the DNS/hosting direction and will provide GoDaddy access for that step. This does not override the current implementation hold. |
| Print specifications? | Standard specifications: 0.125-inch bleed, CMYK output, crop marks, and separate screen proofs. |
| Should schedules be requested? | No. Frank said timelines are not relevant here. Do not add assumed deadlines. |

### Portrait direction

| Question or decision | Agreed answer |
| --- | --- |
| Identity references? | Use both supplied photographs of Maya. |
| How many variants? | At least four. |
| Wardrobe? | Explore both light cream/taupe tailoring and dark black/deep-green clothing. |
| Framing? | Two closer portraits and two showing the full torso. Do not make all four chest-up. |
| Full-torso pose mix? | One seated and slightly turned; one standing with relaxed movement. |
| Mood and posing? | Natural, with personality and angled poses, not rigidly straight-on. |
| Backgrounds? | Real professional environments with natural light and softly focused context. |
| Approved environment mix? | Executive office, glass atrium, refined boardroom, architectural workspace. |
| Excluded environments? | Plain white/clean studio backdrops, cafes, and casual lifestyle settings. |
| Identity treatment? | Preserve recognizable features and hair with natural skin texture, without heavy retouching or face-shape changes. |
| Status of the two generated previews? | Keep them. No final selection or acceptance was given. |

## 2. Implementation proposal: existing-site color change

### Approved working palette

| Role | Color |
| --- | --- |
| Main canvas | `#F7F4EF` |
| Nude surfaces | `#E8DED4` |
| Primary text | `#191A18` |
| Selective green accent | `#32684A` |
| Muted taupe text | `#746D66` |
| Warm borders | `#D8CEC5` |

These are working values, not a claim of exact color sampling from the reference. Final refinement was explicitly deferred until previews.

Proposed implementation work after authorization:

1. Update the shared color tokens and inspect hard-coded dark/lime colors in active route and component styles.
2. Apply the light system across the existing site, including header, footer, menus, forms, buttons, links, borders, and interaction states.
3. Use green selectively. Do not introduce large green section backgrounds.
4. Preserve existing fonts, button geometry, navigation, layout, spacing, and interaction patterns. Adjust color-dependent text/icon/logo treatment only as needed for visibility in the light scheme.
5. Preserve existing marketing copy except for the agreed audit-offer changes. New `/maya` content is a separate approved addition.
6. Check desktop/mobile legibility, hover/focus/selected states, and logos against their new backgrounds. Refine colors through previews.

Existing technical touchpoints include `styles/site/tokens.css`, `app/globals.css`, active route CSS modules, and shared site/component CSS modules. The proposal does not authorize unrelated visual or architectural redesign.

## 3. Implementation proposal: Maya's page

### Content and layout

1. Create `/maya` within the current Next.js site and shared visual system.
2. Open with Maya's selected portrait, name, exact title, approved hero statement, and audit CTA.
3. Write the belief section in Maya's first person, using specific, natural language.
4. Give numerical proof prominent visual weight with the correct engagement and timeframe attached.
5. Develop the four selected engagement stories around brand growth, commercialization, and omnichannel expansion. Do not invent Maya's role, actions, baselines, or measurement periods.
6. Reuse `components/brands/BrandsBuiltFor.tsx`, its existing brand data, and carousel behavior.
7. Explain Maya and Koala as one integrated partnership with Maya's continuing involvement.
8. Add the public executive-profile PDF link below that section.
9. End with the same audit offer and CTA, plus the confirmed email and phone.
10. Keep the existing global navigation. Do not add an unapproved Maya navigation item or contextual link placement.

### Proof inventory

| Proof | Agreed use and wording boundary |
| --- | --- |
| Iron Brothers | Selected story: 45% growth and $1M+ online revenue. Preserve the source meaning; do not turn this into a claim of $1M incremental revenue or add an unprovided timeframe. |
| Bull | Selected story: 350+ Canadian retail locations. Do not invent a measurement period or claim all locations were personally acquired by Maya. |
| Nosh Balls | 37% growth within six months, explicitly supplied by Frank. |
| Whiskey Road | 34% growth within six months, explicitly supplied by Frank. |
| Broader CV proof discussed | 15+ years, two brands built and acquired, and 303% ecommerce growth were discussed as possible prominent proof. Final inclusion and context must follow the CV; not every discussed statistic was assigned a final placement. |

The CV and Frank's explicit corrections are the source of claims. Do not silently redefine unspecified "growth" as revenue, profit, conversion rate, or another metric. If source material cannot support a more specific final sentence, ask before adding that specificity.

### Technical integration

- Keep editable Maya content in the existing content/helper architecture rather than duplicating it across components.
- Use the approved assets in the project only after selection; provide appropriate image text alternatives and responsive rendering.
- Prepare route metadata with `https://koalastudios.ca/maya` as the canonical URL. Public PDF access is approved; broader SEO copy and indexing configuration were not separately decided.
- Keep route registration and metadata consistent with the actual page. Do not treat previously suggested SEO/indexing choices as accepted user requirements.

## 4. Implementation proposal: audit and contact form

### Offer changes

1. Replace existing public free-audit offer wording with the free brand and growth audit across the homepage, services pages, and other existing audit-specific placements.
2. Explain its approved scope and deliverable: positioning, ecommerce, retail readiness, three high-impact growth opportunities, and a 30-minute conversation with Maya and Koala.
3. Say requests are reviewed for fit before scheduling. Do not promise an automatic appointment, response deadline, or additional deliverable.
4. Use "Request a free brand and growth audit" as the primary action on `/maya` and the flyers.
5. Keep the global header action "Start a project" unchanged.

### Form behavior

1. Keep `/contact` and its existing submission flow.
2. Rename the Site audit interest to Brand and growth audit.
3. Support the agreed audit query `interest=brand-growth-audit`; preselect the checkbox while allowing visitors to change it.
4. Ensure exactly one Website URL field is present and required for the contact form. Use ordinary text input and required-field behavior only. No URL syntax, domain, protocol, DNS, or reachability validation.
5. Preserve the other existing form fields and submission behavior except for approved changes.
6. Include attribution fields in the submission and in the Netlify form definition so the received lead contains them.
7. Preserve existing form identity, endpoint, spam trap, success behavior, and error handling.

Known local touchpoints: `components/contact/ContactForm.tsx`, `public/__forms.html`, `app/contact/page.tsx`, and the existing analytics helpers. The observed absence of Website URL in this worktree is an implementation reconciliation item, not permission to create duplicate fields elsewhere.

## 5. Implementation proposal: QR, attribution, and GA4

### Visitor journey

1. Both flyers print `mayaamani.com` and use the same QR code.
2. The QR destination uses `mayaamani.com`. Campaign parameters, where used, must not change that destination domain.
3. Maya's domain redirects to `https://koalastudios.ca/maya`, preserving incoming campaign parameters.
4. The website records referral/campaign information on arrival so it does not depend on the eventual contact-page query string alone.
5. The visitor can browse Koala pages and return later within the retention period.
6. The audit button opens `/contact` with the audit preselected; the form carries the retained attribution with the inquiry.

### Records to preserve

| Record | Purpose |
| --- | --- |
| First-touch campaign | Preserve the original recorded acquisition source within the retention policy. |
| Latest-touch campaign | Retain later campaign information alongside the first source. |
| Maya referral | Preserve evidence of a Maya referral separately so later campaigns do not erase it within 60 days. |
| Lead submission attribution | Attach the retained source information to the actual contact record. |

Use the approved 60-day retention period, not 90 days. This is a browser-based attribution plan, not a promise to identify people across devices or after storage is cleared.

### GA4 reporting

- Use the existing Google tag; no Tag Manager migration was requested.
- Send relevant attribution values with a successful contact submission event, register the reporting dimensions, and mark the submission event as a key event.
- Track telephone and email link clicks separately. A click is not proof of a completed call, email, or acquired lead.
- Keep the received form attribution as the per-lead record; GA4 provides reporting alongside it.
- One QR means no flyer-edition attribution split. Do not introduce separate evergreen/CHFA QR codes.

Exact UTM strings, storage mechanism, expiry/refresh mechanics, and handling of direct visits were not selected in discovery. They remain technical details to specify before implementation, not silently assumed decisions in this document. A visit to `/maya` alone must not silently be equated with a proven Maya referral without a defined attribution rule. Any rule that changes who receives credit requires clarification.

The earlier `/contact?source=maya` suggestion is superseded as a complete tracking solution by persistent attribution. It is not sufficient on its own.

## 6. Implementation proposal: portraits

### Source files

- `C:/Users/Frank/.codex/attachments/11f8cfba-a20b-4650-8228-03b2acff8c57/WhatsApp Image 2026-09-16 at 15.18.48.jpeg`
- `C:/Users/Frank/.codex/attachments/2ed25bd6-5e24-450b-abc0-3a9528aa5b09/WhatsApp Image 2026-09-16 at 15.18.49.jpeg`

### Required set

- At least four variants using both references for identity.
- Two closer portraits with natural angles and personality.
- Two full-torso portraits: one seated and turned, one standing with relaxed movement.
- Explore both cream/taupe and black/deep-green wardrobe directions.
- Use the approved professional location mix and natural light. No cafe or seamless white studio imagery.
- Preserve Maya's recognizable face, hair, and natural skin texture.

The exact wardrobe-to-pose-to-location mapping was not chosen. Do not label a particular mapping as approved. Review the set before selecting website and flyer imagery.

### Retained previews

These are existing previews, not approved final assets:

- Cream-office preview: `C:/Users/Frank/.codex/generated_images/01a06e58-cfaf-79e3-bf6c-a8fa5f3d9cf0/exec-637df690-d263-4def-8c24-b578bbaf4030.png`
- Green-atrium preview: `C:/Users/Frank/.codex/generated_images/01a06e58-cfaf-79e3-bf6c-a8fa5f3d9cf0/exec-369fd224-b532-4aa5-879f-6a411ed33a3a.png`

Frank instructed that they be kept. Whether they count toward the final four depends on later review; no choice has been made. Do not generate more images under this documentation-only instruction.

## 7. Implementation proposal: flyers

1. Create a double-sided vertical 4 x 6 layout using the Koala fonts and approved palette.
2. Front: selected portrait, Maya's identity/title, and approved hero statement.
3. Back: selected results, short integrated-partnership statement, primary audit offer, and contact details.
4. Include `+1 (416) 660-9626`, `maya@koalastudios.ca`, printed `mayaamani.com`, and the shared QR.
5. Produce an evergreen edition and a CHFA edition. Add only the CHFA logo to the latter; keep the underlying content and QR the same.
6. Prepare each print PDF with 0.125-inch bleed, CMYK output, and crop marks, plus a separate screen proof.
7. Verify rendered front/back pages for legibility, image quality, margins, cropping, and QR scan behavior.

A specific printer color profile, paper, finish, quantity, and ordering process were not agreed. Do not invent them or place a print order. No timeline is part of this proposal.

## 8. Domain and hosting proposal

The discussed approach is to connect `mayaamani.com` and `www.mayaamani.com` to Koala's Netlify site and configure a permanent host-specific redirect to `/maya` that preserves campaign parameters.

After implementation is authorized and the target page is ready:

1. Inspect the actual GoDaddy DNS records and Netlify domain configuration.
2. Prepare the exact domain attachment and redirect configuration for the existing site.
3. Use Frank-provided GoDaddy access for the necessary DNS changes.
4. Verify HTTPS and redirect behavior for the root and `www` hostnames.
5. Verify the shared QR journey and campaign-parameter preservation end to end.

Prior inspection found a currently served Maya page and DNS records consistent with the discussed GoDaddy setup. That is not evidence of authenticated access to the account. Do not modify unrelated DNS/email records. Root and `www` redirects are agreed; no migration plan for other legacy Maya URLs was established.

## 9. Access and inputs needed

| Access or input | Purpose | Current status / boundary |
| --- | --- | --- |
| Local Koala repository | Future code, content, styling, form, and tracking changes | Available in this worktree. Current authorization is documentation only. |
| Two original photos | Identity references for portrait variants | Supplied locally. |
| Maya executive-profile PDF | Claim checking and public PDF download | Source exists at `C:/Users/Frank/Downloads/Maya_Amani_Executive_Profile July 2026.pdf`. Public download approved. |
| GoDaddy domain/DNS access | Configure Maya root and `www` domain routing | Frank explicitly said he will provide access. Not supplied or verified in this proposal. |
| Koala Netlify site access with appropriate domain/deployment permissions | Attach domains, configure hosting, deploy approved work, and inspect form receipt | Needed for those provider steps; availability not established here. |
| Correct GA4 property access sufficient to configure dimensions/key events and inspect reporting | Finish and verify campaign/lead reporting | Needed for property configuration; account access and property identity not verified here. |
| Official CHFA logo asset | Add the logo to the CHFA flyer | Source asset still to be obtained/verified. Do not redraw a substitute or add event copy. |
| Final portrait selection | Choose image(s) used publicly and in print | Pending review. Existing previews are retained, not approved. |

No Google Tag Manager account, CRM migration, new booking system, email sending access, or printer ordering access is required by the agreed deliverables. Publishing and DNS actions remain on hold with implementation. Credentials must not be written into this proposal.

## 10. Explicit exclusions and superseded suggestions

- No implementation is authorized by the request to create this document.
- Do not delete the two generated previews.
- Do not reuse the previously rejected Maya creative package as an approved design.
- No new typography or replacement of Bebas Neue/Roboto Condensed.
- No existing-site layout, button-shape, navigation, or general copy overhaul. The audit offer and form changes are the agreed exceptions.
- No large green site sections.
- No service-list treatment or full career timeline on Maya's landing page.
- No generic promotional filler or em dashes in Maya page/flyer copy.
- No fractional-title addition, invented claims, invented measurement periods, or unsupported causal attribution.
- No separate Maya form, booking page, or automatic audit appointment.
- No URL-format validation or live website checks on the required text field.
- No competing "Contact Maya" primary button. The audit is primary on the page and flyers.
- No CHFA event copy, date, booth number, or "Meet Maya" treatment on the event flyer. Logo addition only.
- No separate flyer QR codes and no QR directly encoding a Koala URL.
- No 90-day retention. The approved period is 60 days.
- No attribution design based only on a contact-page query parameter.
- No plain white studio portraits, cafes, rigid straight-on poses, or all-chest-up variant set.
- No unrequested print order, schedule, production deadline, or unrelated DNS/email change.

## 11. Remaining decisions and deferred details

No answer is invented for the following items. They do not block this record of the agreed scope. Resolve them before the dependent implementation or finalization step.

| Item | What is settled | What remains |
| --- | --- | --- |
| Implementation start | Frank requested this document and stopped implementation | A subsequent instruction to begin work. |
| Portrait selection | At least four variants; framing, mood, and environments agreed | Exact variant mapping, acceptance of existing previews, and final image selection. |
| Final copy | Voice, hero, themes, offer, selected stories, and key figures agreed | Actual full page/flyer text and source checks on detailed claims. |
| Palette refinement | Six working colors approved | Final tuning after previews, explicitly deferred by Frank. |
| Attribution mechanics | Shared QR domain, 60 days, first/latest touch plus retained Maya source | Exact UTM values, storage/expiry mechanics, direct-visit rules, and handling of existing consent behavior. Do not silently introduce a new consent flow. |
| QR payload | It must go to `mayaamani.com`; shared by both flyers | Exact campaign query string, if encoded. Do not replace the agreed domain with the redirect target. |
| Technical form reconciliation | One required unvalidated Website URL text field | Compare current saved/live form and worktree before editing. |
| CHFA asset | Logo-only addition | Obtain and verify the actual asset. |
| Print color conversion | CMYK output and standard bleed/crop marks | Output profile and export mechanics; no printer-specific profile was supplied. |
| Public-page metadata | Canonical `/maya` and downloadable CV | Final SEO text and any indexing decision beyond what was explicitly discussed. |
| Provider configuration | DNS/hosting approach agreed; Frank will provide GoDaddy access | Verify Netlify/GA4 access and prepare exact configuration. |

If any of these produces a substantive conflict with an agreed requirement, ask Frank before proceeding with that part. Do not turn a technical suggestion into an accepted business decision.

## 12. Verification and delivery plan after implementation authorization

These are proposed verification steps, not claims of completed work:

1. Build the changed Next.js site using the repository's documented Windows npm command. Run the relevant lint/type checks and meaningful form/attribution checks.
2. Inspect affected routes at desktop and mobile sizes. Check color contrast, logos, visible controls, overflow, and preserved site behavior.
3. Verify `/maya` sections, title, hero, numbers, six-month qualifiers, carousel reuse, PDF link, and audit CTA.
4. Verify that every audit-specific link uses `/contact`, with an editable preselected audit interest where agreed, while the header remains "Start a project".
5. Test that Website URL rejects an empty value but accepts ordinary non-URL text. Confirm all intended fields reach the received form record.
6. Test arrival through Maya's shared QR, internal navigation, return visits within 60 days, expiry, and another campaign arriving later. Confirm first/latest touch and separate Maya attribution behave according to the resolved rules.
7. Verify successful form submissions are counted correctly in GA4 without treating failed sends or email/phone clicks as completed leads.
8. Verify the Maya root and `www` redirect, HTTPS, and query preservation after the authorized provider changes.
9. Render and inspect both flyer editions and screen proofs. Confirm logo-only edition differences, identical QR payloads, scan readability, correct contact details, print dimensions, bleed, marks, and CMYK output.
10. Record actual verification results and remaining blockers. Do not describe a preview as published or a draft as print-ready until verified.

Planned deliverables are the updated color system and audit offer, `/maya`, the required form and attribution behavior, the portrait variant set, two flyer editions with print and screen PDFs, and the domain routing/configuration work. Their completion remains future work.

## 13. Repository context and precedence

- Working copy: `C:/Users/Frank/.codex/worktrees/c0d9/koala-site-nextjs`.
- Saved project originally supplied by Frank: `C:/DEV/koala webiste react/koala-site-nextjs`.
- Existing `.agent/current_slice.md` and the opening historical entry in `docs/execution-ledger.md` predate this completed discovery. They still describe some now-resolved choices as open.
- `docs/project-scope.md` describes a broader prior overhaul. For this requested work, Frank's explicit restriction to a palette change plus the enumerated Maya/audit/form/tracking additions governs scope. Do not use older overhaul language to expand it.
- Existing modifications to `.agent/current_slice.md` and `docs/execution-ledger.md` were present before this document was created. This documentation task does not overwrite them.

This file is the consolidated proposal and Q&A for the current request. It is not a build report, acceptance record, or deployment authorization.
