# SEO Audit Report - dumbo.health

**Audit Date:** 2026-02-24
**Site:** https://www.dumbo.health/
**Platform:** Webflow
**Industry:** Telehealth / Sleep Apnea
**Total Pages in Sitemap:** 69

---

## Executive Summary

The dumbo.health website has solid content foundations and good keyword targeting for sleep apnea telehealth, but suffers from **systemic SEO gaps** across nearly every page. The most critical issues are missing meta titles/descriptions, absent Open Graph tags, incomplete image alt text, and no canonical tags. These are foundational SEO elements that, when fixed, should yield significant organic visibility improvements.

---

## Page-by-Page Audit

### 1. Homepage (/)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing/Not visible | Not rendered in HTML head |
| Meta Description | Missing | No meta description tag found |
| H1 | "Take control of your sleep apnea" | Good - clear, keyword-rich |
| H2s | 7 headings | Good hierarchy, keyword-rich |
| H3s | 11 headings | Well-structured feature sections |
| Canonical | Missing | No canonical tag |
| OG Tags | Missing | No Open Graph tags |
| Twitter Cards | Missing | No Twitter Card meta |
| Schema/JSON-LD | Organization + FAQPage | Good - address, contact, FAQ structured data |
| Image Alt Tags | Partial | Some present, many empty or generic |
| Internal Links | Good | Links to /solutions, /at-home-sleep-test, /pricing, /blog, /about-us, /faqs, /contact |
| Word Count | ~2,000-2,500 | Adequate content depth |
| Key Terms | sleep apnea, CPAP, telehealth, at-home sleep test, diagnosis, treatment | Strong keyword presence |
| Scripts | Heavy | GTM, Mixpanel, Intercom, GSAP animations |
| Accessibility | Partial | Some ARIA labels, semantic nav/footer |

**Issues:**
- Missing meta title and description (critical for SERP CTR)
- No canonical URL
- No OG/Twitter tags (poor social sharing)
- Many images without alt text
- Heavy JS may impact crawl performance

---

### 2. Solutions (/solutions)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing | Not found |
| Meta Description | Missing | Not found |
| H1 | "Sleep Apnea Care, Start to Finish" | Good keyword targeting |
| H2s | 9 headings | Comprehensive section coverage |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | FAQPage | FAQ structured data present |
| Image Alt Tags | Partial | Some present ("CPAP Machine", "Watch Pat One"), many missing |
| Word Count | ~2,500+ | Good content depth |

**Issues:**
- All standard meta issues (title, description, canonical, OG)
- Inconsistent alt text quality
- Excessive inline CSS/JS from Webflow

---

### 3. At-Home Sleep Test (/at-home-sleep-test)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing | Not found |
| Meta Description | Missing | Not found |
| H1 | "At-Home Sleep Study" + "Better sleep starts at home" | Multiple H1s (issue) |
| H2-H4 | Well structured | "How it works", "Traditional vs Dumbo", "Scientific Committee", "FAQs" |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | FAQPage | FAQ structured data present |
| Image Alt Tags | Poor | Most images lack descriptive alt text |
| Word Count | ~3,500+ | Strong content depth |
| Key Terms | sleep apnea, at-home sleep test, WatchPAT ONE, OSA, CPAP | Excellent keyword density |

**Issues:**
- **Multiple H1 tags** - should have only one
- Missing all meta tags
- Heavy JavaScript (GSAP, scroll triggers)

---

### 4. Pricing (/pricing)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing | Not found |
| Meta Description | Missing | Not found |
| H1 | "Your Journey to Better Sleep Starts Here" | Generic, lacks pricing keywords |
| H2s | 4 headings | Feature comparison sections |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | None | No Product/Offer schema (critical miss) |
| Image Alt Tags | None | Product images (AirSense 10/11, masks) have no alt text |
| Word Count | ~2,400+ | Adequate |

**Issues:**
- **No Product/Offer schema** - missed opportunity for rich snippets
- **Zero alt text on product images** - critical for image SEO and accessibility
- H1 is too generic; should include "sleep apnea pricing" or "CPAP pricing"
- No pricing structured data despite being a pricing page

---

### 5. Blog (/blog)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Likely "Blog \| Dumbo Health" | Generic |
| Meta Description | Missing | Not found |
| H1 | "The Sleep Journal" | Creative but not SEO-optimized |
| Categories | CPAP, Sleep Apnea, Sleep Disorders, Sleep Tracking | Good topical coverage |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | None | No BlogPosting or Article schema |
| Blog Posts | 50+ articles | Good content volume |

**Issues:**
- No Article/BlogPosting schema markup
- Blog listing page lacks meta description
- Category pages (/blog-category/*) need individual optimization
- No structured data for articles (missed rich snippet opportunity)

---

### 6. About Us (/about-us)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing | Not found |
| Meta Description | Missing | Not found |
| H1 | "Built for Better Sleep" | Decent but generic |
| H2s | 10 headings | Good coverage: Purpose, Values, Story, Team, Press |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | None | No Organization or Person schema |
| Image Alt Tags | None | Team photos, hero images all lack alt text |
| Word Count | ~1,200+ | Thin for an About page |

**Issues:**
- **Zero alt text on all images** including team member photos
- No Person schema for scientific committee members
- Missing Organization schema (present on homepage but not here)
- Content could be expanded for E-E-A-T signals

---

### 7. FAQs (/faqs)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Likely "FAQs \| Dumbo Health" | Generic |
| Meta Description | Missing | Not found |
| H1 | "FAQs" | Too generic |
| Heading Hierarchy | Flat | FAQ questions not in heading tags |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | FAQPage | Comprehensive FAQ schema with multiple Q&As |
| Word Count | ~8,500+ | Very content-rich |

**Issues:**
- FAQ questions lack semantic heading structure (accessibility gap)
- H1 should be more descriptive ("Sleep Apnea FAQs" or similar)
- Heavy client-side rendering (GSAP, Lenis) may impact crawlability

---

### 8. Contact (/contact)

| Element | Status | Finding |
|---------|--------|---------|
| Meta Title | Missing | Not found |
| Meta Description | Missing | Not found |
| H1 | Missing | No H1 tag - jumps directly to H2 |
| H2s | 6 headings | Contact us, Patient portal, Talk, Availability, FAQs |
| H3s | 5 headings | Help, Investors, Media, Call us |
| Canonical | Missing | Not found |
| OG Tags | Missing | Not found |
| Schema/JSON-LD | FAQPage | 5 Q&A items |

**Issues:**
- **No H1 tag** - critical heading hierarchy violation
- Missing all meta tags
- Geographic availability (FL/TX) not in metadata

---

## Cross-Site Issues Summary

| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| Missing meta titles | All pages | Critical |
| Missing meta descriptions | All pages | Critical |
| Missing canonical tags | All pages | Critical |
| Missing OG tags | All pages | High |
| Missing Twitter Card tags | All pages | High |
| Incomplete image alt text | All pages | High |
| Heavy JavaScript (GSAP/Lenis) | All pages | Medium |
| No sitemap lastmod/priority | Sitemap | Medium |
| No hreflang tags | All pages | Low (single-language) |
| Robots.txt lacks sitemap reference | robots.txt | Medium |
