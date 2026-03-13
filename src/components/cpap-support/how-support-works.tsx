"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    title: "Connect your CPAP.",
    body: "We sync with your machine's data portal, ResMed MyAir, Philips DreamMapper, or others. Setup takes under five minutes and requires no new hardware.",
  },
  {
    number: "02",
    title: "We monitor your therapy, every night.",
    body: "Dumbo Health reads your usage hours, mask leak rate, and sleep event data. Our system identifies what's working and what isn't, automatically.",
  },
  {
    number: "03",
    title: "We intervene before small problems become reasons to quit.",
    body: "When your data signals a problem, a Dumbo Health clinician reaches out with a specific recommendation. Not a generic reminder. A real response to what your machine reported.",
  },
];

export function HowSupportWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Top gradient: light bridge from Midnight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "35%",
          background:
            "linear-gradient(to bottom, rgba(245,230,209,0.8) 0%, transparent 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "600px", margin: "0 auto 4rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            How it works
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            Three steps.{" "}
            <span style={{ color: "#FF8361" }}>Then we handle the rest.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            Connect once. We monitor continuously. You sleep better.
          </p>
        </motion.div>

        <div
          className="flex flex-col gap-0"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex gap-6 py-8"
              style={{
                borderBottom:
                  i < STEPS.length - 1
                    ? "1px solid rgba(3,31,61,0.08)"
                    : "none",
              }}
            >
              <div
                className="shrink-0 font-heading font-medium leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: "rgba(120,191,188,0.35)",
                  minWidth: "3.5rem",
                }}
              >
                {step.number}
              </div>
              <div className="pt-1">
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.1875rem", lineHeight: 1.3 }}
                >
                  {step.title}
                </p>
                <p
                  className="font-body mt-2 text-pretty"
                  style={{
                    fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                    lineHeight: 1.75,
                    color: "rgba(3,31,61,0.60)",
                  }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
