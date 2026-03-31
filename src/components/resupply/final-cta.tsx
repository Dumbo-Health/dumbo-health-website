"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ResupplyFinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Brand sleep-cycle wave — subtle */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.08, zIndex: 0 }}
      />

      {/* Warm peach glow — bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "55%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,131,97,0.18) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative text-center"
        style={{ padding: "0 5%", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: "0.75rem", color: "#78BFBC" }}
        >
          The Refresh Program
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-5 font-heading font-medium text-balance"
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
            lineHeight: 1.08,
            color: "#FCF6ED",
          }}
        >
          Keep your CPAP working,{" "}
          <span style={{ color: "#FF8361", fontStyle: "italic" }}>
            without thinking about it.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 font-body"
          style={{
            fontSize: "1.125rem",
            color: "rgba(252,246,237,0.60)",
            lineHeight: 1.75,
          }}
        >
          Supplies handled. Shipments are automatic. Sleep better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-13 px-8 rounded-[12px] font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 28px rgba(255,131,97,0.42)",
              height: 52,
            }}
          >
            <Link href="/get-started">Start my Refresh →</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {["Cancel anytime", "Free shipping on every plan", "No insurance needed"].map(
            (note) => (
              <span
                key={note}
                className="font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(252,246,237,0.28)" }}
              >
                {note}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
