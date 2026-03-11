"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LIVE_STATES = ["Florida", "Texas"];

export function Availability() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.1, zIndex: 0 }}
      />

      <div className="relative mx-auto max-w-5xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest mb-5"
          style={{ color: "#78BFBC" }}
        >
          Where we&apos;re available
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="font-heading font-medium text-white text-balance leading-tight"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          Starting in Florida and Texas.
          <br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Expanding fast.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          className="mx-auto mt-6 font-body leading-relaxed"
          style={{
            fontSize: "1.0625rem",
            color: "rgba(252,246,237,0.6)",
            maxWidth: "48ch",
          }}
        >
          Currently available cash-pay in Florida and Texas. Insurance coverage
          is rolling out state by state, with more states coming soon.
        </motion.p>

        {/* State pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {LIVE_STATES.map((state) => (
            <span
              key={state}
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(120,191,188,0.15)",
                border: "1px solid rgba(120,191,188,0.3)",
                color: "#78BFBC",
              }}
            >
              {state} — Live
            </span>
          ))}
          <span
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            More states soon
          </span>
        </motion.div>

        {/* Waitlist CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
          className="mt-10"
        >
          <p
            className="font-body mb-5"
            style={{ fontSize: "0.9375rem", color: "rgba(252,246,237,0.5)" }}
          >
            Not in Florida or Texas yet?
          </p>
          <a
            href={APP_URL}
            className="inline-flex h-12 items-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              color: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(255,131,97,0.3)",
            }}
          >
            Join the early access waitlist
          </a>
          <p
            className="mt-3 font-body text-xs"
            style={{ color: "rgba(252,246,237,0.3)" }}
          >
            Be the first to know when we launch in your state.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
