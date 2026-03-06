# Dumbo Health - Next.js + shadcn/ui Rebuild Plan

**Date:** 2026-02-24
**Domain:** dumbo.health
**Stack:** Next.js 15 (App Router) + shadcn/ui + Tailwind CSS 4 + TypeScript
**Hosting:** Vercel

---

## 1. Project Structure

```
dumbo-health/
├── .env.local                          # Environment variables
├── .env.example                        # Template for env vars
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind + brand tokens
├── tsconfig.json
├── components.json                     # shadcn/ui config
├── package.json
│
├── public/
│   ├── fonts/
│   │   ├── nohemi/                     # Nohemi (headings)
│   │   │   ├── Nohemi-Regular.woff2
│   │   │   └── Nohemi-Medium.woff2
│   │   ├── aeonik/                     # Aeonik (body)
│   │   │   ├── Aeonik-Regular.woff2
│   │   │   └── Aeonik-Bold.woff2
│   │   └── aeonik-mono/               # Aeonik Mono (tags/labels)
│   │       └── AeonikMono-Regular.woff2
│   ├── images/
│   │   ├── hero/                       # Hero carousel images
│   │   ├── products/                   # Sleep test kit, CPAP devices, masks
│   │   ├── team/                       # Scientific committee + medical team photos
│   │   ├── icons/                      # Feature/step SVG icons
│   │   ├── blog/                       # Blog post featured images
│   │   └── misc/                       # Map, wave decorations, etc.
│   ├── og/                             # Open Graph images (1200x630)
│   │   ├── default.jpg
│   │   ├── blog.jpg
│   │   ├── pricing.jpg
│   │   └── sleep-test.jpg
│   ├── logo.svg                        # Dumbo Health wordmark
│   ├── isotype.svg                     # Dumbo Health icon mark
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── robots.txt                      # Generated at build time via next.config
│   └── sitemap.xml                     # Generated via next-sitemap
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (fonts, analytics, Intercom)
│   │   ├── page.tsx                    # Homepage
│   │   ├── not-found.tsx               # Custom 404
│   │   ├── globals.css                 # Tailwind directives + CSS custom properties
│   │   ├── manifest.ts                 # Web manifest
│   │   ├── robots.ts                   # Robots.txt generation
│   │   ├── sitemap.ts                  # Dynamic sitemap generation
│   │   │
│   │   ├── solutions/
│   │   │   └── page.tsx
│   │   ├── at-home-sleep-test/
│   │   │   └── page.tsx
│   │   ├── get-your-at-home-sleep-apnea-test/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Individual blog post
│   │   ├── blog-category/
│   │   │   └── [category]/
│   │   │       └── page.tsx            # Category filtered listing
│   │   ├── about-us/
│   │   │   └── page.tsx
│   │   ├── faqs/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── struggling-with-cost/
│   │   │   └── page.tsx
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   └── terms-of-use/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui primitives (auto-generated)
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/                     # Site-wide layout components
│   │   │   ├── navbar.tsx              # Main navigation + mobile menu
│   │   │   ├── footer.tsx              # Footer with 4-column nav + wave
│   │   │   ├── mobile-nav.tsx          # Mobile hamburger menu (uses Sheet)
│   │   │   └── skip-link.tsx           # Accessibility skip-to-content
│   │   │
│   │   ├── shared/                     # Reusable section components
│   │   │   ├── trust-marquee.tsx       # Trust indicators scrolling marquee
│   │   │   ├── testimonials.tsx        # 3-doctor testimonials section
│   │   │   ├── faq-section.tsx         # FAQ accordion (subset, with CTA)
│   │   │   ├── availability-map.tsx    # FL/TX map + insurance notice
│   │   │   ├── waitlist-form.tsx       # State + interest waitlist signup
│   │   │   ├── cta-section.tsx         # "Sleep apnea care, made for you" CTA
│   │   │   ├── benefits-grid.tsx       # 4 benefit cards + circular image
│   │   │   ├── comparison-table.tsx    # Traditional vs Dumbo Health table
│   │   │   ├── video-embed.tsx         # YouTube embed (lazy-loaded)
│   │   │   ├── value-proposition.tsx   # "More accessible" banner
│   │   │   ├── scientific-committee.tsx # Committee + medical team cards
│   │   │   ├── service-area-banner.tsx # "Now available in FL and TX"
│   │   │   ├── newsletter-signup.tsx   # Email newsletter form
│   │   │   └── bottom-cta.tsx          # "Sleep Better. Live Louder!" CTA
│   │   │
│   │   ├── home/                       # Homepage-specific components
│   │   │   ├── hero.tsx                # Hero with image carousel
│   │   │   ├── problem-statement.tsx   # Sad emoji + messaging
│   │   │   └── solutions-grid.tsx      # 6-step solution cards
│   │   │
│   │   ├── solutions/                  # Solutions-specific components
│   │   │   ├── hero.tsx                # Solutions hero
│   │   │   ├── treatment-step.tsx      # Individual step card (reused 6x)
│   │   │   ├── treatment-options.tsx   # Step 2 with CPAP/Oral/Telehealth
│   │   │   └── treatment-summary.tsx   # Summary banner
│   │   │
│   │   ├── sleep-test/                 # Sleep test page components
│   │   │   ├── product-hero.tsx        # Product details + gallery + buy CTA
│   │   │   ├── product-gallery.tsx     # Swiper image gallery with thumbnails
│   │   │   ├── product-tabs.tsx        # 7-tab info section (uses Tabs)
│   │   │   ├── how-it-works.tsx        # 4-step process
│   │   │   ├── comparison-checklist.tsx # At-home vs in-lab checklist
│   │   │   └── support-callout.tsx     # "Have questions?" phone CTA
│   │   │
│   │   ├── pricing/                    # Pricing page components
│   │   │   ├── plan-tabs.tsx           # CPAP / Mouthguard tab switcher
│   │   │   ├── plan-card.tsx           # Individual plan card (Essentials/Premium/Elite)
│   │   │   ├── feature-comparison.tsx  # Full feature matrix table
│   │   │   └── plan-hero.tsx           # Pricing hero section
│   │   │
│   │   ├── blog/                       # Blog components
│   │   │   ├── post-card.tsx           # Blog post preview card
│   │   │   ├── post-grid.tsx           # Grid of post cards
│   │   │   ├── category-filter.tsx     # Category pill filters
│   │   │   ├── post-content.tsx        # Full blog post rendered content
│   │   │   ├── post-header.tsx         # Title, author, date, category
│   │   │   ├── author-card.tsx         # Author info with photo
│   │   │   ├── related-posts.tsx       # Related articles at post bottom
│   │   │   └── table-of-contents.tsx   # Auto-generated TOC for long posts
│   │   │
│   │   ├── about/                      # About Us page components
│   │   │   ├── hero.tsx                # Photo grid hero
│   │   │   ├── values-section.tsx      # Our Values with key points
│   │   │   ├── story-section.tsx       # Our Story
│   │   │   ├── team-card.tsx           # Individual team member card
│   │   │   └── press-section.tsx       # Press section (CMS-driven)
│   │   │
│   │   ├── contact/                    # Contact page components
│   │   │   ├── contact-card.tsx        # Support/Investors/Media/Call cards
│   │   │   ├── contact-form.tsx        # Full contact form
│   │   │   └── patient-login.tsx       # Existing patient CTA
│   │   │
│   │   └── struggling/                 # Struggling with Cost components
│   │       ├── stats-grid.tsx          # 3 stat cards ($3000+, 6 months, 40%+)
│   │       └── why-switch.tsx          # Why switch section
│   │
│   ├── lib/
│   │   ├── utils.ts                    # shadcn/ui cn() utility
│   │   ├── blog.ts                     # Blog data fetching + helpers
│   │   ├── metadata.ts                 # SEO metadata helpers
│   │   ├── schemas.ts                  # JSON-LD structured data generators
│   │   └── constants.ts                # Site-wide constants (URLs, contact info)
│   │
│   ├── content/
│   │   ├── blog/                       # MDX blog posts (45 files)
│   │   │   ├── is-cpap-covered-by-insurance.mdx
│   │   │   ├── sleep-apnea-otc-treatments-real-help-or-just-hype.mdx
│   │   │   └── ... (43 more)
│   │   ├── faqs.ts                     # FAQ data (grouped by category)
│   │   ├── testimonials.ts             # Doctor testimonials data
│   │   ├── trust-indicators.ts         # Trust badge items
│   │   ├── team.ts                     # Scientific committee + medical team
│   │   └── plans.ts                    # Pricing plans data
│   │
│   ├── hooks/
│   │   ├── use-intersection.ts         # Intersection Observer for animations
│   │   └── use-media-query.ts          # Responsive breakpoint hook
│   │
│   └── types/
│       ├── blog.ts                     # Blog post, author, category types
│       └── index.ts                    # Shared types
│
├── next-sitemap.config.js              # next-sitemap configuration
└── contentlayer.config.ts              # Contentlayer for MDX (if using MDX)
```

