"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";
import { SleepAwarenessPromoBanner } from "./sleep-awareness-promo-banner";

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

function IconCPAP() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      <rect x="2" y="2" width="20" height="20" rx="3" />
    </svg>
  );
}

function IconResupply() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconFacts() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconOralAppliance() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9c0 0 2-2 9-2s9 2 9 2v3c0 4.5-4 7-9 7s-9-2.5-9-7V9z" />
      <line x1="8" y1="9" x2="8" y2="12" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="16" y1="9" x2="16" y2="12" />
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

type NavItem = { label: string; href: string; Icon: React.ComponentType; description?: string };

const SOLUTIONS_FEATURED: NavItem = {
  label: "Sleep Apnea Care",
  href: "/solutions",
  Icon: IconCare,
  description: "Your complete care journey, from diagnosis to treatment",
};

const SOLUTIONS_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "For the Undiagnosed",
    items: [
      {
        label: "Home Sleep Test",
        href: "/at-home-sleep-test",
        Icon: IconSleepTest,
        description: "Test in your own bed, get results in days",
      },
    ],
  },
  {
    title: "Treatments",
    items: [
      { label: "CPAP Therapy",  href: "/cpap",       Icon: IconCPAP,     description: "Start treatment with expert guidance" },
      ...(process.env.NEXT_PUBLIC_HIDE_ORAL_APPLIANCE !== "true" ? [{ label: "Oral Appliance Therapy", href: "/oral-appliance-therapy", Icon: IconOralAppliance, description: "A custom device for mild to moderate sleep apnea" }] : []),
      ...(process.env.NEXT_PUBLIC_HIDE_CPAP_CARE_PAGE !== "true" ? [{ label: "CPAP Care", href: "/cpap-care", Icon: IconSupport, description: "Ongoing support for CPAP users" }] : []),
      ...(process.env.NEXT_PUBLIC_HIDE_RESUPPLY_PAGE !== "true" ? [{ label: "CPAP Resupply", href: "/resupply", Icon: IconResupply, description: "Automatic replacement of your supplies" }] : []),
    ],
  },
];

/** Flat list for mobile (featured first, then all group items) */
const SOLUTIONS_FLAT: NavItem[] = [
  SOLUTIONS_FEATURED,
  ...SOLUTIONS_GROUPS.flatMap((g) => g.items),
];

const RESOURCES_COLUMNS: { title: string; items: NavItem[] }[] = [
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog", Icon: IconBlog },
      { label: "FAQ", href: "/faqs", Icon: IconFAQ },
      { label: "Facts", href: "/resources/facts", Icon: IconFacts },
      { label: "Contact", href: "/contact", Icon: IconContact },
      { label: "WatchPAT ONE Setup", href: "/watchpat-one-set-up", Icon: IconSleepTest },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Sleep Toolbox", href: "/go/tools", Icon: IconSupport },
      { label: "Sleep Protocol", href: "/go/sleep-protocol", Icon: IconSleepTest },
      { label: "Sleep Hub", href: "/go/sleep-hub", Icon: IconApp },
      { label: "30 day better sleep plan", href: "/go/30-day-sleep-plan", Icon: IconCalendar },
    ],
  },
];

/** Flat list for mobile accordion (same items, no column headers) */
const RESOURCES_FLAT: NavItem[] = RESOURCES_COLUMNS.flatMap((col) => col.items);

// ─── Solutions mega menu panel ────────────────────────────────────────────────

