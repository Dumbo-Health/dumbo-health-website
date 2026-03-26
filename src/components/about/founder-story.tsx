"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LIFELINE = "M0 40 L200 40 L240 40 L260 10 L280 70 L300 5 L320 75 L340 20 L360 60 L380 40 L420 40 L460 40 L480 15 L500 65 L520 8 L540 72 L560 25 L580 55 L600 40 L800 40 L820 40 L840 18 L860 62 L880 5 L900 75 L920 22 L940 58 L960 40 L1000 40 L1200 40";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, ease: EASE, delay },
  };
}

function AnimatedLifeline() {
  return (
    <svg
      viewBox="0 0 1200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 w-full pointer-events-none select-none"
      style={{ top: "50%", transform: "translateY(-50%)", zIndex: 0 }}
      aria-hidden="true"
    >
      <motion.path
        d={LIFELINE}
        stroke="rgba(255,131,97,0.30)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.path
        d={LIFELINE}
        stroke="rgba(120,191,188,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );
}

export function FounderStory() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Animated lifeline */}
      <AnimatedLifeline />

      {/* Background orbs — vivid */}
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: "-20%", right: "-15%",
          background: "radial-gradient(circle, rgba(255,131,97,0.28) 0%, transparent 65%)",
          filter: "blur(55px)", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ opacity: [0.28, 0.45, 0.28], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: "absolute", width: 520, height: 520,
          borderRadius: "50%", bottom: "-15%", left: "-12%",
          background: "radial-gradient(circle, rgba(120,191,188,0.28) 0%, transparent 65%)",
          filter: "blur(55px)", zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-[5%]" style={{ zIndex: 1 }}>

        {/* Label */}
        <motion.p {...fadeUp(0)} className="font-mono text-xs uppercase tracking-widest mb-5 text-center" style={{ color: "#78BFBC" }}>
          Our story
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.08)}
          className="font-heading font-medium text-white leading-tight text-balance text-center mb-16"
          style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
        >
          Better sleep should be easy.{" "}
          <span style={{ color: "rgba(255,255,255,0.38)" }}>We&apos;re building it that way.</span>
        </motion.h2>

        {/* Founder cards */}
        <div className="grid gap-5 md:grid-cols-2 mb-5">

          {/* Mo */}
          <motion.div
            {...fadeUp(0.16)}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
            className="rounded-2xl p-7 backdrop-blur-md relative overflow-hidden"
            style={{
              backgroundColor: "rgba(255,131,97,0.10)",
              border: "1px solid rgba(255,131,97,0.25)",
              boxShadow: "0 0 40px rgba(255,131,97,0.08) inset",
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: "absolute", top: -40, right: -40, width: 140, height: 140,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,131,97,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Icon */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 inline-flex items-center justify-center rounded-xl"
              style={{ width: 52, height: 52, background: "rgba(255,131,97,0.15)", border: "1px solid rgba(255,131,97,0.2)" }}
            >
              <Image src="/icons/brand/moon.png" alt="" width={26} height={26} style={{ objectFit: "contain" }} />
            </motion.div>

            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,131,97,0.8)" }}>
              Mo — Co-founder
            </p>
            <p className="font-body leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.78)" }}>
              Mo was diagnosed with sleep apnea in his early thirties. What
              followed was months of navigating a system that felt designed
              for someone else entirely. Long waits, confusing paperwork, a
              CPAP machine handed over with a manual and a goodbye. No
              follow-up. No coaching. No sense that anyone was in his corner.
            </p>
          </motion.div>

          {/* Nico */}
          <motion.div
            {...fadeUp(0.24)}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
            className="rounded-2xl p-7 backdrop-blur-md relative overflow-hidden"
            style={{
              backgroundColor: "rgba(120,191,188,0.10)",
              border: "1px solid rgba(120,191,188,0.25)",
              boxShadow: "0 0 40px rgba(120,191,188,0.08) inset",
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: "absolute", top: -40, right: -40, width: 140, height: 140,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(120,191,188,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Icon */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="mb-5 inline-flex items-center justify-center rounded-xl"
              style={{ width: 52, height: 52, background: "rgba(120,191,188,0.15)", border: "1px solid rgba(120,191,188,0.2)" }}
            >
              <Image src="/icons/brand/heart.png" alt="" width={26} height={26} style={{ objectFit: "contain" }} />
            </motion.div>

            <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: "rgba(120,191,188,0.8)" }}>
              Nico — Co-founder
            </p>
            <p className="font-body leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.78)" }}>
              Nico came at it from a different angle. A background in health
              technology, and a conviction that the gap between what sleep
              medicine knew and what patients actually experienced was
              fixable with better design, smarter data, and a care model
              that put the patient first.
            </p>
          </motion.div>
        </div>

        {/* Together */}
        <motion.div
          {...fadeUp(0.32)}
          className="rounded-2xl p-7 backdrop-blur-sm mb-12 text-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="font-body leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(252,246,237,0.68)", maxWidth: 600, margin: "0 auto" }}>
            They met and saw immediately they were solving the same problem
            from opposite ends. One had lived it. One had the tools to fix
            it. The result is Dumbo Health — built from scratch to be the
            thing neither of them could find.
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          {...fadeUp(0.40)}
          className="text-center mx-auto relative"
          style={{ maxWidth: 520 }}
        >
          {/* Decorative quote mark */}
          <div
            className="font-heading leading-none select-none pointer-events-none"
            style={{
              fontSize: "9rem",
              color: "rgba(255,131,97,0.18)",
              position: "absolute",
              top: "-3rem",
              left: "50%",
              transform: "translateX(-50%)",
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            &ldquo;
          </div>
          <div
            className="rounded-2xl p-8 backdrop-blur-sm relative"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <p className="font-heading font-medium text-white leading-snug mb-4" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)" }}>
              It&apos;s not just a business.<br />It&apos;s personal.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.32)" }}>
              Mo, Co-founder
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
