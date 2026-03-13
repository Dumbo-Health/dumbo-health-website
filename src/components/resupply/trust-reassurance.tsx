"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ITEMS = [
  {
    title: "Cancel anytime",
    body: "Cancel before your next quarterly billing date and you won't be charged again. No fees. No hassle.",
  },
  {
    title: "Pause instead",
    body: "Not ready to cancel? Pause for one quarter and pick back up when you're ready. Your supply profile stays saved.",
  },
  {
    title: "Wrong fit? We replace it.",
    body: "If something doesn't fit, let us know within 30 days and we replace it free. No questions asked.",
  },
  {
    title: "FSA / HSA eligible",
    body: "Use your pre-tax health dollars. We provide the documentation you need.",
  },
  {
    title: "No insurance required",
    body: "Pay directly. No claims, no approvals, no waiting.",
  },
  {
    title: "Prescription? We handle it.",
    body: "Our doctors manage your CPAP prescription so you never have to chase renewals or schedule appointments.",
  },
];

export function TrustReassurance() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Brand pattern — sides */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          mixBlendMode: "multiply",
          opacity: 0.45,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            No pressure
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            No lock-in.{" "}
            <span style={{ color: "#FF8361" }}>You&apos;re in control.</span>
          </h2>
        </motion.div>

        {/* Items grid */}
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "#FCF6ED",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              {/* Teal dot marker */}
              <div
                className="rounded-full mb-4"
                style={{ width: 8, height: 8, backgroundColor: "#78BFBC" }}
              />
              <p
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
              >
                {item.title}
              </p>
              <p
                className="font-body mt-2.5 leading-relaxed"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(3,31,61,0.60)",
                  lineHeight: 1.65,
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
