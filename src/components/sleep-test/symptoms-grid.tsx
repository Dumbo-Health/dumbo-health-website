"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SYMPTOMS = [
  {
    icon: "/images/icons/icon-clock.png",
    title: "You wake up exhausted",
    body: "Eight hours in bed and you still need three coffees to function. That's not laziness. That's interrupted sleep.",
  },
  {
    icon: "/images/icons/icon-sad.png",
    title: "You snore, or were told you do",
    body: "Snoring is your airway asking for help. It's one of the most reliable early signs of sleep apnea.",
  },
  {
    icon: "/images/icons/icon-scan.png",
    title: "Brain fog all day",
    body: "Focus slips, memory gets fuzzy, and concentration feels like a chore. Your brain isn't getting the deep rest it needs.",
  },
  {
    icon: "/images/icons/icon-heart.png",
    title: "You stop breathing at night",
    body: "A bed partner noticed it, or you wake up gasping. These pauses in breathing are a key sign of sleep apnea.",
  },
  {
    icon: "/images/icons/icon-shield.png",
    title: "Morning headaches",
    body: "Waking up with a headache isn't just unpleasant. It's often a sign of low oxygen levels overnight.",
  },
  {
    icon: "/images/icons/icon-arrows.png",
    title: "Mood and energy are off",
    body: "Irritability, low motivation, and emotional flatness. Disrupted sleep affects your whole day, every single day.",
  },
];

export function SymptomsGrid() {
  return (
    <section
      className="relative py-20 md:py-24"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div style={{ padding: "0 5%" }}>
        {/* Header */}
        <div className="text-center" style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            Do you recognise any of these?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Sleep apnea rarely announces itself.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              These signs do.
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "960px", margin: "0 auto" }}
        >
          {SYMPTOMS.map((s) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
              }}
              className="rounded-2xl bg-white p-6 transition-all duration-200"
              style={{
                border: "1px solid rgba(3,31,61,0.06)",
                boxShadow: "0 2px 12px rgba(3,31,61,0.05)",
              }}
            >
              {/* Icon well */}
              <div
                className="mb-4 flex items-center justify-center rounded-xl"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "rgba(120,191,188,0.1)",
                }}
              >
                <Image
                  src={s.icon}
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
                {s.title}
              </h3>
              <p
                className="font-body text-pretty"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(3,31,61,0.58)" }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-10 text-center font-body"
          style={{
            fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
            color: "rgba(3,31,61,0.5)",
          }}
        >
          Two or more of these sound familiar? An at-home sleep test is your next step.
        </motion.p>
      </div>
    </section>
  );
}
