"use client";

import { motion } from "framer-motion";

export function SolutionsHero() {
  return (
    <section
      className="relative overflow-hidden bg-midnight py-28 md:py-40 lg:py-52"
      style={{ isolation: "isolate" }}
    >
      {/* Brand pattern — side strips only.
          filter: invert(1) turns the cream background near-black (screens to nothing)
          and the slightly-darker icons become slightly lighter (screens to subtle glow).
          Result: pure midnight center, icon texture only on the edges. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "invert(1) brightness(1.3)",
          mixBlendMode: "screen",
          opacity: 0.55,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-widest text-teal"
        >
          Complete sleep apnea care
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-5 font-heading font-medium leading-[1.08] text-white text-balance"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
        >
          Everything sleep apnea care should be.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FF8361 0%, #FFD6AD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            In one place.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-7 max-w-2xl font-body text-balance"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          Diagnosis, treatment, daily support, and resupply. All under one roof, built around you.
        </motion.p>
      </div>
    </section>
  );
}
