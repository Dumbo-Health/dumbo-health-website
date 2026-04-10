"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { APP_URL } from "@/lib/constants";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// ── Design tokens ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const VIEWPORT = { once: true, margin: "-80px" } as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({
  children,
  color = "#78BFBC",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <motion.p
      {...fadeUp(0)}
      className="font-mono text-xs uppercase tracking-widest mb-4"
      style={{ color }}
    >
      {children}
    </motion.p>
  );
}

function SectionHeading({
  children,
  light = false,
  delay = 0.08,
  maxWidth = "22ch",
}: {
  children: React.ReactNode;
  light?: boolean;
  delay?: number;
  maxWidth?: string;
}) {
  return (
    <motion.h2
      {...fadeUp(delay)}
      className="font-heading font-medium leading-tight text-balance"
      style={{
        color: light ? "#FCF6ED" : "#031F3D",
        fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
        maxWidth,
      }}
    >
      {children}
    </motion.h2>
  );
}

// ── CTA Button pair (used in hero + closing) ──────────────────────────────────
function CtaPair({ invert = false }: { invert?: boolean }) {
  const secondaryBorder = invert
    ? "1.5px solid rgba(252,246,237,0.35)"
    : "1.5px solid #031F3D";
  const secondaryColor = invert ? "#FCF6ED" : "#031F3D";
  const secondaryHoverBg = invert
    ? "rgba(252,246,237,0.08)"
    : "rgba(3,31,61,0.05)";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Primary: sleep test */}
      <Link
        href={APP_URL}
        className="group flex items-center gap-2 h-12 rounded-[12px] px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          backgroundColor: "#FF8361",
          boxShadow: "0 4px 20px rgba(255,131,97,0.28)",
        }}
      >
        Start with the sleep test
        <span
          className="font-mono text-xs font-normal normal-case tracking-normal"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          · $149
        </span>
      </Link>

      {/* Divider */}
      <span
        className="hidden sm:block font-mono text-xs"
        style={{ color: invert ? "rgba(252,246,237,0.3)" : "rgba(3,31,61,0.25)" }}
      >
        or
      </span>

      {/* Secondary: CPAP plans */}
      <Link
        href="/cpap"
        className="group flex items-center gap-2 h-12 rounded-[12px] px-7 font-body text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
        style={{
          border: secondaryBorder,
          color: secondaryColor,
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            secondaryHoverBg;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "transparent";
        }}
      >
        Explore CPAP plans
        <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  );
}

