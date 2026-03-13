"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    title: "Tell us your setup.",
    body: "Share your machine model and mask type. We identify your compatible supplies so nothing gets shipped that won't work.",
  },
  {
    number: "02",
    title: "Pick your plan.",
    body: "Choose from Essentials, Premium, or Elite. All three include automatic quarterly delivery. The difference is how much coverage and clinical support you want.",
  },
  {
    number: "03",
    title: "Get your box every 90 days.",
    body: "We ship everything you need before you run out. Filters, tubing, cushions, mask parts. All timed to your actual usage, not a generic schedule.",
  },
];

export function HowRefreshWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Gradient: Sunlight top → Daylight mid → Light Peach bottom (hands off to Supply Visuals) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245,230,209,0.9) 0%, transparent 38%, transparent 62%, rgba(255,214,173,0.45) 100%)",
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
            <span style={{ color: "#FF8361" }}>Then nothing to manage.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.1875rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            Set it up once. We handle the rest, every quarter, automatically.
          </p>
        </motion.div>

        {/* Steps */}
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
              {/* Number */}
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
              {/* Text */}
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
                    fontSize: "1rem",
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
