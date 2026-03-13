"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TRUST = [
  "HIPAA-compliant",
  "Month-to-month, no commitment",
  "Human support, always",
];

export function SupportClose() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Warm peach radial — lifts the bottom of the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "65%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,214,173,0.55) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Subtle brand pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          opacity: 0.04,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 28%, transparent 72%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 28%, transparent 72%, black 92%, black 100%)",
        }}
      />

      <div
        className="relative text-center"
        style={{ padding: "0 5%", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="font-mono uppercase tracking-widest mb-6"
          style={{ fontSize: "0.75rem", color: "#78BFBC" }}
        >
          You&apos;ve come this far
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="font-heading font-medium text-balance text-midnight"
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.06,
          }}
        >
          CPAP doesn&apos;t need another chance.{" "}
          <span style={{ color: "#FF8361", fontStyle: "italic" }}>
            It needs the right support.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-7 font-body text-pretty"
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
            color: "rgba(3,31,61,0.60)",
          }}
        >
          The therapy works. The system around it, the monitoring, the
          follow-up, the clinical support between appointments, is what most
          people never had. That&apos;s what Dumbo Health provides.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-13 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 28px rgba(255,131,97,0.35)",
              paddingLeft: "2.25rem",
              paddingRight: "2.25rem",
            }}
          >
            <Link href="/get-started">Start CPAP support today</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-13 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              color: "rgba(3,31,61,0.55)",
              border: "1px solid rgba(3,31,61,0.15)",
            }}
          >
            <Link href="#plans">View plans</Link>
          </Button>
        </motion.div>

        {/* Trust notes */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
          className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2"
        >
          {TRUST.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-mono uppercase tracking-widest"
              style={{ fontSize: "0.65rem", color: "rgba(3,31,61,0.38)" }}
            >
              <span style={{ color: "#78BFBC" }}>✓</span>
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
