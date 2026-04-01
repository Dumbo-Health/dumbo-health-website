"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { SleepAwarenessPromoBanner } from "@/components/layout/sleep-awareness-promo-banner";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sunlight/60 bg-daylight/95 backdrop-blur supports-[backdrop-filter]:bg-daylight/80">
      <nav
        className="flex items-center justify-between"
        style={{ height: "72px", padding: "0 5%" }}
      >
        {/* Logo — links home but no nav distractions */}
        <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/logos/wordmark-midnight.svg"
            alt="Dumbo Health"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Right: phone CTA */}
        <a
          href={CONTACT.phoneTel}
          className="flex items-center gap-2.5 rounded-[12px] border border-midnight/15 bg-white px-5 py-2.5 font-body text-sm font-bold text-midnight shadow-sm transition-all duration-200 hover:border-midnight/30 hover:shadow-md"
        >
          {/* Phone icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-peach"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 5.95 5.95l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
          </svg>
          <span className="hidden sm:inline">{CONTACT.phone}</span>
          <span className="sm:hidden">Call us</span>
        </a>
      </nav>
    </header>
  );
}
