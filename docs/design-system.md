# DumboHealth Design System — Extracted from Codebase
> Living reference for all new page builds. Source of truth extracted from globals.css, hero.tsx, testimonials.tsx, how-it-works.tsx, get-started/page.tsx, and button.tsx.

---

## 1. COLOR SYSTEM

### Brand Tokens
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Daylight** | `#FCF6ED` | `--color-daylight` | Default page background (50%) |
| **Sunlight** | `#F5E6D1` | `--color-sunlight` | Muted bg, borders, card fills |
| **Light Peach** | `#FFD6AD` | `--color-light-peach` | Warm accent, gradient layer 3 |
| **Peach** | `#FF8361` | `--color-peach` | Primary CTA, stars, links, icons |
| **Teal** | `#78BFBC` | `--color-teal` | Section eyebrows, step icons, secondary accent |
| **Midnight** | `#031F3D` | `--color-midnight` | All body text, headings, dark sections |

### Dark Section Variants (used on Midnight bg)
| Use | Value |
|-----|-------|
| Dark card bg | `rgba(252,246,237,0.05)` |
| Dark card border | `rgba(252,246,237,0.08)` |
| Dark card text | `#FCF6ED` |
| Eyebrow on dark | `#78BFBC` (Teal) |
| Muted text on dark | `#B0B8C4` |
| Dark card bg deep | `#0A2D4F` |
| Dark border | `#1A3D5C` |

### Semantic Roles
- **Background**: Daylight (`#FCF6ED`)
- **Foreground / text**: Midnight (`#031F3D`)
- **Primary action**: Peach (`#FF8361`)
- **Secondary action**: Teal (`#78BFBC`)
- **Muted surface**: Sunlight (`#F5E6D1`)
- **Warm accent**: Light Peach (`#FFD6AD`)
- **Destructive**: `#E53E3E`
- **Body text muted**: `midnight/55` → `rgba(3,31,61,0.55)`
- **Muted foreground**: `#4A5568`

