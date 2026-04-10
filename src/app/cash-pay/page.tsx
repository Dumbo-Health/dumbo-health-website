"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
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
        See plans · from $59/mo
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
          CPAP from $2 a day. No insurance required.
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
          Not yet diagnosed? Start with our $149 at-home sleep test and
          have results within days. Already have a prescription? Pick a
          plan and your CPAP ships this week.
        </motion.p>

        <motion.div {...fadeUp(0.26)}>
          <CtaPair />
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 2: Two-path split ─────────────────────────────────────────────────
const PATH_A_STEPS = [
  "Order the $149 at-home sleep test",
  "One-night setup — results within days",
  "Our physicians review and issue your prescription",
  "Pick your CPAP plan and start therapy",
];

const PATH_B_STEPS = [
  "Upload your existing prescription",
  "Choose your plan — from $59/month",
  "CPAP machine ships within the week",
  "Care team supports you from day one",
];

function WhyCashPay() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(to bottom, #F5E6D1 0%, #FCF6ED 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-14">
          <SectionLabel>Find your starting point</SectionLabel>
          <SectionHeading maxWidth="28ch">
            Two paths. Both lead to better sleep.
          </SectionHeading>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Path A: Not yet diagnosed */}
          <motion.div
            {...fadeUp(0.08)}
            className="flex flex-col rounded-2xl p-8"
            style={{
              backgroundColor: "#F5E6D1",
              border: "1px solid rgba(245,230,209,0.9)",
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#78BFBC" }}
            >
              Not yet diagnosed
            </p>
            <h3
              className="font-heading font-medium mb-7"
              style={{
                color: "#031F3D",
                fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
              }}
            >
              Start with the sleep test.
            </h3>
            <div className="space-y-4 mb-10 flex-1">
              {PATH_A_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest pt-0.5 shrink-0"
                    style={{ color: "#FF8361" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-body leading-relaxed"
                    style={{ color: "rgba(3,31,61,0.7)", fontSize: "0.9375rem" }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={APP_URL}
              className="flex items-center justify-center gap-2 h-12 rounded-[12px] px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5"
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
          </motion.div>

          {/* Path B: Already diagnosed */}
          <motion.div
            {...fadeUp(0.16)}
            className="flex flex-col rounded-2xl p-8"
            style={{
              backgroundColor: "#FCF6ED",
              border: "1px solid rgba(3,31,61,0.07)",
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#FF8361" }}
            >
              Already have a diagnosis
            </p>
            <h3
              className="font-heading font-medium mb-7"
              style={{
                color: "#031F3D",
                fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
              }}
            >
              Pick a plan and start this week.
            </h3>
            <div className="space-y-4 mb-10 flex-1">
              {PATH_B_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest pt-0.5 shrink-0"
                    style={{ color: "#FF8361" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-body leading-relaxed"
                    style={{ color: "rgba(3,31,61,0.7)", fontSize: "0.9375rem" }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/cpap"
              className="flex items-center justify-center gap-2 h-12 rounded-[12px] px-7 font-body text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: "1.5px solid #031F3D",
                color: "#031F3D",
                backgroundColor: "transparent",
              }}
            >
              See CPAP plans
              <span
                className="font-mono text-xs tracking-normal"
                style={{ color: "rgba(3,31,61,0.5)" }}
              >
                · from $59/mo
              </span>
              <ArrowRight className="h-4 w-4 opacity-50 ml-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Section 3: Cost Reality (hinge) ──────────────────────────────────────────
const TRUTHS = [
  {
    n: "01",
    truth: "You\u2019re renting it. For 13 months.",
    answer:
      "Our plans start at $59/month. No 13-month rental clock. Cancel anytime.",
  },
  {
    n: "02",
    truth: "Miss the compliance window and coverage can stop.",
    answer:
      "No usage minimums. We track your data to coach you, not report to your insurer.",
  },
  {
    n: "03",
    truth: "Your usage data goes to your DME and insurer.",
    answer:
      "Your data stays in your account. We use it to improve your sleep, full stop.",
  },
];

const PLANS_PREVIEW = [
  {
    name: "Essentials",
    price: 59,
    perDay: "~$2/day",
    summary: "Start therapy. Pay for extras only when you need them.",
    features: ["Basic CPAP machine", "Mask fitted to your face", "24/7 care team"],
  },
  {
    name: "Premium",
    price: 89,
    perDay: "~$3/day",
    summary: "The smart choice for most people.",
    recommended: true,
    features: ["Premium CPAP machine", "Smart resupply, auto-shipped", "2 doctor visits/year in the app", "24/7 care team"],
  },
  {
    name: "Elite",
    price: 129,
    perDay: "~$4/day",
    summary: "Everything, all the time, zero friction.",
    features: ["Premium CPAP machine", "Unlimited doctor visits", "Full smart resupply", "Auto device upgrades", "Priority 24/7 care"],
  },
];

function CostReality() {
  return (
    <section className="relative overflow-hidden" style={{ isolation: "isolate" }}>

      {/* ── Dark half: insurance truths ──────────────────────────────────── */}
      <div
        className="relative py-24 md:py-32"
        style={{ backgroundColor: "#031F3D" }}
      >
        {/* Brand pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url(/images/brand-pattern.png)",
            backgroundRepeat: "repeat",
            opacity: 0.04,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-[5%]">
          <SectionLabel color="#FF8361">The real cost of insurance CPAP</SectionLabel>
          <SectionHeading light maxWidth="22ch">
            That &ldquo;covered by insurance&rdquo; CPAP might cost more than
            you think.
          </SectionHeading>

          <div className="mt-14">
            {TRUTHS.map((t, i) => (
              <motion.div
                key={t.n}
                {...fadeUp(0.1 + i * 0.12)}
                className="grid grid-cols-[2.5rem_1fr] gap-6 py-9"
                style={{ borderTop: "1px solid rgba(252,246,237,0.1)" }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest pt-1.5"
                  style={{ color: "#FF8361" }}
                >
                  {t.n}
                </span>

                <div>
                  <p
                    className="font-heading font-medium leading-tight mb-5"
                    style={{
                      color: "#FCF6ED",
                      fontSize: "clamp(1.45rem, 2.5vw, 2.1rem)",
                    }}
                  >
                    {t.truth}
                  </p>

                  <div className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: "#78BFBC" }}
                    />
                    <p
                      className="font-body leading-relaxed"
                      style={{
                        color: "rgba(252,246,237,0.65)",
                        fontSize: "0.9375rem",
                      }}
                    >
                      <span
                        className="font-mono text-[11px] uppercase tracking-widest mr-2.5 align-middle"
                        style={{ color: "#78BFBC" }}
                      >
                        Dumbo Health
                      </span>
                      {t.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(252,246,237,0.1)" }} />
          </div>
        </div>
      </div>

      {/* ── Light half: what Dumbo Health actually costs ─────────────────── */}
      <div
        className="py-24 md:py-32"
        style={{
          background: "linear-gradient(to bottom, #FCF6ED 0%, #F5E6D1 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="mb-14">
            <SectionLabel>Cash pay with Dumbo Health</SectionLabel>
            <SectionHeading maxWidth="26ch">
              Here&apos;s what Dumbo Health actually costs.
            </SectionHeading>
            <motion.p
              {...fadeUp(0.14)}
              className="font-body leading-relaxed mt-4"
              style={{ color: "rgba(3,31,61,0.55)", fontSize: "1rem", maxWidth: "52ch" }}
            >
              All plans include your CPAP machine, free shipping, and 24/7 care.
              No upfront costs. No hidden fees. Cancel anytime.
            </motion.p>
          </div>

          {/* Plan cards */}
          <div className="grid gap-5 md:grid-cols-3 mb-12">
            {PLANS_PREVIEW.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp(0.08 + i * 0.1)}
                className="relative flex flex-col rounded-2xl p-7"
                style={{
                  backgroundColor: plan.recommended ? "#031F3D" : "#F5E6D1",
                  border: plan.recommended
                    ? "none"
                    : "1px solid rgba(245,230,209,0.9)",
                }}
              >
                {plan.recommended && (
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest mb-5 inline-block"
                    style={{ color: "#FF8361" }}
                  >
                    Most popular
                  </span>
                )}

                <p
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: plan.recommended ? "rgba(252,246,237,0.5)" : "rgba(3,31,61,0.4)" }}
                >
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1.5 mb-1">
                  <span
                    className="font-heading font-medium"
                    style={{
                      color: plan.recommended ? "#FCF6ED" : "#031F3D",
                      fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    }}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className="font-body"
                    style={{ color: plan.recommended ? "rgba(252,246,237,0.5)" : "rgba(3,31,61,0.4)", fontSize: "0.9375rem" }}
                  >
                    /mo
                  </span>
                </div>

                <p
                  className="font-mono text-[11px] uppercase tracking-widest mb-5"
                  style={{ color: plan.recommended ? "#78BFBC" : "#FF8361" }}
                >
                  {plan.perDay}
                </p>

                <p
                  className="font-body leading-relaxed mb-6 text-sm"
                  style={{ color: plan.recommended ? "rgba(252,246,237,0.6)" : "rgba(3,31,61,0.55)" }}
                >
                  {plan.summary}
                </p>

                <div className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check
                        className="h-3.5 w-3.5 shrink-0 mt-0.5"
                        style={{ color: plan.recommended ? "#78BFBC" : "#FF8361" }}
                      />
                      <span
                        className="font-body text-sm leading-snug"
                        style={{ color: plan.recommended ? "rgba(252,246,237,0.75)" : "rgba(3,31,61,0.65)" }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/cpap"
                  className="flex items-center justify-center gap-2 h-11 rounded-[12px] font-body text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: plan.recommended ? "#FF8361" : "transparent",
                    color: plan.recommended ? "#fff" : "#031F3D",
                    border: plan.recommended ? "none" : "1.5px solid rgba(3,31,61,0.2)",
                    boxShadow: plan.recommended ? "0 4px 16px rgba(255,131,97,0.3)" : "none",
                  }}
                >
                  Get started
                  <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUp(0.4)}
            className="font-body text-sm text-center"
            style={{ color: "rgba(3,31,61,0.4)" }}
          >
            Full plan details and feature comparison at{" "}
            <Link href="/cpap" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
              dumbo.health/cpap
            </Link>
          </motion.p>
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
        <HowItWorks />
        <WhatMakesDifferent />
        <FaqSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
