"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { SHOPIFY } from "@/lib/constants";
import type { SymptomPage } from "@/content/symptom-pages";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Ticker / Hero ────────────────────────────────────────────────────────────

function SymptomHero({ page }: { page: SymptomPage }) {
  return (
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
            className="mt-10 flex justify-center"
          >
            <Button
              asChild
              className="h-12 rounded-[12px] bg-peach px-8 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.3)" }}
            >
              <a href={SHOPIFY.buyUrl}>Start your sleep test · $149</a>
            </Button>
          </motion.div>
        </div>
      </section>
  );
}

// ─── Why This Happens ─────────────────────────────────────────────────────────

function WhyThisHappens({ page }: { page: SymptomPage }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left: image — visual anchor, portrait crop for presence */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-3xl"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src={page.whyImage}
              alt={page.whyImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right: headline + numbered statement cards */}
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
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)" }}
            >
              {page.whyHeadline}
            </motion.h2>

            {/* Numbered statement cards */}
            <motion.div
              className="mt-8 flex flex-col gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
            >
              {page.whyBullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  className="flex gap-5 rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(3,31,61,0.07)",
                    boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
                  }}
                >
                  <span
                    className="font-mono text-sm font-medium shrink-0 pt-0.5"
                    style={{ color: page.accentColor, letterSpacing: "0.05em" }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    className="font-body leading-relaxed text-midnight"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {bullet}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── The Good News ────────────────────────────────────────────────────────────

function TheGoodNews({ page }: { page: SymptomPage }) {
  return (
    <section className="py-20 md:py-28">
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
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
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
                backgroundColor: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(3,31,61,0.07)",
                boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
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
                style={{ color: "#031F3D", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.62)", fontSize: "1rem" }}
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

const CTA_PHOTOS = [
  { src: "/images/people/woman-blue-pajamas.png", alt: "Person waking up refreshed" },
  { src: "/images/people/man-waking-up.png",       alt: "Man waking up after better sleep" },
  { src: "/images/people/man-drinking-coffee.png", alt: "Patient enjoying their morning" },
];

function SymptomCTA({ page }: { page: SymptomPage }) {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED" }}
    >
      {/* Subtle peach dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,131,97,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_440px]">

          {/* ── Left: text ── */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#FF8361" }}
            >
              Take the first step
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight"
              style={{ color: "#031F3D", fontSize: "clamp(2.6rem, 5vw, 4rem)", maxWidth: "16ch" }}
            >
              {page.ctaLine}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
              className="mt-5 font-body leading-relaxed"
              style={{ fontSize: "1.125rem", color: "rgba(3,31,61,0.65)", maxWidth: "44ch" }}
            >
              One overnight test at home. A doctor reviews your results in days. If it&apos;s sleep apnea, treatment can start immediately.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
              className="mt-9"
            >
              <Button
                asChild
                className="h-14 rounded-[12px] px-10 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#FF8361", boxShadow: "0 6px 28px rgba(255,131,97,0.35)" }}
              >
                <a href={SHOPIFY.buyUrl}>Start your sleep test · $149</a>
              </Button>

              <p
                className="mt-4 font-body text-sm"
                style={{ color: "rgba(3,31,61,0.45)" }}
              >
                FDA-cleared device · Ships next business day · Results reviewed by a licensed physician
              </p>
            </motion.div>

            {/* Doctor trust signal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
              className="mt-8 rounded-2xl p-5"
              style={{
                backgroundColor: "rgba(255,131,97,0.08)",
                borderLeft: "3px solid rgba(255,131,97,0.4)",
              }}
            >
              <p
                className="font-body italic leading-relaxed"
                style={{ fontSize: "1rem", color: "rgba(3,31,61,0.75)" }}
              >
                &ldquo;The most common thing I hear after treatment starts? &lsquo;I had no idea I could feel this good.&rsquo;&rdquo;
              </p>
              <p
                className="mt-2 font-mono text-xs uppercase tracking-wider"
                style={{ color: "rgba(3,31,61,0.5)" }}
              >
                Dr. Zachary Adams · Dumbo Health Medical Team
              </p>
            </motion.div>
          </div>

          {/* ── Right: floating photo stack ── */}
          <div className="relative hidden lg:block" style={{ height: "540px" }}>

            {/* Card 1 — back, top-right, bleeds above */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="absolute overflow-hidden rounded-2xl"
              style={{
                width: "230px",
                height: "290px",
                right: "0px",
                top: "-30px",
                boxShadow: "0 20px 56px rgba(3,31,61,0.22)",
              }}
            >
              <Image src={CTA_PHOTOS[1].src} alt={CTA_PHOTOS[1].alt} fill className="object-cover" sizes="230px" />
            </motion.div>

            {/* Card 2 — front-center, largest, slight counter-rotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="absolute overflow-hidden rounded-2xl"
              style={{
                width: "290px",
                height: "370px",
                left: "20px",
                top: "90px",
                boxShadow: "0 28px 72px rgba(3,31,61,0.28)",
              }}
            >
              <Image src={CTA_PHOTOS[0].src} alt={CTA_PHOTOS[0].alt} fill className="object-cover" sizes="290px" />
            </motion.div>

            {/* Card 3 — bottom-right, bleeds below */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
              className="absolute overflow-hidden rounded-2xl"
              style={{
                width: "210px",
                height: "260px",
                right: "10px",
                bottom: "-30px",
                boxShadow: "0 16px 48px rgba(3,31,61,0.2)",
              }}
            >
              <Image src={CTA_PHOTOS[2].src} alt={CTA_PHOTOS[2].alt} fill className="object-cover" sizes="210px" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Assembled Template ───────────────────────────────────────────────────────

export function SymptomPageTemplate({ page }: { page: SymptomPage }) {
  return (
    <>
      <SymptomHero page={page} />
      <TrustMarquee />
      <div style={{ background: "linear-gradient(to bottom, #FFD6AD 0%, #FCF6ED 100%)" }}>
        <WhyThisHappens page={page} />
        <TheGoodNews page={page} />
      </div>
      <SymptomCTA page={page} />
    </>
  );
}
