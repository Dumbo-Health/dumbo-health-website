"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MONITORS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    label: "Usage drop-off",
    detail: "Flags when nightly usage falls below your therapy target, before habit erosion sets in.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Mask leak events",
    detail: "Detects seal failures and correlates them with disrupted sleep. Triggers a fit review, not a guessing game.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Fragmented sleep",
    detail: "Identifies nights with high arousal index or residual events, and routes them to a clinician automatically.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
    label: "Early adherence risk",
    detail: "Spots the pattern before it becomes a problem. Three skipped nights in a row triggers a check-in, not silence.",
  },
];

export function AdherenceIntelligence() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Brand wave */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.06, zIndex: 0 }}
      />

      {/* Brand pattern sides */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: 0.06,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 28%, transparent 72%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 28%, transparent 72%, black 92%, black 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "640px", margin: "0 auto 4rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Dumbo Adherence Intelligence
          </p>
          <h2
            className="font-heading font-medium text-balance"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.08,
              color: "#FCF6ED",
            }}
          >
            Your data was always telling a story.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Now someone is listening.
            </span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
              lineHeight: 1.8,
              color: "rgba(252,246,237,0.62)",
            }}
          >
            Dumbo Health monitors your nightly therapy data continuously. When
            something needs attention, clinical support reaches out before
            you even notice the problem.
          </p>
        </motion.div>

        {/* Monitor grid */}
        <div
          className="grid gap-5 md:grid-cols-2"
          style={{ maxWidth: "820px", margin: "0 auto" }}
        >
          {MONITORS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex gap-5 rounded-2xl p-7"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "rgba(120,191,188,0.12)",
                  color: "#78BFBC",
                  marginTop: 2,
                }}
              >
                {item.icon}
              </div>
              <div>
                <p
                  className="font-heading font-medium"
                  style={{ fontSize: "1.0625rem", color: "#FCF6ED" }}
                >
                  {item.label}
                </p>
                <p
                  className="mt-2 font-body text-pretty"
                  style={{
                    fontSize: "clamp(0.9375rem, 1.0vw, 1.0625rem)",
                    lineHeight: 1.7,
                    color: "rgba(252,246,237,0.58)",
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-10"
          style={{
            fontSize: "clamp(0.9375rem, 1.0vw, 1.0625rem)",
            color: "rgba(252,246,237,0.38)",
            maxWidth: "52ch",
            margin: "2.5rem auto 0",
          }}
        >
          Works with ResMed, Philips, Fisher and Paykel, and most major CPAP
          brands. No hardware replacement needed.
        </motion.p>
      </div>
    </section>
  );
}
