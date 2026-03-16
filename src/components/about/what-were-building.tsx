"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PILLARS = [
  {
    eyebrow: "Today",
    headline: "The complete round trip, built from scratch.",
    body: "Sleep apnea diagnosis with an at-home sleep test, CPAP therapy with no upfront cost, smart resupply that ships before you run out, an AI companion that learns your patterns, and a medical team you can actually reach. Everything a patient needs, in one place, without the maze.",
    accent: "#FF8361",
  },
  {
    eyebrow: "Who we serve",
    headline: "The people the system has historically overlooked.",
    body: "Women, who are chronically underdiagnosed because sleep apnea research was built around men. Younger adults, who are dismissed. Anyone who was told the price and walked away. Anyone who didn't fit the archetype of the patient this system was designed for. That's who we built this for.",
    accent: "#78BFBC",
  },
  {
    eyebrow: "Where we're going",
    headline: "Sleep is the foundation of health. We're building on it.",
    body: "Dumbo starts with sleep apnea because that's where the most people are suffering most unnecessarily. But the platform, the trust, and the data we're building point toward something bigger: becoming the company people turn to for everything sleep-related, as the science and the care model evolve together.",
    accent: "#FF8361",
  },
];

export function WhatWereBuilding() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            The bigger picture
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium text-midnight text-balance leading-tight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", maxWidth: "20ch" }}
          >
            What Dumbo Health is building.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          className="grid gap-6 md:grid-cols-3"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.eyebrow}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(3,31,61,0.07)",
                borderTop: `3px solid ${pillar.accent}`,
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-4"
                style={{ color: pillar.accent }}
              >
                {pillar.eyebrow}
              </p>
              <h3
                className="font-heading font-medium text-midnight leading-snug mb-4"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)" }}
              >
                {pillar.headline}
              </h3>
              <p
                className="font-body leading-relaxed mt-auto"
                style={{ fontSize: "1rem", color: "rgba(3,31,61,0.62)" }}
              >
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
