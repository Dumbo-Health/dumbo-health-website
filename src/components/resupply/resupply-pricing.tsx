"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Billing = "quarterly" | "annual";

const PLANS = [
  {
    name: "Essentials",
    tagline: "Your basics, always fresh.",
    quarterly: { price: "$87", period: "/quarter", perDay: "Less than $1/day" },
    annual: { price: "$299", period: "/year", saving: "Save $49 vs. quarterly" },
    badge: null,
    includes: [
      "Fresh filters every quarter",
      "Tubing replaced yearly",
      "Full mask replaced yearly",
      "App access with sleep insights",
      "Prescription management",
      "Two shipments per year",
    ],
    cta: "Start Essentials",
    ctaStyle: {
      backgroundColor: "#031F3D",
      boxShadow: "0 4px 20px rgba(3,31,61,0.18)",
    },
  },
  {
    name: "Premium",
    tagline: "Everything in Essentials, plus clinical support.",
    quarterly: { price: "$117", period: "/quarter", perDay: "Less than $1.30/day" },
    annual: { price: "$399", period: "/year", saving: "Save $69 vs. quarterly" },
    badge: "Most popular",
    includes: [
      "Everything in Essentials",
      "Heated tubing, cleaning & comfort kits",
      "One telehealth consult per year",
      "Priority support & compliance reports",
      "Advanced AI sleep insights",
      "10% discount on equipment upgrades",
    ],
    cta: "Start Premium",
    ctaStyle: {
      backgroundColor: "#FF8361",
      boxShadow: "0 4px 20px rgba(255,131,97,0.35)",
    },
  },
  {
    name: "Elite",
    tagline: "Complete system coverage, premium everything.",
    quarterly: { price: "$177", period: "/quarter", perDay: "Less than $2/day" },
    annual: { price: "$569", period: "/year", saving: "Save $139 vs. quarterly" },
    badge: null,
    includes: [
      "Everything in Premium",
      "Two masks per year, plus premium heated tubing",
      "Unlimited telehealth, plus one-on-one coaching",
      "Humidifier water chamber yearly",
      "Dedicated support & warranty concierge",
      "15% discount on equipment upgrades",
    ],
    cta: "Start Elite",
    ctaStyle: {
      backgroundColor: "#78BFBC",
      boxShadow: "0 4px 20px rgba(120,191,188,0.35)",
    },
  },
];

export function ResupplyPricing() {
  const [billing, setBilling] = useState<Billing>("quarterly");

  return (
    <section
      id="plans"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Warm gradient top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "55%",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,214,173,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Choose your plan
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Transparent pricing,{" "}
            <span style={{ color: "#FF8361" }}>quarterly delivery.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            All plans billed quarterly to align with your supply cycles. That
            works out to as little as $29/month.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <button
            onClick={() => setBilling("quarterly")}
            className="font-mono text-xs uppercase tracking-widest transition-colors"
            style={{
              color: billing === "quarterly" ? "#031F3D" : "rgba(3,31,61,0.38)",
              fontWeight: billing === "quarterly" ? 600 : 400,
            }}
          >
            Quarterly
          </button>
          <button
            onClick={() => setBilling(billing === "quarterly" ? "annual" : "quarterly")}
            className="relative"
            style={{ width: 44, height: 24 }}
            aria-label="Toggle billing period"
          >
            <span
              className="block rounded-full w-full h-full transition-colors duration-300"
              style={{
                backgroundColor:
                  billing === "annual" ? "#78BFBC" : "rgba(3,31,61,0.15)",
              }}
            />
            <span
              className="absolute top-0.5 rounded-full transition-all duration-300"
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#FCF6ED",
                left: billing === "annual" ? 22 : 2,
                boxShadow: "0 1px 4px rgba(3,31,61,0.18)",
              }}
            />
          </button>
          <button
            onClick={() => setBilling("annual")}
            className="font-mono text-xs uppercase tracking-widest transition-colors"
            style={{
              color: billing === "annual" ? "#031F3D" : "rgba(3,31,61,0.38)",
              fontWeight: billing === "annual" ? 600 : 400,
            }}
          >
            Annual{" "}
            <span
              className="ml-1 rounded-full px-1.5 py-0.5"
              style={{
                backgroundColor: "rgba(120,191,188,0.2)",
                color: "#78BFBC",
                fontSize: "0.6rem",
              }}
            >
              Save up to 20%
            </span>
          </button>
        </motion.div>

        {/* Billing note callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex justify-center mb-10"
        >
          <div
            className="rounded-xl px-5 py-3 font-body text-center"
            style={{
              backgroundColor: "rgba(120,191,188,0.1)",
              border: "1px solid rgba(120,191,188,0.25)",
              fontSize: "0.875rem",
              color: "rgba(3,31,61,0.65)",
              maxWidth: "54ch",
            }}
          >
            Replacement timing adapts to your real usage, not a calendar guess.
          </div>
        </motion.div>

        {/* Plan cards */}
        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {PLANS.map((plan, i) => {
            const pricing = billing === "quarterly" ? plan.quarterly : plan.annual;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-3xl p-8 relative overflow-hidden flex flex-col"
                style={{
                  backgroundColor: "#FCF6ED",
                  border: plan.badge
                    ? "1.5px solid rgba(255,131,97,0.35)"
                    : "1px solid rgba(3,31,61,0.08)",
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-widest rounded-full px-2.5 py-1"
                    style={{
                      backgroundColor: "rgba(255,131,97,0.12)",
                      color: "#FF8361",
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <p
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.7rem", color: "#78BFBC" }}
                >
                  {plan.name}
                </p>

                <div className="mt-3 flex items-end gap-1.5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={pricing.price}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="font-heading font-medium text-midnight leading-none"
                      style={{ fontSize: "clamp(2.25rem, 3.5vw, 3rem)" }}
                    >
                      {pricing.price}
                    </motion.span>
                  </AnimatePresence>
                  <span
                    className="font-body mb-1.5"
                    style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.45)" }}
                  >
                    {pricing.period}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={billing}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono mt-1"
                    style={{ fontSize: "0.72rem", color: "#78BFBC" }}
                  >
                    {billing === "quarterly"
                      ? plan.quarterly.perDay
                      : plan.annual.saving}
                  </motion.p>
                </AnimatePresence>

                <p
                  className="font-body mt-4"
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "rgba(3,31,61,0.55)",
                    fontStyle: "italic",
                  }}
                >
                  {plan.tagline}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="font-mono text-xs shrink-0 mt-0.5"
                        style={{ color: "#78BFBC" }}
                      >
                        ✓
                      </span>
                      <span
                        className="font-body"
                        style={{ fontSize: "0.9rem", color: "rgba(3,31,61,0.70)", lineHeight: 1.5 }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-7 w-full h-12 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={plan.ctaStyle}
                >
                  <Link href="/get-started">{plan.cta}</Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer notes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10"
        >
          {["Cancel anytime", "FSA / HSA eligible", "Free shipping on every plan"].map(
            (note) => (
              <span
                key={note}
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(3,31,61,0.38)" }}
              >
                ✓ {note}
              </span>
            )
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-6"
          style={{
            fontSize: "0.9375rem",
            color: "rgba(3,31,61,0.38)",
            maxWidth: "52ch",
            margin: "1.25rem auto 0",
          }}
        >
          Not sure which plan? Start with Essentials. You can upgrade anytime
          and your profile carries over.
        </motion.p>
      </div>
    </section>
  );
}
