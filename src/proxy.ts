import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Page feature flags → maps route prefixes to env vars.
 * If the env var is set to "false", the route returns 404.
 * Unset env vars default to enabled (safe for local dev).
 */
const PAGE_FLAGS: { path: string; envVar: string }[] = [
  { path: '/dot-sleep-apnea-testing', envVar: 'NEXT_PUBLIC_PAGE_DOT' },
  { path: '/cpap',                    envVar: 'NEXT_PUBLIC_PAGE_CPAP' },
  { path: '/solutions',               envVar: 'NEXT_PUBLIC_PAGE_SOLUTIONS' },
  { path: '/resources/facts',         envVar: 'NEXT_PUBLIC_PAGE_FACTS' },
  { path: '/blog-author',             envVar: 'NEXT_PUBLIC_PAGE_BLOG_AUTHOR' },
  { path: '/learn',                   envVar: 'NEXT_PUBLIC_PAGE_LEARN' },
  { path: '/resupply',                envVar: 'NEXT_PUBLIC_PAGE_RESUPPLY' },
  { path: '/cpap-care',               envVar: 'NEXT_PUBLIC_PAGE_CPAP_CARE' },
  { path: '/cash-pay',                envVar: 'NEXT_PUBLIC_PAGE_CASH_PAY' },
]

function isEnabled(envVar: string): boolean {
  const val = process.env[envVar]
  if (val === undefined) return true  // default: enabled
  return val === 'true'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin auth guard
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session')
    if (!session || session.value !== '1') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Page feature flags
  for (const { path, envVar } of PAGE_FLAGS) {
    if (pathname === path || pathname.startsWith(path + '/')) {
      if (!isEnabled(envVar)) {
        return NextResponse.rewrite(new URL('/not-found', request.url), { status: 404 })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dot-sleep-apnea-testing/:path*',
    '/cpap/:path*',
    '/solutions/:path*',
    '/resources/facts/:path*',
    '/blog-author/:path*',
    '/learn/:path*',
    '/resupply/:path*',
    '/cpap-care/:path*',
    '/cash-pay/:path*',
  ],
}
