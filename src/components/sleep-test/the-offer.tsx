"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SHOPIFY } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function TheOffer() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Brand pattern — centered, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            width: "600px",
            height: "600px",
            backgroundImage: "url(/images/brand-pattern.png)",
            backgroundSize: "cover",
            opacity: 0.035,
          }}
        />
      </div>

      {/* Peach radial — center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,131,97,0.1) 0%, transparent 65%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative text-center"
        style={{ padding: "0 5%", zIndex: 1 }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono uppercase tracking-widest mb-6"
          style={{ fontSize: "0.72rem", color: "#78BFBC" }}
        >
          For new patients · only with Dumbo Health
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.07 }}
          className="font-heading font-medium text-midnight text-balance mx-auto"
          style={{
            fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
            lineHeight: 1.06,
            maxWidth: "700px",
          }}
        >
          Test positive for sleep apnea?{" "}
          <span style={{ color: "#FF8361", fontStyle: "italic" }}>
            Your first CPAP month is free.
          </span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-6 font-body text-pretty"
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.1875rem)",
            lineHeight: 1.75,
            color: "rgba(3,31,61,0.62)",
            maxWidth: "50ch",
          }}
        >
          Order your sleep test today. If your results confirm sleep apnea
          and you start a CPAP subscription with Dumbo Health, your first
          month is on us. No code needed.
        </motion.p>

        {/* Value breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
          className="mx-auto mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ maxWidth: "620px" }}
        >
          {[
            { icon: "/images/icons/icon-clock.png", label: "Sleep test", value: "$149" },
            { icon: null, label: "+", value: null },
            { icon: "/images/icons/icon-heart.png", label: "CPAP plan, month one", value: "$0" },
            { icon: null, label: "=", value: null },
            { icon: "/images/icons/icon-arrows.png", label: "Total to start", value: "$149" },
          ].map((item, i) =>
            item.value === null ? (
              <span
                key={i}
                className="font-heading font-medium"
                style={{ fontSize: "1.5rem", color: "rgba(3,31,61,0.2)" }}
              >
                {item.label}
              </span>
            ) : (
              <div
                key={i}
                className="rounded-2xl px-6 py-5 text-center"
                style={{
                  backgroundColor: "#fff",
                  border: "1.5px solid rgba(255,131,97,0.3)",
                  boxShadow: "0 4px 20px rgba(255,131,97,0.1)",
                  minWidth: "140px",
                }}
              >
                {item.icon && (
                  <div
                    className="mx-auto mb-2 flex items-center justify-center rounded-lg"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "rgba(255,131,97,0.1)",
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={18}
                      height={18}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <p
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.6rem", color: "rgba(3,31,61,0.45)" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.875rem", lineHeight: 1.15, marginTop: 4 }}
                >
                  {item.value}
                </p>
              </div>
            )
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href={SHOPIFY.buyUrl}
            className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 24px rgba(255,131,97,0.32)",
              height: "52px",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Order my sleep test, $149
          </a>
          <Link
            href="/pricing"
            className="font-body text-sm"
            style={{
              color: "rgba(3,31,61,0.45)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            See CPAP plan pricing
          </Link>
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-7 font-body"
          style={{ fontSize: "0.78rem", color: "rgba(3,31,61,0.38)", maxWidth: "44ch" }}
        >
          Offer applies to your first month of any CPAP subscription plan.
          Discount applied automatically at checkout.
        </motion.p>
      </div>
    </section>
  );
}
