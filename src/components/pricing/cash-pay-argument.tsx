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
    body: "Insurance can deny coverage or demand months of sleep studies before approving treatment. With cash pay, you start therapy in days.",
  },
  {
    n: "02",
    title: "One number. No surprises.",
    body: "You know exactly what you pay every month. No deductibles, no copays, no bills that arrive weeks later. One price covers everything.",
  },
  {
    n: "03",
    title: "Results, not compliance.",
    body: "Insurance tracks usage minimums. Dumbo tracks results. You're not a compliance metric here. You're a patient, and we're focused on your sleep.",
  },
];

const COMPARISON_ROWS = [
  {
    label: "Diagnostic process",
    traditional: "Lab-based, long waits",
    dumbo: "Fast, easy at-home testing",
  },
  {
    label: "Convenience",
    traditional: "In-person appointments",
    dumbo: "100% online and accessible",
  },
  {
    label: "Price transparency",
    traditional: "Hidden fees, unclear pricing",
    dumbo: "Clear, all-inclusive pricing",
  },
  {
    label: "Device acquisition",
    traditional: "High upfront cost",
    dumbo: "No upfront cost on plans",
  },
  {
    label: "Accessories",
    traditional: "Additional, frequent fees",
    dumbo: "Always included",
  },
  {
    label: "Device maintenance",
    traditional: "Additional fees",
    dumbo: "Included in subscription",
  },
  {
    label: "Telehealth access",
    traditional: "Limited or extra costs",
    dumbo: "Unlimited and always included",
  },
  {
    label: "Insurance complexity",
    traditional: "Frequent paperwork and denials",
    dumbo: "Zero paperwork needed",
  },
  {
    label: "Care continuity",
    traditional: "Multiple providers",
    dumbo: "One dedicated, accessible team",
  },
  {
    label: "Time to treatment",
    traditional: "Weeks to months",
    dumbo: "Start now",
    highlight: true,
  },
];

export function CashPayArgument() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline — teal wave across the section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
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
            style={{
              color: "#FCF6ED",
              fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
              maxWidth: "22ch",
            }}
          >
            Waiting on insurance could cost you more than you think.
          </motion.h2>
        </div>

        {/* Three points + comparison table */}
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-16 items-start">

          {/* Left: frosted glass numbered points + CTA */}
          <div className="flex flex-col gap-4">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl p-7 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "#FF8361" }}
                >
                  {p.n}
                </span>
                <h3
                  className="mt-3 font-heading font-medium"
                  style={{ color: "#FCF6ED", fontSize: "clamp(1.25rem, 1.8vw, 1.4rem)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-2 font-body leading-relaxed"
                  style={{ color: "rgba(252,246,237,0.6)", fontSize: "1rem" }}
                >
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

          {/* Right: comparison table — frosted glass container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="overflow-hidden rounded-2xl backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_1fr]">
              <div className="px-6 py-6" />

              {/* Traditional column header */}
              <div
                className="px-6 py-6 text-center"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "rgba(252,246,237,0.5)" }}
                >
                  Traditional
                </p>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "rgba(252,246,237,0.3)" }}
                >
                  Insurance-based
                </p>
              </div>

              {/* Dumbo column header */}
              <div
                className="px-6 py-6 text-center"
                style={{
                  borderLeft: "1px solid rgba(255,131,97,0.25)",
                  backgroundColor: "rgba(255,131,97,0.2)",
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
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_1fr_1fr]"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Row label */}
                <div className="px-6 py-5 flex items-center">
                  <p
                    className="font-body text-base font-medium"
                    style={{ color: "rgba(252,246,237,0.55)" }}
                  >
                    {row.label}
                  </p>
                </div>

                {/* Traditional value */}
                <div
                  className="px-5 py-5 flex items-center gap-3"
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.07)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <X
                    className="h-4 w-4 shrink-0"
                    style={{ color: "rgba(252,246,237,0.22)" }}
                  />
                  <p
                    className="font-body text-base leading-snug"
                    style={{ color: "rgba(252,246,237,0.38)" }}
                  >
                    {row.traditional}
                  </p>
                </div>

                {/* Dumbo value */}
                <div
                  className="px-5 py-5 flex items-center gap-3"
                  style={{
                    borderLeft: "1px solid rgba(255,131,97,0.18)",
                    backgroundColor: "rgba(255,131,97,0.11)",
                  }}
                >
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#78BFBC" }}
                  />
                  <p
                    className="font-body text-base font-semibold leading-snug"
                    style={{
                      color: row.highlight ? "#FF8361" : "#FFFFFF",
                    }}
                  >
                    {row.dumbo}
                  </p>
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div
              className="px-5 py-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-body text-xs"
                style={{ color: "rgba(252,246,237,0.22)" }}
              >
                Note: plan features vary by tier. Insurance support will roll out state by state.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
