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
import { testimonials } from "@/content/testimonials";
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

const THREE_IN_ONE = [
  {
    number: "01",
    label: "Provider",
    title: "Diagnosis and clinical care.",
    body: "Board-certified sleep physicians review every study, write treatment orders, and manage ongoing care. No interpretation outsourced. No third-party signoff.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "DME",
    title: "Equipment shipped to their door.",
    body: "FDA-cleared home sleep testing and CPAP equipment delivered directly to your patient. No third-party DME vendor, no coverage denials, no waiting on authorizations.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Software",
    title: "Adherence tracked. Outcomes reported.",
    body: "Our proprietary adherence platform monitors therapy data in real time, coaches patients through compliance challenges, and sends you longitudinal updates. Most services stop at diagnosis. We don't.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const FULL_PATHWAY = [
  {
    number: "01",
    title: "You submit the referral",
    body: "3 minutes. Practice details, patient demographics, and reason for referral. We take it from there.",
    color: "#78BFBC",
  },
  {
    number: "02",
    title: "We contact your patient",
    body: "Within 1 business day. Scheduling, consent, and shipping address. Handled by our team, not yours.",
    color: "#FF8361",
  },
  {
    number: "03",
    title: "Device ships to their door",
    body: "FDA-cleared home sleep testing kit. One night of sleep. Pre-paid return label. No lab visit required.",
    color: "#78BFBC",
  },
  {
    number: "04",
    title: "Our physicians interpret the data",
    body: "Board-certified sleep physicians score and review the study. Full clinical report generated within 48 hours of their test night.",
    color: "#FF8361",
  },
  {
    number: "05",
    title: "You receive the clinical report",
    body: "AHI, ODI, SpO₂ nadir, total sleep time, severity classification, and a clear treatment recommendation. Delivered to your inbox securely.",
    color: "#78BFBC",
  },
  {
    number: "06",
    title: "We own treatment and follow-through",
    body: "CPAP prescribed, shipped, and coached through our platform. Adherence data tracked. You receive longitudinal updates without managing any of it.",
    color: "#FF8361",
  },
];

const REPORT_METRICS = [
  { label: "AHI", name: "Apnea-Hypopnea Index", desc: "Primary severity metric, events per hour" },
  { label: "ODI", name: "Oxygen Desaturation Index", desc: "Desaturations ≥ 4% per hour" },
  { label: "SpO₂ Nadir", name: "Lowest Oxygen Saturation", desc: "Minimum SpO₂ recorded overnight" },
  { label: "SpO₂ Mean", name: "Average Oxygen Saturation", desc: "Throughout valid recording period" },
  { label: "TST", name: "Total Sleep Time", desc: "Valid recording duration in hours" },
  { label: "Severity + Rec.", name: "Classification & Recommendation", desc: "Mild · Moderate · Severe + clinical next steps" },
];

const PRICING_TIERS = [
  {
    name: "Essentials",
    price: "$59",
    perDay: "~$2/day",
    recommended: false,
    features: [
      "Physician interpretation & report",
      "CPAP therapy + equipment",
      "Standard follow-up care",
      "Updates sent to referring provider",
    ],
  },
  {
    name: "Premium",
    price: "$89",
    perDay: "~$3/day",
    recommended: true,
    features: [
      "Everything in Essentials",
      "Dedicated sleep coach (licensed care team)",
      "Advanced adherence monitoring",
      "Priority results turnaround",
    ],
  },
  {
    name: "Elite",
    price: "$129",
    perDay: "~$4/day",
    recommended: false,
    features: [
      "Everything in Premium",
      "Concierge clinical support (priority care team access)",
      "Direct physician messaging",
      "Custom reporting for your practice",
    ],
  },
];

const REFERRAL_REASONS = [
  { value: "snoring_witnessed_apneas", label: "Snoring with witnessed apneas" },
  { value: "excessive_daytime_sleepiness", label: "Excessive daytime sleepiness (Epworth ≥ 10)" },
  { value: "suspected_osa", label: "Suspected obstructive sleep apnea" },
  { value: "suspected_central", label: "Suspected central sleep apnea" },
  { value: "treatment_resistant_htn", label: "Treatment-resistant hypertension" },
  { value: "afib", label: "Atrial fibrillation (suspected sleep-disordered breathing)" },
  { value: "preop_eval", label: "Pre-operative evaluation" },
  { value: "cpap_failure", label: "CPAP failure or intolerance" },
  { value: "other", label: "Other" },
];

const FAQS = [
  {
    q: "What happens after a positive result?",
    a: "We own the entire post-positive pathway. Our physician generates a treatment recommendation, prescribes PAP therapy if indicated, coordinates equipment delivery, and coaches the patient through onboarding. You receive a treatment summary and ongoing adherence reports. No follow-up action required from your practice.",
  },
  {
    q: "How do I receive my patient's report?",
    a: "Reports are delivered securely via email within 48 hours of your patient's test night. All transmissions are HIPAA-compliant and encrypted. If your practice uses fax, we can route results directly to your existing fax line.",
  },
  {
    q: "Does Dumbo Health accept insurance?",
    a: "Dumbo Health is cash-pay with transparent monthly pricing starting at $59/month. No insurance required, no prior authorizations, no coverage denials for your patients. Pricing is published so patients can plan ahead.",
  },
  {
    q: "What device is used for the home sleep test?",
    a: "We use FDA-cleared Type III home sleep testing devices. The device ships directly to your patient, captures airflow, respiratory effort, oximetry, and position data overnight, and returns via pre-paid label. No in-lab visit required.",
  },
  {
    q: "Does my patient need an order on file?",
    a: "Yes. Our referring provider process ensures a valid order is associated with every study. When you submit a referral, our clinical team coordinates order documentation in compliance with CMS guidelines.",
  },
  {
    q: "Can I send referrals by fax or through our EHR?",
    a: "The fastest method is our online referral form (3 minutes). We also accept fax referrals: send patient demographics and reason for referral to 305.302.5865. EHR integration is available for practice partners with volume referrals. Contact us to set it up.",
  },
];

// ── Input character filters ───────────────────────────────────────────────────

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

// ── GradientBlobs ─────────────────────────────────────────────────────────────

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
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
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
            One referral.<br />We own the whole pathway.
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed md:text-xl"
            style={{ color: "rgba(3,31,61,0.62)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.15 }}
          >
            Sleep apnea only. We are the physician, the equipment supplier, and the adherence platform in one place. Diagnosis, treatment, and follow-through without splitting your patient across multiple vendors.
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
              style={{ background: "#FF8361", color: "#FFFFFF", borderRadius: 12, padding: "15px 36px", textDecoration: "none", display: "inline-flex", flexDirection: "column", alignItems: "center", letterSpacing: "0.08em" }}
            >
              Refer a Patient
              <span style={{ fontSize: "0.62em", opacity: 0.8, marginTop: 2, letterSpacing: "0.05em" }}>FL &amp; TX only</span>
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
            style={{ color: "rgba(3,31,61,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: EASE, duration: 0.4, delay: 0.35 }}
          >
            Sleep apnea only&nbsp;&middot;&nbsp;Licensed in FL and TX&nbsp;&middot;&nbsp;FDA-cleared testing&nbsp;&middot;&nbsp;Results within 48 hours of test night
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ── WhoWeAreSection — midnight, the three-in-one identity statement ───────────

function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#031F3D" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What Makes Us Different
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "28ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            We are the provider, the equipment, and the follow-through.
          </motion.h2>
          <motion.p
            className="font-body mt-4"
            style={{ color: "rgba(252,246,237,0.65)", fontSize: 16, lineHeight: 1.65, maxWidth: "52ch" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            No other sleep service does all three. Most stop at the diagnosis. We serve as your specialist partner — your patients remain yours.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {THREE_IN_ONE.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.12 }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "rgba(252,246,237,0.04)",
                border: "1px solid rgba(252,246,237,0.09)",
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: "rgba(120,191,188,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#78BFBC", marginBottom: 24,
              }}>
                {item.icon}
              </div>
              <span className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#78BFBC" }}>
                {item.number}&nbsp;&middot;&nbsp;{item.label}
              </span>
              <h3 className="font-heading font-medium mb-3" style={{ color: "#FCF6ED", fontSize: 20, lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <p className="font-body flex-1" style={{ color: "rgba(252,246,237,0.65)", fontSize: 15, lineHeight: 1.7 }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.55 }}
        >
          <a
            href="#referral-form"
            className="font-mono text-sm uppercase tracking-wider inline-flex items-center gap-2"
            style={{ color: "#78BFBC", textDecoration: "none" }}
          >
            Refer a Patient &middot; FL &amp; TX
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FullPathwaySection — 6-step journey from referral to follow-through ────────

function FullPathwaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section id="how-it-works" className="py-24 md:py-32" style={{ background: "#F5E6D1" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            The Full Referral Pathway
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "28ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            You refer once. Here&rsquo;s everything that happens next.
          </motion.h2>
        </div>
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute hidden sm:block"
            style={{
              top: 22, bottom: 22, left: 21,
              width: 2,
              background: "linear-gradient(180deg, #78BFBC 0%, #FF8361 20%, #78BFBC 40%, #FF8361 60%, #78BFBC 80%, #FF8361 100%)",
              zIndex: 0, borderRadius: 2,
            }}
          />
          <div className="flex flex-col gap-5">
            {FULL_PATHWAY.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease: EASE, delay: 0.12 + i * 0.09 }}
                className="flex items-start gap-5 rounded-2xl p-6"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(3,31,61,0.06)",
                  position: "relative", zIndex: 1,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: step.color === "#78BFBC" ? "rgba(120,191,188,0.10)" : "rgba(255,131,97,0.08)",
                  border: `2px solid ${step.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Nohemi, sans-serif", fontSize: 12, fontWeight: 500,
                  color: step.color,
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 className="font-heading font-medium text-midnight mb-1" style={{ fontSize: 17, lineHeight: 1.35 }}>
                    {step.title}
                  </h3>
                  <p className="font-body" style={{ color: "rgba(3,31,61,0.6)", fontSize: 15, lineHeight: 1.65 }}>
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
        >
          <a
            href="#referral-form"
            className="font-mono text-sm uppercase tracking-wider inline-flex items-center gap-2"
            style={{ color: "#78BFBC", textDecoration: "none" }}
          >
            Refer a Patient &middot; FL &amp; TX
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── ReportSection — dark, what the physician receives ─────────────────────────

function ReportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#031F3D" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What You Receive
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "28ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            A report built for clinical decision-making.
          </motion.h2>
          <motion.p
            className="font-body mt-4"
            style={{ color: "rgba(252,246,237,0.65)", fontSize: 16, lineHeight: 1.65, maxWidth: "52ch" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            Every study returns a scored, physician-reviewed report with everything needed to make a treatment decision.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(252,246,237,0.04)",
            border: "1px solid rgba(252,246,237,0.09)",
          }}
        >
          {/* Report header bar */}
          <div style={{
            padding: "22px 32px",
            borderBottom: "1px solid rgba(252,246,237,0.08)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          }}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "#78BFBC" }}>
                Dumbo Health Sleep Report
              </p>
              <p className="font-body" style={{ color: "rgba(252,246,237,0.3)", fontSize: 13 }}>
                Home Sleep Test &middot; Physician Reviewed &middot; HIPAA-Compliant Delivery
              </p>
            </div>
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{
                background: "rgba(120,191,188,0.12)",
                color: "#78BFBC",
                padding: "6px 14px", borderRadius: 100, whiteSpace: "nowrap",
              }}
            >
              Within 48 hours of test night
            </span>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-px md:grid-cols-3" style={{ background: "rgba(252,246,237,0.06)" }}>
            {REPORT_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: EASE, delay: 0.35 + i * 0.07 }}
                style={{ padding: "24px 28px", background: "#031F3D" }}
              >
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#78BFBC" }}>
                  {metric.label}
                </p>
                <p className="font-heading font-medium mb-1" style={{ color: "#FCF6ED", fontSize: 15, lineHeight: 1.3 }}>
                  {metric.name}
                </p>
                <p className="font-body" style={{ color: "rgba(252,246,237,0.3)", fontSize: 13 }}>
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: "16px 32px", borderTop: "1px solid rgba(252,246,237,0.08)" }}>
            <p className="font-body text-sm" style={{ color: "rgba(252,246,237,0.45)" }}>
              Reports are encrypted and delivered via secure email to the referring provider. Fax delivery available on request.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.65 }}
        >
          <a
            href="#referral-form"
            className="font-mono text-sm uppercase tracking-wider inline-flex items-center gap-2"
            style={{ color: "#78BFBC", textDecoration: "none" }}
          >
            Refer a Patient &middot; FL &amp; TX
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── PricingSection — patient pricing, visible and transparent ─────────────────

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#FCF6ED" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-16 max-w-xl">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Patient Pricing
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Transparent pricing your patients can plan around.
          </motion.h2>
          <motion.p
            className="font-body mt-4"
            style={{ color: "rgba(3,31,61,0.6)", fontSize: 16, lineHeight: 1.65 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            Cash-pay. No insurance required. No prior authorizations. No surprise bills.
          </motion.p>
        </div>

        {/* Home sleep test banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
          className="flex items-start gap-4 rounded-2xl p-5 mb-10"
          style={{
            background: "#FFFFFF",
            border: "1.5px solid rgba(120,191,188,0.35)",
            boxShadow: "0 2px 10px rgba(3,31,61,0.05)",
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: "rgba(120,191,188,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#78BFBC",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="font-heading font-medium text-midnight mb-1" style={{ fontSize: 15 }}>
              Home Sleep Test: $149 &middot; One-time &middot; Billed separately
            </p>
            <p className="font-body" style={{ color: "rgba(3,31,61,0.55)", fontSize: 14, lineHeight: 1.6 }}>
              The at-home test is purchased once before your patient&rsquo;s test night. It is not part of the monthly plan. Plans cover ongoing care: physician review, equipment, treatment, and adherence follow-up.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-center">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.1 }}
              className="rounded-2xl p-8 flex flex-col relative"
              style={{
                background: tier.recommended ? "#031F3D" : "#FFFFFF",
                boxShadow: tier.recommended
                  ? "0 20px 56px rgba(3,31,61,0.24)"
                  : "0 2px 12px rgba(3,31,61,0.06)",
              }}
            >
              {tier.recommended && (
                <span
                  className="font-mono text-xs uppercase tracking-wider absolute"
                  style={{
                    top: -13, left: "50%", transform: "translateX(-50%)",
                    background: "#FF8361", color: "#FFFFFF",
                    padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </span>
              )}
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: tier.recommended ? "#78BFBC" : "rgba(3,31,61,0.38)" }}
              >
                {tier.name}
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span
                  className="font-heading font-medium"
                  style={{ color: tier.recommended ? "#FCF6ED" : "#031F3D", fontSize: 48, lineHeight: 1 }}
                >
                  {tier.price}
                </span>
                <span
                  className="font-body mb-2"
                  style={{ color: tier.recommended ? "rgba(252,246,237,0.4)" : "rgba(3,31,61,0.38)", fontSize: 16 }}
                >
                  /mo
                </span>
              </div>
              <p
                className="font-mono text-xs mb-1"
                style={{ color: tier.recommended ? "rgba(252,246,237,0.35)" : "rgba(3,31,61,0.32)" }}
              >
                {tier.perDay}
              </p>
              <p
                className="font-mono text-xs mb-7"
                style={{ color: tier.recommended ? "rgba(252,246,237,0.50)" : "rgba(3,31,61,0.55)" }}
              >
                No contracts &middot; Cancel anytime
              </p>
              <div className="flex flex-col gap-3 flex-1 mb-8">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                      background: tier.recommended ? "rgba(120,191,188,0.18)" : "rgba(255,131,97,0.09)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                        stroke={tier.recommended ? "#78BFBC" : "#FF8361"}
                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p
                      className="font-body"
                      style={{
                        fontSize: 14, lineHeight: 1.55,
                        color: tier.recommended ? "rgba(252,246,237,0.65)" : "rgba(3,31,61,0.65)",
                      }}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="font-mono text-xs text-center"
                style={{ color: tier.recommended ? "rgba(252,246,237,0.55)" : "rgba(3,31,61,0.45)" }}
              >
                Use the form below to refer a patient.
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
          className="font-body text-sm text-center mt-8"
          style={{ color: "rgba(3,31,61,0.38)" }}
        >
          Home sleep test: $149, one-time, billed separately. Monthly plan covers ongoing care. No contracts.
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
            Board-certified sleep physicians with deep telehealth experience. Supported by a scientific advisory board with faculty from UCLA, Yale, and AP-HP Paris.
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

// ── ProviderTestimonialsSection — peer-validation from referring physicians ────

function ProviderTestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <section className="py-24 md:py-32" style={{ background: "#FCF6ED" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            What Referring Providers Say
          </motion.p>
          <motion.h2
            className="font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: "28ch" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            Physicians who&rsquo;ve worked with us.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 2px 12px rgba(3,31,61,0.06)",
              }}
            >
              <svg
                width="28" height="28" viewBox="0 0 24 24"
                fill="rgba(255,131,97,0.2)"
                className="mb-5"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-body flex-1" style={{ color: "rgba(3,31,61,0.72)", fontSize: 15, lineHeight: 1.75 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-6 pt-5 flex flex-col"
                style={{ borderTop: "1px solid rgba(3,31,61,0.07)" }}
              >
                <p className="font-heading font-medium" style={{ color: "#031F3D", fontSize: 15 }}>
                  {t.name}
                </p>
                <p className="font-mono text-xs mt-1 uppercase tracking-wider" style={{ color: "#78BFBC" }}>
                  {t.title}
                </p>
              </div>
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
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

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
      // Upload optional document attachment — fire-and-forget, do not block success
      if (attachedFile) {
        const fd = new FormData();
        fd.append("file", attachedFile);
        fd.append("provider_name", data.provider_name);
        fd.append("provider_email", data.provider_email);
        if (data.provider_npi) fd.append("npi", data.provider_npi);
        fd.append("practice_name", data.practice_name);
        fd.append("patient_name", `${data.patient_first_name} ${data.patient_last_name}`);
        fd.append("source", "full_form");
        fetch("/api/referrals/upload", { method: "POST", body: fd }).catch(() => {});
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
              We will reach out to your patient within 1 business day. You will receive email and SMS updates at every clinical milestone.
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
            Send your first referral in 3 minutes.
          </motion.h2>
          <motion.p
            className="font-body mt-3"
            style={{ color: "rgba(252,246,237,0.65)", fontSize: 16 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
          >
            We handle everything from here.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.26 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(120,191,188,0.12)",
              border: "1px solid rgba(120,191,188,0.3)",
              borderRadius: 100,
              padding: "7px 16px",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#78BFBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "#78BFBC" }}>
                HIPAA-Compliant &middot; Encrypted in transit and at rest
              </span>
            </div>
          </motion.div>
        </div>

        {/* Geographic restriction callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
          className="flex items-start gap-3 rounded-2xl p-4 mb-8"
          style={{
            background: "rgba(120,191,188,0.08)",
            border: "1px solid rgba(120,191,188,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78BFBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <p className="font-body text-sm" style={{ color: "rgba(252,246,237,0.72)", lineHeight: 1.6 }}>
            <span className="font-mono" style={{ color: "#78BFBC" }}>Currently accepting referrals for patients in Florida and Texas.</span>
            {" "}Expanding to more states soon. Outside FL or TX?{" "}
            <a href="mailto:contact@dumbo.health" style={{ color: "#78BFBC", textDecoration: "underline" }}>
              Contact us
            </a>{" "}to get on the list.
          </p>
        </motion.div>

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

                      {/* Optional document attachment */}
                      <div style={{ marginTop: 8 }}>
                        <label style={LABEL_STYLE}>Supporting documents (optional)</label>
                        <p style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 13, color: "rgba(3,31,61,0.45)", marginBottom: 10, marginTop: -2 }}>
                          Referral letter, prior sleep study, or other clinical records.
                        </p>
                        {!attachedFile ? (
                          <label
                            htmlFor="doc-upload"
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              justifyContent: "center", gap: 7, width: "100%", padding: "20px 16px",
                              background: "#FCF6ED", border: "1.5px dashed rgba(3,31,61,0.18)",
                              borderRadius: 10, cursor: "pointer", textAlign: "center",
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(3,31,61,0.32)" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 13, color: "rgba(3,31,61,0.52)" }}>
                              Click to attach a file
                            </span>
                            <span style={{ fontFamily: "'Aeonik Mono', monospace", fontSize: 10, color: "rgba(3,31,61,0.32)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              PDF · JPEG · PNG · Max 20 MB
                            </span>
                            <input
                              id="doc-upload"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.tiff,.docx"
                              style={{ display: "none" }}
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) setAttachedFile(f); }}
                            />
                          </label>
                        ) : (
                          <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#FCF6ED", border: "1.5px solid rgba(3,31,61,0.12)",
                            borderRadius: 10, padding: "12px 14px",
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78BFBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 13, color: "#031F3D", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {attachedFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAttachedFile(null)}
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(3,31,61,0.40)", display: "flex" }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
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
                  {step === 1 ? "Next: Patient Info" : "Next: Referral Reason"}
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
          style={{ color: "rgba(252,246,237,0.55)" }}
        >
          Questions?{" "}
          <a href="mailto:contact@dumbo.health" style={{ color: "rgba(252,246,237,0.72)", textDecoration: "none" }}>
            contact@dumbo.health
          </a>
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

// ── QuickUploadSection — document-only alternative path ──────────────────────

function QuickUploadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    provider_name: "",
    provider_email: "",
    npi: "",
    patient_name: "",
  });

  function handleField(e: React.ChangeEvent<HTMLInputElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!fields.provider_name.trim()) { setError("Provider name is required."); return; }
    if (!fields.provider_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.provider_email)) {
      setError("A valid email is required."); return;
    }
    if (!file) { setError("Please attach a document."); return; }
    if (file.size > 20 * 1024 * 1024) { setError("File must be under 20 MB."); return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("provider_name", fields.provider_name);
      fd.append("provider_email", fields.provider_email);
      if (fields.npi) fd.append("npi", fields.npi);
      if (fields.patient_name) fd.append("patient_name", fields.patient_name);
      fd.append("source", "quick_upload");

      const res = await fetch("/api/referrals/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Upload failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    return (
      <section style={{ background: "#F5E6D1" }} className="py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(255,131,97,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF8361" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: 22 }}>
            Documents received.
          </h3>
          <p className="font-body" style={{ color: "rgba(3,31,61,0.65)", fontSize: 15, lineHeight: 1.7 }}>
            Our team will review your documents and follow up within 1 business day.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "#F5E6D1" }} className="py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mb-10">
          <motion.p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "#78BFBC" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
          >
            Already have a referral packet?
          </motion.p>
          <motion.h2
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          >
            Upload your documents directly.
          </motion.h2>
          <motion.p
            className="font-body mt-2"
            style={{ color: "rgba(3,31,61,0.60)", fontSize: 15, lineHeight: 1.65 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.14 }}
          >
            Skip the form. Upload your referral letter or prior sleep study and our team will extract the details and follow up.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="rounded-2xl p-8"
          style={{ background: "#FCF6ED", boxShadow: "0 8px 40px rgba(3,31,61,0.08)" }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-6">
            <Field label="Your name *">
              <input
                name="provider_name"
                value={fields.provider_name}
                onChange={handleField}
                style={INPUT_STYLE}
                placeholder="Dr. Jane Smith"
              />
            </Field>
            <Field label="Your email *">
              <input
                name="provider_email"
                type="email"
                value={fields.provider_email}
                onChange={handleField}
                style={INPUT_STYLE}
                placeholder="dr.smith@practice.com"
              />
            </Field>
            <Field label="NPI (optional)">
              <input
                name="npi"
                value={fields.npi}
                onChange={handleField}
                onInput={filterDigits}
                maxLength={10}
                style={INPUT_STYLE}
                placeholder="10-digit NPI"
              />
            </Field>
            <Field label="Patient name (optional)">
              <input
                name="patient_name"
                value={fields.patient_name}
                onChange={handleField}
                style={INPUT_STYLE}
                placeholder="John Doe"
              />
            </Field>
          </div>

          <div>
            <label style={LABEL_STYLE}>Referral documents *</label>
            {!file ? (
              <label
                htmlFor="quick-doc-upload"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 8, width: "100%", padding: "32px 16px",
                  border: "1.5px dashed rgba(3,31,61,0.22)", borderRadius: 10,
                  cursor: "pointer", textAlign: "center",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(3,31,61,0.35)" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 15, color: "rgba(3,31,61,0.60)" }}>
                  Click to browse or drag and drop
                </span>
                <span style={{ fontFamily: "'Aeonik Mono', monospace", fontSize: 11, color: "rgba(3,31,61,0.38)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  PDF · JPEG · PNG · Max 20 MB
                </span>
                <input
                  id="quick-doc-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.tiff,.docx"
                  style={{ display: "none" }}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }}
                />
              </label>
            ) : (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                border: "1.5px solid rgba(3,31,61,0.12)", borderRadius: 10, padding: "14px 16px",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78BFBC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span style={{ fontFamily: "'Aeonik', sans-serif", fontSize: 14, color: "#031F3D", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(3,31,61,0.45)", display: "flex" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {error && <p style={{ ...ERROR_STYLE, marginTop: 12 }}>{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="font-mono text-sm uppercase tracking-wider mt-7 w-full"
            style={{
              background: uploading ? "rgba(255,131,97,0.55)" : "#FF8361",
              color: "#FFFFFF", border: "none", borderRadius: 12,
              padding: "14px 32px", cursor: uploading ? "not-allowed" : "pointer",
              letterSpacing: "0.08em",
            }}
          >
            {uploading ? "Uploading..." : "Send Documents"}
          </button>

          <p className="font-body text-xs text-center mt-4" style={{ color: "rgba(3,31,61,0.40)" }}>
            Prefer the structured form?{" "}
            <a href="#referral-form" style={{ color: "rgba(3,31,61,0.60)", textDecoration: "underline" }}>
              Fill it out above.
            </a>
          </p>
        </motion.form>
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
        <WhoWeAreSection />
        <FullPathwaySection />
        <ReportSection />
        <MedicalTeamSection />
        <ProviderTestimonialsSection />
        <PricingSection />
        <ReferralFormSection />
        <QuickUploadSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