---

## 2. Component Breakdown

### 2.1 shadcn/ui Components Required

Install these shadcn/ui primitives:

```bash
npx shadcn@latest init
npx shadcn@latest add accordion badge button card carousel dialog dropdown-menu form input label navigation-menu select separator sheet table tabs textarea tooltip
```

### 2.2 Component-to-shadcn/ui Mapping

| Site Feature | shadcn/ui Component | Notes |
|---|---|---|
| FAQ accordions | `Accordion` | Used on Home, Solutions, Sleep Test, Contact, Struggling, FAQs pages |
| Pricing plan cards | `Card` | 3 cards per treatment type (Essentials, Premium, Elite) |
| CPAP/Mouthguard switcher | `Tabs` | Pricing page plan type toggle |
| Product info tabs | `Tabs` | 7-tab section on At-Home Sleep Test page |
| Feature comparison | `Table` | Pricing feature matrix |
| Mobile navigation | `Sheet` | Slide-out hamburger menu |
| Product image zoom | `Dialog` | Lightbox modal for product photos |
| Nav dropdown (Resources) | `DropdownMenu` or `NavigationMenu` | Resources submenu in header |
| Contact topic selector | `Select` | "Select your message topic" dropdown |
| Form inputs | `Input`, `Textarea`, `Label` | Contact form, waitlist form, newsletter |
| Plan badges | `Badge` | "-58%" discount, "IN STOCK" status |
| Info tooltips | `Tooltip` | Feature comparison info pointers |
| Buttons/CTAs | `Button` | All CTA buttons with brand variants |

