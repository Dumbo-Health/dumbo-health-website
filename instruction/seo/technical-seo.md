# Technical SEO Findings - dumbo.health

**Audit Date:** 2026-02-24

---

## 1. robots.txt Analysis

**URL:** https://www.dumbo.health/robots.txt

### Current Configuration
- **Default User-agent (*):** `Allow: /` with content signal `search=yes, ai-train=no`
- **Blocked bots:** Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, meta-externalagent (all `Disallow: /`)
- **Sitemap reference:** None

### Issues
1. **No Sitemap directive** - The robots.txt does not reference the sitemap.xml, which helps search engines discover it
2. **AI bot blocking is appropriate** for content protection but verify GoogleBot (main crawler) is not accidentally affected by Google-Extended blocking
3. References EU Directive 2019/790 (copyright framework) - this is informational only

### Recommendation
Add to robots.txt:
```
Sitemap: https://www.dumbo.health/sitemap.xml
```

---

## 2. Sitemap Analysis

**URL:** https://www.dumbo.health/sitemap.xml

### Current State
- **Total URLs:** 69
- **lastmod dates:** None
- **changefreq:** None
- **priority:** None

### URL Categories
| Category | Count | Examples |
|----------|-------|---------|
| Core pages | ~10 | /, /solutions, /pricing, /about-us, /contact, /faqs |
| Blog posts | ~50 | Various sleep apnea, CPAP, treatment articles |
| Blog categories | 4 | /blog-category/cpap, /sleep-apnea, /sleep-disorders, /sleep-tracking |
| Blog authors | 2 | Kaila Caldwell, Nicky Charles-Peters |
| Scientific committee | 5 | Individual profiles |
| Service pages | ~5 | /at-home-sleep-test, DOT testing, WatchPat setup |

### Issues
1. **No lastmod dates** - Search engines can't determine freshness
2. **No changefreq** - No crawl frequency guidance
3. **No priority values** - No page importance signals
4. Missing image sitemap entries
5. No video sitemap (YouTube video embedded on homepage)

### Recommendations
- Add lastmod, changefreq, and priority to all URLs
- Consider separate sitemaps: pages sitemap + blog sitemap
- Add image sitemap for product/feature images
- Add video sitemap for embedded YouTube content

---

## 3. Schema/Structured Data

### Currently Implemented
| Schema Type | Page(s) | Quality |
|-------------|---------|---------|
| Organization | Homepage | Good - includes name, URL, logo, address, contact |
| FAQPage | Homepage, Solutions, At-Home Sleep Test, FAQs, Contact | Good - comprehensive Q&A pairs |

### Missing Schema (Recommended)
| Schema Type | Page | Priority |
|-------------|------|----------|
| **Product** | Pricing | Critical - CPAP devices, sleep tests |
| **Offer** | Pricing | Critical - pricing plans ($149 sleep test) |
| **MedicalOrganization** | About Us, Homepage | High - telehealth provider E-E-A-T |
| **MedicalWebPage** | All service pages | High - medical content classification |
| **BlogPosting/Article** | All blog posts | High - rich snippets in search |
| **Person** | Scientific committee profiles | Medium - E-E-A-T for medical expertise |
| **BreadcrumbList** | All pages | Medium - navigation rich snippets |
| **LocalBusiness** | Contact | Medium - local search visibility |
| **VideoObject** | Homepage (YouTube embed) | Medium - video rich snippets |
| **HowTo** | At-Home Sleep Test | Medium - step-by-step instructions |
| **Review/AggregateRating** | Homepage (testimonials) | Low - if reviews are verified |

---

## 4. Canonical Tags

**Status:** Missing on ALL pages

### Impact
- Risk of duplicate content issues (www vs non-www, trailing slashes, query parameters)
- Webflow may auto-generate some canonicals, but they were not detected
- Search engines must guess the preferred URL version

### Recommendation
Add self-referencing canonical tags to every page:
```html
<link rel="canonical" href="https://www.dumbo.health/page-url" />
```

---

