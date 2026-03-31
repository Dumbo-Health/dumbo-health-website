"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const POINTS = [
  {
    n: "01",
    title: "No prior authorization.",
    body: "Insurance can deny coverage or require months of pre-authorization before covering a sleep study. With cash pay, you order today and test tonight.",
  },
  {
    n: "02",
    title: "One price. No surprises.",
    body: "$149 covers the test, the device, the doctor review, and your prescription. No deductibles. No bills that arrive weeks later.",
  },
  {
    n: "03",
    title: "Faster answers.",
    body: "Insurance delays can push your diagnosis weeks or months out. Cash pay means you know within days, not after a referral chain.",
  },
];

const COMPARISON_ROWS = [
  { label: "Test setting",         traditional: "Sleep lab, overnight stay",           dumbo: "Your own bed, one night" },
  { label: "Prior authorization",  traditional: "Often required, weeks of waiting",    dumbo: "None required" },
  { label: "Cost",                 traditional: "Lab study: $1,000–$3,000+",           dumbo: "Flat $149, all-inclusive" },
  { label: "Diagnostic process",   traditional: "Polysomnography (in-lab PSG)",        dumbo: "FDA-cleared home test" },
  { label: "Results turnaround",   traditional: "1–3 weeks",                           dumbo: "Within days" },
  { label: "Prescription",         traditional: "Separate doctor visit required",      dumbo: "Included with results" },
  { label: "Insurance complexity", traditional: "Frequent paperwork and denials",      dumbo: "Zero paperwork needed" },
  { label: "Doctor review",        traditional: "May see different providers",         dumbo: "Dedicated sleep physician" },
  { label: "Follow-up care",       traditional: "Separate referral needed",            dumbo: "Treatment path included" },
  { label: "Time to diagnosis",    traditional: "Weeks to months",                     dumbo: "Start tonight", highlight: true },
];

export function CashPayArgument() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.12, zIndex: -1 }}
      />

      <div className="mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            Cash pay vs. insurance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium leading-tight text-balance"
            style={{ color: "#FCF6ED", fontSize: "clamp(2.4rem, 4vw, 3.5rem)", maxWidth: "22ch" }}
          >
            Waiting on insurance could cost you more than you think.
          </motion.h2>
        </div>

        {/* Two-column layout — stacks on mobile */}
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">

          {/* Left: numbered points + CTA */}
          <div className="flex flex-col gap-4">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl p-7"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>
                  {p.n}
                </span>
                <h3
                  className="mt-3 font-heading font-medium"
                  style={{ color: "#FCF6ED", fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 font-body leading-relaxed" style={{ color: "rgba(252,246,237,0.75)", fontSize: "1.0625rem" }}>
                  {p.body}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.42 }}
              className="pt-2"
            >
              <Button
                asChild
                className="h-12 rounded-[12px] bg-peach px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.25)" }}
              >
                <Link href={APP_URL}>Get started today</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="min-w-0 w-full"
          >
            {/* Swipe hint — hidden on large screens where table fits */}
            <p
              className="lg:hidden font-mono text-[11px] uppercase tracking-widest text-center mb-3"
              style={{ color: "rgba(252,246,237,0.3)" }}
            >
              ← Swipe to compare →
            </p>

            {/* Scroll wrapper */}
            <div className="w-full overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {/* Min-width content — forces scroll on narrow screens */}
              <div style={{ minWidth: "520px" }}>

                {/* Frosted glass layer */}
                <div style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>

                  {/* Column headers */}
                  <div className="grid grid-cols-[160px_1fr_1fr]">
                    <div className="px-5 py-5" />
                    <div
                      className="px-5 py-5 text-center"
                      style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(252,246,237,0.5)" }}>
                        Traditional
                      </p>
                      <p className="font-body text-sm mt-1" style={{ color: "rgba(252,246,237,0.45)" }}>
                        Insurance-based
                      </p>
                    </div>
                    <div
                      className="px-5 py-5 text-center"
                      style={{ borderLeft: "1px solid rgba(255,131,97,0.25)", backgroundColor: "rgba(255,131,97,0.2)" }}
                    >
                      <p className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "#FF8361" }}>
                        Dumbo Health
                      </p>
                      <p className="font-body text-sm mt-1" style={{ color: "rgba(255,131,97,0.75)" }}>
                        Cash pay
                      </p>
                    </div>
                  </div>

                  {/* Rows */}
                  {COMPARISON_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[160px_1fr_1fr]"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div className="px-5 py-4 flex items-center">
                        <p className="font-body text-sm font-medium" style={{ color: "rgba(252,246,237,0.75)" }}>
                          {row.label}
                        </p>
                      </div>
                      <div
                        className="px-4 py-4 flex items-center gap-2.5"
                        style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}
                      >
                        <X className="h-4 w-4 shrink-0" style={{ color: "rgba(252,246,237,0.22)" }} />
                        <p className="font-body text-sm leading-snug" style={{ color: "rgba(252,246,237,0.38)" }}>
                          {row.traditional}
                        </p>
                      </div>
                      <div
                        className="px-4 py-4 flex items-center gap-2.5"
                        style={{ borderLeft: "1px solid rgba(255,131,97,0.18)", backgroundColor: "rgba(255,131,97,0.11)" }}
                      >
                        <Check className="h-4 w-4 shrink-0" style={{ color: "#78BFBC" }} />
                        <p
                          className="font-body text-sm font-semibold leading-snug"
                          style={{ color: row.highlight ? "#FF8361" : "#FFFFFF" }}
                        >
                          {row.dumbo}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Footer note */}
                  <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="font-body text-xs" style={{ color: "rgba(252,246,237,0.22)" }}>
                      Note: plan features vary by tier. Insurance support will roll out state by state.
                    </p>
                  </div>

                </div>{/* end frosted glass */}
              </div>{/* end min-width */}
            </div>{/* end scroll wrapper */}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
