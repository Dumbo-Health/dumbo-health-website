"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TeamCard } from "@/components/about/team-card";
import { medicalTeam } from "@/content/team";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ReferralSchema = z.object({
  provider_name: z.string().min(1, "Required"),
  provider_npi: z.string().refine(val => !val || /^\d{10}$/.test(val), "NPI must be 10 digits").optional(),
  practice_name: z.string().min(1, "Required"),
  provider_email: z.string().email("Enter a valid email"),
  provider_fax: z.string().refine(val => !val || val.replace(/\D/g, "").length === 10, "Enter a valid 10-digit fax number").optional(),
  provider_phone: z.string().refine(val => val.replace(/\D/g, "").length === 10, "Enter a valid 10-digit phone number"),
  patient_first_name: z.string().min(1, "Required"),
  patient_last_name: z.string().min(1, "Required"),
  patient_dob: z.string().min(1, "Required").refine(val => !val || new Date(val) <= new Date(), "Date of birth cannot be in the future"),
  patient_mobile: z.string().refine(val => val.replace(/\D/g, "").length === 10, "Enter a valid 10-digit phone number"),
  patient_email: z.string().email("Enter a valid email"),
  patient_state: z.string().min(2, "Required").max(2, "Use 2-letter state code"),
  patient_zip: z.string().regex(/^\d{5}$/, "Enter a valid 5-digit zip"),
  patient_address: z.string().min(1, "Required"),
  referral_reasons: z.array(z.string()).min(1, "Select at least one reason"),
  special_requests: z.string().max(300).optional(),
});

type ReferralFormData = z.infer<typeof ReferralSchema>;

const STEP_FIELDS: Record<number, (keyof ReferralFormData)[]> = {
  1: ["provider_name", "provider_npi", "practice_name", "provider_email", "provider_phone", "provider_fax"],
  2: ["patient_first_name", "patient_last_name", "patient_dob", "patient_mobile", "patient_email", "patient_state", "patient_zip", "patient_address"],
  3: ["referral_reasons"],
};

const FORM_STEPS = [
  { id: 1, label: "Practice" },
  { id: 2, label: "Patient" },
  { id: 3, label: "Referral" },
];

// ── Static data ───────────────────────────────────────────────────────────────

const WHY_REFER = [
  {
    color: "#78BFBC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Fast",
    body: "Results within 48 hours of their test night. No lab waitlists, no scheduling delays.",
  },
  {
    color: "#FF8361",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Complete",
    body: "We handle testing, physician review, and treatment end-to-end. One hand-off from you.",
  },
  {
    color: "#78BFBC",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3" />
      </svg>
    ),
    title: "Collaborative",
    body: "You stay informed. Email and SMS updates at every clinical milestone.",
  },
];

const PARTNER_TIERS = [
  {
    tag: "Single Referral",
    color: "#78BFBC",
    title: "One patient, one time.",
    body: "Refer a patient for a single home sleep test. We coordinate scheduling, testing, physician review, and follow-up. You receive the results.",
    ideal: "Ideal for: any licensed clinician",
  },
  {
    tag: "Practice Partner",
    color: "#FF8361",
    title: "Volume referrals for your clinic.",
    body: "Your clinic refers multiple patients. We handle device delivery, testing, and all follow-up care. Dumbo Health interprets results and coordinates with your team.",
    ideal: "Ideal for: primary care, pulmonology, ENT",
  },
  {
    tag: "Dental Sleep Medicine",
    color: "#78BFBC",
    title: "Testing and oral appliance coordination.",
    body: "Providers with dental sleep expertise refer patients for home testing and coordinate oral appliance therapy through Dumbo Health for confirmed OSA cases.",
    ideal: "Ideal for: dentists, dental sleep medicine specialists",
  },
];

const PROCESS_STEPS = [
  { number: "01", color: "#78BFBC", title: "You submit the referral", body: "Fill out the form with patient and provider details. Takes about 3 minutes." },
  { number: "02", color: "#FF8361", title: "We contact your patient", body: "Dumbo Health reaches out within 1 business day to schedule their home sleep test." },
  { number: "03", color: "#78BFBC", title: "Test ships to their door", body: "FDA-cleared device delivered. Patient wears it one night and sends it back." },
  { number: "04", color: "#FF8361", title: "Our doctors review the data", body: "Board-certified sleep physicians analyze results and generate a clinical report." },
  { number: "05", color: "#78BFBC", title: "Results go to you and your patient", body: "You receive the full report. We handle treatment coordination if indicated." },
];

