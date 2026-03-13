"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PLANS = [
  {
    name: "Essentials",
    tagline: "Monitoring and alerts, handled.",
    price: "$19",
    period: "/month",
    perMonth: "Less than $1/day",
    badge: null,
    includes: [
      "Nightly data sync and monitoring",
      "Usage and leak rate tracking",
      "Automated alerts for therapy issues",
      "App access with sleep insights",
      "Prescription renewal support",
    ],
    cta: "Start Essentials",
    ctaStyle: {
      backgroundColor: "#031F3D",
      boxShadow: "0 4px 20px rgba(3,31,61,0.18)",
    },
  },
  {
    name: "Premium",
    tagline: "Monitoring, plus a clinician in your corner.",
    price: "$39",
    period: "/month",
    perMonth: "Most popular plan",
    badge: "Most popular",
    includes: [
      "Everything in Essentials",
      "Proactive clinical check-ins",
      "Two telehealth consults per year",
      "Priority support and compliance reports",
      "Advanced adherence intelligence insights",
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
    tagline: "Unlimited support, complete system coverage.",
    price: "$69",
    period: "/month",
    perMonth: "Less than $2.30/day",
    badge: null,
    includes: [
      "Everything in Premium",
      "Unlimited telehealth, plus one-on-one coaching",
      "Equipment troubleshooting concierge",
      "Dedicated support line",
      "Warranty coordination and upgrade guidance",
      "15% discount on equipment upgrades",
    ],
    cta: "Start Elite",
    ctaStyle: {
      backgroundColor: "#78BFBC",
      boxShadow: "0 4px 20px rgba(120,191,188,0.35)",
    },
  },
];

export function SupportPricing() {
  return (
    <section
      id="plans"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Warm top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "50%",
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
            Support that fits your therapy.{" "}
            <span style={{ color: "#FF8361" }}>Month to month.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            All plans include nightly monitoring and automatic alerts. Upgrade or
            cancel anytime.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {PLANS.map((plan, i) => (
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
                <span
                  className="font-heading font-medium text-midnight leading-none"
                  style={{ fontSize: "clamp(2.25rem, 3.5vw, 3rem)" }}
                >
                  {plan.price}
                </span>
                <span
                  className="font-body mb-1.5"
                  style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.45)" }}
                >
                  {plan.period}
                </span>
              </div>

              <p
                className="font-mono mt-1"
                style={{ fontSize: "0.72rem", color: "#78BFBC" }}
              >
                {plan.perMonth}
              </p>

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
          ))}
        </div>

        {/* Footer notes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10"
        >
          {["Cancel anytime", "FSA / HSA eligible", "HIPAA-compliant"].map(
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
