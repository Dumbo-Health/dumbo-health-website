# DumboHealth Website — Design System

> Source of truth for all visual and interaction patterns used across `dumbo-health-website`.
> Any new page or component must follow these conventions exactly.
> Last updated: 2026-04-10 | Audited from: globals.css, cash-pay-argument.tsx, sleep-test-landing.tsx, get-started/page.tsx

---

## 1. Color Palette

All colors are registered as CSS custom properties in `globals.css` and as Tailwind utilities.

| Token | Tailwind class | Hex | RGB | Role |
|-------|---------------|-----|-----|------|
| Daylight | `bg-daylight` / `text-daylight` | `#FCF6ED` | 252, 246, 237 | Primary background (25%) |
| Sunlight | `bg-sunlight` | `#F5E6D1` | 245, 230, 209 | Secondary background, card fills (25%) |
| Light Peach | `bg-light-peach` | `#FFD6AD` | 255, 214, 173 | Warm accent, badges (15%) |
| Peach | `bg-peach` / `text-peach` | `#FF8361` | 255, 131, 97 | Primary CTA, labels, links (15%) |
| Teal | `bg-teal` / `text-teal` | `#78BFBC` | 120, 191, 188 | Section labels, secondary accents (10%) |
| Midnight | `bg-midnight` / `text-midnight` | `#031F3D` | 3, 31, 61 | Dark section bg, all headings, body text (10%) |

### Opacity Variants (inline rgba — NOT Tailwind `/` modifiers)

> **Critical:** Tailwind v4 opacity modifiers (`bg-white/5`, `text-midnight/55`) do **not** reliably compile. Always use inline `rgba()` for any opacity-modified color.

| Usage | Value |
|-------|-------|
| Muted body text on light bg | `rgba(3,31,61,0.55)` |
| Very muted / captions on light bg | `rgba(3,31,61,0.45)` |
| Placeholder / ghost text | `rgba(3,31,61,0.3)` |
| Body text on dark bg | `rgba(252,246,237,0.75)` |
| Muted text on dark bg | `rgba(252,246,237,0.45)` |
| Ghost text on dark bg | `rgba(252,246,237,0.22)` |
| Card bg on dark section | `rgba(255,255,255,0.05)` |
| Card border on dark section | `rgba(255,255,255,0.09)` |
| Peach CTA bg on dark section | `rgba(255,131,97,0.11)` |
| Peach CTA border on dark section | `rgba(255,131,97,0.18)` |
| Divider on dark section | `rgba(255,255,255,0.07)` |

### Section Background Patterns

| Section type | Background | Use |
|-------------|-----------|-----|
| Default / light | `#FCF6ED` (Daylight) | Homepage, most sections |
| Warm card bg | `#F5E6D1` (Sunlight) | Product image areas, warm cards |
| Dark hero section | `#031F3D` (Midnight) | CashPayArgument, pricing dark sections |
| Frosted card on dark | `rgba(255,255,255,0.04)` | Table backgrounds on midnight sections |

---

## 2. Typography

### Font Families

| Tailwind class | CSS variable | Font | Use |
|---------------|-------------|------|-----|
| `font-heading` | `var(--font-heading)` | Nohemi | All H1–H6, display text |
| `font-body` | `var(--font-body)` | Aeonik | Body copy, buttons, UI text |
| `font-mono` | `var(--font-mono)` | Aeonik Mono | Section labels, tags, nav items |

> **Global rule (set in `@layer base`):** All `h1`–`h6` automatically get `font-heading text-midnight`. Override explicitly when on dark sections.

### Type Scale (clamp-based, responsive)

| Role | Size | Usage |
|------|------|-------|
| Hero H1 | `clamp(2.4rem, 4vw, 3.5rem)` | Page heroes |
| Section H2 | `clamp(2rem, 4.5vw, 3.25rem)` | Primary section headings |
| Sub-section H2 | `clamp(1.75rem, 5vw, 2.5rem)` | Secondary section headings |
| Card H2 | `clamp(1.625rem, 4vw, 2.25rem)` | Card/panel headings |
| Sub-heading H3 | `clamp(1.15rem, 1.8vw, 1.4rem)` | Feature card titles |
| Article H2 | `1.75rem` | Blog prose |
| Article H3 | `1.3125rem` | Blog prose |
| Body large | `1.0625rem` | Primary body copy |
| Body | `1rem` | Secondary body copy |
| Small / caption | `0.875rem` | Supporting text |
| Label / tag | `0.75rem` (text-xs) | Section labels, mono tags |
| Micro label | `0.68rem`–`0.7rem` | Inline labels, timestamps |

### Font Weight Usage