const WHAT_YOU_NEED = [
  { num: "01", title: "Your practice info", body: "Name, NPI, practice name, email, fax, and phone." },
  { num: "02", title: "Patient demographics", body: "Full name, date of birth, address, and contact information." },
];

const REFERRAL_REASONS = [
  { value: "suspected_sleep_apnea", label: "Suspected sleep apnea (unspecified)" },
  { value: "suspected_osa", label: "Suspected obstructive sleep apnea" },
  { value: "suspected_central", label: "Suspected central sleep apnea" },
  { value: "other", label: "Other" },
];

const FAQS = [
  {
    q: "Can I receive updates on my patient's progress?",
    a: "Yes. You receive an email and SMS when the referral is received, when your patient books their first appointment, and after every clinical touchpoint. You also receive longitudinal therapy updates including adherence data and any treatment adjustments.",
  },
  {
    q: "Do you have a physical location?",
    a: "No. Dumbo Health is a fully digital sleep clinic. All care is delivered via telehealth and home-based testing.",
  },
  {
    q: "Are your services covered by insurance?",
    a: "Dumbo Health is cash pay first with transparent monthly plans. We still collect insurance information at intake for documentation purposes.",
  },
  {
    q: "How does the home sleep test work?",
    a: "After a provider determines a home study is indicated, a one-night testing kit ships to the patient. Data is read by a sleep physician, followed by a detailed review visit covering results and next steps.",
  },
  {
    q: "What treatment options do you provide?",
    a: "Dumbo Health specializes in sleep apnea. We manage PAP therapy end-to-end — from diagnosis to equipment coordination, follow-up, and ongoing coaching — so your patients get consistent, expert care without adding to your workload.",
  },
];

// ── Input character filters (onInput handlers) ────────────────────────────────

function filterTel(e: React.FormEvent<HTMLInputElement>) {
  const t = e.currentTarget;
  const digits = t.value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) { t.value = ""; return; }
  if (digits.length <= 3) {
    t.value = `(${digits}`;
  } else if (digits.length <= 6) {
    t.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    t.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}
function filterDigits(e: React.FormEvent<HTMLInputElement>) {
  const t = e.currentTarget;
  t.value = t.value.replace(/\D/g, "");
}
function filterZip(e: React.FormEvent<HTMLInputElement>) {
  const t = e.currentTarget;
  t.value = t.value.replace(/[^\d-]/g, "");
}

// ── Shared form styles ────────────────────────────────────────────────────────

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "#FCF6ED",
  border: "1.5px solid rgba(3,31,61,0.10)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontFamily: "'Aeonik', sans-serif",
  fontSize: "15px",
  color: "#031F3D",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Aeonik Mono', monospace",
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(3,31,61,0.45)",
  display: "block",
  marginBottom: "7px",
};

const ERROR_STYLE: React.CSSProperties = {
  fontFamily: "'Aeonik', sans-serif",
  fontSize: "12px",
  color: "#E53E3E",
  marginTop: "5px",
};

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
      {error && <p style={ERROR_STYLE}>{error}</p>}
    </div>
  );
}

// ── GradientBlobs (hero only) ─────────────────────────────────────────────────

