"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TIERS = [
  { plan: "Essentials", amount: "$2", monthly: "$59/mo" },
  { plan: "Premium", amount: "$3", monthly: "$89/mo" },
  { plan: "Elite", amount: "$4", monthly: "$129/mo" },
];

export function CostFraming() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: "linear-gradient(160deg, #F5E6D1 0%, #FFD6AD 100%)",
        isolation: "isolate",
      }}
    >
      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
          style={{ maxWidth: "600px", margin: "0 auto 4rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Put it in perspective
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            Less than a cup of coffee.{" "}
            <span style={{ color: "#FF8361" }}>
              For better sleep, every night.
            </span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.1875rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            Most people never start CPAP because of one big upfront cost.
            Dumbo spreads it into something manageable.
          </p>
        </motion.div>

        {/* Per-day numbers */}
        <div
          className="grid grid-cols-3 gap-6 md:gap-10"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.plan}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="text-center"
            >
              <p
                className="font-heading font-medium text-midnight leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {tier.amount}
              </p>
              <p
                className="font-mono uppercase tracking-widest mt-2"
                style={{ fontSize: "0.7rem", color: "#78BFBC" }}
              >
                /day
              </p>
              <p
                className="font-body mt-3"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.68)" }}
              >
                {tier.plan}
              </p>
              <p
                className="font-mono"
                style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.35)" }}
              >
                {tier.monthly}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-12"
          style={{
            fontSize: "1.0625rem",
            color: "rgba(3,31,61,0.50)",
            maxWidth: "52ch",
            margin: "3rem auto 0",
          }}
        >
          That includes equipment, supplies, monitoring, and support. Not just
          hardware.
        </motion.p>
      </div>
    </section>
  );
}
