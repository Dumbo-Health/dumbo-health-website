"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

        {/* CPAP / Mouthguard toggle */}
        <Tabs defaultValue="cpap" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-14 rounded-full bg-sunlight p-1 h-11">
            <TabsTrigger
              value="cpap"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              CPAP
            </TabsTrigger>
            <TabsTrigger
              value="mouthguard"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              Mouthguard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cpap">
            <div className="grid gap-5 md:gap-6 md:grid-cols-3 items-start max-w-5xl mx-auto">
              {cpapPlans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mouthguard">
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid rgba(120,191,188,0.35)",
                  borderTop: "4px solid #78BFBC",
                  boxShadow: "0 8px 40px rgba(3,31,61,0.08)",
                }}
              >
                {/* Header */}
                <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(120,191,188,0.15)" }}>
                  {/* Eyebrow + partner badge */}
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <p
                      className="font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: "#78BFBC" }}
                    >
                      In partnership with
                    </p>
                    <span
                      className="font-heading font-medium px-3 py-1 rounded-lg text-sm"
                      style={{
                        backgroundColor: "rgba(120,191,188,0.1)",
                        border: "1px solid rgba(120,191,188,0.25)",
                        color: "#78BFBC",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Daybreak
                    </span>
                  </div>

                  <h3
                    className="font-heading font-medium text-midnight leading-snug"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    A CPAP alternative, for mild sleep apnea.
                  </h3>
                  <p
                    className="mt-3 font-body leading-relaxed"
                    style={{ fontSize: "1rem", color: "rgba(3,31,61,0.6)" }}
                  >
                    A custom oral device worn like a retainer while you sleep. No machine, no mask, no hose. Recommended for mild to moderate sleep apnea, especially if CPAP doesn&apos;t feel right for you.
                  </p>
                </div>

                {/* Pricing */}
                <div
                  className="px-8 py-6 grid sm:grid-cols-2 gap-4"
                  style={{ borderBottom: "1px solid rgba(120,191,188,0.15)" }}
                >
                  {/* Finance option */}
                  <div
                    className="rounded-xl px-5 py-5"
                    style={{
                      backgroundColor: "rgba(120,191,188,0.08)",
                      border: "1px solid rgba(120,191,188,0.2)",
                    }}
                  >
                    <p
                      className="font-mono text-[11px] uppercase tracking-widest mb-2"
                      style={{ color: "#78BFBC" }}
                    >
                      Finance
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-heading font-medium text-midnight leading-none"
                        style={{ fontSize: "clamp(2rem, 3vw, 2.4rem)" }}
                      >
                        $76
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "rgba(3,31,61,0.45)" }}
                      >
                        /mo
                      </span>
                    </div>
                    <p
                      className="mt-1 font-body text-xs"
                      style={{ color: "rgba(3,31,61,0.4)" }}
                    >
                      Flexible monthly payments
                    </p>
                  </div>

                  {/* Pay in full */}
                  <div
                    className="rounded-xl px-5 py-5"
                    style={{
                      backgroundColor: "rgba(252,246,237,0.8)",
                      border: "1px solid rgba(245,230,209,1)",
                    }}
                  >
                    <p
                      className="font-mono text-[11px] uppercase tracking-widest mb-2"
                      style={{ color: "rgba(3,31,61,0.4)" }}
                    >
                      Pay in full
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-heading font-medium text-midnight leading-none"
                        style={{ fontSize: "clamp(2rem, 3vw, 2.4rem)" }}
                      >
                        $2,495
                      </span>
                    </div>
                    <p
                      className="mt-1 font-body text-xs"
                      style={{ color: "rgba(3,31,61,0.4)" }}
                    >
                      One-time payment
                    </p>
                  </div>
                </div>

                {/* What's included */}
                <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(120,191,188,0.15)" }}>
                  <p
                    className="font-mono text-[11px] uppercase tracking-widest mb-4"
                    style={{ color: "rgba(3,31,61,0.35)" }}
                  >
                    What&apos;s included
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Free sleep consultation",
                      "Custom-fit impression kit",
                      "Dentist-overseen device creation",
                      "Delivered to your door",
                      "3-year guarantee",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "#78BFBC" }}
                        />
                        <span
                          className="font-body text-sm"
                          style={{ color: "rgba(3,31,61,0.7)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility note + CTA */}
                <div className="px-8 py-6">
                  <p
                    className="font-body text-xs leading-relaxed mb-5"
                    style={{ color: "rgba(3,31,61,0.4)" }}
                  >
                    Eligibility for oral appliance therapy is determined during your medical intake. Not everyone qualifies. If that&apos;s the case, we&apos;ll guide you to the right alternative.
                  </p>
                  <a
                    href="https://app.dumbo.health"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    style={{
                      backgroundColor: "#FF8361",
                      boxShadow: "0 4px 16px rgba(255,131,97,0.3)",
                      height: "48px",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
