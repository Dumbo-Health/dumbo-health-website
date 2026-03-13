"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CONTACT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function DotHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #FCF6ED 0%, #FCF6ED 70%, #F5E6D1 100%)",
        isolation: "isolate",
      }}
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

      {/* Layout container */}
      <div
        className="relative mx-auto"
        style={{ padding: "0 5%", zIndex: 1, maxWidth: "1280px" }}
      >
        <div className="flex min-h-[600px] items-center lg:min-h-[660px]">

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
              CDL drivers · DOT sleep apnea clearance · $149
            </p>

            {/* Headline */}
            <h1
              className="font-heading font-medium text-midnight text-balance"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", lineHeight: 1.06 }}
            >
              Keep your CDL.{" "}
              <span style={{ color: "#FF8361", fontStyle: "italic" }}>
                Get cleared fast.
              </span>
            </h1>

            {/* Body */}
            <p
              className="mt-5 font-body text-pretty"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.1875rem)",
                lineHeight: 1.75,
                color: "rgba(3,31,61,0.62)",
                maxWidth: "40ch",
              }}
            >
              Flagged for sleep apnea at your DOT physical? One night at home
              gives your medical examiner the AHI report and physician
              documentation they need. Results in 48 hours. Ships anywhere.
            </p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("dot-clearance")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 24px rgba(255,131,97,0.32)",
                  height: "52px",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                See your documentation package
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("dot-how-it-works")
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

            {/* Strip */}
            <motion.div
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            >
              {["Order", "Complete 2-min intake", "Kit ships"].map((step, i, arr) => (
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
              ))}
            </motion.div>

            {/* Trust signals */}
            <motion.p
              className="mt-4 font-mono uppercase tracking-wider"
              style={{ fontSize: "0.65rem", color: "rgba(3,31,61,0.38)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.42 }}
            >
              FDA cleared · AASM validated · physician-signed report · 48-hour results
            </motion.p>
          </motion.div>

          {/* Right: photo — floating card, vertically centered */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 hidden lg:flex lg:items-center"
            style={{ width: "46%", maxWidth: 520 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{ height: 480 }}
            >
              <Image
                src="/images/DOT/Truck%20drivers.png"
                alt="Commercial truck drivers"
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                priority
              />
              {/* Left-edge fade into background */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to right, #FCF6ED 0%, rgba(252,246,237,0) 28%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile image */}
        <div className="flex justify-center pb-8 lg:hidden">
          <Image
            src="/images/DOT/Truck.png"
            alt="Semi truck on the highway"
            width={360}
            height={220}
            className="h-auto w-full rounded-2xl object-cover"
            style={{ maxHeight: 220 }}
          />
        </div>
      </div>
    </section>
  );
}