### ✅ DOS
- Use Daylight as default page background always
- Use Peach for one and only one primary CTA per screen
- Use Teal for eyebrow labels and secondary icon accents
- Use `rgba(...)` inline for opacity variants — NOT Tailwind `/50` modifiers (they don't compile in v4)
- On dark (Midnight) sections: use glassmorphism cards with `rgba(252,246,237,0.05)` bg and `rgba(252,246,237,0.08)` border
- Alternate Teal and Peach for step icon colors

### ❌ DON'TS
- Never use `bg-white/8` or `text-daylight/50` — Tailwind opacity modifiers break in v4
- Never use raw black (`#000`) or raw white (`#FFF`) as primary surfaces
- Never use more than one Peach primary CTA in the same visual row
- Never use Teal as a CTA button background — it's for accents only

---

## 2. TYPOGRAPHY

### Font Families
| Role | Font | Weights Available | CSS Class |
|------|------|-----------------|-----------|
| **Headings** | Nohemi | 400 (Regular), 500 (Medium) | `font-heading` |
| **Body** | Aeonik | 400 (Regular), 700 (Bold) | `font-body` |
| **Labels / Tags / Buttons / Eyebrows** | Aeonik Mono | 400 (Regular) | `font-mono` |

> **Rule**: h1–h6 are automatically `font-heading text-midnight` via globals.css base layer.

### Type Scale (actual values in use)
| Element | Size | Weight | Line Height | Class/Style |
|---------|------|--------|-------------|-------------|
| Hero H1 | 44px → 56px → 68px | 500 | 1.05–1.08 | `font-heading text-[44px] sm:text-[56px] lg:text-[68px] font-medium` |
| Section H2 | clamp(2.4rem, 4vw, 4rem) | 500 | tight | `font-heading font-medium leading-tight` |
| Article H2 | 1.75rem (28px) | 500 | 1.25 | `font-heading font-medium` |
| Article H3 | 1.3125rem (21px) | 500 | 1.35 | `font-heading font-medium` |
| Article H4 | 1.0625rem (17px) | 700 | 1.4 | `font-body font-bold` |
| Body (default) | 1.125rem (18px) | 400 | 1.78 | `font-body` |
| Body large | 1.25rem (20px) | 400 | relaxed | `font-body text-xl` |
| Body muted subhead | 18–20px | 400 | relaxed | `font-body text-lg text-midnight/55` |
| Eyebrow / label | 0.75rem (12px) | 400 | — | `font-mono text-xs uppercase tracking-widest` |
| Button / CTA | inherit | 400 | — | `font-mono uppercase tracking-wide` |
| Tag / Badge | 0.875rem (14px) | 400 | — | `font-mono text-sm` |

### ✅ DOS
- Use `font-mono uppercase tracking-widest` for all section eyebrow labels
- Use `font-heading font-medium` (500) for all headlines — not bold (700)
- Use `clamp()` for responsive headline sizing on section h2s
- Use `leading-[1.05]` to `leading-[1.08]` for hero-scale headlines
- Always set max-width on headline and body text blocks (`max-w-lg`, `max-w-[18ch]`, etc.)

### ❌ DON'TS
- Never use `font-heading font-bold` (700) — Nohemi Medium (500) is the correct heading weight
- Never use `font-body` for button labels — use `font-mono`
- Never skip the eyebrow label above a section h2 — the label→headline pairing is the pattern
- Never use raw `<em>` or italic in headlines — Nohemi doesn't have an italic variant

---

## 3. SPACING & LAYOUT

### Container Widths
| Use | Class / Value |
|-----|--------------|
| Narrow content (hero, centered copy) | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` |
| Full bleed side padding | `padding: "0 5%"` (inline style) |
| Card grid max | `max-w-6xl` or `max-w-7xl` |

### Section Vertical Rhythm
| Breakpoint | Padding |
|------------|---------|
| Mobile | `py-16` to `py-20` |
| Desktop | `py-24 md:py-32` |

### Grid Patterns
| Layout | Class |
|--------|-------|
| 1→2→3 testimonial cards | `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3` |
| 2-column split | `grid grid-cols-1 md:grid-cols-2 gap-8` |
| Step list | Vertical stack with numbered items |

### ✅ DOS
- Use `0 5%` side padding on full-bleed dark sections
- Use `max-w-4xl` for centered hero/copy blocks
- Always apply `overflow-hidden` on the marquee wrapper
- Add `gap-4` between marquee items, `gap-6` between cards

### ❌ DON'TS
- Never use fixed px widths for containers — always responsive max-w + padding
- Never let text go full bleed on desktop (always constrain with max-w)

---

## 4. BACKGROUNDS & SURFACES

### Background Types (in use)

#### A — Gradient Hero (light, default)
```
background: linear-gradient(148deg, #FCF6ED 0%, #F5E6D1 52%, #FFD6AD 100%)
```
Used for the hero section. Warm diagonal wash from Daylight → Sunlight → Light Peach.

#### B — Animated Gradient (quiz / form pages)
Three layered `<motion.div>` elements:
1. Solid Daylight base
2. `linear-gradient(145deg, transparent 0%, rgba(245,230,209,0.7) 55%, transparent 100%)` — Sunlight wash
3. `linear-gradient(145deg, transparent 0%, rgba(255,214,173,0.5) 65%, transparent 100%)` — Light Peach warmth
- Progresses as user interacts (warmth increases with quiz progress)

#### C — Animated Blobs (on top of gradients)
- Two blobs: top-right and bottom-left
- Shape: `borderRadius: "50%"`, large circles (55–65vw, max 680–820px)
- Fill: `radial-gradient(circle, rgba(255,131,97,0.07..0.12) 0%, rgba(255,214,173,0.28..0.58) 40%, transparent 65..70%)`
- Motion: `opacity` breathe + `scale` + `x/y` drift, `duration: 8–10s`, `repeat: Infinity`
- Positioned with `position: absolute`, negative offsets (`top: "-20%", right: "-10%"`)

#### D — Dark Section (Midnight)
```
backgroundColor: "#031F3D"
```
Used for testimonials, contrast sections. Cards on this bg use glassmorphism (see §1).

#### E — Flat Light Surface
```
backgroundColor: "#F5E6D1"  // Sunlight
```
Used for card fills, blockquotes, muted backgrounds.

### ✅ DOS
- Always layer gradients with `position: absolute, inset: 0` behind a `position: relative, zIndex: 1` content wrapper
- Use the blob system for any hero or full-screen background — never a flat solid on hero
- Use Midnight (`#031F3D`) for contrast sections to break up the warm palette
- On photo marquees: `rounded-2xl overflow-hidden` on each image wrapper

### ❌ DON'TS
- Never use a white `#FFFFFF` background for main page sections — use Daylight
- Never use CSS `filter: blur()` for glassmorphism — use low-opacity rgba fills
- Never use box-shadow on cards — use rgba border instead
- Never place blobs inside the content flow — always `position: absolute, pointerEvents: "none"`

---

## 5. COMPONENTS

### Buttons (hero-style, inline — the real pattern)
The shadcn Button component is used in admin/forms. For marketing pages, buttons are styled inline:

**Primary (Peach CTA)**
```
background: #FF8361
color: white
borderRadius: 50px (pill)
padding: 16px 32px+ (py-4 px-8)
font-mono uppercase tracking-wide
fontSize: 15px
```

**Secondary (Ghost / outline)**
```
background: transparent
color: #031F3D
border: 1.5px solid rgba(3,31,61,0.2)
borderRadius: 50px (pill)
same padding as primary
```

**shadcn Button (forms/admin)**
- Default: `bg-primary text-white` (Peach)
- Outline: `border bg-background hover:bg-accent`
- Secondary: `bg-secondary text-secondary-foreground` (Teal)
- Border radius: `rounded-md` (0.75rem)

### Cards
| Type | Style |
|------|-------|
| Light card | `rounded-2xl p-8 md:p-10 bg-white` |
| Muted card | `rounded-2xl p-8 bg-sunlight` (F5E6D1) |
| Dark glassmorphism | `rounded-2xl p-8 md:p-10` + `bg: rgba(252,246,237,0.05)` + `border: 1px solid rgba(252,246,237,0.08)` |

### Step / Icon Items
```
icon container: 40x40px, borderRadius: 10px
iconBg: rgba(color, 0.15)  // very soft tint
icon stroke: color (Teal or Peach, alternating)
strokeWidth: 1.75
```

### Section Eyebrow Pattern
```
<p class="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "#78BFBC" }}>
  Section Label
</p>
<h2 class="font-heading font-medium leading-tight" style={{ fontSize: "clamp(...)" }}>
  Headline
</h2>
```

### Photo Marquee
```
overflow-hidden wrapper
  flex w-max gap-4 (animation: marquee-hero Xs linear infinite)
    image div: h-[260px] w-[380px] md:h-[320px] md:w-[460px]
               rounded-2xl overflow-hidden relative
      <Image fill object-cover>
```
- Duplicate array to create seamless loop: `[...images, ...images]`
- Animation: `translateX(-50%)` over time

---

## 6. MOTION & ANIMATION

### The Signature Easing
```typescript
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
```
This is used on **every** animated element. It's the brand motion signature — fast in, very soft out.

### Standard Entrance Patterns
| Element | Initial | Animate | Duration | Delay |
|---------|---------|---------|----------|-------|
| Hero H1 | `{ opacity: 0, y: 16 }` | `{ opacity: 1, y: 0 }` | 0.45s | 0.05s |
| Hero subhead | `{ opacity: 0, y: 12 }` | `{ opacity: 1, y: 0 }` | 0.40s | 0.15s |
| Hero photo strip | `{ opacity: 0 }` | `{ opacity: 1 }` | 0.45s | 0.25s |
| Hero CTAs | `{ opacity: 0 }` | `{ opacity: 1 }` | 0.40s | 0.35s |
| Section header (scroll) | `{ opacity: 0, y: 20 }` | `{ opacity: 1, y: 0 }` | 0.60s | 0.08s |
| Cards (staggered) | `{ opacity: 0, y: 24 }` | `{ opacity: 1, y: 0 }` | 0.65s | 0.18 + i×0.10s |

### Scroll Trigger
```typescript
const ref = useRef<HTMLDivElement>(null);
const inView = useInView(ref, { once: true, margin: "-8% 0px" });
// animate={inView ? { opacity: 1, y: 0 } : {}}
```
- `once: true` — triggers only once, no re-play
- `margin: "-8% 0px"` — triggers slightly before element enters viewport

### Ambient / Loop Animations
| Name | Duration | Pattern |
|------|----------|---------|
| Blob breathe | 8–10s | opacity + scale + x/y drift, `easeInOut`, `repeat: Infinity` |
| Float | 4s | translateY 0 → -18px → 0, `ease-in-out`, `Infinity` |
| Marquee | 30–55s | `translateX(-50%)`, `linear`, `Infinity` |
| Soundwave | 1.1s | scaleY 0.55 → 1 → 0.55, `ease-in-out`, `Infinity` |

### Quiz / Multi-Step Transitions
```typescript
const screen = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.65 } },
  exit: { opacity: 0, y: 0, transition: { ease: "easeIn", duration: 0.28 } },
};
// wrapped in <AnimatePresence mode="wait">
```

### ✅ DOS
- Always use `EASE = [0.22, 1, 0.36, 1]` — never `ease-in-out` or linear for UI entrances
- Stagger cards by `0.10s` per item, starting at `0.18s` base delay
- Use `useInView` with `once: true` for all scroll-triggered animations
- Exit animations should be shorter than entrances (0.28s vs 0.65s)
- Wrap page/screen transitions in `<AnimatePresence mode="wait">`

### ❌ DON'TS
- Never use `networkidle` as a Playwright wait strategy — use `domcontentloaded` + 2000ms
- Never skip the y-offset on entrances — opacity-only feels flat
- Never animate more than 4–5 elements in a single stagger group
- Never use `bounce` or `spring` physics on UI text — only on decorative elements

---

## 7. SECTION ANATOMY — THE FULL PATTERN

Every marketing section follows this structure:

```
<section>                               ← position: relative, overflow: hidden
  [background layer]                    ← position: absolute, inset: 0, zIndex: 0
    gradient | blobs | solid color
  
  <div position: relative, zIndex: 1>  ← content above background
    <div max-w + padding>
      
      [eyebrow]                         ← font-mono, text-xs, uppercase, Teal
      [h2]                              ← font-heading, font-medium, clamp sizing
      [subhead/body]                    ← font-body, text-lg/xl, midnight/55
      
      [content block]                   ← grid / stack / marquee
        cards | steps | photos | list
      
      [CTA block]                       ← optional, always at bottom
        primary button (Peach pill)
        secondary ghost button (optional)
    
    </div>
  </div>
</section>
```

### Section Progression (homepage order, use as reference)
1. **Hero** — gradient bg + blobs + headline + photo marquee + CTA
2. **Trust Marquee** — flat Sunlight bg, logo strip, infinite scroll
3. **Symptoms/Problem** — light bg, problem framing
4. **How It Works** — numbered steps with alternating Teal/Peach icons
5. **Solutions Grid** — card grid, light bg
6. **Benefits Grid** — comparison / feature list
7. **Testimonials** — **dark (Midnight) section**, glassmorphism cards
8. **Service Area** — utility banner
9. **FAQ** — accordion, light bg

> **The dark Testimonials section is the only mandatory dark break.** All other sections use the warm light palette.

---

## 8. IMAGERY & PHOTOS

- **Style**: lifestyle, real people, warm lighting — couples, individuals resting, morning scenes
- **Sizes**: marquee items are 380×260px mobile / 460×320px desktop
- **All images**: `rounded-2xl overflow-hidden`, `object-cover`, Next.js `<Image fill>`
- **Priority**: first 3 images in any marquee get `priority` prop

### ✅ DOS
- Use aspirational lifestyle photography (not clinical/hospital imagery)
- Warm color temperature photos that complement the brand palette
- Always `overflow-hidden rounded-2xl` on image wrappers

### ❌ DON'TS
- No cold/clinical stock imagery
- Never use `<img>` — always Next.js `<Image>`
- Never show images without rounded corners

---

## 9. QUICK REFERENCE CHEATSHEET

```
COLORS:
  bg default:    #FCF6ED (Daylight)
  text default:  #031F3D (Midnight)
  cta primary:   #FF8361 (Peach)
  cta secondary: #78BFBC (Teal)
  card/border:   #F5E6D1 (Sunlight)
  accent warm:   #FFD6AD (Light Peach)

FONTS:
  headings:  font-heading (Nohemi, weight 500)
  body:      font-body (Aeonik, weight 400/700)
  labels:    font-mono (Aeonik Mono, weight 400) + uppercase + tracking-widest

EASING: [0.22, 1, 0.36, 1]

RADIUS:
  cards/images:  rounded-2xl (16px)
  buttons:       rounded-full (pill) for marketing, rounded-md for forms
  default:       rounded-lg (12px)

SECTION PADDING:  py-24 md:py-32
CONTAINER:        max-w-4xl mx-auto px-4 sm:px-6 lg:px-8

STAGGER BASE:   delay: 0.18 + i * 0.1

DO NOT:
  - Use Tailwind opacity modifiers (/50, /8) — use rgba() inline
  - Use font-bold on headings — use font-medium (500)
  - Use box-shadow on cards — use rgba border
  - Use white backgrounds — use Daylight (#FCF6ED)
  - Use font-body for button text — use font-mono
```
