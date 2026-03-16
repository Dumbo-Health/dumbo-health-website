"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function FounderStory() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.1, zIndex: 0 }}
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/misc/team-office.jpg"
                alt="Mo and Nico, co-founders of Dumbo Health"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              {/* Warm overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(3,31,61,0.55) 0%, transparent 50%)",
                }}
              />
              {/* Name tags */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="font-mono text-[11px] uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Co-founders
                </p>
                <p
                  className="font-heading font-medium text-white"
                  style={{ fontSize: "1.25rem" }}
                >
                  Mo &amp; Nico
                </p>
              </div>
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
              className="absolute -top-6 -right-4 max-w-xs rounded-2xl p-6 backdrop-blur-sm hidden lg:block"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p
                className="font-heading font-medium leading-snug text-white"
                style={{ fontSize: "1.125rem" }}
              >
                &ldquo;It&apos;s not just a business.
                <br />It&apos;s personal.&rdquo;
              </p>
              <p
                className="mt-3 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Mo, Co-founder
              </p>
            </motion.div>
          </motion.div>

          {/* Story side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: "#78BFBC" }}
            >
              Our story
            </p>

            <h2
              className="font-heading font-medium text-white leading-tight text-balance mb-8"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              Better sleep should be easy.
              <br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>
                We&apos;re building it that way.
              </span>
            </h2>

            <div className="space-y-5">
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "1.125rem", color: "rgba(252,246,237,0.75)" }}
              >
                Mo was diagnosed with sleep apnea in his early thirties. What
                followed was months of navigating a system that felt designed
                for someone else entirely. Long waits, confusing insurance
                paperwork, a CPAP machine handed over with a manual and a
                goodbye. No follow-up. No coaching. No sense that anyone was
                in his corner.
              </p>
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "1.125rem", color: "rgba(252,246,237,0.75)" }}
              >
                Nico came at it from a different angle. A background in health
                technology, and a conviction that the gap between what sleep
                medicine knew and what patients actually experienced was
                fixable with better design, smarter data, and a care model
                that put the patient first.
              </p>
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "1.125rem", color: "rgba(252,246,237,0.75)" }}
              >
                They met and saw immediately they were solving the same problem
                from opposite ends. One had lived it. One had the tools to fix
                it. The result is Dumbo, built from scratch to be the thing
                neither of them could find.
              </p>
            </div>

            {/* Mobile quote */}
            <div
              className="mt-8 rounded-2xl p-6 lg:hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <p
                className="font-heading font-medium text-white leading-snug"
                style={{ fontSize: "1.125rem" }}
              >
                &ldquo;It&apos;s not just a business. It&apos;s personal.&rdquo;
              </p>
              <p
                className="mt-3 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Mo, Co-founder
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
