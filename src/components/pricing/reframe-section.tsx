"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Getting set up correctly the first time.",
    body: "The right machine, the right mask, the right pressure. Most CPAP failures happen in the first two weeks, usually because of a setup problem that never got fixed.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Fixing small issues before they become reasons to quit.",
    body: "Leaky mask. Dry mouth. Pressure that feels wrong. These are solvable in minutes with the right support. Without it, they become reasons to leave the machine in the closet.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Someone paying attention during those first weeks.",
    body: "Most CPAP suppliers hand you a box and disappear. We monitor your therapy data, flag problems early, and check in so you're never navigating this alone.",
  },
];

export function ReframeSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Warm amber radial at top — signals warmth returning after Midnight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "60%",
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,214,173,0.48) 0%, transparent 70%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
          style={{ maxWidth: "640px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            The difference
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            CPAP works.{" "}
            <span style={{ color: "#FF8361" }}>When you&apos;re supported.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.1875rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            CPAP success isn&apos;t about willpower. It&apos;s about getting the
            right help at the right moment.
          </p>
        </motion.div>

        {/* Pillars */}
        <div
          className="flex flex-col gap-0"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex gap-5 py-7"
              style={{
                borderBottom:
                  i < PILLARS.length - 1
                    ? "1px solid rgba(3,31,61,0.08)"
                    : "none",
              }}
            >
              {/* Icon */}
              <div
                className="shrink-0 flex items-center justify-center rounded-xl mt-0.5"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "rgba(120,191,188,0.14)",
                  color: "#78BFBC",
                }}
              >
                {pillar.icon}
              </div>
              {/* Text */}
              <div>
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.1875rem", lineHeight: 1.3 }}
                >
                  {pillar.title}
                </p>
                <p
                  className="font-body mt-2 text-pretty"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "rgba(3,31,61,0.60)",
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-10"
          style={{
            fontSize: "1.0625rem",
            color: "rgba(3,31,61,0.48)",
            maxWidth: "52ch",
            margin: "2.5rem auto 0",
            fontStyle: "italic",
          }}
        >
          Dumbo is built around those first weeks, when most people need help
          the most.
        </motion.p>
      </div>
    </section>
  );
}
