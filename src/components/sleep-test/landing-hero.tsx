"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SHOPIFY } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function LandingHero() {
  return (
    <section
      className="relative overflow-hidden bg-daylight"
      style={{ isolation: "isolate" }}
    >
      {/* Brand pattern — top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: -40,
          right: -40,
          width: 320,
          height: 320,
          backgroundImage: "url(/images/brand-pattern.png)",
          backgroundSize: "cover",
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      {/* Brand pattern — bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: -40,
          left: -40,
          width: 240,
          height: 240,
          backgroundImage: "url(/images/brand-pattern.png)",
          backgroundSize: "cover",
          opacity: 0.03,
          zIndex: 0,
        }}
      />
      {/* Peach radial — upper right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 20%, rgba(255,131,97,0.07) 0%, transparent 65%)",
          zIndex: 0,
        }}
      />

      {/* ── Layout: copy left, image right — image is out of flow ── */}
      <div
        className="relative mx-auto"
        style={{ padding: "0 5%", zIndex: 1 }}
      >
        <div className="flex min-h-[600px] items-center lg:min-h-[640px]">

          {/* Left: copy */}
          <motion.div
            className="relative z-10 flex flex-col justify-center py-20 md:py-24"
            style={{ maxWidth: 520 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Eyebrow */}
            <p
              className="font-mono uppercase tracking-widest mb-5"
              style={{ fontSize: "0.72rem", color: "#78BFBC" }}
            >
              At-home sleep test · $149 · FDA cleared · results in 48 hours
            </p>

            {/* Headline */}
            <h1
              className="font-heading font-medium text-midnight text-balance"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", lineHeight: 1.06 }}
            >
              Find out if sleep apnea{" "}
              <span style={{ color: "#FF8361", fontStyle: "italic" }}>
                is stealing your sleep.
              </span>
            </h1>

            {/* Body */}
            <p
              className="mt-5 font-body text-pretty"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.1875rem)",
                lineHeight: 1.75,
                color: "rgba(3,31,61,0.6)",
                maxWidth: "40ch",
              }}
            >
              One night. One wrist-worn device. A board-certified physician
              reviews your results within 48 hours, and if you need
              treatment, we have you covered.
            </p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            >
              <a
                href={SHOPIFY.buyUrl}
                className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 24px rgba(255,131,97,0.32)",
                  height: "52px",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                Order my sleep test
              </a>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-midnight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  border: "1px solid rgba(3,31,61,0.15)",
                  height: "52px",
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                }}
              >
                See how it works
              </button>
            </motion.div>

            {/* What happens next strip */}
            <motion.div
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            >
              {["Order", "Complete 2-min health intake", "Kit ships"].map(
                (step, i, arr) => (
                  <span key={step} className="flex items-center gap-3">
                    <span
                      className="font-mono uppercase tracking-wider"
                      style={{ fontSize: "0.65rem", color: "rgba(3,31,61,0.42)" }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          width: 14,
                          height: 1,
                          backgroundColor: "rgba(3,31,61,0.18)",
                        }}
                      />
                    )}
                  </span>
                )
              )}
            </motion.div>

            {/* Review count */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.42 }}
            >
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#FF8361",
                    }}
                  />
                ))}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.8rem", color: "rgba(3,31,61,0.45)" }}
              >
                Rated 4.9 by 1,200+ patients
              </span>
            </motion.div>
          </motion.div>

          {/* Right: image — absolutely positioned, does not affect layout */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
            style={{ width: "48%", maxWidth: 560 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            {/* Soft glow behind figure */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 70%, rgba(120,191,188,0.07) 0%, transparent 65%)",
              }}
            />
            <Image
              src="/images/products/Person wearing WatchPAT ONE.png"
              alt="Person wearing the WatchPAT ONE sleep study device"
              width={560}
              height={640}
              className="h-auto w-full object-contain object-bottom"
              style={{ maxHeight: 640, display: "block" }}
              priority
            />
          </motion.div>
        </div>

        {/* Mobile image */}
        <div className="flex justify-center pb-8 lg:hidden">
          <Image
            src="/images/products/Person wearing WatchPAT ONE.png"
            alt="Person wearing the WatchPAT ONE sleep study device"
            width={300}
            height={360}
            className="h-auto w-auto object-contain"
            style={{ maxHeight: 300 }}
          />
        </div>
      </div>
    </section>
  );
}
