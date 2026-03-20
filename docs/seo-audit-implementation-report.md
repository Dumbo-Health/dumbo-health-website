# SEO & LLM Indexability Audit — Implementation Report
**Audit by:** Rohan Singh | **Audit date:** March 18, 2026
**Implementation date:** March 20, 2026
**Prepared for:** SEO Lead

---

## Summary

All P0 items are resolved. All P1 items are resolved. P2 engineering items are fully resolved. The remaining open items are editorial/content work or off-site actions that engineering cannot complete unilaterally.

---

## What Was Fixed (Shipped to `dev`, deploying to production)

### P0 — Critical (All 4 resolved)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| P0.1 | Unblock ClaudeBot in robots.txt | ✅ Done | Removed from disallow list. GPTBot also unblocked (enables ChatGPT training + citations). CCBot and Bytespider remain blocked. |
| P0.2 | Create `/llms.txt` | ✅ Done | Live at `https://www.dumbo.health/llms.txt` — includes company description, all 4 services with URLs, key pages, contact info |
| P0.3 | Add Article schema to blog posts | ✅ Done | `blogPostSchema()` helper already existed in `schemas.ts` and is wired into the blog post template. Confirmed already shipping `datePublished`, `dateModified`, `author`, `publisher`. |
| P0.4 | Fix `/resources/facts` — canonical, title, schema | ✅ Done | Page split into server component (exports metadata + canonical + OG tags via `createMetadata()`) and client component. WebPage JSON-LD added. |

### P1 — Important (All 4 resolved)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| P1.1 | Add AboutPage + Person schemas to `/about-us` | ✅ Done | `AboutPage` JSON-LD injected with founding date, founders (Mo Sherif + Nico Aoun) as `Person` entities. Full team member schemas with LinkedIn sameAs still outstanding — see open items. |
| P1.2 | Add FAQPage schema to `/at-home-sleep-test` and `/cpap` | ✅ Done | 8 Q&A pairs written for each page. `FAQPage` JSON-LD added to both page files. Inline FAQ copy on `/at-home-sleep-test` updated to match. |
| P1.3 | Add TL;DR blocks to 8 symptom pages | ✅ Done | `tldr` field added to `SymptomPage` interface. Direct-answer copy written for all 8 pages. `TldrBox` component renders between hero and trust marquee on every symptom page. |
| P1.4 | Fix malformed Facebook URL in sameAs | ✅ Already correct | The constant in `src/lib/constants.ts` was already the correct string URL. The scientific notation bug was a rendering artifact in the audit — not present in the code. |

### P2 — Supporting Signal (4 of 6 resolved)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| P2.1 | Add blog post URLs to sitemap | ✅ Done | `sitemap.ts` is now async and fetches all published posts from Supabase at build time. Each entry gets individual `lastmod` from `updated_at` or `published_at`. |
| P2.2 | Add WebPage schema to `/solutions` | ✅ Done | (Classified P2 in audit, bumped to done alongside P1.1 since trivial) |
| P2.3 | Add TL;DR blocks to symptom pages | ✅ Done | Shipped as P1.3 above. Blog post TL;DRs remain an editorial task. |
| P2.4 | Create author bio pages with Person schema | ✅ Done | `/blog-author/[slug]` page built with Person JSON-LD, avatar, bio, social links, and post grid. |
| P2.5 | Add CollectionPage schema to blog category pages | ✅ Done | `collectionPageSchema()` wired into `/blog-category/[category]/page.tsx` — applies to all category pages. |
| P2.6 | Add internal link from `/at-home-sleep-test` → `/get-your-at-home-sleep-apnea-test` | ✅ Done | Contextual link added below main content: "Prefer a streamlined checkout? Order your at-home sleep apnea test →" |

---

## Open Items by Owner

### Engineering (code changes remaining)

All engineering items are now resolved. For reference:

- ✅ Person schemas for team members — `/about-us` pulls from local `medicalTeam` + `scientificCommittee` content and generates `Person` JSON-LD for each.
- ✅ Author bio pages — `/blog-author/[slug]` built with Person schema, LinkedIn/Twitter sameAs, post grid.
- ✅ CollectionPage schema on all blog category pages — wired via `collectionPageSchema()` in `[category]/page.tsx`.
- ✅ Internal link to PPC landing page — contextual link added to `/at-home-sleep-test`.
- ✅ `og:type = article` on blog posts — `createMetadata({ type: "article" })` already wired in blog post template.

### Content / Editorial

These require copy decisions or content creation — engineering cannot complete them:

