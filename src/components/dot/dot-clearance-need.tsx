"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DOCUMENTS = [
  {
    icon: "/images/icons/icon-scan.png",
    title: "Sleep study report with AHI",
    body: "A formal diagnosis or rule-out of sleep apnea (OSA) with your AHI (breathing pauses per hour), oxygen saturation levels, and RDI. Reviewed and signed by a board-certified sleep physician.",
    badge: "Produced by Dumbo Health",
    badgeColor: "#78BFBC",
  },
  {
    icon: "/images/icons/icon-shield.png",
    title: "Physician diagnosis letter",
    body: "A signed letter from your treating physician confirming your diagnosis and that you are fit to operate a commercial motor vehicle. Written in the format your medical examiner expects.",
    badge: "Produced by Dumbo Health",
    badgeColor: "#78BFBC",
  },
  {
    icon: "/images/icons/icon-arrows.png",
    title: "CPAP compliance data",
    body: "If you test positive, your examiner will also need 30 days of CPAP usage showing four or more hours per night on 70% of nights. We generate this report for you through your Dumbo Health CPAP plan.",
    badge: "Included with CPAP plan",
    badgeColor: "#FF8361",
  },
];

export function DotClearanceNeed() {
  return (
    <section
      id="dot-clearance"
      className="relative py-20 md:py-24"
      style={{
        background: "linear-gradient(to bottom, #F5E6D1 0%, #F5E6D1 70%, #FCF6ED 100%)",
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
            The DOT clearance checklist
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Three documents.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              We produce all of them.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
            className="mt-5 font-body text-pretty"
            style={{
              fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
              lineHeight: 1.72,
              color: "rgba(3,31,61,0.58)",
            }}
          >
            When you return to your DOT medical examiner, here is exactly what
            they will ask for. Dumbo Health produces every item.
          </motion.p>
        </div>

        {/* Three cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-5 md:grid-cols-3"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          {DOCUMENTS.map((doc) => (
            <motion.div
              key={doc.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="flex flex-col rounded-2xl bg-white p-7"
              style={{
                border: "1px solid rgba(3,31,61,0.07)",
                boxShadow: "0 4px 20px rgba(3,31,61,0.06)",
              }}
            >
              {/* Icon */}
              <div
                className="mb-5 flex items-center justify-center rounded-xl"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "rgba(120,191,188,0.1)",
                }}
              >
                <Image
                  src={doc.icon}
                  alt=""
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1.0625rem", lineHeight: 1.3, marginBottom: "0.5rem" }}
              >
                {doc.title}
              </h3>
              <p
                className="font-body text-pretty flex-1"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(3,31,61,0.58)" }}
              >
                {doc.body}
              </p>

              {/* Badge */}
              <div className="mt-5 flex items-center gap-2">
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: doc.badgeColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-mono uppercase tracking-wider"
                  style={{ fontSize: "0.6rem", color: "rgba(3,31,61,0.45)" }}
                >
                  {doc.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Honest caveat */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center font-body"
          style={{
            fontSize: "0.8125rem",
            color: "rgba(3,31,61,0.42)",
            maxWidth: "54ch",
            margin: "2.5rem auto 0",
          }}
        >
          We recommend confirming with your medical examiner that a home sleep
          test is acceptable before ordering. Most accept it. Some examiners at
          large carriers may require an in-lab study.
        </motion.p>
      </div>
    </section>
  );
}
