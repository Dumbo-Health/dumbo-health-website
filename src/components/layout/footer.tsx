import Image from "next/image";
import Link from "next/link";
import { APP_URL, CONTACT, SOCIAL } from "@/lib/constants";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
      style={{ backgroundColor: "#031F3D", paddingTop: "64px", paddingBottom: "40px", paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Top section: logo + columns */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        {/* Logo + phone */}
        <div>
          <Image
            src="/logos/wordmark-daylight.svg"
            alt="Dumbo Health"
            width={180}
            height={36}
          />
          <a
            href={CONTACT.phoneTel}
            className="mt-4 block font-body text-sm transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="mb-3 font-body text-sm font-bold text-white">{column.title}</p>
            <ul className="space-y-2">
              {column.links.map((link) =>
                "external" in link && link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
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

      {/* Bottom bar */}
      <div
        className="mt-10 py-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            &copy; {new Date().getFullYear()} Dumbo Health. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="font-body text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
            <Link
              href="/terms-of-use"
              className="font-body text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Terms of Use
            </Link>
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.45)" }}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