| Weight | Class | Use |
|--------|-------|-----|
| 400 | `font-normal` | Body text, mono labels |
| 500 | `font-medium` | Headings (Nohemi), semi-emphasis |
| 700 | `font-bold` | Button text, strong emphasis |

### Label Pattern (used on every section)

```tsx
// Section label — always appears above the heading
<p
  className="font-mono text-xs uppercase tracking-widest mb-4"
  style={{ color: "#78BFBC" }}        // Teal on light bg
  // OR: style={{ color: "#FF8361" }} // Peach on light bg (alternate)
>
  Section category
</p>
```

### Line Height & Spacing

| Context | Line height |
|---------|-------------|
| Headings | `1.1`–`1.25` |
| Body copy | `1.7`–`1.78` |
| Small copy | `1.4`–`1.6` |
| Labels / mono | `1.0` (tracking does the spacing work) |

### Letter Spacing (mono labels)

| Style | Value |
|-------|-------|
| Default label | `tracking-widest` = `0.1em`–`0.14em` |
| Tight label | `0.08em` |
| Wide label | `0.16em` |

---

## 3. Layout & Spacing

### Container

```tsx
// Standard section container — used consistently across all sections
<div className="mx-auto max-w-7xl px-[5%]">
```

> `px-[5%]` is the canonical horizontal padding. This scales naturally with viewport width. Never use fixed `px-4` or `px-6` for section containers.

### Section Vertical Padding

```tsx
// Standard
<section className="py-24 md:py-32">

// Compact (tighter sections)
<section className="py-16 md:py-24">

// Hero (extra tall)
<section className="py-32 md:py-40">
```

### Grid Gaps

| Gap | Value | Use |
|-----|-------|-----|
| Card grids | `gap-6` / `gap-8` | Feature card grids |
| Two-column | `gap-10 lg:gap-16` | Split layouts |
| Stacked content | `gap-4` | Vertically stacked card items |

### Max Widths

| Context | Value |
|---------|-------|
| Section container | `max-w-7xl` |
| Prose / narrow content | `max-w-2xl` or `max-w-3xl` |
| Heading text balance | `maxWidth: "22ch"` (inline, for text-balance) |

---

## 4. Animation System

### The EASE Constant

```tsx
// Define at the top of every animated component file
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Alternate eases
const EASE_OUT = [0.4, 0, 0.6, 1] as [number, number, number, number];
const EASE_SPRING = [0.34, 1.56, 0.64, 1] as [number, number, number, number]; // for bouncy/spring
```

### Standard Fade-Up (scroll-triggered)

```tsx
// Pattern used for all content revealed on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
>
```

### FadeUp Wrapper Component (reusable)

```tsx
function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Children

```tsx
// Each child gets an incrementing delay
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }}
  >
```

### Slide-In (carousel / page transitions)

```tsx
// AnimatePresence + directional slide
<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={activeIndex}
    initial={{ opacity: 0, x: direction * 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction * -40 }}
    transition={{ duration: 0.35, ease: EASE }}
  />
</AnimatePresence>
```

### Duration Reference

| Animation type | Duration |
|---------------|----------|
| Fast micro (badge, tag) | `0.3`–`0.35s` |
| Standard fade-up | `0.55`–`0.65s` |
| Hero / large reveal | `1.0`–`1.8s` |
| Ambient / ambient float | `4`–`12s` with `repeat: Infinity` |
| Stagger increment | `0.08`–`0.1s` per item |

### CSS Animations (globals.css)

| Class | Effect | Duration |
|-------|--------|----------|
| `animate-fade-in` | opacity 0→1, y 4px→0 | 0.3s |
| `animate-travel-dot` | horizontal dot travel | 4s infinite |
| `animate-float` | vertical bob ±18px | 4s infinite |
| `animate-soundwave` | scaleY pulse | 1.1s infinite |
| `animate-bounce-slow` | vertical bob ±10px | 3s infinite |
| `animate-marquee` | infinite horizontal scroll | 30s linear |
| `animate-marquee-hero` | infinite horizontal scroll (slower) | 35s linear |

---

## 5. Component Patterns

### Primary Button

```tsx
// Tailwind variant (preferred for shadcn Button component)
<Button
  asChild
  className="h-12 rounded-[12px] bg-peach px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
  style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.25)" }}
>
  <Link href={APP_URL}>Get started today</Link>
</Button>

// Inline style variant (for non-shadcn contexts)
<button
  style={{
    backgroundColor: "#FF8361",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "14px 44px",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(255,131,97,0.3)",
  }}
>
```

> **Border radius rule:** Buttons always use `rounded-[12px]` (12px). Never `rounded-full`.

### Secondary / Ghost Button

```tsx
// Outline style for secondary actions
<button
  style={{
    background: "transparent",
    border: "1.5px solid #031F3D",
    borderRadius: 12,
    padding: "12px 32px",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    color: "#031F3D",
    cursor: "pointer",
  }}
