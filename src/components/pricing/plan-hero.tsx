"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PlanHero() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-40"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Brand pattern — side strips, multiply blend keeps bg warm */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.55,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "#78BFBC" }}
        >
          CPAP therapy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-5 font-heading font-medium leading-[1.08] text-midnight text-balance"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
        >
          Start CPAP without guessing, overpaying,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #031F3D 0%, #FF8361 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            or going it alone.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-6 font-body leading-relaxed text-balance"
          style={{
            fontSize: "1.125rem",
            color: "rgba(3,31,61,0.65)",
            maxWidth: "52ch",
          }}
        >
          Dumbo handles the equipment, the setup, the supplies, and the support.
          Starting at $2 a day, about $59/month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-[12px] font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 20px rgba(255,131,97,0.35)",
            }}
          >
            <Link href="#plans">Start now</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 px-8 font-body text-base font-medium rounded-lg transition-all"
            style={{ color: "rgba(3,31,61,0.5)" }}
          >
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            "Built for first-time CPAP users",
            "Cancel anytime",
            "HSA/FSA eligible via Truemed",
          ].map((pill) => (
            <span
              key={pill}
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "rgba(3,31,61,0.38)" }}
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
