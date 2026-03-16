"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ResupplyHero() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Brand pattern — side strips only */}
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

      {/* Layout: text left + visual right on desktop */}
      <div
        className="relative mx-auto grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16"
        style={{ maxWidth: "1100px", padding: "0 5%" }}
      >
        {/* ── Left: copy ── */}
        <div className="lg:max-w-[580px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "#78BFBC" }}
          >
            For CPAP machine owners
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-5 font-heading font-medium leading-[1.08] text-midnight text-balance"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.25rem)" }}
          >
            Your CPAP supplies,{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>handled.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-6 font-body leading-relaxed text-balance"
            style={{
              fontSize: "1.125rem",
              color: "rgba(3,31,61,0.65)",
              maxWidth: "50ch",
            }}
          >
            We ship the right supplies to your door every 90 days. No
            runaround. No guesswork. We handle your prescription.
          </motion.p>

          {/* Proof point */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 font-body"
            style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)" }}
          >
            Plans start at{" "}
            <span style={{ color: "#FF8361", fontWeight: 600 }}>under $1 a day</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-8 flex flex-col sm:flex-row items-start gap-3"
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
              <Link href="#plans">Start my Refresh →</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 px-6 font-body text-base font-medium rounded-lg transition-all"
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
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {[
              "Cancel anytime",
              "No insurance needed",
              "FSA / HSA eligible",
              "Wrong fit? Free replacement",
              "Clinician-supported",
            ].map((pill) => (
              <span
                key={pill}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(3,31,61,0.38)" }}
              >
                <span style={{ color: "#78BFBC" }}>✓</span>
                {pill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: CPAP machine with warm peach radial ── */}
        <div
          className="hidden lg:flex items-center justify-center relative"
          aria-hidden="true"
          style={{ width: 420, height: 420, flexShrink: 0 }}
        >
          {/* Peach radial circle — mirrors reference hero treatment */}
          <div
            className="absolute"
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,131,97,0.18) 0%, rgba(255,214,173,0.44) 45%, rgba(245,230,209,0.2) 65%, transparent 75%)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Machine */}
          <motion.img
            src="/images/products/cpap-machine.png"
            alt="CPAP machine"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 300,
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 20px 44px rgba(255,131,97,0.22))",
            }}
          />

          {/* Floating chip — filters */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.92 }}
            className="absolute"
            style={{ top: "16%", left: "-4%", zIndex: 2 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="rounded-xl flex items-center gap-2.5"
                style={{
                  backgroundColor: "rgba(252,246,237,0.94)",
                  border: "1px solid rgba(3,31,61,0.08)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 14px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#78BFBC",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-body"
                  style={{ fontSize: "0.8125rem", color: "#031F3D", fontWeight: 600 }}
                >
                  Filters
                </span>
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.575rem", color: "rgba(120,191,188,0.85)" }}
                >
                  Every 2 wks
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating chip — full mask */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.08 }}
            className="absolute"
            style={{ top: "52%", right: "-8%", zIndex: 2 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="rounded-xl flex items-center gap-2.5"
                style={{
                  backgroundColor: "rgba(252,246,237,0.94)",
                  border: "1px solid rgba(3,31,61,0.08)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 14px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#FF8361",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-body"
                  style={{ fontSize: "0.8125rem", color: "#031F3D", fontWeight: 600 }}
                >
                  Full mask
                </span>
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.575rem", color: "rgba(255,131,97,0.85)" }}
                >
                  Yearly
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating chip — tubing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.22 }}
            className="absolute"
            style={{ bottom: "12%", left: "6%", zIndex: 2 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.2, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="rounded-xl flex items-center gap-2.5"
                style={{
                  backgroundColor: "rgba(252,246,237,0.94)",
                  border: "1px solid rgba(3,31,61,0.08)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 14px",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "rgba(3,31,61,0.35)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-body"
                  style={{ fontSize: "0.8125rem", color: "#031F3D", fontWeight: 600 }}
                >
                  Tubing
                </span>
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.575rem", color: "rgba(3,31,61,0.38)" }}
                >
                  Every 3 mo
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