>
```

### Section Label

```tsx
// Appears above every section heading — the canonical "eyebrow" label
<p
  className="font-mono text-xs uppercase tracking-widest mb-4"
  style={{ color: "#78BFBC" }}
>
  Cash pay vs. insurance
</p>
```

### Feature Card (light section)

```tsx
<div
  className="rounded-2xl p-7"
  style={{
    backgroundColor: "#F5E6D1",       // Sunlight fill
    border: "1px solid rgba(245,230,209,0.8)",
  }}
>
  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>
    01
  </span>
  <h3 className="mt-3 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}>
    Card title
  </h3>
  <p className="mt-2 font-body leading-relaxed" style={{ color: "rgba(3,31,61,0.55)", fontSize: "1.0625rem" }}>
    Card body copy.
  </p>
</div>
```

### Feature Card (dark section)

```tsx
<div
  className="rounded-2xl p-7"
  style={{
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
  }}
>
  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>
    01
  </span>
  <h3 className="mt-3 font-heading font-medium" style={{ color: "#FCF6ED", fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}>
    Card title
  </h3>
  <p className="mt-2 font-body leading-relaxed" style={{ color: "rgba(252,246,237,0.75)", fontSize: "1.0625rem" }}>
    Card body copy.
  </p>
</div>
```

### Comparison Table Row

```tsx
// Standard 3-column grid: label | traditional | dumbo
<div className="grid grid-cols-[160px_1fr_1fr]" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
  {/* Label col */}
  <div className="px-5 py-4 flex items-center">
    <p className="font-body text-sm font-medium" style={{ color: "rgba(252,246,237,0.75)" }}>{label}</p>
  </div>
  {/* Traditional col */}
  <div className="px-4 py-4 flex items-center gap-2.5"
    style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}>
    <X className="h-4 w-4 shrink-0" style={{ color: "rgba(252,246,237,0.22)" }} />
    <p className="font-body text-sm leading-snug" style={{ color: "rgba(252,246,237,0.38)" }}>{traditional}</p>
  </div>
  {/* Dumbo col */}
  <div className="px-4 py-4 flex items-center gap-2.5"
    style={{ borderLeft: "1px solid rgba(255,131,97,0.18)", backgroundColor: "rgba(255,131,97,0.11)" }}>
    <Check className="h-4 w-4 shrink-0" style={{ color: "#78BFBC" }} />
    <p className="font-body text-sm font-semibold leading-snug" style={{ color: "#FFFFFF" }}>{dumbo}</p>
  </div>
</div>
```

### Carousel Navigation Buttons

```tsx
<button
  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
  style={{ backgroundColor: "rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(3,31,61,0.12)" }}
>
```

---

## 6. Border Radius

| Context | Value | Tailwind |
|---------|-------|---------|
| Buttons | 12px | `rounded-[12px]` |
| Cards, panels, tables | 16px | `rounded-2xl` |
| Image containers | 16px | `rounded-2xl` |
| Avatar / icon circles | 50% | `rounded-full` |
| Inline badges/tags | 6px | `rounded-md` |
| Article images | `0.75rem` | `rounded-xl` |

> **Rule:** Never use `rounded-full` on CTA buttons. Maximum is `rounded-[12px]`.

---

## 7. Shadow Patterns

| Context | Box shadow |
|---------|-----------|
| Primary button | `0 4px 20px rgba(255,131,97,0.25)` |
| Primary button (alt) | `0 4px 18px rgba(255,131,97,0.3)` |
| Carousel arrow / small button | `0 2px 8px rgba(3,31,61,0.12)` |
| Card elevation (light) | `0 2px 12px rgba(3,31,61,0.08)` |
| Dark section ambient | Avoid — use border opacity instead |

---

## 8. Section Structure Pattern

Every section follows this hierarchy:

```
[Label]         ← font-mono, xs, uppercase, teal, mb-4
[Heading]       ← font-heading, font-medium, clamp size, midnight (or daylight on dark)
[Body copy]     ← font-body, 1.0625rem, muted color, max-w for readability
[Content]       ← cards / table / grid
[CTA]           ← primary button, always last
```

### Light Section Template

```tsx
<section className="py-24 md:py-32" style={{ backgroundColor: "#FCF6ED" }}>
  <div className="mx-auto max-w-7xl px-[5%]">
    <div className="mb-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xs uppercase tracking-widest mb-4"
        style={{ color: "#78BFBC" }}
      >
        Section label
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        className="font-heading font-medium leading-tight text-balance"
        style={{ color: "#031F3D", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "22ch" }}
      >
        Section heading goes here.
      </motion.h2>
    </div>
    {/* content */}
  </div>
