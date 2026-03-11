import Image from "next/image";
import Link from "next/link";
import { APP_URL, CONTACT, SOCIAL } from "@/lib/constants";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Tools & Support",
    links: [
      { label: "Toolbox", href: "https://www.dumbo.health/go/tools", external: true },
      { label: "Sleep Protocol", href: "https://www.dumbo.health/go/sleep-protocol", external: true },
      { label: "Save Money", href: "/struggling-with-cost" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Get Started", href: APP_URL, external: true },
      { label: "Login", href: `${APP_URL}/login`, external: true },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { href: SOCIAL.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: SOCIAL.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: SOCIAL.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "#031F3D" }}
    >
      <div style={{ padding: "72px 5% 48px" }}>

        {/* ── Main grid: brand block + link columns ── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

          {/* Brand block */}
          <div className="shrink-0 lg:w-64">
            <Image
              src="/logos/wordmark-daylight.svg"
              alt="Dumbo Health"
              width={160}
              height={32}
              priority
            />
            <p
              className="mt-4 font-body leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem", maxWidth: "28ch" }}
            >
              Better nights, brighter days. Sleep apnea care from home.
            </p>

            {/* Contact */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={CONTACT.phoneTel}
                className="font-body text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {CONTACT.phone}
              </a>
              <a
                href="mailto:hello@dumbohealth.com"
                className="font-body text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                hello@dumbohealth.com
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-white"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div
            className="hidden lg:block self-stretch w-px shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="block lg:hidden"
            style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }}
          />

          {/* Link columns — 2×2 on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4 flex-1">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p
                  className="mb-4 font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {column.title}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) =>
                    "external" in link && link.external ? (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem" }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 pt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
            &copy; {new Date().getFullYear()} Dumbo Health. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="font-body text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <Link
              href="/terms-of-use"
              className="font-body text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
