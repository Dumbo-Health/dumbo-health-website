"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ROWS = [
  {
    category: "Setup",
    oral: "Wear it, remove it in the morning",
    cpap: "Assemble mask, hose, and humidifier each night",
  },
  {
    category: "Noise",
    oral: "Silent",
    cpap: "Audible airflow from the machine",
  },
  {
    category: "Travel",
    oral: "Fits in a pocket",
    cpap: "Requires a dedicated carry-on or checked bag",
  },
  {
    category: "Cost over time",
    oral: "$3,490 once",
    cpap: "Machine plus ongoing supplies, every year",
  },
  {
    category: "AHI range",
    oral: "Mild to low-moderate (AHI 5 to 30)",
    cpap: "All severity levels, including severe",
  },
  {
    category: "Compliance",
    oral: "High among patients who try it",
    cpap: "50% of patients stop using within one year",
  },
  {
    category: "Physician oversight",
    oral: "Required for eligibility and prescription",
    cpap: "Required for prescription",
  },
];

export function OralComparison() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div style={{ padding: "0 5%" }}>
        {/* Header */}
        <div
          className="text-center"
          style={{ maxWidth: "560px", margin: "0 auto 3.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            Side by side
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Oral appliance vs{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              CPAP therapy.
            </span>
          </motion.h2>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="overflow-hidden rounded-2xl"
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            border: "1px solid rgba(3,31,61,0.08)",
          }}
        >
          {/* Column headers */}
          <div
            className="grid grid-cols-3 px-6 py-4"
            style={{ backgroundColor: "#031F3D" }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "rgba(252,246,237,0.4)" }}
            />
            <p
              className="font-mono text-[11px] uppercase tracking-widest text-center"
              style={{ color: "#78BFBC" }}
            >
              Oral Appliance
            </p>
            <p
              className="font-mono text-[11px] uppercase tracking-widest text-center"
              style={{ color: "rgba(252,246,237,0.4)" }}
            >
              CPAP
            </p>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.category}
              className="grid grid-cols-3 gap-4 px-6 py-5"
              style={{
                backgroundColor:
                  i % 2 === 0
                    ? "rgba(252,246,237,0.85)"
                    : "rgba(245,230,209,0.5)",
                borderTop: "1px solid rgba(3,31,61,0.06)",
              }}
            >
              <p
                className="font-body font-bold text-midnight self-center"
                style={{ fontSize: "0.875rem" }}
              >
                {row.category}
              </p>
              <p
                className="font-body self-center text-center text-pretty"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.78)" }}
              >
                {row.oral}
              </p>
              <p
                className="font-body self-center text-center text-pretty"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.48)" }}
              >
                {row.cpap}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