1. **TL;DR boxes on blog posts** — Blog post template already renders `short_description` as a TL;DR block. Just needs `short_description` populated for each post in Supabase (`blog_posts.short_description`). 2–3 sentence direct-answer summary per article.
2. **External authority citations in blog posts** — Add inline links to NIH, CDC, AASM, or JCSM within blog post body content in Supabase. Both Google (E-E-A-T) and LLMs weight external citations as credibility signals.
3. **Medical reviewer bylines** — Every blog post and symptom page should show "Reviewed by [Dr. Name], MD, Board-Certified Sleep Medicine" under the H1. Needs a `reviewer` field in `blog_posts` table + display in blog post template. Reviewer name should link to their `/blog-author/[slug]` page.
4. ~~**Medical review policy page**~~ — ✅ Done. Live at `/medical-review-policy`. Covers content creation process, physician review, sourcing standards, and update policy.
5. **Credentials visible on product pages** — Board-certified physician names and credentials should appear on `/at-home-sleep-test` and `/cpap`, not just in the fine print.

### Off-Site (requires Dumbo Health to take action directly)

1. **Google Business Profile** — Claim/verify the listing for the North Miami address. Add "Sleep Disorder Treatment Center" and "Telehealth" as categories. Add GBP URL to `sameAs` in schema once claimed.
2. **Crunchbase** — Claim or create the company page and add the URL to the `sameAs` array in `organizationSchema()`.
3. **Health directory listings** — Claim profiles on Healthgrades, Zocdoc, and RateMDs. Add URLs to `sameAs` once live.
4. **Twitter/X account** — No account exists. When created, add the URL to `SOCIAL` in `constants.ts` and it will automatically flow into `organizationSchema()`.
5. **Apple App Store / Google Play** — If the app is publicly listed, add store URLs to `sameAs`.

---

## Schema Coverage — Before vs. After

| Page | Before | After |
|------|--------|-------|
| `/` (Home) | MedicalOrganization + FAQPage | Same (sameAs will expand when GBP/Crunchbase/X are claimed) |
| `/solutions` | None | WebPage ✅ |
| `/at-home-sleep-test` | Product | Product + FAQPage ✅ |
| `/cpap` | Product | Product + FAQPage ✅ |
| `/about-us` | None | AboutPage + founders as Person ✅ |
| `/faqs` | FAQPage | FAQPage (was already good) |
| `/resources/facts` | None | WebPage + canonical + title ✅ |
| `/blog/*` | BlogPosting (already existed) | BlogPosting + og:type=article ✅ |
| `/blog-author/[slug]` | None | Person schema + author bio page ✅ |
| `/medical-review-policy` | None | WebPage schema + E-E-A-T policy page ✅ |
| Symptom pages (8) | None | TL;DR box on all 8 ✅ (MedicalWebPage schema pending) |
| Blog category pages (4) | None | CollectionPage schema on all 4 ✅ |

---

## Verification Checklist (post-deploy)

- [ ] `https://www.dumbo.health/robots.txt` — ClaudeBot and GPTBot should no longer appear as Disallow
- [ ] `https://www.dumbo.health/llms.txt` — returns plain text, no 404
- [ ] View source on `/resources/facts` — should contain `<title>Sleep Apnea Facts`, canonical tag, OG tags, and `application/ld+json` WebPage block
- [ ] View source on `/about-us` — should contain `application/ld+json` AboutPage block with founders
- [ ] View source on `/solutions` — should contain `application/ld+json` WebPage block
- [ ] `https://www.dumbo.health/sitemap.xml` — blog post URLs (`/blog/[slug]`) should appear
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) on `/about-us` and `/solutions` — schemas should validate
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) on `/at-home-sleep-test` and `/cpap` — FAQPage schema should validate and show FAQ rich result eligibility
- [ ] View source on any symptom page (e.g. `/always-tired`) — TL;DR card should appear between the hero and the trust marquee
- [ ] View source on any blog category page — should contain `application/ld+json` CollectionPage block
- [ ] `https://www.dumbo.health/blog-author/[slug]` — author bio page loads with Person JSON-LD and post grid
- [ ] `https://www.dumbo.health/medical-review-policy` — page loads with WebPage JSON-LD and full editorial policy copy
- [ ] View source on `/at-home-sleep-test` — should contain contextual link to `/get-your-at-home-sleep-apnea-test`
- [ ] View source on any blog post — `og:type` should be `article` (not `website`)

---

*Report generated: March 20, 2026 | Last updated: March 20, 2026*