// ── Section 1: Hero ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Linear base gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #FCF6ED 0%, #FCF6ED 70%, #F5E6D1 100%)",
          zIndex: -1,
        }}
      />
      {/* Peach radial upper-right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 85% 20%, rgba(255,131,97,0.14) 0%, transparent 65%)",
          zIndex: -1,
        }}
      />
      {/* Brand pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/images/brand-pattern.png)",
          backgroundRepeat: "repeat",
          opacity: 0.035,
          zIndex: -1,
        }}
      />

      <div className="mx-auto max-w-7xl px-[5%]">
        <SectionLabel>Cash pay · Insurance · Your choice</SectionLabel>

        <motion.h1
          {...fadeUp(0.08)}
          className="font-heading font-medium leading-tight text-balance"
          style={{
            color: "#031F3D",
            fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
            maxWidth: "18ch",
            marginBottom: "1.5rem",
          }}
        >
          Getting treated shouldn&apos;t depend on your insurance.
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          className="font-body leading-relaxed mb-10"
          style={{
            color: "rgba(3,31,61,0.6)",
            fontSize: "1.125rem",
            maxWidth: "52ch",
          }}
        >
          Whether you&apos;re just starting your journey or you already have a
          diagnosis and need a CPAP, here&apos;s how to think about the payment
          decision, and why many people choose to go directly.
        </motion.p>

        <motion.div {...fadeUp(0.26)}>
          <CtaPair />
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 2: Why Cash Pay ───────────────────────────────────────────────────
const REASONS = [
  {
    n: "01",
    title: "No active insurance",
    body: "Treatment is still needed. A gap in coverage shouldn't mean a gap in care.",
  },
  {
    n: "02",
    title: "High deductibles",
    body: "Equipment and visits can be expensive once deductibles apply, even with coverage.",
  },
  {
    n: "03",
    title: "Insurance adds steps",
    body: "Prior authorizations, co-insurance calculations, and long hold times slow everything down.",
  },
  {
    n: "04",
    title: "Rental compliance rules",
    body: "Usage data is shared with insurers to prove compliance, reducing your privacy and adding stress.",
  },
  {
    n: "05",
    title: "Limited device choice",
    body: "Insurance networks often restrict which masks and machines are available to you.",
  },
  {
    n: "06",
    title: "Required follow-up visits",
    body: "Extra appointments add time away from work and out-of-pocket costs that aren't always covered.",
  },
];

function WhyCashPay() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #F5E6D1 0%, #FCF6ED 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-14">
          <SectionLabel>Why people choose cash pay</SectionLabel>
          <SectionHeading>
            Insurance works for some. For many, cash pay is faster, cheaper,
            and simpler.
          </SectionHeading>
        </div>

        {/* 2-col reason cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.n}
              {...fadeUp(0.06 + i * 0.07)}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(245,230,209,0.9)",
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#FF8361" }}
              >
                {r.n}
              </span>
              <h3
                className="mt-3 font-heading font-medium"
                style={{ color: "#031F3D", fontSize: "1.0625rem" }}
              >
                {r.title}
              </h3>
              <p
                className="mt-1.5 font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.6)", fontSize: "0.9375rem" }}
              >
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dumbo Health take callout */}
        <motion.div
          {...fadeUp(0.5)}
          className="rounded-2xl p-8 max-w-2xl"
          style={{
            backgroundColor: "rgba(120,191,188,0.1)",
            border: "1px solid rgba(120,191,188,0.25)",
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "#78BFBC" }}
          >
            Dumbo Health take
          </p>
          <p
            className="font-body leading-relaxed"
            style={{ color: "#031F3D", fontSize: "1.0625rem" }}
          >
            Cash pay keeps control with you. You choose the CPAP device that
            fits, and you decide what data to share. Our team is here with
            coaching so you still get the results, without the paperwork.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 3: Cost Reality (hinge) ──────────────────────────────────────────
const COST_ROWS = [
  {
    label: "Machine upfront",
    insurance:
      "Rented for 13 months. You pay your deductible plus a 20-30% copay each month before you own it",
    dumbo: "No upfront purchase cost. Flat monthly access, no ownership required",
    dumboHighlight: false,
  },
  {
    label: "Compliance tracking",
    insurance:
      "Required: 4h/night on 70% of nights (21 of 30). Miss the threshold and coverage can be discontinued",
    dumbo:
      "No compliance requirements. Your care team coaches and checks in proactively so therapy actually works",
    dumboHighlight: false,
  },
  {
    label: "Supply replacement",
    insurance: "Shipped on a quarterly schedule, billed whether you need the parts or not",
    dumbo: "Replaced based on actual component wear. You pay for what you use",
    dumboHighlight: true,
  },
  {
    label: "Privacy",
    insurance:
      "Usage data transmitted automatically to your DME and insurer to verify compliance",
    dumbo:
      "Usage data stays with you. We use it to fuel your personalized coaching, not to gate your coverage",
    dumboHighlight: false,
  },
  {
    label: "Device choice",
    insurance: "Limited to in-network DME providers and contracted brands",
    dumbo: "ResMed devices, the leading brand in CPAP therapy",
    dumboHighlight: false,
  },
  {
    label: "Long-run cost",
    insurance: "Rental + deductible + co-insurance + surprise bills",
    dumbo: "Flat monthly rate, no deductibles, no surprise bills*",
    dumboHighlight: true,
  },
];

