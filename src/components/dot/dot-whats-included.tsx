"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SHOPIFY } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CAROUSEL = [
  { src: "/images/products/hst.png",     alt: "WatchPAT ONE device" },
  { src: "/images/products/hst-box.png", alt: "Sleep test kit" },
  { src: "/images/products/Person wearing WatchPAT ONE.png", alt: "Wearing the device" },
];

const INCLUDED = [
  {
    icon: "/images/icons/icon-shield.png",
    label: "WatchPAT ONE device",
    detail: "Single-use, wrist-worn, FDA-cleared. Validated for home sleep studies by the AASM.",
  },
  {
    icon: "/images/icons/icon-scan.png",
    label: "Physician intake review",
    detail: "Your questionnaire is reviewed before the kit ships. A physician is in your corner from the start.",
  },
  {
    icon: "/images/icons/icon-heart.png",
    label: "AHI sleep study report",
    detail: "Physician-reviewed overnight data showing your AHI (breathing pauses per hour), oxygen levels, and RDI.",
  },
  {
    icon: "/images/icons/icon-clock.png",
    label: "Signed physician letter",
    detail: "A board-certified physician letter confirming your diagnosis and fitness to drive. Ready for your medical examiner.",
  },
  {
    icon: "/images/icons/icon-arrows.png",
    label: "Prescription included",
    detail: "Sleep apnea confirmed? Your prescription comes with the report. No separate appointment needed.",
  },
  {
    icon: "/images/icons/icon-laptop.png",
    label: "Free shipping, anywhere",
    detail: "Ships to any address. Home, hotel, or terminal. Single-use device with prepaid return.",
  },
];

export function DotWhatsIncluded() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((a) => (a === 0 ? CAROUSEL.length - 1 : a - 1));
  }
  function next() {
    setActive((a) => (a === CAROUSEL.length - 1 ? 0 : a + 1));
  }

  return (
    <section
      id="dot-product"
      className="relative py-20 md:py-24"
      style={{ background: "linear-gradient(to bottom, #FFD6AD 0%, #FFD6AD 70%, #FCF6ED 100%)" }}
    >
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div className="text-center" style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            WatchPAT ONE · your full documentation package
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Everything included.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Nothing left to chase.
            </span>
          </motion.h2>
        </div>

        {/* Body: carousel + cards */}
        <div
          className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
          style={{ maxWidth: "1080px", margin: "0 auto" }}
        >
          {/* Carousel */}
          <motion.div
            className="shrink-0 lg:w-[460px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div
              className="relative overflow-hidden rounded-3xl bg-white"
              style={{
                border: "1px solid rgba(3,31,61,0.08)",
                boxShadow: "0 8px 40px rgba(3,31,61,0.1)",
                aspectRatio: "1 / 1",
                cursor: "pointer",
              }}
              onClick={next}
            >
              {CAROUSEL.map((img, i) => (
                <div
                  key={img.src}
                  className="absolute inset-0 flex items-center justify-center p-6"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transition: "opacity 0.35s ease",
                    pointerEvents: active === i ? "auto" : "none",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={280}
                    height={280}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}

              {/* Arrows */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 transition-opacity hover:bg-white"
                style={{ boxShadow: "0 2px 8px rgba(3,31,61,0.12)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#031F3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 transition-opacity hover:bg-white"
                style={{ boxShadow: "0 2px 8px rgba(3,31,61,0.12)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#031F3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {CAROUSEL.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  style={{
                    width: active === i ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: active === i ? "#78BFBC" : "rgba(3,31,61,0.2)",
                    transition: "all 0.25s ease",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <p
              className="mt-5 text-center font-mono uppercase tracking-wider"
              style={{ fontSize: "0.62rem", color: "rgba(3,31,61,0.38)" }}
            >
              $149 · one-time · free shipping · physician-signed report included
            </p>
          </motion.div>

          {/* Inclusion cards */}
          <motion.div
            className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {INCLUDED.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                }}
                className="rounded-2xl bg-white p-5"
                style={{
                  border: "1px solid rgba(3,31,61,0.07)",
                  boxShadow: "0 2px 12px rgba(3,31,61,0.05)",
                }}
              >
                <div
                  className="mb-3 flex items-center justify-center rounded-xl"
                  style={{ width: 40, height: 40, backgroundColor: "rgba(120,191,188,0.1)" }}
                >
                  <Image src={item.icon} alt="" width={22} height={22} style={{ objectFit: "contain" }} />
                </div>
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1rem", lineHeight: 1.3, marginBottom: "0.35rem" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-body text-pretty"
                  style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(3,31,61,0.58)" }}
                >
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href={SHOPIFY.buyUrl}
            data-shopify-checkout="sleep-test"
            className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 24px rgba(255,131,97,0.3)",
              height: "52px",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Order my sleep test, $149
          </a>
        </motion.div>
      </div>
    </section>
  );
}
