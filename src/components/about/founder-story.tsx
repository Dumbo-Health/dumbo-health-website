"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, ease: EASE, delay },
  };
}

export function FounderStory() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.08, zIndex: 0 }}
      />

      {/* Background orbs */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 560, height: 560,
          borderRadius: "50%", top: "-10%", right: "-12%",
          background: "radial-gradient(circle, rgba(255,131,97,0.18) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ opacity: [0.14, 0.26, 0.14], scale: [1, 1.12, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", width: 480, height: 480,
          borderRadius: "50%", bottom: "-8%", left: "-10%",
          background: "radial-gradient(circle, rgba(120,191,188,0.18) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-[5%]" style={{ zIndex: 1 }}>

        {/* Label */}
        <motion.p {...fadeUp(0)} className="font-mono text-xs uppercase tracking-widest mb-6 text-center" style={{ color: "#78BFBC" }}>
          Our story
        </motion.p>

        {/* Headline */}
        <motion.h2 {...fadeUp(0.08)} className="font-heading font-medium text-white leading-tight text-balance text-center mb-14" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
          Better sleep should be easy.{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>We&apos;re building it that way.</span>
        </motion.h2>

        {/* Founder cards — side by side */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">

          {/* Mo card */}
          <motion.div
            {...fadeUp(0.16)}
            className="rounded-2xl p-7 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderTop: "2px solid rgba(255,131,97,0.5)",
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,131,97,0.7)" }}>
              Mo — Co-founder
            </p>
            <p className="font-body leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.75)" }}>
              Mo was diagnosed with sleep apnea in his early thirties. What
              followed was months of navigating a system that felt designed
              for someone else entirely. Long waits, confusing insurance
              paperwork, a CPAP machine handed over with a manual and a
              goodbye. No follow-up. No coaching. No sense that anyone was
              in his corner.
            </p>
          </motion.div>

          {/* Nico card */}
          <motion.div
            {...fadeUp(0.24)}
            className="rounded-2xl p-7 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderTop: "2px solid rgba(120,191,188,0.5)",
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(120,191,188,0.7)" }}>
              Nico — Co-founder
            </p>
            <p className="font-body leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.75)" }}>
              Nico came at it from a different angle. A background in health
              technology, and a conviction that the gap between what sleep
              medicine knew and what patients actually experienced was
              fixable with better design, smarter data, and a care model
              that put the patient first.
            </p>
          </motion.div>
        </div>

        {/* Together card — full width */}
        <motion.div
          {...fadeUp(0.32)}
          className="rounded-2xl p-7 backdrop-blur-sm mb-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="font-body leading-relaxed text-center" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.7)", maxWidth: 640, margin: "0 auto" }}>
            They met and saw immediately they were solving the same problem
            from opposite ends. One had lived it. One had the tools to fix
            it. The result is Dumbo Health, built from scratch to be the thing
            neither of them could find.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          {...fadeUp(0.40)}
          className="rounded-2xl p-8 backdrop-blur-sm text-center mx-auto"
          style={{
            maxWidth: 480,
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <p className="font-heading font-medium text-white leading-snug mb-4" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}>
            &ldquo;It&apos;s not just a business.<br />It&apos;s personal.&rdquo;
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
            Mo, Co-founder
          </p>
        </motion.div>

      </div>
    </section>
  );
}