function GradientBlobs() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(148deg, #FCF6ED 0%, #F5E6D1 52%, #FFD6AD 100%)",
      }} />
      <motion.div
        animate={{ opacity: [0.28, 0.46, 0.28], scale: [1, 1.12, 1], x: [0, 24, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute", top: "-15%", right: "-8%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,131,97,0.07) 0%, rgba(255,214,173,0.48) 40%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.16, 0.28, 0.16], scale: [1.05, 1, 1.05], x: [0, -16, 0], y: [0, 16, 0] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 3 }}
        style={{
          position: "absolute", bottom: "-18%", left: "-12%",
          width: "50vw", height: "50vw", maxWidth: 640, maxHeight: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,214,173,0.48) 0%, transparent 65%)",
        }}
      />
    </>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <GradientBlobs />
        {/* Bottom fade — blends hero into WhyReferSection (#F5E6D1) */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 160,
          background: "linear-gradient(to bottom, transparent, #F5E6D1)",
        }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: EASE, duration: 0.4 }}
          >
            Providers and Partners
          </motion.p>
          <motion.h1
            className="font-heading text-[44px] font-medium leading-[1.08] text-midnight sm:text-[56px] lg:text-[64px] lg:leading-[1.05]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.45, delay: 0.05 }}
          >
            The sleep apnea specialist that follows through.
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed md:text-xl"
            style={{ color: "rgba(3,31,61,0.6)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.15 }}
          >
            Sleep apnea only — home sleep testing, physician review, and full treatment coordination in one place. Transparent pricing your patients can count on. Results within 48 hours of their test night.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.25 }}
          >
            <a
              href="#referral-form"
              className="font-mono text-sm uppercase tracking-wider"
              style={{ background: "#FF8361", color: "#FFFFFF", borderRadius: 12, padding: "15px 36px", textDecoration: "none", display: "inline-block", letterSpacing: "0.08em" }}
            >
              Refer a Patient
            </a>
            <a
              href="#how-it-works"
              className="font-mono text-sm uppercase tracking-wider"
              style={{ background: "transparent", color: "#031F3D", border: "1.5px solid rgba(3,31,61,0.22)", borderRadius: 12, padding: "15px 36px", textDecoration: "none", display: "inline-block", letterSpacing: "0.08em" }}
            >
              See How It Works
            </a>
          </motion.div>
          <motion.p
            className="font-mono text-xs uppercase tracking-wider mt-8"
            style={{ color: "rgba(3,31,61,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.35 }}
          >
            Sleep apnea only&nbsp;&middot;&nbsp;Licensed in FL and TX&nbsp;&middot;&nbsp;FDA-cleared testing&nbsp;&middot;&nbsp;Transparent pricing
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ── WhyReferSection — gradient continues from hero ────────────────────────────

function WhyReferSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #F5E6D1 0%, #FCF6ED 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Why Dumbo Health
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "26ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Everything your patient needs. Nothing that slows you down.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {WHY_REFER.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl p-8"
              style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(3,31,61,0.06)", cursor: "default" }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: item.color === "#78BFBC" ? "rgba(120,191,188,0.12)" : "rgba(255,131,97,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.color, marginBottom: 20,
              }}>
                {item.icon}
              </div>
              <h3 className="font-heading font-medium text-midnight mb-2" style={{ fontSize: 20 }}>{item.title}</h3>
              <p className="font-body" style={{ color: "rgba(3,31,61,0.65)", fontSize: 16, lineHeight: 1.65 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PartnershipTiersSection — gradient warms before midnight ──────────────────

function PartnershipTiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #FCF6ED 0%, #FFD6AD 45%, #F5E6D1 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Referral Models
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "30ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            One referral or a hundred. We have a model for your practice.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PARTNER_TIERS.map((tier, i) => (
            <motion.div
              key={tier.tag}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl p-8 bg-white flex flex-col"
              style={{ borderTop: `3px solid ${tier.color}`, boxShadow: "0 2px 12px rgba(3,31,61,0.06)", cursor: "default" }}
            >
              <span
                className="font-mono text-xs uppercase tracking-wider inline-block mb-5"
                style={{
                  background: tier.color === "#78BFBC" ? "rgba(120,191,188,0.12)" : "rgba(255,131,97,0.12)",
                  color: tier.color, padding: "4px 12px", borderRadius: 100, alignSelf: "flex-start",
                }}
              >
                {tier.tag}
              </span>
              <h3 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: 20 }}>{tier.title}</h3>
              <p className="font-body mb-5 flex-1" style={{ color: "rgba(3,31,61,0.65)", fontSize: 15, lineHeight: 1.65 }}>{tier.body}</p>
              <p className="font-mono text-xs" style={{ color: "rgba(3,31,61,0.38)" }}>{tier.ideal}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ProcessSection — solid midnight, no gradient ──────────────────────────────

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section id="how-it-works" className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, #F5E6D1 0%, #FCF6ED 100%)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            How It Works
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "26ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            You refer. We handle everything from there.
          </motion.h2>
        </div>
        <div className="relative">
          <div
            className="hidden md:block absolute"
            style={{ top: 23, left: "10%", right: "10%", height: 2, background: "rgba(255,131,97,0.3)", zIndex: 0 }}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
                className="flex flex-col items-center text-center"
                style={{ position: "relative", zIndex: 1 }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "#FFFFFF", border: `2px solid ${step.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Nohemi, sans-serif", fontSize: 13, fontWeight: 500,
                  color: step.color, marginBottom: 20, position: "relative", zIndex: 2,
                }}>
                  {step.number}
                </div>
                <h3 className="font-heading font-medium mb-2" style={{ color: "#031F3D", fontSize: 15, lineHeight: 1.4 }}>{step.title}</h3>
                <p className="font-body text-sm" style={{ color: "rgba(3,31,61,0.6)", lineHeight: 1.65 }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WhatYouNeedSection ────────────────────────────────────────────────────────

function WhatYouNeedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#FCF6ED" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What to Have Ready
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Two things and you are done.
          </motion.h2>
        </div>
        <div className="flex flex-col gap-4">
          {WHAT_YOU_NEED.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.18 + i * 0.1 }}
              className="flex items-start gap-5 rounded-2xl p-6"
              style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(3,31,61,0.05)" }}
            >
              <div style={{
                minWidth: 44, height: 44, borderRadius: 10,
                background: "rgba(120,191,188,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Nohemi, sans-serif", fontSize: 13, fontWeight: 500, color: "#78BFBC",
              }}>
                {item.num}
              </div>
              <div>
                <h3 className="font-heading font-medium text-midnight mb-1" style={{ fontSize: 18 }}>{item.title}</h3>
                <p className="font-body" style={{ color: "rgba(3,31,61,0.65)", fontSize: 15, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
          className="font-body text-sm mt-6"
          style={{ color: "rgba(3,31,61,0.4)" }}
        >
          Prior sleep study records are helpful but not required.
        </motion.p>
      </div>
    </section>
  );
}

// ── MedicalTeamSection ────────────────────────────────────────────────────────

function MedicalTeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#F5E6D1" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Your Clinical Partners
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "28ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            The physicians reading your patients&rsquo; studies.
          </motion.h2>
          <motion.p
            className="font-body mt-4"
            style={{ color: "rgba(3,31,61,0.6)", fontSize: 16, lineHeight: 1.65, maxWidth: "52ch" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            Board-certified sleep physicians with deep telehealth experience. Backed by a scientific committee from UCLA, Yale, and AP-HP Paris.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {medicalTeam.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
            >
              <TeamCard member={member} variant="medical" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ReferralFormSection — midnight bg, multi-step wizard ──────────────────────

function ReferralFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitGuard, setSubmitGuard] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue, trigger } =
    useForm<ReferralFormData>({ resolver: zodResolver(ReferralSchema), defaultValues: { referral_reasons: [] } });

  const watchedReasons = watch("referral_reasons") ?? [];

  function toggleReason(value: string) {
    const current = watch("referral_reasons") ?? [];
    setValue(
      "referral_reasons",
      current.includes(value) ? current.filter((r) => r !== value) : [...current, value],
      { shouldValidate: true }
    );
  }

  async function advance() {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields);
    if (valid) {
      setDirection(1);
      setStep((s) => s + 1);
      // Guard: prevent accidental submit from click-event bleed when Continue
      // button position becomes Submit button position on step transition.
      setSubmitGuard(true);
      setTimeout(() => setSubmitGuard(false), 450);
    }
  }

  function back() { setDirection(-1); setStep((s) => Math.max(1, s - 1)); }

  const onSubmit = async (data: ReferralFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError((body as { error?: string }).error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  if (submitted) {
    return (
      <section id="referral-form" className="py-24 md:py-32" style={{ background: "#031F3D" }}>
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: EASE, duration: 0.5 }}
            className="rounded-3xl p-12"
            style={{ background: "#FFFFFF", boxShadow: "0 32px 80px rgba(0,0,0,0.30)" }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(255,131,97,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF8361" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-heading font-medium text-midnight mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
              Referral received.
            </h2>
            <p className="font-body" style={{ color: "rgba(3,31,61,0.65)", fontSize: 16, lineHeight: 1.75 }}>
              We will reach out to your patient within 1 business day. You will receive email and SMS updates at every step.
            </p>
            <button
              onClick={() => { setSubmitted(false); reset(); setStep(1); }}
              className="font-mono text-sm uppercase tracking-wider mt-10 inline-block"
              style={{
                background: "transparent", color: "#031F3D",
                border: "1.5px solid rgba(3,31,61,0.22)",
                borderRadius: 12, padding: "14px 32px",
                cursor: "pointer", letterSpacing: "0.08em",
              }}
            >
              Submit Another Referral
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="referral-form" className="py-24 md:py-32" style={{ background: "#031F3D" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={sectionRef} className="mb-12 text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Refer a Patient
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Ready to refer?
          </motion.h2>
          <motion.p
            className="font-body mt-3"
            style={{ color: "rgba(252,246,237,0.5)", fontSize: 16 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            Takes about 3 minutes. We handle everything from here.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "#FFFFFF", boxShadow: "0 32px 80px rgba(0,0,0,0.30)" }}
        >
          {/* Step progress */}
          <div style={{ padding: "28px 40px 24px", borderBottom: "1px solid rgba(3,31,61,0.06)" }}>
            <div className="flex items-center">
              {FORM_STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center" style={{ minWidth: 48 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: step > s.id ? "#FF8361" : step === s.id ? "#031F3D" : "transparent",
                      border: step >= s.id ? "none" : "1.5px solid rgba(3,31,61,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}>
                      {step > s.id ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span style={{ fontFamily: "Nohemi, sans-serif", fontSize: 10, fontWeight: 500, color: step === s.id ? "#FCF6ED" : "rgba(3,31,61,0.3)" }}>
                          {String(s.id).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: "'Aeonik Mono', monospace", fontSize: 9,
                      letterSpacing: "0.06em", textTransform: "uppercase" as const,
                      color: step >= s.id ? "rgba(3,31,61,0.65)" : "rgba(3,31,61,0.25)",
                      marginTop: 5, transition: "color 0.3s ease", whiteSpace: "nowrap" as const,
                    }}>
                      {s.label}
                    </span>
                  </div>
                  {i < FORM_STEPS.length - 1 && (
                    <div style={{
                      flex: 1, height: 1.5, margin: "0 4px", marginBottom: 18,
                      background: step > s.id ? "#FF8361" : "rgba(3,31,61,0.10)",
                      transition: "background 0.35s ease",
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div style={{ padding: "36px 40px", minHeight: 320, overflow: "hidden" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.26, ease: EASE }}
                >
                  {step === 1 && (
                    <div>
                      <p className="font-heading font-medium text-midnight mb-7" style={{ fontSize: 19 }}>About your practice</p>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Provider name *" error={errors.provider_name?.message}>
                          <input {...register("provider_name")} style={INPUT_STYLE} placeholder="Dr. Jane Smith" />
                        </Field>
                        <Field label="NPI" error={errors.provider_npi?.message}>
                          <input {...register("provider_npi")} onInput={filterDigits} style={INPUT_STYLE} placeholder="1234567890" maxLength={10} />
                        </Field>
                        <Field label="Practice name *" error={errors.practice_name?.message}>
                          <input {...register("practice_name")} style={INPUT_STYLE} placeholder="Sunrise Medical Group" />
                        </Field>
                        <Field label="Email *" error={errors.provider_email?.message}>
                          <input {...register("provider_email")} type="email" style={INPUT_STYLE} placeholder="dr.smith@practice.com" />
                        </Field>
                        <Field label="Phone *" error={errors.provider_phone?.message}>
                          <input {...register("provider_phone")} type="tel" onInput={filterTel} maxLength={14} style={INPUT_STYLE} placeholder="(555) 000-0000" />
                        </Field>
                        <Field label="Fax" error={errors.provider_fax?.message}>
                          <input {...register("provider_fax")} type="tel" onInput={filterTel} maxLength={14} style={INPUT_STYLE} placeholder="(555) 000-0000" />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="font-heading font-medium text-midnight mb-7" style={{ fontSize: 19 }}>About your patient</p>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="First name *" error={errors.patient_first_name?.message}>
                          <input {...register("patient_first_name")} style={INPUT_STYLE} placeholder="John" />
                        </Field>
                        <Field label="Last name *" error={errors.patient_last_name?.message}>
                          <input {...register("patient_last_name")} style={INPUT_STYLE} placeholder="Doe" />
                        </Field>
                        <Field label="Date of birth *" error={errors.patient_dob?.message}>
                          <input {...register("patient_dob")} type="date" max={new Date().toISOString().split("T")[0]} style={INPUT_STYLE} />
                        </Field>
                        <Field label="Mobile *" error={errors.patient_mobile?.message}>
                          <input {...register("patient_mobile")} type="tel" onInput={filterTel} maxLength={14} style={INPUT_STYLE} placeholder="(555) 000-0000" />
                        </Field>
                        <Field label="Email *" error={errors.patient_email?.message}>
                          <input {...register("patient_email")} type="email" style={INPUT_STYLE} placeholder="patient@email.com" />
                        </Field>
                        <Field label="State *" error={errors.patient_state?.message}>
                          <select {...register("patient_state")} style={{ ...INPUT_STYLE, cursor: "pointer" }}>
                            <option value="">Select state</option>
                            <option value="FL">Florida (FL)</option>
                            <option value="TX">Texas (TX)</option>
                          </select>
                        </Field>
                        <Field label="Zip code *" error={errors.patient_zip?.message}>
                          <input {...register("patient_zip")} onInput={filterDigits} style={INPUT_STYLE} placeholder="33101" maxLength={5} />
                        </Field>
                        <div className="md:col-span-2">
                          <Field label="Street address *" error={errors.patient_address?.message}>
                            <input {...register("patient_address")} style={INPUT_STYLE} placeholder="123 Main St, Miami, FL 33101" />
                          </Field>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <p className="font-heading font-medium text-midnight mb-2" style={{ fontSize: 19 }}>Reason for referral</p>
                      <p className="font-body mb-7" style={{ fontSize: 14, color: "rgba(3,31,61,0.45)" }}>Select all that apply</p>
                      <div className="flex flex-col gap-3 mb-7">
                        {REFERRAL_REASONS.map((reason) => {
                          const selected = watchedReasons.includes(reason.value);
                          return (
                            <button
                              key={reason.value}
                              type="button"
                              onClick={() => toggleReason(reason.value)}
                              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left w-full"
                              style={{
                                background: selected ? "rgba(255,131,97,0.07)" : "#FCF6ED",
                                border: selected ? "1.5px solid #FF8361" : "1.5px solid rgba(3,31,61,0.10)",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <div style={{
                                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                                background: selected ? "#FF8361" : "transparent",
                                border: selected ? "none" : "1.5px solid rgba(3,31,61,0.22)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.15s ease",
                              }}>
                                {selected && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-body" style={{ fontSize: 15, color: "#031F3D" }}>{reason.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.referral_reasons && <p style={ERROR_STYLE}>{errors.referral_reasons.message}</p>}
                      <Field label="Clinical notes (optional)" error={errors.special_requests?.message}>
                        <textarea {...register("special_requests")} rows={3} maxLength={300} style={{ ...INPUT_STYLE, resize: "vertical" }} placeholder="Any additional context for our team..." />
                        <p style={{ fontSize: 12, color: "rgba(3,31,61,0.35)", textAlign: "right", marginTop: 4, fontFamily: "'Aeonik Mono', monospace" }}>
                          {(watch("special_requests") ?? "").length}/300
                        </p>
                      </Field>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {serverError && (
              <p className="font-body text-sm px-10 pb-2" style={{ color: "#E53E3E" }}>{serverError}</p>
            )}
            <div style={{
              padding: "20px 40px 28px",
              borderTop: "1px solid rgba(3,31,61,0.06)",
              display: "flex",
              justifyContent: step > 1 ? "space-between" : "flex-end",
              alignItems: "center",
            }}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{
                    background: "transparent", color: "rgba(3,31,61,0.45)",
                    border: "1.5px solid rgba(3,31,61,0.14)",
                    borderRadius: 12, padding: "12px 24px",
                    cursor: "pointer", letterSpacing: "0.08em",
                  }}
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={advance}
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{ background: "#FF8361", color: "#FFFFFF", border: "none", borderRadius: 12, padding: "13px 32px", cursor: "pointer", letterSpacing: "0.08em" }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || submitGuard}
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{
                    background: (isSubmitting || submitGuard) ? "rgba(255,131,97,0.55)" : "#FF8361",
                    color: "#FFFFFF", border: "none", borderRadius: 12, padding: "13px 32px",
                    cursor: (isSubmitting || submitGuard) ? "not-allowed" : "pointer", letterSpacing: "0.08em",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Referral"}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
          className="font-body text-sm text-center mt-6"
          style={{ color: "rgba(252,246,237,0.28)" }}
        >
          Questions? <a href="mailto:contact@dumbo.health" style={{ color: "rgba(252,246,237,0.5)", textDecoration: "none" }}>contact@dumbo.health</a>
        </motion.p>
      </div>
    </section>
  );
}

// ── FAQSection ────────────────────────────────────────────────────────────────

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#FCF6ED" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-12">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Common Questions
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Before you go.
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl overflow-hidden border-0"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(3,31,61,0.05)" }}
              >
                <AccordionTrigger
                  className="px-6 py-5 font-heading font-medium text-left hover:no-underline"
                  style={{ color: "#031F3D", fontSize: 17 }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-6 font-body"
                  style={{ color: "rgba(3,31,61,0.65)", fontSize: 15, lineHeight: 1.75 }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}


// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReferralsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyReferSection />
        <PartnershipTiersSection />
        <ProcessSection />
        <WhatYouNeedSection />
        <MedicalTeamSection />
        <ReferralFormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
