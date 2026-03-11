"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BEATS = [
  {
    n: "01",
    icon: "/images/icon-cpap.png",
    title: "What is CPAP?",
    body: "A CPAP machine delivers a gentle, steady stream of air through a mask while you sleep. It keeps your airway open so you can breathe normally through the night.",
  },
  {
    n: "02",
    icon: "/images/icon-heart.png",
    title: "Why does it matter?",
    body: "Untreated sleep apnea means your body wakes itself up dozens, sometimes hundreds, of times a night to restart breathing. Therapy stops that cycle, which means real sleep and real energy.",
  },
  {
    n: "03",
    icon: "/images/icon-path.png",
    title: "Why how you get it matters.",
    body: "Most people get a CPAP through insurance, a sleep lab, and a DME supplier. A process that takes months and leaves you managing it alone. Dumbo is built differently: faster, clearer, and with support at every step.",
  },
];

export function NewToSleepApnea() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#FCF6ED" }}>
      <div className="mx-auto max-w-7xl px-[5%]">

        <div className="mb-14">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            New to sleep apnea?
          </p>
          <h2
            className="font-heading font-medium leading-tight text-balance text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Not sure what you&apos;re looking at?{" "}
            <span style={{ color: "rgba(3,31,61,0.4)" }}>
              We&apos;ll catch you up.
            </span>
          </h2>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {BEATS.map(({ n, icon, title, body }) => (
            <motion.div
              key={n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="rounded-2xl p-9"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              {/* Icon medallion */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6"
                style={{
                  backgroundColor: "rgba(120,191,188,0.12)",
                  border: "1px solid rgba(120,191,188,0.2)",
                }}
              >
                <Image src={icon} alt="" width={28} height={28} />
              </div>

              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "rgba(3,31,61,0.35)" }}
              >
                {n}
              </span>
              <h3
                className="mt-3 font-heading font-medium text-midnight leading-snug"
                style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)" }}
              >
                {title}
              </h3>
              <p
                className="mt-4 font-body leading-relaxed"
                style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.6)" }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
