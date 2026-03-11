"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function MissionVision() {
  return (
    <section
      className="py-24 md:py-36"
      style={{ backgroundColor: "#FCF6ED" }}
    >
      <div className="mx-auto max-w-5xl px-[5%]">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest mb-16 text-center"
          style={{ color: "#78BFBC" }}
        >
          What drives us
        </motion.p>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pb-16"
          style={{ borderBottom: "1px solid rgba(3,31,61,0.1)" }}
        >
          <p
            className="font-mono text-[11px] uppercase tracking-widest mb-5"
            style={{ color: "rgba(3,31,61,0.35)" }}
          >
            Mission
          </p>
          <p
            className="font-heading font-medium text-midnight text-balance leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
          >
            To make sleep apnea treatment simple,
            affordable, and stigma-free.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="pt-16"
        >
          <p
            className="font-mono text-[11px] uppercase tracking-widest mb-5"
            style={{ color: "rgba(3,31,61,0.35)" }}
          >
            Vision
          </p>
          <p
            className="font-heading font-medium text-balance leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              color: "rgba(3,31,61,0.45)",
            }}
          >
            A world where no one suffers from sleep apnea because care was too
            expensive, too complicated, or too embarrassing to access.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