</section>
```

### Dark Section Template

```tsx
<section
  className="relative overflow-hidden py-24 md:py-32"
  style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
>
  <div className="mx-auto max-w-7xl px-[5%]">
    <div className="mb-16">
      <motion.p ... className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "#78BFBC" }}>
        Section label
      </motion.p>
      <motion.h2 ... style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 4.5vw, 3.25rem)", maxWidth: "22ch" }}>
        Section heading.
      </motion.h2>
    </div>
    {/* content */}
  </div>
</section>
```

> **Dark section rule:** Always add `isolation: "isolate"` when using decorative background elements (SVG lifeline, blobs, gradients). This prevents z-index leakage.

---

## 9. Design Principles (Anti-AI Rules)

From `/web-design-patterns` audit — patterns that make DumboHealth feel human-designed:

### DO
- **One element dominates per section** — the heading or the visual, not both at equal weight
- **Asymmetric layouts** — prefer `lg:grid-cols-[1fr_2fr]` over perfect `lg:grid-cols-2` where content warrants
- **Specific copy** — "Order your test · $149" not "Get started"
- **Visual hierarchy** — section label → heading → body → CTA, always in that order
- **Restrained animation** — one stagger pattern per section, consistent timing, not every element animated
- **Context-sensitive trust** — lead with outcome, then back it up ($149 flat, FDA-cleared, doctor-reviewed)
- **Text balance on headings** — `className="text-balance"` on all H2s with `maxWidth: "22ch"`

### DON'T
- ❌ Tailwind opacity modifiers (`bg-white/5`, `text-midnight/55`) — use `rgba()` inline instead
- ❌ `rounded-full` on buttons — always `rounded-[12px]`
- ❌ `React.FC` — always plain function components
- ❌ Equal-size grids for all cards — vary when content hierarchy calls for it
- ❌ `console.log` in production code
- ❌ Carousels for testimonials — show all or curate top 3
- ❌ Generic CTAs like "Learn More" or "Click Here"
- ❌ Every section on dark background — alternate light/dark for visual rhythm

---

## 10. Responsive Patterns

### Mobile-first grid collapses

```tsx
// Standard 2-col split: stacks on mobile, splits at lg
<div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">

// 3-col card grid: single col → 3-col
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Horizontal scroll for dense tables

```tsx
// Always wrap comparison tables in an overflow container
<div className="w-full overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
  <div style={{ minWidth: "520px" }}>
    {/* table content */}
  </div>
</div>
```

### Swipe hint for mobile

```tsx
<p
  className="lg:hidden font-mono text-[11px] uppercase tracking-widest text-center mb-3"
  style={{ color: "rgba(252,246,237,0.3)" }}
>
  ← Swipe to compare →
</p>
```

---

## 11. Constants & URLs

```tsx
import { APP_URL, SHOPIFY, CONTACT } from "@/lib/constants";

APP_URL     = "https://app.dumbo.health"      // main CTA destination
SHOPIFY.buyUrl = "https://checkout.dumbo.health/cart/8933198397592:1"  // $149 sleep test
CONTACT.phone  = "+1 (786) 348 2820"
CONTACT.phoneTel = "tel:+17863482820"
```

---

## 12. Existing Reusable Components

| Component | Path | Use |
|-----------|------|-----|
| `CashPayArgument` | `src/components/pricing/cash-pay-argument.tsx` | Cash pay vs insurance dark section with comparison table |
| `SectionLabel` | Inline in `sleep-test-landing.tsx` / `get-started` | Reusable eyebrow label |
| `FadeUp` | Inline in `sleep-test-landing.tsx` | Scroll-triggered fade-up wrapper |
| `ProductCarousel` | Inline in `get-started/page.tsx` | Image carousel with prev/next arrows |
| shadcn `Button` | `src/components/ui/button` | Primary action button |
| shadcn `Accordion` | `src/components/ui/accordion` | FAQ sections |

---

## 13. Article / Blog Prose

All blog article bodies use the `.article-prose` class (defined in `globals.css`):

- Body: Aeonik 1.125rem / line-height 1.78 / color Midnight
- H2: Nohemi 500 / 1.75rem / margin-top 2.75rem
- H3: Nohemi 500 / 1.3125rem
- Blockquote: Sunlight bg, Peach left border (3px), radius 0 0.75rem 0.75rem 0
- Links: Peach color, underline, hover → Midnight
- Code: Aeonik Mono, Sunlight bg
- Pre: Midnight bg, Daylight text

---

*Auto-generated from codebase audit — update when adding new patterns.*