### 2.3 Custom Components (Beyond shadcn/ui)

| Component | Description | Implementation |
|---|---|---|
| `TrustMarquee` | Infinite horizontal scrolling trust badges | CSS `@keyframes` marquee with duplicated children |
| `HeroCarousel` | Auto-cycling hero images (`data-image-cycle`) | `framer-motion` AnimatePresence with auto-play interval |
| `CTACarousel` | 3-image CTA slider | `embla-carousel-react` (shadcn/ui carousel uses this) |
| `ProductGallery` | Swiper with thumbnails | `embla-carousel-react` with thumbnail sync |
| `AvailabilityMap` | US map with FL/TX highlighted | Inline SVG with conditional fill colors |
| `WaveDecoration` | Footer wave SVG animation | CSS animated SVG, static on reduced-motion |
| `StaggerReveal` | Scroll-triggered stagger animations | `framer-motion` + Intersection Observer |
| `StickyTitle` | Sticky scroll heading effect | CSS `position: sticky` with Intersection Observer |
| `StatCounter` | Animated number counter | `framer-motion` useMotionValue for count-up |
| `ComparisonChecklist` | At-home vs In-lab check/X list | Custom flexbox layout with check/X icons |

---

## 3. Page Routes

### 3.1 Route Mapping (Webflow URL -> Next.js Route)

| Current URL | Next.js Route | Type | Notes |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Static (SSG) | Homepage |
| `/solutions` | `src/app/solutions/page.tsx` | Static (SSG) | 6-step journey + anchor sections |
| `/at-home-sleep-test` | `src/app/at-home-sleep-test/page.tsx` | Static (SSG) | Product page with Shopify |
| `/get-your-at-home-sleep-apnea-test` | `src/app/get-your-at-home-sleep-apnea-test/page.tsx` | Static (SSG) | Landing page variant |
| `/pricing` | `src/app/pricing/page.tsx` | Static (SSG) | Plan comparison |
| `/blog` | `src/app/blog/page.tsx` | Static (SSG) | Blog listing, regenerated on publish |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Dynamic (SSG) | 45 blog posts via `generateStaticParams` |
| `/blog-category/[category]` | `src/app/blog-category/[category]/page.tsx` | Dynamic (SSG) | 4 categories via `generateStaticParams` |
| `/about-us` | `src/app/about-us/page.tsx` | Static (SSG) | Team + committee |
| `/faqs` | `src/app/faqs/page.tsx` | Static (SSG) | 71 FAQ items |
| `/contact` | `src/app/contact/page.tsx` | Static (SSG) | Contact form (server action) |
| `/struggling-with-cost` | `src/app/struggling-with-cost/page.tsx` | Static (SSG) | Cost-focused landing page |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Static (SSG) | Legal page |
| `/terms-of-use` | `src/app/terms-of-use/page.tsx` | Static (SSG) | Legal page |

### 3.2 Redirects (in `next.config.ts`)

```ts
async redirects() {
  return [
    // External app links (preserve existing URLs)
    { source: '/go/tools', destination: 'https://www.dumbo.health/go/tools', permanent: true },
    { source: '/go/sleep-protocol', destination: 'https://www.dumbo.health/go/sleep-protocol', permanent: true },
  ];
}
```