function CostReality() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Brand pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/images/brand-pattern.png)",
          backgroundRepeat: "repeat",
          opacity: 0.03,
          zIndex: -1,
        }}
      />

      <div className="mx-auto max-w-7xl px-[5%]">

        {/* Top row: heading + image placeholder */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-16">
          <div>
            <SectionLabel color="#FF8361">The real cost of insurance CPAP</SectionLabel>
            <SectionHeading light maxWidth="22ch">
              That &ldquo;$0 upfront&rdquo; machine might cost more than you
              think.
            </SectionHeading>
            <motion.p
              {...fadeUp(0.18)}
              className="font-body mt-5 leading-relaxed"
              style={{
                color: "rgba(252,246,237,0.68)",
                fontSize: "1.0625rem",
                maxWidth: "48ch",
              }}
            >
              Insurance CPAP is a 13-month rental. You pay toward your
              deductible and a monthly copay, prove compliance, and share usage
              data with your DME and insurer. Miss the compliance threshold and
              coverage can be discontinued. Dumbo Health&apos;s model works
              differently.
            </motion.p>
          </div>

          {/* Placeholder image */}
          <motion.div
            {...fadeUp(0.22)}
            className="rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(252,246,237,0.06) 0%, rgba(255,214,173,0.1) 100%)",
                border: "1px solid rgba(252,246,237,0.1)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,131,97,0.15)" }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF8361"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(252,246,237,0.35)" }}
              >
                Image placeholder
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile swipe hint */}
        <p
          className="lg:hidden font-mono text-[11px] uppercase tracking-widest text-center mb-3"
          style={{ color: "rgba(252,246,237,0.38)" }}
        >
          ← Swipe to compare →
        </p>

        {/* Comparison table — light theme */}
        <motion.div
          {...fadeUp(0.14)}
          className="w-full overflow-x-auto rounded-2xl"
          style={{
            border: "1px solid rgba(252,246,237,0.1)",
            boxShadow: "0 2px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ minWidth: "620px" }}>
            <div style={{ backgroundColor: "rgba(252,246,237,0.04)" }}>

              {/* Column headers */}
              <div className="grid grid-cols-[200px_1fr_1fr]">
                <div className="px-6 py-5" />
                <div
                  className="px-6 py-5 text-center"
                  style={{
                    borderLeft: "1px solid rgba(252,246,237,0.08)",
                    backgroundColor: "rgba(252,246,237,0.06)",
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: "rgba(252,246,237,0.58)" }}
                  >
                    Insurance CPAP
                  </p>
                  <p
                    className="font-body text-sm mt-1"
                    style={{ color: "rgba(252,246,237,0.38)" }}
                  >
                    The usual path
                  </p>
                </div>
                <div
                  className="px-6 py-5 text-center"
                  style={{
                    borderLeft: "1px solid rgba(255,131,97,0.18)",
                    backgroundColor: "rgba(255,131,97,0.09)",
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest font-bold"
                    style={{ color: "#FF8361" }}
                  >
                    Dumbo Health
                  </p>
                  <p
                    className="font-body text-sm mt-1"
                    style={{ color: "rgba(255,131,97,0.75)" }}
                  >
                    Cash pay
                  </p>
                </div>
              </div>

              {/* Rows */}
              {COST_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[200px_1fr_1fr]"
                  style={{ borderTop: "1px solid rgba(252,246,237,0.07)" }}
                >
                  <div className="px-6 py-5 flex items-center">
                    <p
                      className="font-body text-sm font-semibold"
                      style={{ color: "rgba(252,246,237,0.82)" }}
                    >
                      {row.label}
                    </p>
                  </div>
                  <div
                    className="px-5 py-5 flex items-start gap-3"
                    style={{
                      borderLeft: "1px solid rgba(252,246,237,0.07)",
                      backgroundColor: "rgba(252,246,237,0.03)",
                    }}
                  >
                    <X
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: "rgba(252,246,237,0.28)" }}
                    />
                    <p
                      className="font-body text-sm leading-snug"
                      style={{ color: "rgba(252,246,237,0.62)" }}
                    >
                      {row.insurance}
                    </p>
                  </div>
                  <div
                    className="px-5 py-5 flex items-start gap-3"
                    style={{
                      borderLeft: "1px solid rgba(255,131,97,0.14)",
                      backgroundColor: "rgba(255,131,97,0.07)",
                    }}
                  >
                    <Check
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: "#78BFBC" }}
                    />
                    <p
                      className="font-body text-sm font-medium leading-snug"
                      style={{
                        color: row.dumboHighlight ? "#FFD6AD" : "#FCF6ED",
                      }}
                    >
                      {row.dumbo}
                    </p>
                  </div>
                </div>
              ))}

              {/* Footer note */}
              <div
                className="px-6 py-4"
                style={{
                  borderTop: "1px solid rgba(252,246,237,0.07)",
                  backgroundColor: "rgba(252,246,237,0.03)",
                }}
              >
                <p
                  className="font-body text-xs"
                  style={{ color: "rgba(252,246,237,0.45)" }}
                >
                  * Dumbo Health premium plan. Insurance costs vary by plan,
                  deductible, and annual reset. Individual results will differ.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom: compliance callout + image placeholder */}
        <div className="grid gap-6 mt-8 sm:grid-cols-2">
          <motion.div
            {...fadeUp(0.24)}
            className="rounded-2xl p-7"
            style={{
              backgroundColor: "rgba(120,191,188,0.1)",
              border: "1px solid rgba(120,191,188,0.32)",
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "#78BFBC" }}
            >
              A note on compliance
            </p>
            <p
              className="font-body leading-relaxed"
              style={{ color: "rgba(252,246,237,0.72)", fontSize: "0.9375rem" }}
            >
              Insurance requires at least 4 hours per night on 70% of nights
              (21 of 30) to maintain coverage, typically verified in the first
              90 days. Miss the threshold and coverage can be discontinued. With
              Dumbo Health, there are no compliance requirements. Our care team
              coaches and supports you so therapy actually works for you, not
              for your insurer.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.30)}
            className="rounded-2xl overflow-hidden"
            style={{ minHeight: "200px" }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(252,246,237,0.05) 0%, rgba(120,191,188,0.08) 100%)",
                border: "1px solid rgba(252,246,237,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(120,191,188,0.2)" }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#78BFBC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(252,246,237,0.32)" }}
              >
                Image placeholder
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ── Section 4: What you get ───────────────────────────────────────────────────
const BENEFITS = [
  {
    n: "01",
    title: "Upfront, transparent pricing",
    body: "Simple monthly plans. No deductibles, no surprise bills, no authorization paperwork.",
  },
  {
    n: "02",
    title: "CPAP or oral appliance",
    body: "Choose the therapy that matches your life and your comfort preferences.",
  },
  {
    n: "03",
    title: "Same-week telehealth",
    body: "Fast shipping and telehealth within days, not weeks of waiting for referrals.",
  },
  {
    n: "04",
    title: "Real sleep coaches",
    body: "Mask fit, comfort settings, pressure guidance. Real people in your corner.",
  },
  {
    n: "05",
    title: "Smart supply tracking",
    body: "The app tracks component lifetime and replaces supplies when they're actually due, not on an arbitrary schedule.",
  },
];

