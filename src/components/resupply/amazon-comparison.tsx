"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ROWS = [
  {
    label: "Ordering",
    amazon: "You remember when you run out. Then you search, and hope.",
    dumbo: "A box arrives every 90 days. You never have to think about it.",
  },
  {
    label: "Compatibility",
    amazon: "You make your best guess. Wrong size? Start the return process.",
    dumbo: "Every item is matched to your exact machine and mask. Guaranteed.",
  },
  {
    label: "Prescription",
    amazon: "You reach out to your equipment supplier. Schedule an appointment. Wait.",
    dumbo: "Our doctors handle all renewals. You never have to chase anyone.",
  },
  {
    label: "Wrong fit",
    amazon: "You handle the return. You search again. You reorder.",
    dumbo: "Let us know within 30 days. We replace it, no questions asked.",
  },
];

export function AmazonComparison() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Subtle warm radial — keeps it from feeling flat */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,214,173,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "680px", margin: "0 auto 4rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Why people switch
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.08 }}
          >
            Amazon sells parts.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Dumbo manages your system.
            </span>
          </h2>
          <p
            className="font-body mt-5"
            style={{
              fontSize: "1.125rem",
              color: "rgba(3,31,61,0.68)",
              lineHeight: 1.75,
            }}
          >
            One requires you. The other doesn&apos;t.
          </p>
        </motion.div>

        {/* Two-column comparison */}
        <div
          className="grid gap-5 lg:grid-cols-2"
          style={{ maxWidth: "940px", margin: "0 auto" }}
        >
          {/* Amazon column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-3xl"
            style={{
              backgroundColor: "#F5E6D1",
              border: "1px solid rgba(3,31,61,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Column header */}
            <div
              className="px-8 py-5"
              style={{ borderBottom: "1px solid rgba(3,31,61,0.07)" }}
            >
              <p
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "0.7rem", color: "rgba(3,31,61,0.35)" }}
              >
                Buying on Amazon
              </p>
            </div>

            {/* Rows */}
            <div className="px-8 py-2">
              {ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-start gap-4 py-5"
                  style={{
                    borderBottom:
                      i < ROWS.length - 1 ? "1px solid rgba(3,31,61,0.06)" : "none",
                  }}
                >
                  <span
                    className="shrink-0 font-mono"
                    style={{ color: "rgba(3,31,61,0.2)", fontSize: "0.875rem", marginTop: 2 }}
                  >
                    ✕
                  </span>
                  <div>
                    <p
                      className="font-mono uppercase tracking-widest mb-1"
                      style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.35)" }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "1.0625rem",
                        color: "rgba(3,31,61,0.45)",
                        lineHeight: 1.6,
                      }}
                    >
                      {row.amazon}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost */}
            <div
              className="px-8 py-6 mt-2"
              style={{ borderTop: "1px solid rgba(3,31,61,0.07)" }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.35)" }}
              >
                Typical annual spend
              </p>
              <p
                className="font-heading font-medium"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "rgba(3,31,61,0.28)",
                  lineHeight: 1,
                }}
              >
                $180 to $500+
              </p>
              <p
                className="font-body mt-1.5"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.35)" }}
              >
                Depending on what you remember to buy
              </p>
            </div>
          </motion.div>

          {/* Dumbo column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-3xl"
            style={{
              backgroundColor: "#FCF6ED",
              border: "1.5px solid rgba(255,131,97,0.3)",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(255,131,97,0.1)",
            }}
          >
            {/* Column header */}
            <div
              className="px-8 py-5"
              style={{ borderBottom: "1px solid rgba(255,131,97,0.12)" }}
            >
              <p
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "0.7rem", color: "#78BFBC" }}
              >
                Dumbo Refresh
              </p>
            </div>

            {/* Rows */}
            <div className="px-8 py-2">
              {ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-start gap-4 py-5"
                  style={{
                    borderBottom:
                      i < ROWS.length - 1 ? "1px solid rgba(3,31,61,0.06)" : "none",
                  }}
                >
                  <span
                    className="shrink-0 font-mono"
                    style={{ color: "#78BFBC", fontSize: "0.875rem", marginTop: 2 }}
                  >
                    ✓
                  </span>
                  <div>
                    <p
                      className="font-mono uppercase tracking-widest mb-1"
                      style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.38)" }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "1.0625rem",
                        color: "rgba(3,31,61,0.78)",
                        lineHeight: 1.6,
                        fontWeight: 500,
                      }}
                    >
                      {row.dumbo}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost + CTA */}
            <div
              className="px-8 py-6 mt-2"
              style={{
                borderTop: "1px solid rgba(255,131,97,0.12)",
                backgroundColor: "rgba(255,131,97,0.04)",
              }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.38)" }}
              >
                Annual cost
              </p>
              <p
                className="font-heading font-medium text-midnight"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  lineHeight: 1,
                }}
              >
                From $348
              </p>
              <p
                className="font-body mt-1.5"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.68)" }}
              >
                All supplies. All year. Nothing to think about.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-6 h-12 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 20px rgba(255,131,97,0.35)",
                }}
              >
                <Link href="#plans">Start my Refresh →</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
