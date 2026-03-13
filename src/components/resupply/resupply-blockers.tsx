"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BLOCKERS = [
  "I just need new supplies, not another appointment.",
  "My DME stopped responding after I got my machine.",
  "I don't even know when I'm supposed to replace what.",
  "I end up on Amazon guessing if things will fit.",
];

export function ResupplyBlockers() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline — brand sleep-cycle wave */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.07, zIndex: 0 }}
      />
      {/* Brand pattern — sides only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: 0.07,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
          style={{ maxWidth: "680px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Sound familiar?
          </p>
          <h2
            className="font-heading font-medium text-balance"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "#FCF6ED",
            }}
          >
            Getting the machine was the easy part.{" "}
            <span style={{ color: "rgba(252,246,237,0.45)" }}>
              Keeping it running is where people get stuck.
            </span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.1875rem",
              lineHeight: 1.8,
              color: "rgba(252,246,237,0.60)",
            }}
          >
            Most CPAP users don&apos;t know they need new supplies until
            something breaks. By then, their therapy has already suffered.
          </p>
        </motion.div>

        {/* Blocker cards */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "960px", margin: "0 auto" }}
        >
          {BLOCKERS.map((blocker, i) => (
            <motion.div
              key={blocker}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Decorative quotation mark */}
              <span
                className="pointer-events-none select-none absolute font-heading"
                style={{
                  fontSize: "8rem",
                  lineHeight: 1,
                  color: "rgba(120,191,188,0.14)",
                  top: "-0.5rem",
                  left: "0.75rem",
                  zIndex: 0,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p
                className="relative font-body text-pretty"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "rgba(252,246,237,0.78)",
                  zIndex: 1,
                }}
              >
                {blocker}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-10"
          style={{
            fontSize: "1.0625rem",
            color: "rgba(252,246,237,0.42)",
            maxWidth: "52ch",
            margin: "2.5rem auto 0",
          }}
        >
          These aren&apos;t complaints. They&apos;re signs that the resupply
          system was never built for patients.
        </motion.p>
      </div>
    </section>
  );
}
