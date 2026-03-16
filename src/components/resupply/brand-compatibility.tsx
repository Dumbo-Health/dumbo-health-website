"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BRANDS = [
  {
    name: "ResMed AirSense 10",
    detail: "Including S9 and AirMini variants",
  },
  {
    name: "ResMed AirSense 11",
    detail: "AutoSet and Elite models",
  },
  {
    name: "Philips DreamStation",
    detail: "DreamStation and DreamStation 2",
  },
  {
    name: "Fisher and Paykel SleepStyle",
    detail: "SleepStyle 600 series",
  },
];

export function BrandCompatibility() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      <div className="relative" style={{ padding: "0 5%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "560px", margin: "0 auto 3rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-4"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Compatible with
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
          >
            Already have a machine? We work with it.
          </h2>
        </motion.div>

        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "960px", margin: "0 auto" }}
        >
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl p-5 text-center"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1rem", lineHeight: 1.3 }}
              >
                {brand.name}
              </p>
              <p
                className="font-mono mt-1.5 uppercase tracking-wide"
                style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.38)" }}
              >
                {brand.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-8"
          style={{
            fontSize: "0.9375rem",
            color: "rgba(3,31,61,0.40)",
          }}
        >
          Don&apos;t see your machine? Contact us, we&apos;re adding
          compatibility regularly.
        </motion.p>
      </div>
    </section>
  );
}