function WhatYouGet() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #FCF6ED 0%, #F5E6D1 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-14">
          <SectionLabel>Cash pay with Dumbo Health</SectionLabel>
          <SectionHeading maxWidth="24ch">
            Transparent prices. Real coaches. Your device, your data.
          </SectionHeading>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.n}
              {...fadeUp(0.06 + i * 0.08)}
              className="rounded-2xl p-7"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(245,230,209,0.8)",
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#FF8361" }}
              >
                {b.n}
              </span>
              <h3
                className="mt-3 font-heading font-medium"
                style={{
                  color: "#031F3D",
                  fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                }}
              >
                {b.title}
              </h3>
              <p
                className="mt-2 font-body leading-relaxed"
                style={{
                  color: "rgba(3,31,61,0.6)",
                  fontSize: "0.9375rem",
                }}
              >
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 5: How It Works ───────────────────────────────────────────────────
const STEPS = [
  {
    n: "1",
    title: "Order the at-home sleep test",
    body: "Quick delivery, simple one-night setup. Most results returned within days.",
  },
  {
    n: "2",
    title: "Start therapy",
    body: "CPAP or oral appliance. Get fitted, coached, and set up for comfort from day one.",
  },
  {
    n: "3",
    title: "Track and replace",
    body: "App-guided supply tracking, component lifetime monitoring, and a care team you can message anytime.",
  },
];

function HowItWorks() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #F5E6D1 0%, #FFD6AD 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-14">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading maxWidth="26ch">
            From test to therapy in days, not months.
          </SectionHeading>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp(0.1 + i * 0.12)}
              className="relative"
            >
              {/* Large ghost step number */}
              <p
                className="font-heading font-medium select-none mb-4"
                style={{
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  color: "rgba(3,31,61,0.07)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.n}
              </p>
              <h3
                className="font-heading font-medium"
                style={{
                  color: "#031F3D",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)",
                  marginBottom: "0.5rem",
                }}
              >
                {s.title}
              </h3>
              <p
                className="font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.6)", fontSize: "0.9375rem" }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 6: What Makes Dumbo Health Different ──────────────────────────────
