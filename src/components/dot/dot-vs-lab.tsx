"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ROWS = [
  {
    label: "Cost",
    lab: "$1,500 to $3,000+ out of pocket, or complex insurance billing.",
    home: "$149, flat. No hidden fees. No billing surprises.",
  },
  {
    label: "Time to results",
    lab: "Weeks for an appointment, then a separate follow-up to receive results.",
    home: "48 hours from one night of sleep. Results emailed directly to you.",
  },
  {
    label: "Works from the road",
    lab: "Requires you to be in town for a scheduled clinic appointment.",
    home: "Ships to any address. Hotel, terminal, or home. Works wherever you sleep.",
  },
  {
    label: "Documentation produced",
    lab: "A report you collect at a follow-up appointment, then bring to your examiner.",
    home: "Full documentation package: AHI report, physician letter, prescription. Ready for your examiner.",
  },
  {
    label: "Treatment pathway",
    lab: "Back to your doctor, then a referral for CPAP, then another wait.",
    home: "CPAP therapy and compliance reporting all through Dumbo Health.",
  },
];

export function DotVsLab() {
  return (
    <section
      className="relative py-20 md:py-24"
      style={{
        background: "linear-gradient(to bottom, #FCF6ED 0%, #F5E6D1 50%, #FCF6ED 100%)",
      }}
    >
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto 3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            At-home vs. sleep lab
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Same clinical accuracy.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Built for drivers.
            </span>
          </motion.h2>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
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
              Sleep lab
            </p>
            <p
              className="font-mono uppercase tracking-widest"
              style={{ fontSize: "0.68rem", color: "#78BFBC" }}
            >
              Dumbo Health at home
            </p>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-2 py-5"
              style={{
                borderBottom: i < ROWS.length - 1 ? "1px solid rgba(3,31,61,0.07)" : "none",
                gap: "2rem",
              }}
            >
              {/* Lab */}
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
                    {row.lab}
                  </p>
                </div>
              </div>

              {/* At-home */}
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
                    {row.home}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
