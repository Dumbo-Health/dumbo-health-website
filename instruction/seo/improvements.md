# SEO Improvements - Prioritized Action Plan

**Site:** https://www.dumbo.health/
**Date:** 2026-02-24

---

## Critical Priority (Fix Immediately)

### 1. Add Meta Titles to All Pages
**Impact:** Direct SERP visibility and CTR improvement
**Effort:** Low
**Pages:** All pages (currently none have visible meta titles)

Recommended titles:
- **Homepage:** "Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health" (62 chars)
- **Solutions:** "Sleep Apnea Solutions: Diagnosis to Treatment | Dumbo Health" (59 chars)
- **At-Home Sleep Test:** "At-Home Sleep Apnea Test - FDA Approved, $149 | Dumbo Health" (60 chars)
- **Pricing:** "Sleep Apnea Treatment Plans & CPAP Pricing | Dumbo Health" (57 chars)
- **Blog:** "The Sleep Journal: Sleep Apnea Tips & Guides | Dumbo Health" (59 chars)
- **About Us:** "About Dumbo Health - Telehealth Sleep Apnea Experts" (51 chars)
- **FAQs:** "Sleep Apnea FAQs: Testing, Treatment & Insurance | Dumbo Health" (63 chars)
- **Contact:** "Contact Dumbo Health - Sleep Apnea Support & Help" (49 chars)

### 2. Add Meta Descriptions to All Pages
**Impact:** Improved SERP CTR (click-through rate)
**Effort:** Low
**Pages:** All pages (none currently have meta descriptions)

See `content-seo.md` for recommended descriptions per page.

### 3. Add Canonical Tags to All Pages
**Impact:** Prevents duplicate content issues, consolidates page authority
**Effort:** Low (Webflow setting)
**Implementation:** Self-referencing canonical on every page
```html
<link rel="canonical" href="https://www.dumbo.health/{page-path}" />
```

### 4. Fix Heading Hierarchy Issues
**Impact:** Crawlability, accessibility, keyword signals
**Effort:** Low

| Page | Issue | Fix |
|------|-------|-----|
| /at-home-sleep-test | Multiple H1s | Keep one, demote others to H2 |
| /contact | No H1 | Add H1: "Contact Dumbo Health" |
| /faqs | Generic H1 "FAQs" | Change to "Sleep Apnea FAQs" |

---

## High Priority (Fix Within 2 Weeks)

### 5. Add Open Graph Tags to All Pages
**Impact:** Social sharing appearance (Facebook, LinkedIn, WhatsApp previews)
**Effort:** Medium

Required per page:
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

Create a branded OG image template (1200x630px) using Dumbo Health brand colors.

### 6. Fix Image Alt Text Across Entire Site
**Impact:** Image SEO, accessibility (ADA compliance), screen reader support
**Effort:** Medium-High (many images)

Priority order:
1. Product images on Pricing page (CPAP machines, masks)
2. Hero images on Homepage and Solutions
3. Team photos on About Us
4. Blog post featured images
5. Decorative/icon images (can use empty alt)

### 7. Add Product/Offer Schema to Pricing Page
**Impact:** Rich snippets showing prices in search results
**Effort:** Medium

```json
{
  "@type": "Product",
  "name": "At-Home Sleep Apnea Test",
  "description": "FDA-approved WatchPAT ONE at-home sleep study",
  "offers": {
    "@type": "Offer",
    "price": "149",
    "priceCurrency": "USD"
  }
}
```

### 8. Add BlogPosting Schema to All Blog Posts
**Impact:** Article rich snippets, author knowledge panels
**Effort:** Medium (Webflow CMS template update)

Include: headline, author, datePublished, dateModified, image, publisher.

### 9. Add Sitemap Reference to robots.txt
**Impact:** Ensures search engines discover sitemap
**Effort:** Minimal

Add: `Sitemap: https://www.dumbo.health/sitemap.xml`

### 10. Enhance Sitemap with Metadata
**Impact:** Better crawl prioritization and freshness signals
**Effort:** Low-Medium

Add to every URL in sitemap.xml:
- `<lastmod>` - last modification date
- `<changefreq>` - weekly for blog, monthly for service pages
- `<priority>` - 1.0 for homepage, 0.8 for service pages, 0.6 for blog posts

---

## Medium Priority (Fix Within 1 Month)

### 11. Add MedicalOrganization Schema
**Impact:** E-E-A-T signals for health content, knowledge panel potential
**Effort:** Medium

