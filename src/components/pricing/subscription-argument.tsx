"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BENEFITS = [
  {
    title: "Your machine upgrades automatically.",
    body: "You're never stuck on old hardware. As better technology ships, it ships to you. No repurchasing, no migration headaches.",
  },
  {
    title: "Supplies arrive when you actually need them.",
    body: "Your CPAP sends us usage data. We ship parts when they're worn, not on a fixed calendar. You only pay for what you actually need.",
  },
  {
    title: "You're never doing this alone.",
    body: "A doctor, a coach, and an AI companion are watching your data and proactively helping. Someone is always paying attention to your sleep.",
  },
  {
    title: "If something breaks, it's covered.",
    body: "Accidents happen. On Premium and Elite plans, device issues are covered. No out-of-pocket replacement costs, no unpleasant surprises.",
  },
];

export function SubscriptionArgument() {
  return (
    <section style={{ backgroundColor: "#F5E6D1" }} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left: heading block */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "#78BFBC" }}
            >
              Why subscribe?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight text-balance"
              style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              Yes, you can buy a CPAP on Amazon. Here&apos;s what you won&apos;t get.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed"
              style={{ color: "rgba(3,31,61,0.65)", fontSize: "1.125rem", maxWidth: "46ch" }}
            >
              A CPAP machine is a purchase. Dumbo is a care relationship. The
              difference is everything that happens after the box arrives.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
              className="mt-4 font-body leading-relaxed"
              style={{ color: "rgba(3,31,61,0.45)", fontSize: "1rem", maxWidth: "46ch" }}
            >
              Think of it as the difference between buying a treadmill and joining
              a gym with a personal trainer.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
              className="mt-8"
            >
              <Button
                asChild
                className="h-12 rounded-[12px] bg-midnight px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: "0 4px 20px rgba(3,31,61,0.18)" }}
              >
                <Link href="#plans">See what&apos;s included</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: benefits */}
          <div className="flex flex-col gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.09 }}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#FCF6ED",
                  border: "1px solid rgba(3,31,61,0.07)",
                }}
              >
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.125rem" }}
                >
                  {b.title}
                </p>
                <p
                  className="mt-2 font-body leading-relaxed"
                  style={{ color: "rgba(3,31,61,0.6)", fontSize: "1rem" }}
                >
                  {b.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