function WhatMakesDifferent() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #FFD6AD 0%, #FCF6ED 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] items-center">

          {/* Left: label + heading */}
          <div>
            <SectionLabel>What makes us different</SectionLabel>
            <SectionHeading maxWidth="20ch">
              Friendly design, clear language, real people.
            </SectionHeading>
          </div>

          {/* Right: body + trust signals */}
          <div>
            <motion.p
              {...fadeUp(0.12)}
              className="font-body leading-relaxed mb-10"
              style={{
                color: "rgba(3,31,61,0.6)",
                fontSize: "1.0625rem",
                maxWidth: "48ch",
              }}
            >
              We remove the stigma and make treatment feel normal and doable.
              Modern wellness design, approachable language, and coaches who
              actually answer. Sleep apnea is common. Getting help should feel
              that way too.
            </motion.p>

            {/* Trust signals — no fabricated data */}
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                "FDA-cleared devices",
                "Licensed sleep physicians",
                "Stigma-free approach",
              ].map((signal, i) => (
                <motion.div
                  key={signal}
                  {...fadeUp(0.18 + i * 0.08)}
                  className="flex items-center gap-2.5 rounded-2xl px-5 py-3.5"
                  style={{
                    backgroundColor: "#F5E6D1",
                    border: "1px solid rgba(245,230,209,0.9)",
                  }}
                >
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#78BFBC" }}
                  />
                  <span
                    className="font-body text-sm font-medium"
                    style={{ color: "#031F3D" }}
                  >
                    {signal}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 7: FAQ ────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Can I use insurance with Dumbo Health?",
    a: "Dumbo Health is cash pay first with transparent monthly plans. We don't bill insurance, which means no authorizations, no compliance requirements, and no surprise bills.",
  },
  {
    q: "Is cash pay really cheaper than using insurance?",
    a: "For many people, yes. High deductibles and rental terms can make insurance more expensive over time. Cash pay gives you one clear price and you own the device, and because we replace supplies based on actual component wear, you pay for what you use, not what the schedule says.",
  },
  {
    q: "Will I lose support if I don't go through insurance?",
    a: "No. Our team provides coaching, mask fit help, and telehealth visits so you get results without the usual hassle. Support is included, not an insurance-dependent add-on.",
  },
  {
    q: "How fast can I start treatment?",
    a: "Most people complete testing and begin therapy within days once a diagnosis is confirmed. No waiting weeks for referral chains or prior authorizations.",
  },
];

function FaqSection() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #FCF6ED 0%, #F5E6D1 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] items-start">
          <div>
            <SectionLabel>Common questions</SectionLabel>
            <SectionHeading maxWidth="18ch">
              Still deciding? Here&apos;s what people ask.
            </SectionHeading>
          </div>

          <motion.div {...fadeUp(0.14)}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#FCF6ED",
                    border: "1px solid rgba(245,230,209,0.8)",
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 font-heading font-medium text-left hover:no-underline"
                    style={{
                      color: "#031F3D",
                      fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                    }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-5 font-body leading-relaxed"
                    style={{ color: "rgba(3,31,61,0.65)", fontSize: "1rem" }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Section 8: Closing CTA ────────────────────────────────────────────────────
function ClosingCta() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(to bottom, #F5E6D1 0%, #FFD6AD 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <motion.p
          {...fadeUp(0)}
          className="font-mono text-xs uppercase tracking-widest mb-4"
          style={{ color: "#78BFBC" }}
        >
          Ready when you are
        </motion.p>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-heading font-medium leading-tight text-balance mb-5"
          style={{
            color: "#031F3D",
            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            maxWidth: "22ch",
          }}
        >
          Better sleep starts with one step.
        </motion.h2>

        <motion.p
          {...fadeUp(0.16)}
          className="font-body leading-relaxed mb-10"
          style={{
            color: "rgba(3,31,61,0.6)",
            fontSize: "1.0625rem",
            maxWidth: "50ch",
          }}
        >
          Begin with the at-home sleep test, or explore CPAP plans if you
          already have a diagnosis. Either way, our team is here with you.
        </motion.p>

        <motion.div {...fadeUp(0.24)}>
          <CtaPair />
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CashPayPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyCashPay />
        <CostReality />
        <WhatYouGet />
        <HowItWorks />
        <WhatMakesDifferent />
        <FaqSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