function SolutionsMegaMenuPanel({ open }: { open: boolean }) {
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

      <div className="w-[26rem] overflow-hidden rounded-2xl border border-sunlight bg-white shadow-xl" style={{ boxShadow: "0 8px 32px rgba(3,31,61,0.10)" }}>
        {/* Featured: Sleep Apnea Care */}
        <div className="p-2 pb-1">
          <Link
            href={SOLUTIONS_FEATURED.href}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ease-out hover:bg-daylight"
            style={{ background: "rgba(252,246,237,0.6)" }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach text-white transition-all duration-200 ease-out group-hover:scale-105">
              <SOLUTIONS_FEATURED.Icon />
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-midnight transition-colors duration-200 group-hover:text-peach">
                {SOLUTIONS_FEATURED.label}
              </p>
              <p className="font-body text-xs text-midnight/50">{SOLUTIONS_FEATURED.description}</p>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-4 my-1 border-t border-sunlight" />

        {/* Grouped columns */}
        <div className="grid grid-cols-2 gap-0 p-2 pt-1">
          {SOLUTIONS_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(3,31,61,0.4)" }}>
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ label, href, Icon, description }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ease-out hover:bg-daylight"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-peach/10 text-peach transition-all duration-200 ease-out group-hover:bg-peach group-hover:text-white">
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium text-midnight transition-colors duration-200 group-hover:text-peach">
                        {label}
                      </p>
                      {description && (
                        <p className="font-body text-xs leading-tight" style={{ color: "rgba(3,31,61,0.45)" }}>
                          {description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}

function ResourcesMegaMenuPanel({
  columns: groupedColumns,
  open,
}: {
  columns: { title: string; items: NavItem[] }[];
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
      <div className="mx-auto mb-[-1px] h-2.5 w-2.5 rotate-45 rounded-sm border-l border-t border-sunlight bg-white" style={{ marginLeft: "calc(50% - 5px)", marginRight: "auto" }} />

      <div className="w-[31rem] overflow-hidden rounded-2xl border border-sunlight bg-white shadow-xl shadow-midnight/8">
        <div className="grid grid-cols-2 gap-4 p-4">
          {groupedColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-midnight/50">
                {col.title}
              </p>
              <div className="space-y-0.5">
                {col.items.map(({ label, href, Icon }) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop mega menu triggers ───────────────────────────────────────────────

function SolutionsMegaTrigger({ label }: { label: string }) {
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
          open ? "bg-midnight text-white" : "text-midnight hover:bg-midnight hover:text-white"
        }`}
      >
        {label}
        <ChevronDown open={open} />
      </button>
      <SolutionsMegaMenuPanel open={open} />
    </div>
  );
}

function ResourcesMegaTrigger({
  label,
  columns: groupedColumns,
}: {
  label: string;
  columns: { title: string; items: NavItem[] }[];
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
      <ResourcesMegaMenuPanel columns={groupedColumns} open={open} />
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
  items: NavItem[];
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

// ─── Solutions mobile accordion (structured) ──────────────────────────────────

function SolutionsMobileAccordion({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-full px-4 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-200 ease-out hover:bg-midnight hover:text-white active:bg-midnight active:text-white"
      >
        SOLUTIONS
        <ChevronDown open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-2 pt-2 pb-1">

          {/* Featured: Sleep Apnea Care */}
          <Link
            href={SOLUTIONS_FEATURED.href}
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ease-out hover:bg-daylight"
            style={{ background: "rgba(252,246,237,0.7)" }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach text-white">
              <SOLUTIONS_FEATURED.Icon />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-midnight group-hover:text-peach transition-colors duration-200">
                {SOLUTIONS_FEATURED.label}
              </p>
              <p className="font-body text-xs" style={{ color: "rgba(3,31,61,0.45)" }}>
                {SOLUTIONS_FEATURED.description}
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="mx-2 my-2.5 border-t border-sunlight" />

          {/* Groups */}
          {SOLUTIONS_GROUPS.map((group, i) => (
            <div key={group.title} className={i > 0 ? "mt-3" : ""}>
              <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(3,31,61,0.4)" }}>
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ label, href, Icon, description }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ease-out hover:bg-daylight"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-peach/10 text-peach transition-all duration-200 group-hover:bg-peach group-hover:text-white">
                      <Icon />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-midnight group-hover:text-peach transition-colors duration-200">
                        {label}
                      </p>
                      {description && (
                        <p className="font-body text-xs leading-tight" style={{ color: "rgba(3,31,61,0.45)" }}>
                          {description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
      <nav className="flex items-center justify-between" style={{ height: "72px", padding: "0 5%" }}>

        {/* Logo */}
        <Link href="/" className="shrink-0 transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/logos/wordmark-midnight.svg"
            alt="Dumbo Health"
            width={200}
            height={40}
            className="h-7 w-auto sm:h-9"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 xl:gap-6 lg:flex">
          <SolutionsMegaTrigger label="SOLUTIONS" />

          <ResourcesMegaTrigger label="RESOURCES" columns={RESOURCES_COLUMNS} />

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
            className="hidden h-10 rounded-lg border-midnight/20 bg-transparent px-[5vw] font-mono text-sm tracking-wider text-midnight transition-all duration-200 ease-out hover:border-midnight hover:bg-midnight hover:text-white sm:inline-flex"
          >
            <a href={`${APP_URL}/login`}>Login</a>
          </Button>

          <Button
            asChild
            className="h-10 rounded-lg bg-peach px-4 sm:px-6 font-mono text-sm tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-lg hover:shadow-peach/25 active:translate-y-0"
          >
            <Link href="/get-started">Get Started</Link>
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
          <SolutionsMobileAccordion onClose={() => setMobileOpen(false)} />

          <MobileAccordion label="RESOURCES" items={RESOURCES_FLAT} onClose={() => setMobileOpen(false)} />

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