Add to homepage and about page:
```json
{
  "@type": "MedicalOrganization",
  "name": "Dumbo Health",
  "medicalSpecialty": "Sleep Medicine",
  "availableService": "Telehealth Sleep Apnea Diagnosis and Treatment"
}
```

### 12. Add Person Schema for Medical Team
**Impact:** E-E-A-T for medical content, author authority
**Effort:** Medium

Add to scientific committee profiles and author pages.

### 13. Add "Medically Reviewed" Badges to Blog Posts
**Impact:** E-E-A-T trust signals, aligns with Google health content guidelines
**Effort:** Low-Medium

Format: "Medically reviewed by Dr. [Name], [Credentials]" with link to bio.

### 14. Optimize Blog Category Pages
**Impact:** Category pages can rank for broader keywords
**Effort:** Medium

Each /blog-category/ page needs:
- Unique meta title and description
- Introductory content (100-200 words) about the category
- Proper H1 heading

### 15. Improve Internal Linking in Blog Posts
**Impact:** Distributes page authority, helps crawlers discover content
**Effort:** Ongoing

- Every blog post should link to 2-3 other blog posts
- Every blog post should link to at least one service page
- Add "Related Articles" section at bottom of posts

### 16. Defer Non-Critical JavaScript
**Impact:** Page speed, Core Web Vitals (LCP, FID)
**Effort:** Medium

- Defer Intercom widget (load on scroll/interaction)
- Defer Mixpanel (load after page interactive)
- Review GSAP animation necessity per page
- Add `async` or `defer` attributes where possible

---

## Low Priority (Fix Within 2-3 Months)

### 17. Create Location-Specific Landing Pages
**Impact:** Local SEO for FL and TX markets
**Effort:** High

Create pages like:
- /sleep-apnea-florida
- /sleep-apnea-texas
- /sleep-doctor-jacksonville (already exists, optimize)

### 18. Build a Sleep Apnea Pillar Page
**Impact:** Topical authority, long-tail keyword capture
**Effort:** High

Create comprehensive "Ultimate Guide to Sleep Apnea" (3,000+ words) linking to all cluster blog posts.

### 19. Add Video Sitemap
**Impact:** Video rich snippets in search
**Effort:** Low

Add VideoObject schema for the YouTube embed on homepage and create a video sitemap.

### 20. Add BreadcrumbList Schema
**Impact:** Navigation breadcrumbs in search results
**Effort:** Low

Implement on all pages for clearer SERP presentation.

### 21. Create a Glossary Page
**Impact:** Long-tail keyword rankings for medical terms
**Effort:** Medium

Sleep apnea terminology page targeting searches like "what is AHI", "what is OSA", "what is CPAP pressure".

### 22. Add HowTo Schema to At-Home Sleep Test Page
**Impact:** How-to rich snippets in search
**Effort:** Low

The "How it works" section is perfect for HowTo structured data.

### 23. Expand About Page Content
**Impact:** E-E-A-T signals, trust building
**Effort:** Medium

Currently ~1,200 words. Expand to 2,000+ with:
- Company timeline/milestones
- Detailed mission statement
- Partnership/accreditation information
- Patient outcome statistics

---

## Quick Wins Summary

| Action | Time | Impact |
|--------|------|--------|
| Add meta titles to all pages | 1 hour | Critical |
| Add meta descriptions to all pages | 1 hour | Critical |
| Enable canonical tags in Webflow | 30 min | Critical |
| Fix H1 issues (3 pages) | 30 min | Critical |
| Add Sitemap to robots.txt | 5 min | Medium |
| Add OG images/tags | 2 hours | High |
| Product schema on pricing | 1 hour | High |

---

## Measurement Plan

After implementing these changes, track:
1. **Google Search Console:** Impressions, clicks, average position, CTR
2. **Organic traffic growth** (Google Analytics / Mixpanel)
3. **Rich snippet appearances** (Search Console Enhancement reports)
4. **Core Web Vitals** (PageSpeed Insights, Search Console)
5. **Keyword rankings** for target terms (Ahrefs/SEMrush)
6. **Crawl stats** (Search Console Crawl Stats report)

### Target KPIs (3-month post-implementation)
- 30%+ improvement in organic impressions
- 20%+ improvement in SERP click-through rate
- All pages indexed with unique titles/descriptions
- Core Web Vitals passing on all pages
- Rich snippets appearing for FAQ, Product, and Article pages
