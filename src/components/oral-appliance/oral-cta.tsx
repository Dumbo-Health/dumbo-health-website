"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function OralCta() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Wave texture */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      {/* Warm glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        aria-hidden="true"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,131,97,0.14) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative text-center"
        style={{ padding: "0 5%", zIndex: 1 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono uppercase tracking-widest mb-6"
          style={{ fontSize: "0.72rem", color: "#78BFBC" }}
        >
          No machine required.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.07 }}
          className="font-heading font-medium text-white text-balance mx-auto"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            lineHeight: 1.06,
            maxWidth: "680px",
          }}
        >
          Ready for a night{" "}
          <span style={{ color: "#FF8361", fontStyle: "italic" }}>
            without the machine?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-6 font-body text-pretty"
          style={{
            fontSize: "clamp(1.125rem, 1.3vw, 1.3125rem)",
            lineHeight: 1.75,
            color: "rgba(252,246,237,0.65)",
            maxWidth: "46ch",
          }}
        >
          Start with a physician review. We confirm you qualify before anything
          ships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
              border: "1px solid rgba(252,246,237,0.2)",
              color: "rgba(252,246,237,0.75)",
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-7 font-body"
          style={{ fontSize: "0.8125rem", color: "rgba(252,246,237,0.35)" }}
        >
          HIPAA compliant · Board-certified physicians · 3-year device guarantee
        </motion.p>
      </div>
    </section>
  );
}
