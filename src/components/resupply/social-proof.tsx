"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const QUOTES = [
  "I used to forget filters for months. Now a box just shows up and everything fits.",
  "My equipment supplier ghosted me after I got my machine. Dumbo just handles it.",
  "I was buying random stuff online and half of it didn't fit. Never again.",
];

export function SocialProof() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Brand sleep-cycle wave */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.07, zIndex: 0 }}
      />
      {/* Brand pattern — sides */}
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
          className="text-center"
          style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Real users, real results
          </p>
          <h2
            className="font-heading font-medium text-balance"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "#FCF6ED",
            }}
          >
            The system that just{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>works.</span>
          </h2>
        </motion.div>

        {/* Quote cards — full attributions will be added when real member quotes are collected */}
        <div
          className="grid gap-5 md:grid-cols-3"
          style={{ maxWidth: "960px", margin: "0 auto" }}
        >
          {QUOTES.map((quote, i) => (
            <motion.div
              key={i}
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
                  color: "rgba(252,246,237,0.82)",
                  zIndex: 1,
                }}
              >
                {quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
