"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Problem data ─────────────────────────────────────────────────────────────
// idleColor: icon bg & text in idle state (inline styles to avoid Tailwind purge)
const problems = [
  {
    word:      "Sickness",
    label:     "Constantly Sick",
    slug:      "constantly-sick",
    copy:      "Poor sleep breaks down your immune defenses, leaving you vulnerable to illness after illness.",
    idleBg:    "rgba(120,191,188,0.14)",
    idleColor: "#78BFBC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    word:      "Tension",
    label:     "High Blood Pressure",
    slug:      "high-blood-pressure",
    copy:      "Every apnea episode spikes your blood pressure. Night after night, this adds up.",
    idleBg:    "rgba(255,131,97,0.12)",
    idleColor: "#FF8361",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 12 5 12 7 6 9 18 11 10 13 14 15 12 22 12" />
      </svg>
    ),
  },
  {
    word:      "Cravings",
    label:     "Hard to Lose Weight",
    slug:      "hard-to-lose-weight",
    copy:      "Sleep apnea disrupts the hormones that control hunger, making weight loss feel impossible.",
    idleBg:    "rgba(255,214,173,0.35)",
    idleColor: "#E07040",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    word:      "Stamina",
    label:     "Low Sex Drive",
    slug:      "low-sex-drive",
    copy:      "Chronic sleep disruption lowers testosterone and drains the energy that intimacy needs.",
    idleBg:    "rgba(3,31,61,0.07)",
    idleColor: "rgba(3,31,61,0.45)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    word:      "Anxiety",
    label:     "Anxiety & Stress",
    slug:      "anxiety-stress",
    copy:      "Without restorative sleep, your brain can't regulate cortisol — keeping you on edge.",
    idleBg:    "rgba(120,191,188,0.14)",
    idleColor: "#78BFBC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    word:      "Snoring",
    label:     "Loud Snoring",
    slug:      "loud-snoring",
    copy:      "Loud snoring is often the first sign your airway is being obstructed during sleep.",
    idleBg:    "rgba(255,131,97,0.12)",
    idleColor: "#FF8361",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    word:      "Fog",
    label:     "Can't Focus",
    slug:      "cant-focus",
    copy:      "Fragmented sleep impairs memory, attention, and decision-making — all day, every day.",
    idleBg:    "rgba(255,214,173,0.35)",
    idleColor: "#E07040",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    word:      "Fatigue",
    label:     "Always Tired",
    slug:      "always-tired",
    copy:      "No amount of rest feels like enough when sleep apnea keeps waking your brain all night.",
    idleBg:    "rgba(3,31,61,0.07)",
    idleColor: "rgba(3,31,61,0.45)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

// ─── Slot-machine word component ──────────────────────────────────────────────
function SlotWord({ idx }: { idx: number }) {
  return (
    // motion.span with layout animates width as the word changes
    <motion.span
      layout
      transition={{ layout: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        height: "1.12em",
        lineHeight: 1.12,
      }}
    >
      {/* Ghost sizer — invisible, drives the container's natural width */}
      <span style={{ visibility: "hidden", whiteSpace: "nowrap", display: "block" }}>
        {problems[idx].word}
      </span>

      {/* Animated words — absolutely positioned, clip inside overflow:hidden */}
      <AnimatePresence initial={false}>
        <motion.span
          key={idx}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-105%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            color: "#FF8361",
            textShadow: "0 0 32px rgba(255,131,97,0.35)",
          }}
        >
          {problems[idx].word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function SymptomsProblems() {
  const [idx, setIdx]         = useState(0);
  const idxRef                = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (idxRef.current + 1) % problems.length;
      idxRef.current = next;
      setIdx(next);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-daylight py-14 md:py-28"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(255,131,97,0.06) 0%, transparent 68%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Headline ── */}
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-teal">
            Does this sound like you?
          </p>

          {/* Wrap in a single layout group so the headline reflows smoothly */}
          <motion.h2
            layout
            className="flex flex-wrap items-end justify-center gap-x-3 font-heading text-[28px] font-medium leading-[1.1] text-midnight sm:text-[36px] md:text-[52px]"
          >
            <span>Could your</span>
            <SlotWord idx={idx} />
            <span>be sleep apnea?</span>
          </motion.h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {problems.map((p, i) => {
            const isActive = i === idx;
            return (
              <motion.div
                key={p.slug}
                animate={isActive ? { y: -6, scale: 1.015 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/problems/${p.slug}`}
                  className={`group relative flex h-full flex-col gap-2.5 overflow-hidden rounded-2xl border p-4 transition-colors duration-400 md:gap-3 md:p-5 ${
                    isActive
                      ? "border-peach/30 bg-white shadow-lg shadow-peach/10"
                      : "border-sunlight bg-white hover:border-peach/20 hover:shadow-md hover:shadow-midnight/5"
                  }`}
                >
                  {/* Active gradient wash */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,131,97,0.05) 0%, transparent 60%)",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="relative z-10 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 md:h-9 md:w-9"
                    style={
                      isActive
                        ? { backgroundColor: "#FF8361", color: "#fff" }
                        : { backgroundColor: p.idleBg, color: p.idleColor }
                    }
                  >
                    {p.icon}
                  </div>

                  {/* Label */}
                  <p
                    className="relative z-10 font-heading text-[13px] font-medium leading-snug transition-colors duration-300 md:text-[15px]"
                    style={{ color: isActive ? "#FF8361" : "#031F3D" }}
                  >
                    {p.label}
                  </p>

                  {/* Copy — desktop only */}
                  <p className="relative z-10 hidden font-body text-xs leading-relaxed text-midnight/45 md:block">
                    {p.copy}
                  </p>

                  {/* Arrow — desktop only */}
                  <div
                    className="relative z-10 mt-auto hidden items-center gap-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 md:flex"
                    style={{ color: isActive ? "#FF8361" : "rgba(3,31,61,0.25)" }}
                  >
                    Learn more
                    <svg
                      className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
