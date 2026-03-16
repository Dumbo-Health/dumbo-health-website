"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const VALUES = [
  {
    n: "01",
    label: "Empathy",
    statement:
      "We've been the patient. We know what it feels like to get a diagnosis with no clear next step. That's why we never leave anyone alone in their care.",
  },
  {
    n: "02",
    label: "Innovation",
    statement:
      "We built technology that learns from your data so your care gets smarter the longer you're with us.",
  },
  {
    n: "03",
    label: "Accessibility",
    statement:
      "Starting at $59 a month, with no upfront machine cost, because sleep health shouldn't be a luxury.",
  },
  {
    n: "04",
    label: "Transparency",
    statement:
      "One price. Everything included. No fine print, no surprise bills.",
  },
  {
    n: "05",
    label: "Playfulness",
    statement:
      "Healthcare doesn't have to feel like a waiting room. We built something you actually want to engage with.",
  },
];

export function ValuesSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Dot grid — edges only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(252,246,237,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, black 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-[5%]">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            Our values
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium text-white text-balance leading-tight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Shown through behavior,
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              not labels.
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.n}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="grid grid-cols-[3rem_1fr] gap-6 py-8 items-start"
              style={{
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : undefined,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Number */}
              <span
                className="font-mono text-xs uppercase tracking-widest pt-1"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {value.n}
              </span>

              {/* Content */}
              <div>
                <p
                  className="font-mono text-[11px] uppercase tracking-widest mb-3"
                  style={{ color: "#FF8361" }}
                >
                  {value.label}
                </p>
                <p
                  className="font-heading font-medium text-white leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                >
                  {value.statement}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
