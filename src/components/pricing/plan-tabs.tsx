"use client";

import { motion } from "framer-motion";
import { PlanCard } from "./plan-card";
import { cpapPlans } from "@/content/plans";

export function PlanTabs() {
  return (
    <section
      id="plans"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Drifting dot grid */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(3,31,61,0.13) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, black 100%)",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, black 100%)",
        }}
      />

      {/* Peach spotlight — breathes behind the premium card */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: "30%",
          width: "680px",
          height: "480px",
          background:
            "radial-gradient(ellipse, rgba(255,131,97,0.16) 0%, rgba(255,131,97,0.06) 45%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "#78BFBC" }}>
            The plans
          </p>
          <h2
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Choose what fits your life.
          </h2>
          <p
            className="mx-auto mt-4 font-body leading-relaxed"
            style={{
              fontSize: "1.125rem",
              color: "rgba(3,31,61,0.6)",
              maxWidth: "52ch",
            }}
          >
            All plans include your CPAP machine, free shipping, and Smart
            Support. No upfront costs, no hidden fees, cancel anytime.
          </p>
        </div>

        {/* CPAP plans grid */}
        <div className="grid gap-5 md:gap-6 md:grid-cols-3 items-start max-w-5xl mx-auto">
          {cpapPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

      </div>
    </section>
  );
}
