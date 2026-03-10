"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scientificCommittee } from "@/content/team";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Reusable fade-up animation wrapper ────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest" style={{ color: light ? "#78BFBC" : "#78BFBC" }}>
      {children}
    </p>
  );
}

// ── Image carousel ─────────────────────────────────────────────────────────
const CAROUSEL = [
  { src: "/images/products/hst-box.png",     label: "Complete kit" },
  { src: "/images/products/hst.png",          label: "The device" },
  { src: "/images/products/hst-points.png",   label: "How it's worn" },
  { src: "/images/products/hst-results.png",  label: "Your results" },
  { src: "/images/products/dashboard.png",    label: "Track progress" },
];

function ProductCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  function go(idx: number) {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  }
  function prev() { go(active === 0 ? CAROUSEL.length - 1 : active - 1); }
  function next() { go(active === CAROUSEL.length - 1 ? 0 : active + 1); }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#F5E6D1", aspectRatio: "1 / 1" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={CAROUSEL[active].src}
              alt={CAROUSEL[active].label}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(3,31,61,0.12)" }}
          aria-label="Previous image"
        >
          <svg className="h-4 w-4" style={{ color: "#031F3D" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(3,31,61,0.12)" }}
          aria-label="Next image"
        >
          <svg className="h-4 w-4" style={{ color: "#031F3D" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {CAROUSEL.map((img, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="relative flex-1 overflow-hidden rounded-lg transition-all duration-200"
            style={{
              aspectRatio: "1 / 1",
              backgroundColor: "#F5E6D1",
              outline: i === active ? "2px solid #FF8361" : "2px solid transparent",
              outlineOffset: "2px",
            }}
            aria-label={img.label}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-contain p-1.5"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Buy box ────────────────────────────────────────────────────────────────
function BuyBox() {
  return (
    <div className="flex flex-col">
      {/* Eyebrow */}
      <SectionLabel>At-home sleep apnea test</SectionLabel>

      {/* Product name */}
      <h1
        className="mt-2 font-heading font-medium leading-tight"
        style={{ color: "#031F3D", fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
      >
        Sleep in your own bed.<br />
        <span style={{ color: "#FF8361" }}>Get answers in days.</span>
      </h1>

      {/* Price */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-heading text-4xl font-medium" style={{ color: "#031F3D" }}>$149</span>
        <span className="font-body text-lg line-through" style={{ color: "rgba(3,31,61,0.3)" }}>$350</span>
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-xs"
          style={{ backgroundColor: "rgba(255,131,97,0.1)", color: "#FF8361" }}
        >
          Save 58%
        </span>
      </div>

      {/* Short bullets */}
      <ul className="mt-5 space-y-2.5">
        {[
          "FDA-cleared device, ships next business day",
          "Wear it one night, no wires or sleep lab",
          "Board-certified doctor reviews your data",
          "Results and prescription ready in days",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5 font-body text-sm" style={{ color: "rgba(3,31,61,0.75)" }}>
            <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type="button"
        data-shopify-checkout="sleep-test"
        className="mt-6 flex h-14 w-full items-center justify-center rounded-[12px] font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 18px rgba(255,131,97,0.3)" }}
      >
        Order your test · $149
      </button>

      {/* Micro-trust */}
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {["Free shipping", "Doctor-reviewed", "Secure checkout"].map((t) => (
          <span key={t} className="flex items-center gap-1 font-mono text-xs" style={{ color: "rgba(3,31,61,0.4)" }}>
            <svg className="h-3 w-3" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {t}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6" style={{ borderTop: "1px solid rgba(3,31,61,0.07)" }} />

      {/* In-stock status */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-body text-sm text-emerald-700">In stock. Ships next business day.</span>
      </div>

      {/* Product details + Shipping & Returns accordions */}
      <div className="mt-4" style={{ borderTop: "1px solid rgba(3,31,61,0.07)" }}>
        <Accordion type="single" collapsible>

          <AccordionItem value="product-details" style={{ borderColor: "rgba(3,31,61,0.07)" }}>
            <AccordionTrigger
              className="font-body text-sm font-bold hover:no-underline"
              style={{ color: "#031F3D" }}
            >
              Product details
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.65)" }}>
                <p>
                  Our at-home sleep test lets you check for sleep apnea from the comfort of your own bed. It is a simple, one-night test designed to measure key signals related to obstructive sleep apnea (OSA). You wear small sensors on your finger, wrist, and chest that work together with a smartphone app to track how your body breathes and rests during sleep.
                </p>
                <p>
                  After just one night, our medical team reviews your results and determines whether sleep apnea may be affecting your rest. This is a convenient alternative to an overnight sleep lab and works well for most people who want clear answers without a clinic visit.
                </p>
                <div>
                  <p className="font-bold mb-1" style={{ color: "#031F3D" }}>How it works</p>
                  <p>To get started, you will complete a short health questionnaire. This confirms the test is right for you. If your results show signs of sleep apnea, our team will guide you through next steps and talk through treatment options that fit your life. The test is single use and intended for adults 18 and older.</p>
                </div>
                <div>
                  <p className="font-bold mb-2" style={{ color: "#031F3D" }}>What the test measures</p>
                  <ul className="space-y-1.5">
                    {[
                      "Breathing patterns during sleep",
                      "Oxygen levels and heart rate",
                      "Snoring and body position",
                      "Movement and sleep activity",
                      "Chest motion related to breathing",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  You will receive a clear summary of your results, including your AHI score (breathing pauses per hour). If you meet the criteria for obstructive sleep apnea, a prescription for PAP therapy (a pressurized air device that keeps your airway open during sleep) may be recommended.
                </p>
                <div>
                  <p className="font-bold mb-2" style={{ color: "#031F3D" }}>Who this test is for</p>
                  <ul className="space-y-1.5">
                    {[
                      "You snore regularly or wake up short of breath",
                      "You feel tired despite a full night of sleep",
                      "You suspect sleep apnea and want to avoid an overnight lab study",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping-returns" style={{ borderColor: "rgba(3,31,61,0.07)" }}>
            <AccordionTrigger
              className="font-body text-sm font-bold hover:no-underline"
              style={{ color: "#031F3D" }}
            >
              Shipping &amp; returns
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.65)" }}>
                <div>
                  <p className="font-bold mb-2" style={{ color: "#031F3D" }}>Shipping</p>
                  <ul className="space-y-1.5">
                    {[
                      "Free standard shipping on all orders",
                      "Ships next business day after your order is placed",
                      "Arrives in 2 to 5 business days",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2" style={{ color: "#031F3D" }}>Returns</p>
                  <ul className="space-y-1.5">
                    {[
                      "The device is single-use and disposable after one night of testing",
                      "Unopened, unused kits can be returned within 60 days of purchase",
                      "To request a return, email us at contact@dumbo.health",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export function SleepTestLanding() {
  return (
    <>

      {/* ═══ HERO — PDP ABOVE THE FOLD ═══ */}
      <section style={{ backgroundColor: "#FCF6ED", paddingTop: "48px", paddingBottom: "64px", paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductCarousel />
          <BuyBox />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(245,230,209,0.6)", borderBottom: "1px solid rgba(245,230,209,0.6)" }}>
        <div className="flex flex-wrap items-stretch justify-center divide-x divide-midnight/5" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          {[
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              label: "HIPAA compliant",
              caption: "Your health data stays private",
            },
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>,
              label: "FDA-cleared device",
              caption: "Clinically validated for sleep apnea",
            },
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
              label: "Board-certified doctors",
              caption: "Real physicians review every result",
            },
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2M5 8v11a2 2 0 002 2h10a2 2 0 002-2V8"/></svg>,
              label: "Free shipping",
              caption: "Arrives in one to three business days",
            },
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
              label: "$149 flat price",
              caption: "No hidden fees, ever",
            },
            {
              icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
              label: "Dedicated support",
              caption: "Our team is here whenever you need us",
            },
          ].map((t) => (
            <div key={t.label} className="flex flex-1 flex-col items-center gap-1 px-4 py-5 text-center" style={{ minWidth: "120px" }}>
              <span style={{ color: "#78BFBC" }}>{t.icon}</span>
              <p className="font-mono text-xs font-medium uppercase tracking-wide" style={{ color: "#031F3D" }}>{t.label}</p>
              <p className="font-body text-xs" style={{ color: "rgba(3,31,61,0.45)" }}>{t.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS — 3 steps ═══ */}
      <section style={{ backgroundColor: "#F5E6D1", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Simple process</SectionLabel>
          <h2 className="mt-2 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            How it works
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Order and receive your kit",
              desc: "Complete a quick health form. Your kit ships next business day with a step-by-step setup guide inside.",
              img: "/images/products/hst-box.png",
            },
            {
              n: "02",
              title: "Wear it one night at home",
              desc: "Slip the finger device on before bed. It tracks your breathing, oxygen, and heart rate all night. No wires, no lab.",
              img: "/images/products/hst.png",
            },
            {
              n: "03",
              title: "Get results and next steps",
              desc: "A board-certified doctor reviews your data and sends you a clear report within days.",
              img: "/images/products/hst-results.png",
            },
          ].map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ backgroundColor: "#FCF6ED" }}>
                  <Image src={s.img} alt={s.title} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-5">
                  <span className="font-mono text-xs" style={{ color: "#FF8361" }}>{s.n}</span>
                  <h3 className="mt-1 font-heading text-xl font-medium" style={{ color: "#031F3D" }}>{s.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>{s.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-12 text-center">
          <button
            type="button"
            data-shopify-checkout="sleep-test"
            className="inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.2)" }}
          >
            Order your test
          </button>
        </FadeUp>
      </section>

      {/* ═══ WHAT IT MEASURES (dark) ═══ */}
      <section style={{ backgroundColor: "#031F3D", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeUp>
              <SectionLabel>What the device captures</SectionLabel>
              <h2 className="mt-2 font-heading font-medium text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Seven signals. One night.
              </h2>
              <p className="mt-3 font-body text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
                The same clinical-grade data used in sleep labs, captured from your finger at home.
              </p>
            </FadeUp>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Breathing patterns",
                "Blood oxygen (SpO2)",
                "Heart rate",
                "Snoring intensity",
                "Sleep position",
                "Sleep stages",
                "Chest wall effort",
              ].map((label, i) => (
                <FadeUp key={label} delay={i * 0.06}>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "#78BFBC" }} />
                    <span className="font-body text-sm font-medium text-white">{label}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <FadeUp delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <Image src="/images/products/hst-points.png" alt="WatchPAT ONE device with measurement callouts" fill className="object-contain p-8" sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section style={{ backgroundColor: "#fff", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <SectionLabel>What you get</SectionLabel>
            <h2 className="mt-2 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Everything in the box
            </h2>
            <p className="mt-3 font-body text-lg" style={{ color: "rgba(3,31,61,0.55)" }}>
              One price. Everything you need to get a clear answer.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { title: "WatchPAT ONE device", desc: "FDA-cleared disposable finger device, single-use" },
                { title: "Setup guide", desc: "Step-by-step instructions included in the kit" },
                { title: "Single-use design", desc: "Disposable after one night. No returns needed." },
                { title: "Physician review", desc: "A board-certified sleep doctor reviews every result" },
                { title: "Your full sleep report", desc: "Clear, plain-language results with your data" },
                { title: "Prescription if diagnosed", desc: "Included at no extra cost if you have sleep apnea" },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold" style={{ backgroundColor: "#FCF6ED", color: "#FF8361" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="font-body font-bold" style={{ color: "#031F3D" }}>{item.title}</p>
                      <p className="font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl" style={{ backgroundColor: "#F5E6D1" }}>
              <Image src="/images/products/hst-box.png" alt="At-home sleep test kit contents" fill className="object-contain p-10" sizes="(max-width: 768px) 100vw, 45vw" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ WHO IT'S FOR ═══ */}
      <section style={{ backgroundColor: "#F5E6D1", paddingTop: "96px", paddingBottom: "96px", paddingLeft: "5%", paddingRight: "5%" }}>

        <FadeUp className="text-center">
          <SectionLabel>Am I a good fit?</SectionLabel>
          <h2
            className="mt-3 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            This test might be exactly what you need.
          </h2>
          <p className="mx-auto mt-4 font-body text-lg" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "52ch" }}>
            Most people with these signs have never been tested. One night can change that.
          </p>
        </FadeUp>

        {/* ── Good fit ── */}
        <FadeUp delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-3xl lg:grid lg:grid-cols-2" style={{ backgroundColor: "#FCF6ED", border: "1px solid rgba(3,31,61,0.06)" }}>

            {/* Content */}
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <span
                  className="inline-flex w-fit items-center rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest"
                  style={{ backgroundColor: "rgba(255,131,97,0.12)", color: "#FF8361" }}
                >
                  This sounds like you
                </span>

                <ul className="mt-8 space-y-7">
                  {[
                    { icon: "/images/icons/icon-sad.png", text: "You snore loudly, or your partner says you stop breathing at night" },
                    { icon: "/images/icons/icon-clock.png", text: "You wake up tired no matter how many hours you slept" },
                    { icon: "/images/icons/icon-heart.png", text: "You feel foggy, unfocused, or run-down during the day" },
                    { icon: "/images/icons/icon-laptop.png", text: "You want clear answers without a clinic visit or sleep lab" },
                    { icon: "/images/icons/icon-shield.png", text: "Your doctor has suggested you get a sleep study" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-5">
                      <div className="shrink-0" style={{ marginTop: "2px" }}>
                        <Image src={item.icon} alt="" width={28} height={28} className="object-contain" />
                      </div>
                      <span
                        className="font-body font-medium leading-snug"
                        style={{ color: "#031F3D", fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  data-shopify-checkout="sleep-test"
                  className="inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                  style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.25)" }}
                >
                  Order your test · $149
                </button>
              </div>
            </div>

            {/* Photo panel — full image, no crop */}
            <div
              className="hidden lg:flex items-end justify-center overflow-hidden rounded-r-3xl"
              style={{ backgroundColor: "#F5E6D1", minHeight: "400px" }}
            >
              <Image
                src="/images/people/man-waking-up.png"
                alt="Person waking up well-rested"
                width={786}
                height={515}
                className="w-full object-contain object-bottom"
                sizes="50vw"
              />
            </div>
          </div>
        </FadeUp>


      </section>

      {/* ═══ WHAT HAPPENS AFTER CHECKOUT ═══ */}
      <section style={{ backgroundColor: "#031F3D", paddingTop: "100px", paddingBottom: "100px", paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="mx-auto" style={{ maxWidth: "860px" }}>

          {/* Header */}
          <FadeUp className="mb-16">
            <SectionLabel>No surprises</SectionLabel>
            <h2 className="mt-3 font-heading font-medium text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              What happens after checkout
            </h2>
            <p className="mt-3 font-heading font-medium" style={{ color: "#78BFBC", fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}>
              From order to diagnosis in under a week.
            </p>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            {/* Continuous vertical spine — desktop only, positioned at right edge of label column */}
            <div
              className="absolute top-3 bottom-3 hidden md:block"
              style={{ left: "224px", width: "1px", backgroundColor: "rgba(120,191,188,0.18)" }}
            />

            <div className="space-y-10 md:space-y-11">
              {[
                {
                  day: "Day 1",
                  title: "You place your order",
                  desc: "Fill out a quick health form at checkout. Takes less than 3 minutes.",
                },
                {
                  day: "Day 1–2",
                  title: "Kit ships to your door",
                  desc: "Your WatchPAT ONE device ships next business day with everything inside.",
                },
                {
                  day: "Night 3–5",
                  title: "Wear it while you sleep",
                  desc: "Put the device on your finger before bed. The app guides you through setup in seconds.",
                },
                {
                  day: "Morning after",
                  title: "Dispose of the device",
                  desc: "The test is single-use. Discard it after one night. Nothing to mail back.",
                },
                {
                  day: "Within days",
                  title: "Doctor reviews your data",
                  desc: "A board-certified sleep physician reads your results and prepares your full report.",
                },
                {
                  day: "Final step",
                  title: "Your results and care plan arrive",
                  desc: "Clear report, diagnosis, and next steps emailed directly to you. Prescription included at no extra cost if you have sleep apnea.",
                  isLast: true,
                },
              ].map((step, i) => {
                const isLast = !!(step as { isLast?: boolean }).isLast;
                return (
                  <FadeUp key={step.title} delay={i * 0.08}>

                    {/* ── Mobile layout ── */}
                    <div className="md:hidden">
                      <p
                        className="font-heading font-medium leading-tight"
                        style={{ color: isLast ? "#FF8361" : "#78BFBC", fontSize: "1.6rem" }}
                      >
                        {step.day}
                      </p>
                      <h3
                        className="mt-1 font-heading font-medium text-white"
                        style={{ fontSize: isLast ? "1.3rem" : "1.15rem" }}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1.5 font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {step.desc}
                      </p>
                      {isLast && (
                        <button
                          type="button"
                          data-shopify-checkout="sleep-test"
                          className="mt-6 inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                          style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.3)" }}
                        >
                          Start your order · $149
                        </button>
                      )}
                    </div>

                    {/* ── Desktop layout ── */}
                    <div className="hidden md:flex items-start">

                      {/* Time label column — sized to longest label "Morning after", never wraps */}
                      <div
                        className="shrink-0 text-right"
                        style={{ width: "224px", paddingRight: "28px" }}
                      >
                        <span
                          className="font-heading font-medium"
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            lineHeight: "1",
                            paddingTop: "3px",
                            color: isLast ? "#FF8361" : "#78BFBC",
                            fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                          }}
                        >
                          {step.day}
                        </span>
                      </div>

                      {/* Dot pinned on the spine */}
                      <div className="relative shrink-0" style={{ width: "0px" }}>
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: "11px",
                            height: "11px",
                            left: "-5.5px",
                            top: "3px",
                            backgroundColor: isLast ? "#FF8361" : "#78BFBC",
                            boxShadow: isLast
                              ? "0 0 0 5px rgba(255,131,97,0.14)"
                              : "0 0 0 4px rgba(120,191,188,0.12)",
                          }}
                        />
                      </div>

                      {/* Step content */}
                      <div
                        className="flex-1"
                        style={
                          isLast
                            ? {
                                marginLeft: "28px",
                                padding: "24px 28px",
                                backgroundColor: "rgba(255,131,97,0.07)",
                                border: "1px solid rgba(255,131,97,0.18)",
                                borderRadius: "16px",
                              }
                            : { paddingLeft: "28px" }
                        }
                      >
                        <h3
                          className="font-heading font-medium text-white"
                          style={{ fontSize: isLast ? "clamp(1.3rem, 2.2vw, 1.7rem)" : "clamp(1.1rem, 2vw, 1.4rem)" }}
                        >
                          {step.title}
                        </h3>
                        <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {step.desc}
                        </p>
                        {isLast && (
                          <button
                            type="button"
                            data-shopify-checkout="sleep-test"
                            className="mt-6 inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.3)" }}
                          >
                            Start your order · $149
                          </button>
                        )}
                      </div>
                    </div>

                  </FadeUp>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ backgroundColor: "#F5E6D1", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Backed by data</SectionLabel>
          <h2 className="mt-2 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Trusted by patients and doctors alike
          </h2>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { stat: "1M+", label: "Tests performed worldwide", sub: "every year" },
            { stat: "7+", label: "Sleep signals measured", sub: "breathing, oxygen, heart rate and more" },
            { stat: "FDA", label: "Cleared device", sub: "clinical-grade results at home" },
          ].map((item, i) => (
            <FadeUp key={item.stat} delay={i * 0.1}>
              <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#fff", border: "1px solid rgba(3,31,61,0.06)" }}>
                <p className="font-heading text-5xl font-medium" style={{ color: "#FF8361" }}>{item.stat}</p>
                <p className="mt-3 font-body font-bold" style={{ color: "#031F3D" }}>{item.label}</p>
                <p className="mt-1 font-body text-sm" style={{ color: "rgba(3,31,61,0.45)" }}>{item.sub}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ SCIENTIFIC COMMITTEE ═══ */}
      <section style={{ backgroundColor: "#fff", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Expert-led care</SectionLabel>
          <h2 className="mt-2 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Our scientific committee
          </h2>
          <p className="mx-auto mt-3 font-body" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "50ch" }}>
            Board-certified sleep specialists who guide our clinical standards.
          </p>
        </FadeUp>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scientificCommittee.slice(0, 3).map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.1}>
              <div className="h-full rounded-2xl p-6" style={{ backgroundColor: "#FCF6ED", border: "1px solid rgba(3,31,61,0.06)" }}>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image src={member.image || "/images/team/doctor-1.jpg"} alt={member.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-medium" style={{ color: "#031F3D" }}>{member.name}</h3>
                    <p className="font-mono text-xs" style={{ color: "#FF8361" }}>{member.title}</p>
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>{member.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {scientificCommittee.slice(3).map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl p-5" style={{ backgroundColor: "#FCF6ED", border: "1px solid rgba(3,31,61,0.06)" }}>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image src={member.image || "/images/team/doctor-1.jpg"} alt={member.name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-medium" style={{ color: "#031F3D" }}>{member.name}</h3>
                  <p className="font-mono text-xs" style={{ color: "#FF8361" }}>{member.title}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ backgroundColor: "#F5E6D1", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "5%", paddingRight: "5%" }}>
        <FadeUp>
          <SectionLabel>Common questions</SectionLabel>
          <h2 className="mt-2 font-heading font-medium" style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Got questions?
          </h2>
        </FadeUp>
        <div className="mt-8" style={{ maxWidth: "720px" }}>
          <Accordion type="single" collapsible>
            {[
              {
                q: "Can this home sleep test really diagnose sleep apnea?",
                a: "Yes. It is FDA-cleared and built to measure the signals needed to diagnose obstructive sleep apnea. The same technology has been used in tens of thousands of tests with strong clinical accuracy.",
              },
              {
                q: "Do I ever need a sleep lab?",
                a: "Almost never. Fewer than one in 100 people need a full in-lab sleep study. Most people get a complete diagnosis from the home test.",
              },
              {
                q: "How does the testing process work?",
                a: "After completing a short health form, your kit ships next business day. Pair the WatchPAT ONE device with your phone, wear it on your finger overnight. The device is single-use and disposable after one night. A physician reviews your data and sends results within days.",
              },
              {
                q: "What is a home sleep test?",
                a: "A small disposable device worn on your finger overnight. It tracks breathing, blood oxygen (SpO2), heart rate, snoring, and sleep stages using a light sensor. Data uploads automatically through the companion app.",
              },
              {
                q: "What makes Dumbo Health different?",
                a: "Board-certified sleep specialists read every result. We use FDA-cleared technology. One flat price covers the device, physician review, and your prescription if diagnosed. No hidden fees.",
              },
              {
                q: "Why is testing important?",
                a: "When your throat narrows during sleep, your oxygen drops. This stresses your heart, brain, and organs. Untreated sleep apnea is linked to high blood pressure, diabetes, stroke, and chronic fatigue. An accurate diagnosis is the first step toward real treatment.",
              },
            ].map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} style={{ borderColor: "rgba(3,31,61,0.1)" }}>
                <AccordionTrigger className="text-left font-heading text-base font-medium hover:no-underline" style={{ color: "#031F3D" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#FF8361", paddingTop: "130px", paddingBottom: "130px", paddingLeft: "5%", paddingRight: "5%" }}
      >
        {/* ── Isotype tile pattern ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/logos/isotype-white.svg')",
            backgroundSize: "72px 65px",
            backgroundRepeat: "repeat",
            opacity: 0.09,
          }}
        />

        {/* ── Radial vignette: center lit, edges recede ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 75% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 55%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* ── Floating photo cards (desktop only) ── */}

        {/* Top-left — tall portrait, slightly off-screen, tilted left */}
        <div
          className="pointer-events-none absolute hidden lg:block"
          style={{ top: "-10px", left: "-24px", transform: "rotate(-5deg)", transformOrigin: "bottom right" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: "186px", height: "234px", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", border: "2px solid rgba(255,255,255,0.15)" }}
          >
            <Image src="/images/people/man-smiling-in-bed-2.png" alt="" fill className="object-cover object-center" sizes="186px" />
          </div>
        </div>

        {/* Bottom-right — taller card, tilted right */}
        <div
          className="pointer-events-none absolute hidden lg:block"
          style={{ bottom: "-10px", right: "-20px", transform: "rotate(4deg)", transformOrigin: "top left" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: "200px", height: "250px", boxShadow: "0 12px 40px rgba(0,0,0,0.2)", border: "2px solid rgba(255,255,255,0.15)" }}
          >
            <Image src="/images/people/girl-in-bed.png" alt="" fill className="object-cover object-center" sizes="200px" />
          </div>
        </div>

        {/* Top-right — smaller, peeking in */}
        <div
          className="pointer-events-none absolute hidden xl:block"
          style={{ top: "30px", right: "200px", transform: "rotate(3deg)", transformOrigin: "bottom left" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: "148px", height: "186px", boxShadow: "0 10px 32px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.12)" }}
          >
            <Image src="/images/people/woman-blue-pajamas.png" alt="" fill className="object-cover object-top" sizes="148px" />
          </div>
        </div>

        {/* Bottom-left — small, partially cropped */}
        <div
          className="pointer-events-none absolute hidden xl:block"
          style={{ bottom: "20px", left: "180px", transform: "rotate(-3deg)", transformOrigin: "top right" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: "148px", height: "186px", boxShadow: "0 10px 32px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.12)" }}
          >
            <Image src="/images/people/man-with-pillows.png" alt="" fill className="object-cover object-top" sizes="148px" />
          </div>
        </div>

        {/* ── Content ── */}
        <FadeUp className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading font-medium text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Ready to find out how you sleep?
          </h2>
          <p className="mx-auto mt-4 font-body text-lg" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "44ch" }}>
            One night. One device. A clear answer. Better sleep starts here.
          </p>
          <button
            type="button"
            data-shopify-checkout="sleep-test"
            className="mt-8 inline-flex h-14 items-center rounded-[12px] px-10 font-body text-base font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{ backgroundColor: "#fff", color: "#FF8361", boxShadow: "0 6px 28px rgba(0,0,0,0.15)" }}
          >
            Order your test · $149
          </button>
          <p className="mt-4 font-body text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Free shipping &middot; Prescription included &middot; HIPAA compliant
          </p>
        </FadeUp>
      </section>

    </>
  );
}
