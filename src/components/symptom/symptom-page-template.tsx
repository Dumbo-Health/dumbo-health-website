"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { APP_URL, SHOPIFY } from "@/lib/constants";
import type { SymptomPage } from "@/content/symptom-pages";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Ticker / Hero ────────────────────────────────────────────────────────────

function SymptomHero({ page }: { page: SymptomPage }) {
  return (
    <>
      <TrustMarquee />
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
      >
        {/* Lifeline background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/Vector-1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-0 w-full"
          style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.08, zIndex: -1 }}
        />

        <div className="mx-auto max-w-4xl px-[5%] text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: page.accentColor }}
          >
            Does this sound like you?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="font-heading font-medium leading-tight text-balance"
            style={{ color: "#FCF6ED", fontSize: "clamp(2.8rem, 6vw, 4.8rem)" }}
          >
            {page.headlinePre}{" "}
            <span style={{ color: page.accentColor }}>{page.headlineAccent}</span>
            {page.headlinePost && <> {page.headlinePost}</>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mt-6 font-body leading-relaxed mx-auto text-balance"
            style={{ fontSize: "1.125rem", color: "rgba(252,246,237,0.65)", maxWidth: "52ch" }}
          >
            {page.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              asChild
              className="h-12 rounded-[12px] bg-peach px-8 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.3)" }}
            >
              <a href={SHOPIFY.buyUrl}>Start your sleep test — $149</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 px-8 font-body text-sm font-medium rounded-[12px] transition-all"
              style={{ color: "rgba(252,246,237,0.5)", border: "1px solid rgba(252,246,237,0.12)" }}
            >
              <Link href="/pricing">See our plans</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ─── Why This Happens ─────────────────────────────────────────────────────────

function WhyThisHappens({ page }: { page: SymptomPage }) {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#FCF6ED" }}>
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: page.accentColor }}
            >
              Why this happens
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium text-midnight leading-tight text-balance"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              {page.whyHeadline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
              className="mt-5 font-body leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.65)" }}
            >
              {page.whyBody}
            </motion.p>

            <motion.ul
              className="mt-7 flex flex-col gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {page.whyBullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                  }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${page.accentColor}20`, border: `1px solid ${page.accentColor}40` }}
                  >
                    <Check className="h-3 w-3" style={{ color: page.accentColor }} />
                  </span>
                  <p className="font-body leading-snug" style={{ fontSize: "1rem", color: "rgba(3,31,61,0.7)" }}>
                    {bullet}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            style={{ border: "1px solid rgba(3,31,61,0.07)" }}
          >
            <Image
              src={page.whyImage}
              alt={page.whyImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── The Good News ────────────────────────────────────────────────────────────

function TheGoodNews({ page }: { page: SymptomPage }) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(252,246,237,0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          zIndex: -1,
        }}
      />

      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-14 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: page.accentColor }}
          >
            The good news
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium leading-tight text-balance"
            style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
          >
            {page.goodNewsPivot}
          </motion.h2>
        </div>

        <motion.div
          className="grid gap-5 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {page.goodNewsSteps.map((step) => (
            <motion.div
              key={step.n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "rgba(252,246,237,0.05)",
                border: "1px solid rgba(252,246,237,0.08)",
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: page.accentColor }}
              >
                {step.n}
              </span>
              <h3
                className="mt-4 font-heading font-medium leading-tight"
                style={{ color: "#FCF6ED", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 font-body leading-relaxed"
                style={{ color: "rgba(252,246,237,0.55)", fontSize: "1rem" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function SymptomCTA({ page }: { page: SymptomPage }) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: "#FF8361" }}
    >
      <div className="mx-auto max-w-3xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono text-xs uppercase tracking-widest mb-5"
          style={{ color: "rgba(3,31,61,0.5)" }}
        >
          Take the first step
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-heading font-medium leading-tight text-balance"
          style={{ color: "#031F3D", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {page.ctaLine}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          className="mt-4 font-body leading-relaxed"
          style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.65)", maxWidth: "42ch", margin: "1rem auto 0" }}
        >
          One overnight test at home. A doctor reviews your results in days. If it&apos;s sleep apnea, treatment can start immediately.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            asChild
            className="h-13 rounded-[12px] bg-midnight px-8 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: "0 4px 24px rgba(3,31,61,0.25)", height: "52px" }}
          >
            <a href={SHOPIFY.buyUrl}>Start your sleep test — $149</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-13 px-8 font-body text-sm font-medium rounded-[12px] transition-all"
            style={{ color: "rgba(3,31,61,0.6)", border: "1px solid rgba(3,31,61,0.15)", height: "52px" }}
          >
            <Link href={APP_URL}>Open the app</Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.36 }}
          className="mt-6 font-body text-sm"
          style={{ color: "rgba(3,31,61,0.45)" }}
        >
          FDA-cleared device. Ships next business day. Results reviewed by a licensed physician.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Assembled Template ───────────────────────────────────────────────────────

export function SymptomPageTemplate({ page }: { page: SymptomPage }) {
  return (
    <>
      <SymptomHero page={page} />
      <WhyThisHappens page={page} />
      <TheGoodNews page={page} />
      <SymptomCTA page={page} />
    </>
  );
}
