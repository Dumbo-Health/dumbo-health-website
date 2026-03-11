"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FEATURES = [
  {
    tag: "Smart resupply",
    title: "Supplies that know when to ship.",
    body: "Your CPAP sends us data. We read when parts are worn. Filters, tubing, masks, they ship before you run out, not on a fixed schedule. You never over-order. You never go without.",
    highlight: true,
  },
  {
    tag: "AI companion",
    title: "24/7 support that knows your sleep.",
    body: "Not a chatbot. Not a FAQ page. An AI that knows how you slept last night, can answer questions about your therapy, and escalates to a real person when you need it.",
    highlight: false,
  },
  {
    tag: "CPAP dashboard",
    title: "Your data, completely yours.",
    body: "Track every night, see your progress, and download reports to share with any provider. Your sleep data doesn't belong to a machine. It belongs to you.",
    highlight: false,
  },
];

export function AppDifferentiators() {
  return (
    <section style={{ backgroundColor: "#031F3D" }} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            What makes Dumbo different
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium leading-tight text-balance"
            style={{ color: "#FCF6ED", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            The parts that don&apos;t show up in any other CPAP offer.
          </motion.h2>
        </div>

        {/* Feature cards */}
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.tag}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: f.highlight
                  ? "rgba(255,131,97,0.1)"
                  : "rgba(252,246,237,0.05)",
                border: f.highlight
                  ? "1px solid rgba(255,131,97,0.2)"
                  : "1px solid rgba(252,246,237,0.08)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-4"
                style={{ color: f.highlight ? "#FF8361" : "#78BFBC" }}
              >
                {f.tag}
              </p>
              <h3
                className="font-heading font-medium leading-tight"
                style={{ color: "#FCF6ED", fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
              >
                {f.title}
              </h3>
              <p
                className="mt-4 font-body leading-relaxed"
                style={{ color: "rgba(252,246,237,0.55)", fontSize: "1.0625rem" }}
              >
                {f.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            className="h-12 rounded-[12px] bg-peach px-8 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.25)" }}
          >
            <Link href={APP_URL}>Open the app</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
