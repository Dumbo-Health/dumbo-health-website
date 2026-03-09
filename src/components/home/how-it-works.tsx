"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SHOPIFY } from "@/lib/constants";

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Order your test",
    copy: "Ships to your door for $149. No insurance, no referral, no clinic visit needed.",
    iconColor: "#78BFBC",
    iconBg: "rgba(120,191,188,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Sleep with it once",
    copy: "Wear the small device one night. It records everything automatically, then dispose of it.",
    iconColor: "#FF8361",
    iconBg: "rgba(255,131,97,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Data goes to our doctors",
    copy: "Your sleep data auto-uploads directly to our certified sleep doctors for review.",
    iconColor: "#78BFBC",
    iconBg: "rgba(120,191,188,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Results in under 48 hours",
    copy: "A Dumbo Health doctor walks you through your diagnosis in a virtual visit.",
    iconColor: "#FF8361",
    iconBg: "rgba(255,131,97,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Get Treated. Today.",
    copy: "Treatment is prescribed and shipped directly to you. No referrals, no waiting rooms, no hassle.",
    iconColor: "#78BFBC",
    iconBg: "rgba(120,191,188,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const oldWay  = ["3–5 months to diagnosis", "Multiple providers", "~$3,000 on average"];
const dumboWay = ["Under 48 hours", "One place. One team.", "From $149"];

// ─── Component ────────────────────────────────────────────────────────────────
export function HowItWorks() {
  const sectionRef  = useRef(null);
  const stepsRef    = useRef(null);
  const inView      = useInView(sectionRef, { once: true, amount: 0.2 });
  const stepsInView = useInView(stepsRef,   { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-midnight py-20 md:py-32">
      <div style={{ padding: "0 5%" }}>

        {/* ── Header ── */}
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-teal">
            How It Works
          </p>
          <h2
            className="font-heading font-medium leading-tight text-daylight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
          >
            From test to treatment.
          </h2>
          <p
            className="font-heading font-medium leading-tight text-daylight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", marginTop: "0.1em" }}
          >
            Not in months.{" "}
            <span style={{ color: "#FF8361" }}>In 48 hours.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed" style={{ color: "rgba(252,246,237,0.5)" }}>
            Most people wait months for a sleep apnea diagnosis, see multiple providers,
            and spend thousands. We changed all of that.
          </p>
        </motion.div>

        {/* ── Comparison ── */}
        <motion.div
          className="mb-16 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_40px_1fr] sm:gap-0 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Old way */}
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(252,246,237,0.3)" }}>
              The traditional path
            </p>
            <div className="space-y-4">
              {oldWay.map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <span className="font-body text-base" style={{ color: "rgba(252,246,237,0.4)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VS */}
          <div className="hidden items-center justify-center sm:flex">
            <span className="font-heading text-sm font-medium text-daylight/20">vs</span>
          </div>

          {/* Dumbo way */}
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: "rgba(255,131,97,0.3)",
              background: "rgba(255,131,97,0.08)",
              boxShadow: "0 0 48px rgba(255,131,97,0.07)",
            }}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>
              With Dumbo Health
            </p>
            <div className="space-y-4">
              {dumboWay.map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,131,97,0.2)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF8361" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-body text-base font-medium text-daylight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Steps (single ref wrapper) ── */}
        <div ref={stepsRef}>

          {/* Desktop horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-[4.5%] right-[4.5%] top-[22px] h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {/* Fill line */}
              <motion.div
                className="h-full origin-left"
                style={{ backgroundColor: "rgba(120,191,188,0.5)" }}
                initial={{ scaleX: 0 }}
                animate={stepsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Traveling pulse */}
              {stepsInView && (
                <motion.div
                  className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full"
                  style={{
                    backgroundColor: "#78BFBC",
                    boxShadow: "0 0 8px 3px rgba(120,191,188,0.7), 0 0 20px 8px rgba(120,191,188,0.35)",
                    left: 0,
                  }}
                  animate={{
                    left: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    times: [0, 0.07, 0.93, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    delay: 1.8,
                  }}
                />
              )}
            </div>

            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2"
                    style={{ backgroundColor: step.iconBg, borderColor: step.iconColor + "70", color: step.iconColor }}
                  >
                    {step.icon}
                  </div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(252,246,237,0.3)" }}>
                    {step.number}
                  </p>
                  <p className="mb-3 font-heading text-[17px] font-medium leading-snug text-daylight">
                    {step.title}
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(252,246,237,0.5)" }}>
                    {step.copy}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="relative md:hidden">
            <div className="absolute bottom-4 left-[23px] top-4 w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              {/* Fill line */}
              <motion.div
                className="w-full origin-top"
                style={{ backgroundColor: "rgba(120,191,188,0.5)" }}
                initial={{ scaleY: 0 }}
                animate={stepsInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Traveling pulse */}
              {stepsInView && (
                <motion.div
                  className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full"
                  style={{
                    backgroundColor: "#78BFBC",
                    boxShadow: "0 0 8px 3px rgba(120,191,188,0.7), 0 0 20px 8px rgba(120,191,188,0.35)",
                    top: 0,
                  }}
                  animate={{
                    top: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    times: [0, 0.07, 0.93, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    delay: 1.8,
                  }}
                />
              )}
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
                    style={{ backgroundColor: step.iconBg, borderColor: step.iconColor + "70", color: step.iconColor }}
                  >
                    {step.icon}
                  </div>
                  <div className="pt-1.5">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(252,246,237,0.3)" }}>
                      {step.number}
                    </p>
                    <p className="mb-1.5 font-heading text-base font-medium text-daylight">
                      {step.title}
                    </p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(252,246,237,0.5)" }}>
                      {step.copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-14 text-center md:mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={SHOPIFY.buyUrl}
            className="inline-flex h-12 items-center rounded-[12px] bg-peach px-8 font-body text-sm font-medium uppercase tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl hover:shadow-peach/25 active:translate-y-0"
          >
            Start your sleep test for $149
          </a>
          <p className="mt-3 font-body text-xs text-daylight/30">
            Ships to your door. One night. Results in 48 hours.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
