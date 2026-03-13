"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ROWS = [
  {
    label: "Monitoring",
    without: "Data sits unread until your annual appointment.",
    with: "Flagged the same week it appears, automatically.",
  },
  {
    label: "When problems arise",
    without: "You search online, adjust things yourself, and hope.",
    with: "A clinician identifies the cause and sends you a fix.",
  },
  {
    label: "Between appointments",
    without: "You manage alone. Help is months away.",
    with: "Ongoing support, triggered by your actual data.",
  },
  {
    label: "Staying on track",
    without: "Skipped nights accumulate. The habit slips quietly.",
    with: "Early warning catches the pattern before it takes hold.",
  },
];

export function WithoutWithComparison() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "600px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            The difference it makes
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            CPAP alone.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              CPAP with Dumbo Health.
            </span>
          </h2>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, margin: "-60px" }}
          style={{ maxWidth: "860px", margin: "0 auto" }}
        >
          {/* Column headers */}
          <div
            className="grid grid-cols-2 pb-4 mb-2"
            style={{ borderBottom: "1px solid rgba(3,31,61,0.1)" }}
          >
            <p
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "0.68rem", color: "rgba(3,31,61,0.35)" }}
            >
              Without Dumbo Health
            </p>
            <p
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "0.68rem", color: "#78BFBC" }}
            >
              With Dumbo Health
            </p>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-2 py-5"
              style={{
                borderBottom:
                  i < ROWS.length - 1 ? "1px solid rgba(3,31,61,0.07)" : "none",
                gap: "2rem",
              }}
            >
              {/* Without */}
              <div className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: "rgba(3,31,61,0.2)", fontSize: "0.8125rem", lineHeight: 1.6 }}
                >
                  ✕
                </span>
                <div>
                  <p
                    className="font-mono uppercase tracking-widest mb-1.5"
                    style={{ fontSize: "0.6rem", color: "rgba(3,31,61,0.32)" }}
                  >
                    {row.label}
                  </p>
                  <p
                    className="font-body text-pretty"
                    style={{
                      fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                      color: "rgba(3,31,61,0.42)",
                      lineHeight: 1.65,
                    }}
                  >
                    {row.without}
                  </p>
                </div>
              </div>

              {/* With Dumbo Health */}
              <div className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: "#78BFBC", fontSize: "0.8125rem", lineHeight: 1.6 }}
                >
                  ✓
                </span>
                <div>
                  <p
                    className="font-mono uppercase tracking-widest mb-1.5"
                    style={{ fontSize: "0.6rem", color: "rgba(3,31,61,0.38)" }}
                  >
                    {row.label}
                  </p>
                  <p
                    className="font-body text-pretty"
                    style={{
                      fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                      color: "rgba(3,31,61,0.82)",
                      lineHeight: 1.65,
                      fontWeight: 500,
                    }}
                  >
                    {row.with}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA below the table */}
          <div className="flex justify-start mt-8">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: "#FF8361",
                boxShadow: "0 4px 20px rgba(255,131,97,0.32)",
              }}
            >
              <Link href="/get-started">Switch to Dumbo Health</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
