"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

// ─── Mega menu icons (geometric line style, matches brand) ───────────────────

function IconSleepTest() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconCare() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconFAQ() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ease-out ${open ? "-rotate-180" : "rotate-0"}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Mega menu data ───────────────────────────────────────────────────────────

const SOLUTIONS = [
  { label: "At-Home Sleep Test", href: "/at-home-sleep-test", Icon: IconSleepTest },
  { label: "Sleep Apnea Care",   href: "/solutions",          Icon: IconCare },
  { label: "Dumbo Health App",   href: "/solutions#step-4",   Icon: IconApp },
];

const RESOURCES = [
  { label: "Blog",    href: "/blog",    Icon: IconBlog },
  { label: "FAQs",   href: "/faqs",    Icon: IconFAQ },
  { label: "Contact", href: "/contact", Icon: IconContact },
];

// ─── Mega menu panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({
  items,
  open,
}: {
  items: typeof SOLUTIONS;
  open: boolean;
}) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      {/* Arrow notch */}
      <div className="mx-auto mb-[-1px] h-2.5 w-2.5 rotate-45 rounded-sm border-l border-t border-sunlight bg-white" style={{ marginLeft: "calc(50% - 5px)", marginRight: "auto" }} />

      <div className="w-60 overflow-hidden rounded-2xl border border-sunlight bg-white shadow-xl shadow-midnight/8">
        <div className="p-2">
          {items.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ease-out hover:bg-daylight"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-peach/10 text-peach transition-all duration-200 ease-out group-hover:bg-peach group-hover:text-white">
                <Icon />
              </div>
              <span className="font-body text-sm font-medium text-midnight transition-colors duration-200 group-hover:text-peach">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop mega menu trigger ────────────────────────────────────────────────

function MegaTrigger({
  label,
  items,
}: {
  label: string;
  items: typeof SOLUTIONS;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium uppercase tracking-wider transition-all duration-200 ease-out active:scale-95 ${
          open
            ? "bg-midnight text-white"
            : "text-midnight hover:bg-midnight hover:text-white"
        }`}
      >
        {label}
        <ChevronDown open={open} />
      </button>
      <MegaMenuPanel items={items} open={open} />
    </div>
  );
}

// ─── Mobile menu icon ─────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-5 w-5 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

// ─── Mobile accordion section ─────────────────────────────────────────────────

function MobileAccordion({
  label,
  items,
  onClose,
}: {
  label: string;
  items: typeof SOLUTIONS;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-full px-4 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:bg-midnight active:text-white"
      >
        {label}
        <ChevronDown open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-3 pt-1">
          {items.map(({ label: itemLabel, href, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-daylight"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-peach/10 text-peach">
                <Icon />
              </div>
              <span className="font-body text-sm font-medium text-midnight">
                {itemLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sunlight/60 bg-daylight/95 backdrop-blur supports-[backdrop-filter]:bg-daylight/80">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: "72px" }}>

        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/logos/wordmark-midnight.svg"
            alt="Dumbo Health"
            width={160}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <MegaTrigger label="SOLUTIONS" items={SOLUTIONS} />

          <Link
            href="/pricing"
            className="rounded-full px-4 py-2 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:scale-95"
          >
            PRICING
          </Link>

          <MegaTrigger label="RESOURCES" items={RESOURCES} />

          <Link
            href="/about-us"
            className="rounded-full px-4 py-2 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:scale-95"
          >
            ABOUT US
          </Link>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="hidden h-10 rounded-lg border-midnight/20 bg-transparent px-5 font-mono text-sm tracking-wider text-midnight transition-all duration-200 ease-out hover:border-midnight hover:bg-midnight hover:text-white sm:inline-flex"
          >
            <a href={`${APP_URL}/login`}>Login</a>
          </Button>

          <Button
            asChild
            className="h-10 rounded-lg bg-peach px-6 font-mono text-sm tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-lg hover:shadow-peach/25 active:translate-y-0"
          >
            <a href={APP_URL}>Get Started</a>
          </Button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-sunlight/60 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-sunlight bg-white transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-0.5 px-4 pb-6 pt-3">
          <MobileAccordion label="SOLUTIONS" items={SOLUTIONS} onClose={() => setMobileOpen(false)} />

          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full px-4 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:bg-midnight active:text-white"
          >
            PRICING
          </Link>

          <MobileAccordion label="RESOURCES" items={RESOURCES} onClose={() => setMobileOpen(false)} />

          <Link
            href="/about-us"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full px-4 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:bg-midnight active:text-white"
          >
            ABOUT US
          </Link>

          <div className="my-1 border-t border-sunlight" />

          <a
            href={`${APP_URL}/login`}
            onClick={() => setMobileOpen(false)}
            className="block rounded-full px-4 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-midnight/60 transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:bg-midnight active:text-white"
          >
            LOGIN
          </a>
        </div>
      </div>
    </header>
  );
}