## 5. Meta Tags

### Missing Across All Pages
- `<title>` tags (or not rendered server-side)
- `<meta name="description">` tags
- `<meta name="robots">` tags
- `<link rel="canonical">` tags

### Viewport Tag
- Likely present (Webflow default) but not confirmed in audit

### Recommendation
Every page needs unique, optimized:
- Title tag (50-60 characters, primary keyword + brand)
- Meta description (150-160 characters, compelling CTA)
- Robots tag (index, follow for public pages)
- Canonical tag

---

## 6. Open Graph & Social Tags

**Status:** Missing on ALL pages

### Required Tags
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://www.dumbo.health/og-image.jpg">
<meta property="og:url" content="https://www.dumbo.health/page-url">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dumbo Health">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://www.dumbo.health/og-image.jpg">
```

---

## 7. URL Structure

### Current Assessment: Good
- Clean, descriptive URLs (e.g., `/at-home-sleep-test`, `/solutions`, `/pricing`)
- Blog uses `/blog/post-slug` pattern
- No excessive parameters or dynamic URLs
- Lowercase, hyphenated structure

### Minor Issues
- `/go/tools` and `/go/sleep-protocol` use short prefix that could be more descriptive
- `/items/at-home-sleep-study` uses different prefix than `/at-home-sleep-test` (potential confusion)
- `/struggling-with-cost` - informal URL; consider `/financial-assistance` or `/insurance`

---

## 8. Page Speed & Performance Indicators

### JavaScript Load
| Script | Purpose | Impact |
|--------|---------|--------|
| Google Tag Manager | Analytics | Medium |
| Mixpanel | Analytics | Medium |
| Intercom | Chat widget | High (large bundle) |
| GSAP + ScrollTrigger | Animations | High (render blocking potential) |
| Lenis | Smooth scroll | Low-Medium |
| Webflow.js | Platform runtime | Required |

### Concerns
- **6+ third-party scripts** loaded on every page
- **GSAP animations** may delay Largest Contentful Paint (LCP)
- **Intercom widget** adds significant bundle size
- **No evidence of lazy loading** for below-fold scripts

### Recommendations
- Defer non-critical scripts (analytics, Intercom)
- Consider loading Intercom on scroll/click rather than page load
- Evaluate if GSAP animations are necessary for all pages
- Implement script loading strategy (async/defer attributes)

---

## 9. Mobile & Accessibility

### Mobile
- Webflow generates responsive designs by default
- Viewport meta tag likely present (Webflow standard)
- Mobile-first approach recommended for medical/telehealth

### Accessibility Gaps
- **Image alt text:** Largely missing across site
- **ARIA labels:** Partial implementation (some headings, navigation)
- **Heading hierarchy:** Broken on Contact page (no H1), At-Home Sleep Test (multiple H1s)
- **Semantic HTML:** Basic usage (nav, footer), but FAQ questions lack proper markup
- **Color contrast:** Brand colors (Peach #FF8361 on Daylight #FCF6ED) may have contrast issues
- **Form labels:** Not fully audited but Webflow typically generates accessible forms

---

## 10. HTTPS & Security

- **SSL:** Active (HTTPS enforced)
- **HSTS:** Likely via Cloudflare (Webflow hosting)
- **Mixed content:** Not detected
- **Status:** Good

---

## 11. International SEO

- **hreflang tags:** None (appropriate for US-only service)
- **Language declaration:** Should verify `<html lang="en">` is present
- **Geographic targeting:** Service available in FL & TX only; consider adding geo-targeting in Google Search Console

---

## 12. Crawlability Concerns

1. **Client-side rendering:** Heavy GSAP/Lenis JS may delay content availability to crawlers
2. **Webflow rendering:** Generally server-side rendered (good), but dynamic elements may not be crawled
3. **Internal linking:** Good structure from navigation, but blog cross-linking could be improved
4. **Orphan pages:** Need to verify all sitemap URLs are reachable via internal links
5. **Crawl budget:** 69 pages is small enough that crawl budget is not a concern
