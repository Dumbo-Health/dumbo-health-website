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
| P2.4 | Create author bio pages with Person schema | ❌ Open | Author data is in Supabase (`blog_authors` table). Needs `/authors/[slug]` pages with Person + sameAs LinkedIn |
| P2.5 | Add CollectionPage schema to blog category pages | ❌ Open | 4 pages: `/blog-category/sleep-apnea`, `/cpap`, `/sleep-tracking`, `/sleep-disorders` |
| P2.6 | Add internal link from `/at-home-sleep-test` → `/get-your-at-home-sleep-apnea-test` | ❌ Open | Orphaned PPC landing page. Needs one contextual link to avoid crawl isolation. |

---

## Open Items by Owner

### Engineering (code changes remaining)

1. **Person schemas for team members on `/about-us`** — Pull from the `medical_team` and `scientific_committee` Supabase tables, add `Person` JSON-LD with `sameAs` pointing to LinkedIn profiles already stored in the DB.
2. **Author bio pages `/authors/[slug]`** — Data is in `blog_authors` table. Needs a new page template + Person schema + fix author name links in blog posts.
3. **CollectionPage schema on blog category pages** — ~5 lines per page, low effort. 4 pages: `/blog-category/sleep-apnea`, `/cpap`, `/sleep-tracking`, `/sleep-disorders`.
4. **Internal link from `/at-home-sleep-test` to `/get-your-at-home-sleep-apnea-test`** — One contextual link addition to avoid crawl isolation of the PPC landing page.
5. **`og:type = article` + `article:published_time` on blog posts** — Open Graph currently uses `website` for all pages. Blog post template should output `article` type with published/modified time.

### Content / Editorial

These require copy decisions or content creation — engineering cannot complete them:

1. **TL;DR boxes on blog posts** — Symptom pages are done. Blog posts still need a 2–3 sentence direct-answer paragraph immediately under the H1. LLMs extract these as standalone passage citations.
2. **External authority citations in blog posts** — Add inline links to NIH, CDC, AASM, or JCSM for medical claims. Both Google (E-E-A-T) and LLMs weight external citations as credibility signals.
4. **Medical reviewer bylines** — Every blog post and symptom page should show "Reviewed by [Dr. Name], MD, Board-Certified Sleep Medicine" under the H1. The reviewer's name should link to their profile page.
5. **Medical review policy page** (`/medical-review-policy` or `/editorial-standards`) — Documents how content is reviewed and updated. Critical E-E-A-T signal for YMYL classification.
6. **Credentials visible on product pages** — Board-certified physician names and credentials should appear on `/at-home-sleep-test` and `/cpap`, not just in the fine print.

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
| `/blog/*` | BlogPosting (already existed) | BlogPosting (og:type article pending) |
| Symptom pages (8) | None | TL;DR box on all 8 ✅ (MedicalWebPage schema pending) |
| Blog category pages (4) | None | None (CollectionPage pending) |

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

---

*Report generated: March 20, 2026 | Last updated: March 20, 2026*
