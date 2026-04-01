"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function OralHero() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Soft dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(3,31,61,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, black 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, black 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: "0.72rem", color: "#78BFBC" }}
            >
              Oral Appliance Therapy
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.07 }}
              className="font-heading font-medium text-midnight text-balance"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1.04 }}
            >
              Sleep apnea treatment{" "}
              <span style={{ color: "#FF8361", fontStyle: "italic" }}>
                that fits in your pocket.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
              className="mt-6 font-body text-pretty"
              style={{
                fontSize: "clamp(1.125rem, 1.3vw, 1.25rem)",
                lineHeight: 1.75,
                color: "rgba(3,31,61,0.65)",
                maxWidth: "46ch",
              }}
            >
              A custom device worn while you sleep. No machine. No mask. No
              hose. For mild to low-moderate sleep apnea, and for people who
              have tried CPAP and could not stick with it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 24px rgba(255,131,97,0.38)",
                  height: "52px",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                }}
              >
                Get Started
              </button>

              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  border: "1px solid rgba(3,31,61,0.15)",
                  color: "rgba(3,31,61,0.7)",
                  height: "52px",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 5.95 5.95l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
                </svg>
                Talk to us first
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 font-body"
              style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.35)" }}
            >
              Board-certified physicians · Custom-fitted device · 3-year guarantee
            </motion.p>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "4/5",
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,131,97,0.12) 0%, transparent 70%)",
                }}
              />

              {/* Floating stat card */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4"
                style={{
                  backgroundColor: "rgba(252,246,237,0.92)",
                  border: "1px solid rgba(3,31,61,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.5rem" }}
                >
                  93%
                </p>
                <p
                  className="font-body mt-0.5"
                  style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.55)" }}
                >
                  of patients report improved sleep quality after 90 days
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