### 3.3 Static Generation Strategy

All pages use Static Site Generation (SSG) for maximum performance:

- **Static pages:** Generated at build time, no runtime server needed
- **Blog posts:** `generateStaticParams()` pre-renders all 45 posts
- **Blog categories:** `generateStaticParams()` for 4 category pages
- **ISR (Incremental Static Regeneration):** Enable with `revalidate: 3600` on blog pages so new posts appear within 1 hour without full rebuild

---

## 4. CMS / Content Strategy

### 4.1 Blog Content: MDX with Contentlayer

**Recommendation: MDX files in the repo using Contentlayer (or `@next/mdx` + `gray-matter`)**

**Why MDX over a headless CMS:**
- 45 posts is a manageable size for file-based content
- No external dependency or API costs
- Full version control via Git
- MDX allows embedding React components in posts (comparison tables, CTAs, product widgets)
- Content team can use a Git-based CMS like Decap CMS (formerly Netlify CMS) for a visual editor

**MDX Frontmatter Schema:**

```yaml
---
title: "Is CPAP covered by insurance?"
slug: "is-cpap-covered-by-insurance"
category: "cpap"
author: "kaila-caldwell"
publishedAt: "2026-02-03"
updatedAt: "2026-02-03"
excerpt: "In most cases, yes, but that doesn't mean it's affordable..."
featuredImage: "/images/blog/cpap-insurance.avif"
featuredImageAlt: "CPAP machine with insurance documents"
medicalReviewer: "dr-zachary-adams"
readingTime: 8
seo:
  title: "Is CPAP Covered by Insurance? What You Need to Know | Dumbo Health"
  description: "Learn whether insurance covers CPAP therapy, common coverage pitfalls, and why out-of-pocket options like Dumbo Health can save you money."
---
```

**Blog Data Layer (`src/lib/blog.ts`):**

```ts
import { allPosts } from 'contentlayer/generated';

export function getAllPosts() { /* sorted by date */ }
export function getPostBySlug(slug: string) { /* single post */ }
export function getPostsByCategory(category: string) { /* filtered */ }
export function getAllCategories() { /* unique categories */ }
export function getRelatedPosts(slug: string, limit: number) { /* same category */ }
```

### 4.2 FAQ Content: TypeScript Data File

**File: `src/content/faqs.ts`**

71 FAQ items organized by category (Testing, Insurance, Treatment, CPAP, Troubleshooting, Prescriptions, Subscriptions, DOT, Getting Started). Each entry:

```ts
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  { id: 'testing', label: 'Testing & Preparation' },
  { id: 'insurance', label: 'Insurance & Pricing' },
  // ...
];

export const faqs: FAQItem[] = [
  {
    question: "How do I prepare for the home sleep test?",
    answer: "Preparation is simple...",
    category: "testing",
  },
  // ... 70 more
];
```

### 4.3 Other Content Files

| File | Content | Format |
|---|---|---|
| `src/content/testimonials.ts` | 3 doctor testimonials | TS array |
| `src/content/trust-indicators.ts` | 11 trust badge items with icons | TS array |
| `src/content/team.ts` | 5 scientific committee + 3 medical team | TS array |
| `src/content/plans.ts` | 3 CPAP plans with all features | TS object |
| `src/content/comparison.ts` | Traditional vs Dumbo Health rows | TS array |

### 4.4 Future CMS Migration Path

If content volume grows significantly (100+ posts) or non-technical editors need access:
- **Option A:** Add Decap CMS (Git-based GUI, free, edits MDX files via PRs)
- **Option B:** Migrate to Sanity.io or Contentful (headless CMS with preview, webhooks for ISR)

---

## 5. Third-Party Integrations

### 5.1 Shopify Checkout

**Product:** At-Home Sleep Test Kit (Product ID: `8933198397592`)
**Checkout domain:** `checkout.dumbo.health`

**Implementation:**

```tsx
// src/lib/constants.ts
export const SHOPIFY = {
  productId: '8933198397592',
  checkoutDomain: 'checkout.dumbo.health',
  buyUrl: `https://checkout.dumbo.health/cart/add?id=8933198397592&quantity=1`,
};

// "Buy your test" button simply links to the Shopify checkout URL
// No Shopify Storefront API needed — direct cart URL redirect
<Button asChild>
  <a href={SHOPIFY.buyUrl}>Buy your test</a>
