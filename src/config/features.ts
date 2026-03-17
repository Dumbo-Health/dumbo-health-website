/**
 * Feature Flags
 *
 * Controls which pages and sections are live on production.
 *
 * HOW TO USE:
 * 1. Go to Vercel Dashboard → Project → Settings → Environment Variables
 * 2. Set the variable for the target environment:
 *    - "Production" = dumbo.health
 *    - "Preview"    = dev branch staging URL
 * 3. Redeploy (or trigger a new deploy) for the change to take effect.
 *
 * All flags default to TRUE so everything is visible in local dev.
 * Set to "false" (string) in Vercel Production to hide.
 */

function flag(envVar: string): boolean {
  const val = process.env[envVar]
  // In local dev (env var not set) → show everything
  if (val === undefined) return true
  return val === 'true'
}

export const features = {
  /**
   * PAGE FLAGS
   * When false → middleware intercepts the route and returns 404.
   * Env var naming: NEXT_PUBLIC_PAGE_<SLUG>
   */
  pages: {
    dot:        flag('NEXT_PUBLIC_PAGE_DOT'),           // /dot-sleep-apnea-testing
    cpap:       flag('NEXT_PUBLIC_PAGE_CPAP'),          // /cpap
    solutions:  flag('NEXT_PUBLIC_PAGE_SOLUTIONS'),     // /solutions
    facts:      flag('NEXT_PUBLIC_PAGE_FACTS'),         // /resources/facts
    blogAuthor: flag('NEXT_PUBLIC_PAGE_BLOG_AUTHOR'),   // /blog-author/[slug]
    learn:      flag('NEXT_PUBLIC_PAGE_LEARN'),         // /learn
    resupply:   flag('NEXT_PUBLIC_PAGE_RESUPPLY'),      // /resupply
    cpapCare:   flag('NEXT_PUBLIC_PAGE_CPAP_CARE'),     // /cpap-care
  },

  /**
   * SECTION FLAGS
   * When false → the section component renders null.
   * Use these for toggling parts of a page without hiding the whole page.
   * Env var naming: NEXT_PUBLIC_SECTION_<NAME>
   */
  sections: {
    videoSection:    flag('NEXT_PUBLIC_SECTION_VIDEO'),          // VideoSection on homepage
    serviceArea:     flag('NEXT_PUBLIC_SECTION_SERVICE_AREA'),   // ServiceAreaBanner on homepage
    trustMarquee:    flag('NEXT_PUBLIC_SECTION_TRUST_MARQUEE'),  // TrustMarquee (global)
  },
} as const