</Button>
```

If deeper integration is needed later (cart preview, inventory status), add `@shopify/hydrogen-react` with the Storefront API.

### 5.2 Intercom Chat Widget

**App ID:** `b8ghtrgk`

**Implementation:** Lazy-load Intercom after page is interactive to avoid blocking LCP.

```tsx
// src/components/layout/intercom.tsx (Client Component)
'use client';

import { useEffect } from 'react';

export function Intercom() {
  useEffect(() => {
    // Delay loading until after interaction or 5s
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://widget.intercom.io/widget/b8ghtrgk';
      script.async = true;
      document.body.appendChild(script);
      window.Intercom?.('boot', { app_id: 'b8ghtrgk' });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
```

### 5.3 Analytics

**Google Tag Manager:** `GTM-KTGR9GD8`

```tsx
// src/app/layout.tsx — GTM script in <head>
import Script from 'next/script';

<Script id="gtm" strategy="afterInteractive"
  dangerouslySetInnerHTML={{ __html: `
    (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-KTGR9GD8');
  `}}
/>
// GTM noscript iframe in <body>
```

**Mixpanel:** `db352dc3d86d9cf594dab43f244d7607`
- Load via GTM tag (not direct script) to centralize analytics management
- Or use `mixpanel-browser` npm package with `strategy="lazyOnload"`

**Google Analytics:** Managed through GTM container.

### 5.4 Form Handling

| Form | Location | Handler |
|---|---|---|
| Waitlist signup | Home, Solutions, About Us, Contact | Server Action -> API route -> email service (e.g. Resend or Customer.io) |
| Contact form | Contact page | Server Action -> API route -> email to contact@dumbo.health |
| Newsletter | Blog page | Server Action -> email service |

**Implementation: Next.js Server Actions**

```tsx
// src/app/actions/waitlist.ts
'use server';

import { z } from 'zod';

const schema = z.object({
  state: z.string().min(2),
  interest: z.enum(['insurance', 'cash-pay']),
  agreedToTerms: z.literal(true),
});

export async function submitWaitlist(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: 'Invalid form data' };
  // Send to email service / CRM
  return { success: true };
}
```

---

## 6. SEO Implementation

### 6.1 Metadata (Per-Page)

Every page exports a `generateMetadata` function or static `metadata` object:

```tsx
// src/app/page.tsx (Homepage example)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health',
  description: 'Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149. Expert telehealth care in FL & TX. Start sleeping better today.',
  alternates: { canonical: 'https://www.dumbo.health/' },
  openGraph: {
    title: 'Sleep Apnea Treatment Online | Dumbo Health',
    description: 'Get diagnosed and treated for sleep apnea from home...',
    url: 'https://www.dumbo.health/',
    siteName: 'Dumbo Health',
    images: [{ url: 'https://www.dumbo.health/og/default.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Apnea Treatment Online | Dumbo Health',
    description: 'Get diagnosed and treated for sleep apnea from home...',
    images: ['https://www.dumbo.health/og/default.jpg'],
  },
  robots: { index: true, follow: true },
};
```

**Recommended Meta Titles per Page:**

| Page | Title |
|---|---|
| `/` | Sleep Apnea Treatment Online \| At-Home Sleep Test \| Dumbo Health |
| `/solutions` | Sleep Apnea Solutions: Diagnosis to Treatment \| Dumbo Health |
| `/at-home-sleep-test` | At-Home Sleep Apnea Test - FDA Approved, $149 \| Dumbo Health |
| `/get-your-at-home-sleep-apnea-test` | At Home Sleep Apnea Test \| One Night Results \| Dumbo Health |
| `/pricing` | Sleep Apnea Treatment Plans & CPAP Pricing \| Dumbo Health |
| `/blog` | The Sleep Journal: Sleep Apnea Tips & Guides \| Dumbo Health |
| `/blog/[slug]` | {Post Title} \| Dumbo Health Blog |
| `/blog-category/[category]` | {Category Name} Articles \| Dumbo Health Blog |
| `/about-us` | About Dumbo Health - Telehealth Sleep Apnea Experts |
| `/faqs` | Sleep Apnea FAQs: Testing, Treatment & Insurance \| Dumbo Health |
| `/contact` | Contact Dumbo Health - Sleep Apnea Support & Help |
| `/struggling-with-cost` | Affordable Sleep Apnea Treatment \| Dumbo Health |
| `/privacy-policy` | Privacy Policy \| Dumbo Health |
| `/terms-of-use` | Terms of Use \| Dumbo Health |

### 6.2 Structured Data (JSON-LD)

**Helper: `src/lib/schemas.ts`**

```ts
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Dumbo Health',
    url: 'https://www.dumbo.health',
    logo: 'https://www.dumbo.health/logo.svg',
    medicalSpecialty: 'Sleep Medicine',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12864 Biscayne Blvd., Unit #2040',
      addressLocality: 'North Miami',
      addressRegion: 'FL',
      postalCode: '33181',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-786-348-2820',
      email: 'contact@dumbo.health',
      contactType: 'Customer Support',
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61579159532994',
      'https://www.instagram.com/dumbohealth/',
      'https://www.linkedin.com/company/dumbohealth/',
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) { /* FAQPage */ }
export function productSchema() { /* Product + Offer for sleep test $149 */ }
export function blogPostSchema(post: BlogPost) { /* BlogPosting with author, date, image */ }
export function personSchema(member: TeamMember) { /* Person for medical team */ }
export function howToSchema() { /* HowTo for sleep test steps */ }
export function breadcrumbSchema(items: { name: string; url: string }[]) { /* BreadcrumbList */ }
```

**Schema deployment per page:**

| Page | Schemas |
|---|---|
| Homepage | `MedicalOrganization`, `FAQPage`, `BreadcrumbList` |
| Solutions | `FAQPage`, `BreadcrumbList` |
| At-Home Sleep Test | `Product` + `Offer`, `FAQPage`, `HowTo`, `BreadcrumbList` |
| Pricing | `Product` + `Offer` (3 plans), `BreadcrumbList` |
| Blog listing | `BreadcrumbList` |
| Blog post | `BlogPosting` (with author, medicalReviewer), `BreadcrumbList` |
| About Us | `MedicalOrganization`, `Person` (8 team members), `BreadcrumbList` |
| FAQs | `FAQPage` (all 71 items), `BreadcrumbList` |
| Contact | `LocalBusiness`, `FAQPage`, `BreadcrumbList` |

### 6.3 Sitemap Generation

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dumbo.health';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/at-home-sleep-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/struggling-with-cost`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/get-your-at-home-sleep-apnea-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const blogPosts = getAllPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categories = getAllCategories().map(cat => ({
    url: `${baseUrl}/blog-category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPosts, ...categories];
}
```

### 6.4 Robots.txt

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: 'https://www.dumbo.health/sitemap.xml',
  };
}
```

### 6.5 Image Optimization

- All images served via `next/image` with automatic WebP/AVIF conversion
- `sizes` prop set correctly for responsive images
- All images have descriptive `alt` text (see SEO audit recommendations)
- Priority loading for above-fold hero images (`priority` prop)
- Lazy loading for all below-fold images (default Next.js behavior)
- Product images: `quality={85}` for sharp product shots
- Blog featured images: `quality={75}` for faster loads

### 6.6 Heading Hierarchy Fixes (from SEO Audit)

| Page | Issue | Fix |
|---|---|---|
| `/at-home-sleep-test` | Multiple H1s | Single H1 "At-Home Sleep Study", all others H2+ |
| `/contact` | No H1 | Add H1: "Contact Dumbo Health" |
| `/faqs` | Generic H1 | Change to "Sleep Apnea FAQs - Your Questions Answered" |
| `/pricing` | H1 too generic | Change to "Sleep Apnea Treatment Plans & Pricing" |

---

## 7. Styling Architecture

### 7.1 Tailwind CSS Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors
        daylight: '#FCF6ED',
        sunlight: '#F5E6D1',
        'light-peach': '#FFD6AD',
        peach: '#FF8361',
        teal: '#78BFBC',
        midnight: '#031F3D',

        // shadcn/ui CSS variable mappings
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      fontFamily: {
        heading: ['var(--font-nohemi)', 'sans-serif'],
        body: ['var(--font-aeonik)', 'sans-serif'],
        mono: ['var(--font-aeonik-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['40px', { lineHeight: '1.2' }],
        'h3': ['28px', { lineHeight: '1.3' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'tag': ['14px', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
```

### 7.2 CSS Custom Properties (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Map brand colors to shadcn/ui variables */
    --background: 33 67% 96%;      /* Daylight #FCF6ED */
    --foreground: 212 91% 13%;     /* Midnight #031F3D */
    --primary: 14 100% 69%;        /* Peach #FF8361 */
    --primary-foreground: 0 0% 100%;
    --secondary: 177 30% 61%;      /* Teal #78BFBC */
    --secondary-foreground: 212 91% 13%;
    --accent: 30 100% 84%;         /* Light Peach #FFD6AD */
    --accent-foreground: 212 91% 13%;
    --muted: 31 47% 89%;           /* Sunlight #F5E6D1 */
    --muted-foreground: 212 50% 30%;
    --card: 0 0% 100%;
    --card-foreground: 212 91% 13%;
    --border: 31 30% 85%;
    --ring: 14 100% 69%;           /* Peach */
    --radius: 12px;
  }
}

/* Font face declarations */
@font-face {
  font-family: 'Nohemi';
  src: url('/fonts/nohemi/Nohemi-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Nohemi';
  src: url('/fonts/nohemi/Nohemi-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik';
  src: url('/fonts/aeonik/Aeonik-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik';
  src: url('/fonts/aeonik/Aeonik-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Mono';
  src: url('/fonts/aeonik-mono/AeonikMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### 7.3 shadcn/ui Theme Customization

The `components.json` config:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

**Button variants (brand-specific):**

```tsx
// Extend shadcn Button with brand variants
const buttonVariants = cva('...', {
  variants: {
    variant: {
      default: 'bg-peach text-white hover:bg-peach/90',           // Primary CTA
      secondary: 'bg-teal text-midnight hover:bg-teal/90',        // Secondary CTA
      outline: 'border-midnight text-midnight hover:bg-sunlight',  // Outlined
      ghost: 'text-midnight hover:bg-sunlight',                    // Ghost
      link: 'text-peach underline hover:text-peach/80',            // Link style
    },
    size: {
      default: 'h-12 px-8 text-body font-body',
      sm: 'h-9 px-4 text-sm',
      lg: 'h-14 px-10 text-body-lg font-body uppercase tracking-wider',
    },
  },
});
```

### 7.4 Responsive Design

- **Mobile-first approach:** Base styles for mobile, scale up with `md:` and `lg:` breakpoints
- **Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Navigation:** Full nav at `lg:`, hamburger Sheet below `lg:`
- **Grid layouts:** 1 col mobile -> 2 col tablet -> 3-4 col desktop
- **Typography:** Responsive font sizes using Tailwind `text-2xl md:text-4xl lg:text-hero`

### 7.5 Animation Strategy

Replace GSAP/Lenis with lighter alternatives:

| Webflow Animation | Next.js Replacement | Library |
|---|---|---|
| GSAP ScrollTrigger reveals | CSS `@starting-style` + Intersection Observer | Native CSS/JS |
| GSAP stagger animations | `framer-motion` stagger children | framer-motion |
| Lenis smooth scroll | CSS `scroll-behavior: smooth` | Native CSS |
| Image cycle | `framer-motion` AnimatePresence | framer-motion |
| Marquee scroll | CSS `@keyframes` animation | Native CSS |

Use `prefers-reduced-motion` media query to disable animations for accessibility.

---

## 8. Deployment

### 8.1 Hosting: Vercel

- **Framework:** Next.js (auto-detected)
- **Domain:** `www.dumbo.health` (primary), `dumbo.health` (redirect to www)
- **Build command:** `next build`
- **Output:** Static + Edge (ISR for blog)
- **Analytics:** Vercel Analytics (optional, complements GTM)

### 8.2 Environment Variables

```env
# .env.local

# Site
NEXT_PUBLIC_SITE_URL=https://www.dumbo.health
NEXT_PUBLIC_APP_URL=https://app.dumbo.health

# Analytics
NEXT_PUBLIC_GTM_ID=GTM-KTGR9GD8
NEXT_PUBLIC_MIXPANEL_TOKEN=db352dc3d86d9cf594dab43f244d7607

# Intercom
NEXT_PUBLIC_INTERCOM_APP_ID=b8ghtrgk

# Shopify
NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN=checkout.dumbo.health
NEXT_PUBLIC_SHOPIFY_PRODUCT_ID=8933198397592

# Email / Forms (server-side only)
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=contact@dumbo.health

# Content (if using external CMS in future)
# SANITY_PROJECT_ID=
# SANITY_DATASET=production
```

### 8.3 Build & Deploy Pipeline

```yaml
# Vercel auto-deploys from Git. Manual config:
# 1. Connect GitHub repo to Vercel project
# 2. Set environment variables in Vercel dashboard
# 3. Production branch: main
# 4. Preview branches: all other branches

# Build settings:
# - Framework: Next.js
# - Node: 20.x
# - Install: npm install
# - Build: next build
# - Output: .next
```

### 8.4 DNS Configuration

```
# Vercel DNS records
www.dumbo.health    CNAME   cname.vercel-dns.com
dumbo.health        A       76.76.21.21
```

### 8.5 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | > 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Time to Interactive | < 3.5s |
| Total bundle size (first load) | < 150kB |

---

## 9. Dependencies

### 9.1 Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.2",
    "react": "^19.0",
    "react-dom": "^19.0",
    "tailwindcss": "^4.0",
    "framer-motion": "^12.0",
    "embla-carousel-react": "^8.5",
    "contentlayer2": "^0.5",
    "next-mdx-remote": "^5.0",
    "lucide-react": "^0.470",
    "clsx": "^2.1",
    "tailwind-merge": "^2.6",
    "zod": "^3.24",
    "react-hook-form": "^7.54",
    "@hookform/resolvers": "^3.10",
    "resend": "^4.0"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "@types/react": "^19.0",
    "@types/node": "^22",
    "tailwindcss-animate": "^1.0",
    "@tailwindcss/typography": "^0.5",
    "eslint": "^9",
    "eslint-config-next": "^15.2",
    "prettier": "^3.4",
    "prettier-plugin-tailwindcss": "^0.6"
  }
}
```

---

## 10. Implementation Order

### Phase 1: Foundation (Days 1-2)
1. Initialize Next.js 15 project with TypeScript
2. Configure Tailwind CSS with brand tokens
3. Install and configure shadcn/ui
4. Set up font files (Nohemi, Aeonik, Aeonik Mono)
5. Create root layout with fonts, metadata template, analytics scripts
6. Build Navbar and Footer components
7. Create `globals.css` with brand CSS variables

### Phase 2: Shared Components (Days 3-4)
1. Build all shared section components (TrustMarquee, Testimonials, FAQ section, AvailabilityMap, WaitlistForm, CTASection, BenefitsGrid, ComparisonTable, VideoEmbed, ScientificCommittee)
2. Create Button variants, Card styles, Accordion theme overrides
3. Build mobile navigation (Sheet-based hamburger menu)

### Phase 3: Core Pages (Days 5-8)
1. **Homepage** - Hero carousel, problem statement, solutions grid, all shared sections
2. **Solutions** - 6-step treatment journey with anchor sections
3. **At-Home Sleep Test** - Product hero, gallery, tabs, comparison, purchase flow
4. **Get Your At-Home Sleep Apnea Test** - Landing page variant
5. **Pricing** - Plan tabs, plan cards, feature comparison matrix

### Phase 4: Content Pages (Days 9-11)
1. **Blog** - Set up MDX/Contentlayer, migrate 45 posts, build listing + detail pages
2. **Blog categories** - Category filter pages
3. **About Us** - Photo grid, values, story, team cards
4. **FAQs** - Full 71-item accordion with category grouping
5. **Contact** - Contact cards, form with server action

### Phase 5: Supporting Pages (Day 12)
1. **Struggling with Cost** - Stats grid, comparison, CTAs
2. **Privacy Policy** - Legal content page
3. **Terms of Use** - Legal content page
4. Custom 404 page

### Phase 6: SEO & Polish (Days 13-14)
1. Add all meta titles, descriptions, canonical tags
2. Add JSON-LD structured data to every page
3. Generate sitemap.xml and robots.txt
4. Add all image alt text
5. Add Open Graph images
6. Implement breadcrumbs
7. Ensure proper heading hierarchy on all pages
8. Accessibility audit (keyboard nav, screen reader, color contrast)
9. Performance optimization (lazy loading, script deferral, image optimization)
10. Cross-browser and responsive testing

### Phase 7: Launch (Day 15)
1. Deploy to Vercel
2. Configure DNS (www.dumbo.health)
3. Set up Vercel Analytics
4. Verify Google Search Console
5. Submit sitemap
6. Test all forms, CTAs, and external links
7. Smoke test Shopify checkout flow
8. Verify Intercom widget loads correctly

---

## 11. Key Architecture Decisions Summary

| Decision | Choice | Rationale |
|---|---|---|
| Rendering | SSG with ISR for blog | Maximum performance, CDN-cacheable, blog updates within 1 hour |
| Blog content | MDX + Contentlayer | 45 posts manageable in files, full Git history, embeddable components |
| Animations | framer-motion + CSS | ~50% smaller than GSAP bundle, SSR-compatible, accessibility built-in |
| Forms | Server Actions + Zod | Type-safe validation, no API routes needed, progressive enhancement |
| UI components | shadcn/ui (New York) | Accessible primitives, fully customizable, no runtime CSS-in-JS |
| Fonts | Self-hosted woff2 | No Google Fonts dependency, FOUT control via `font-display: swap` |
| Analytics | GTM container | Centralized tag management, non-blocking with `afterInteractive` |
| Shopify | Direct cart URL | Simple redirect to checkout, no Storefront API complexity |
| Image format | next/image auto-optimization | Automatic WebP/AVIF, responsive sizes, lazy loading |
| Hosting | Vercel | Native Next.js support, edge CDN, instant rollbacks, preview deploys |
