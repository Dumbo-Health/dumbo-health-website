"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useQuiz } from "@/hooks/useQuiz";
import type { QuizOption, ResultsTemplate } from "@/types/quiz";

// ── Motion config ──────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const t = (delay = 0, duration = 0.4) => ({ ease: EASE, duration, delay });

const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ── Static data ────────────────────────────────────────────────────────────────
const FLOW_OPTIONS = [
  {
    slug: "undiagnosed",
    icon: "🌙",
    title: "I think something might be affecting my sleep",
    subtitle: "Not tested yet. We'll help you figure out what's going on.",
  },
  {
    slug: "diagnosed",
    icon: "💤",
    title: "I've already been diagnosed with sleep apnea",
    subtitle: "We'll help you find the right path forward.",
  },
];


function getRiskLevel(score: number) {
  if (score >= 4) return { label: "High likelihood", color: "#FF8361", bar: 1 };
  if (score >= 2) return { label: "Moderate likelihood", color: "#78BFBC", bar: 0.6 };
  return { label: "Some indicators present", color: "#78BFBC", bar: 0.3 };
}

// ── Shared card wrapper ────────────────────────────────────────────────────────
function QuizCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 28,
        boxShadow: "0 4px 40px rgba(3,31,61,0.07), 0 1px 4px rgba(3,31,61,0.04)",
        padding: "clamp(28px, 6vw, 48px)",
        maxWidth: 560,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Flow splitter (entry screen) ───────────────────────────────────────────────
function FlowSplitter({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.05)}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF8361", marginBottom: 18 }}>
          Sleep assessment
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(0.1)}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.875rem, 5vw, 2.75rem)", color: "#031F3D", lineHeight: 1.12, marginBottom: 12 }}>
          Where are you on your sleep journey?
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.18)}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(3,31,61,0.5)", marginBottom: 36 }}>
          We&apos;ll personalize everything based on your answers.
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FLOW_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.22 + i * 0.07)}
              whileHover={{ y: -2, boxShadow: "0 10px 36px rgba(3,31,61,0.12)" }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(opt.slug)}
              style={{
                backgroundColor: "white",
                border: "1.5px solid rgba(3,31,61,0.09)",
                borderRadius: 20,
                padding: "20px 22px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 2px 12px rgba(3,31,61,0.05)",
                transition: "border-color 0.2s",
              }}
            >
              <span style={{ fontSize: "1.625rem", lineHeight: 1, flexShrink: 0 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1rem", color: "#031F3D", marginBottom: 2, lineHeight: 1.3 }}>
                  {opt.title}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.45)" }}>
                  {opt.subtitle}
                </p>
              </div>
              <span style={{ color: "rgba(3,31,61,0.2)", fontSize: "1rem", flexShrink: 0 }}>→</span>
            </motion.button>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.4)}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(3,31,61,0.3)", marginTop: 24 }}>
          ~3 minutes · No account required
        </motion.p>
      </div>
    </div>
  );
}

// ── Section interstitial ───────────────────────────────────────────────────────
function SectionInterstitial({ title, subtitle, onContinue }: { title: string; subtitle: string; onContinue: () => void }) {
  return (
    <motion.div {...fadeSlide} transition={t()} style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={t(0.1, 0.5)}
          style={{ width: 40, height: 3, backgroundColor: "#FF8361", borderRadius: 2, margin: "0 auto 24px" }} />
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(0.15)}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", color: "#031F3D", lineHeight: 1.15, marginBottom: 14 }}>
          {title}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.22)}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.6, marginBottom: 36 }}>
          {subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.28)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          style={{
            backgroundColor: "#FF8361",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px 36px",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(255,131,97,0.3)",
          }}
        >
          Continue →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Option button ──────────────────────────────────────────────────────────────
function OptionBtn({ label, selected, onClick, type }: { label: string; selected: boolean; onClick: () => void; type: "radio" | "checkbox" }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: selected ? "rgba(255,131,97,0.07)" : "rgba(252,246,237,0.9)" }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      style={{
        width: "100%",
        backgroundColor: selected ? "rgba(255,131,97,0.06)" : "white",
        border: selected ? "2px solid #FF8361" : "1.5px solid rgba(3,31,61,0.1)",
        borderRadius: 14,
        padding: "13px 16px",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "background-color 0.12s, border-color 0.12s",
      }}
    >
      <span style={{
        width: 20, height: 20,
        borderRadius: type === "radio" ? "50%" : 6,
        border: selected ? "2px solid #FF8361" : "2px solid rgba(3,31,61,0.18)",
        backgroundColor: selected ? "#FF8361" : "transparent",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.12s ease",
      }}>
        {selected && (
          <span style={{ color: "white", fontSize: type === "radio" ? "0.5rem" : "0.65rem", fontWeight: 700, lineHeight: 1 }}>
            {type === "radio" ? "●" : "✓"}
          </span>
        )}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "#031F3D", fontWeight: selected ? 500 : 400, lineHeight: 1.35 }}>
        {label}
      </span>
    </motion.button>
  );
}

// ── Question card ──────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  questionNumber,
  totalQuestions,
  canGoBack,
}: {
  question: NonNullable<ReturnType<typeof useQuiz>["currentQuestion"]>;
  currentAnswer: string | string[] | undefined;
  onAnswer: (a: string | string[]) => void;
  onBack: () => void;
  questionNumber: number;
  totalQuestions: number;
  canGoBack: boolean;
}) {
  const [selected, setSelected] = useState<string | string[]>(
    currentAnswer ?? (question.answer_type === "multi_select" ? [] : "")
  );
  const [whyOpen, setWhyOpen] = useState(false);

  useEffect(() => {
    setSelected(currentAnswer ?? (question.answer_type === "multi_select" ? [] : ""));
    setWhyOpen(false);
  }, [question.id, currentAnswer]);

  const options = question.options as QuizOption[];

  function handleSingle(value: string) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 220);
  }

  function handleMulti(value: string) {
    const prev = Array.isArray(selected) ? selected : [];
    if (value === "none") { setSelected(["none"]); return; }
    const without = prev.filter((v) => v !== "none");
    setSelected(without.includes(value) ? without.filter((v) => v !== value) : [...without, value]);
  }

  return (
    <motion.div key={question.id} {...fadeSlide} transition={t()} style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <QuizCard>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          {canGoBack ? (
            <button onClick={onBack}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.4)", background: "none", border: "none", cursor: "pointer", padding: "0 2px", display: "flex", alignItems: "center", gap: 4 }}>
              ← Back
            </button>
          ) : <span />}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", color: "rgba(3,31,61,0.3)", textTransform: "uppercase" }}>
            {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Question */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.3rem, 4vw, 1.625rem)", color: "#031F3D", lineHeight: 1.2, marginBottom: question.why_we_ask ? 10 : 24 }}>
          {question.question_text}
        </h2>

        {/* Why we ask */}
        {question.why_we_ask && (
          <div style={{ marginBottom: 22 }}>
            <button onClick={() => setWhyOpen(!whyOpen)}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#78BFBC", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
              {whyOpen ? "Got it ↑" : "Why do we ask this? ↓"}
            </button>
            <AnimatePresence>
              {whyOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={t(0, 0.25)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.6, marginTop: 8, overflow: "hidden" }}
                >
                  {question.why_we_ask}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.answer_type === "single_select" && options.map((opt, i) => (
            <motion.div key={opt.value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.05 + i * 0.04)}>
              <OptionBtn label={opt.label} selected={selected === opt.value} onClick={() => handleSingle(opt.value)} type="radio" />
            </motion.div>
          ))}

          {question.answer_type === "multi_select" && (
            <>
              {options.map((opt, i) => (
                <motion.div key={opt.value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.05 + i * 0.04)}>
                  <OptionBtn
                    label={opt.label}
                    selected={Array.isArray(selected) && selected.includes(opt.value)}
                    onClick={() => handleMulti(opt.value)}
                    type="checkbox"
                  />
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: Array.isArray(selected) && selected.length > 0 ? 1 : 0.35 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                disabled={!Array.isArray(selected) || selected.length === 0}
                onClick={() => Array.isArray(selected) && selected.length > 0 && onAnswer(selected)}
                style={{
                  marginTop: 4,
                  backgroundColor: "#FF8361",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: Array.isArray(selected) && selected.length > 0 ? "pointer" : "default",
                  boxShadow: "0 4px 16px rgba(255,131,97,0.25)",
                  transition: "opacity 0.2s",
                }}
              >
                Continue →
              </motion.button>
            </>
          )}

          {question.answer_type === "dropdown" && (
            <>
              <select
                value={selected as string}
                onChange={(e) => setSelected(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: selected ? "#031F3D" : "rgba(3,31,61,0.4)",
                  backgroundColor: "white",
                  border: "1.5px solid rgba(3,31,61,0.1)",
                  borderRadius: 14,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23031F3D' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="">Select your state</option>
                {(question.options as QuizOption[]).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                disabled={!selected}
                onClick={() => selected && onAnswer(selected)}
                style={{
                  backgroundColor: selected ? "#FF8361" : "rgba(3,31,61,0.08)",
                  color: selected ? "white" : "rgba(3,31,61,0.3)",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: selected ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                Continue →
              </button>
            </>
          )}
        </div>
      </QuizCard>
    </motion.div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <QuizCard>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            height: i === 1 ? 28 : 52,
            backgroundColor: "rgba(3,31,61,0.05)",
            borderRadius: 10,
            marginBottom: 12,
            animation: "pulse 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </QuizCard>
    </div>
  );
}

// ── Results page ───────────────────────────────────────────────────────────────
function ResultsPage({
  results,
  riskScore,
  tags,
  flowSlug,
  answers,
  onSubmit,
}: {
  results: Record<string, ResultsTemplate>;
  riskScore: number;
  tags: string[];
  flowSlug: string;
  answers: Record<string, string | string[]>;
  onSubmit: () => void;
}) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSent, setWaitlistSent] = useState(false);

  useEffect(() => { onSubmit(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hero = results.hero;
  const product = results.recommendation;
  const waitlist = results.waitlist;

  const risk = getRiskLevel(riskScore);
  const isUndiagnosed = flowSlug === "undiagnosed";

  function getNarrative(): string {
    if (!isUndiagnosed) {
      const satisfaction = answers["cpap-satisfaction"] as string;
      if (satisfaction === "stopped" || satisfaction === "struggling") {
        return "CPAP therapy works really well, but only when it feels comfortable for you. A lot of people stop using it in the first year, usually because of the mask fit, air pressure, or just not having enough support along the way. The good news is that these things are almost always fixable. You don't have to give up.";
      }
      return "Getting diagnosed was the most important step, and you've already done it. Most people live with untreated sleep apnea for years without knowing. Now it's just about finding the right setup that feels comfortable and easy to stick with.";
    }
    if (riskScore >= 6) {
      return "Your answers show several signs that are commonly linked to sleep apnea. Here's what may be happening: while you sleep, your airway briefly closes, which stops your breathing for a moment. Your brain wakes you up just enough to start breathing again, but not enough for you to notice. This can happen dozens of times each night. That's often why people wake up feeling tired, foggy, or unrefreshed, even after what seemed like a full night of sleep.";
    }
    if (riskScore >= 3) {
      return "Your answers show some patterns that are often linked to sleep apnea. It's one of the most common conditions people don't know they have, often mistaken for everyday stress or just feeling tired. A simple overnight test is usually all it takes to find out for sure.";
    }
    return "Your score is on the lower side, but some of what you shared does point to disrupted sleep. Sleep apnea can be easy to miss, especially in women and younger adults. If your sleep is affecting how you feel during the day, a home test is the easiest way to get some answers.";
  }

  type Signal = { icon: string; label: string; detail: string };
  function getSignals(): Signal[] {
    const signals: Signal[] = [];
    const snoring = answers["snoring"] as string;
    const sleepiness = answers["daytime-sleepiness"] as string;
    const pauses = answers["breathing-pauses"] as string;
    const morningSymptoms = (answers["morning-symptoms"] ?? []) as string[];
    const bmi = answers["bmi"] as string;
    const conditions = (answers["conditions"] ?? []) as string[];
    const satisfaction = answers["cpap-satisfaction"] as string;
    const needs = (answers["dx-needs"] ?? []) as string[];

    if (snoring === "yes-loud") signals.push({ icon: "🔊", label: "Loud snoring", detail: "Loud snoring happens when the airway is partially blocked during sleep. It's one of the most common early signs we look for." });
    if (pauses === "yes") signals.push({ icon: "⏸", label: "Breathing pauses during sleep", detail: "When someone else notices that your breathing stops during sleep, that's one of the clearest signs we look for. It's a strong indicator that something is going on." });
    if (sleepiness === "daily") signals.push({ icon: "☁️", label: "Feeling tired every day", detail: "Feeling tired every day, even after a full night of sleep, often means your sleep isn't as restful as it should be. It's one of the most common things people with sleep apnea share with us." });
    if (morningSymptoms.includes("headache")) signals.push({ icon: "🧠", label: "Morning headaches", detail: "Waking up with a headache can be a sign that your oxygen levels dip during the night. This usually goes away once sleep apnea is treated." });
    if (morningSymptoms.includes("dry-mouth")) signals.push({ icon: "💧", label: "Dry mouth in the morning", detail: "Waking up with a dry mouth often means you've been breathing through your mouth at night, which happens when the airway is partially blocked." });
    if (bmi === "overweight" || bmi === "obese") signals.push({ icon: "📊", label: "Weight as a risk factor", detail: "Carrying extra weight, especially around the neck, can make the airway narrower during sleep. It's one of the most common risk factors for sleep apnea, and something treatment can help with." });
    if (conditions.includes("hypertension")) signals.push({ icon: "❤️", label: "High blood pressure", detail: "High blood pressure and sleep apnea often go hand in hand. Each time breathing is disrupted at night, it puts extra stress on the heart. Treating sleep apnea can actually help bring blood pressure down." });
    if (conditions.includes("heart-disease")) signals.push({ icon: "🫀", label: "Heart health", detail: "Untreated sleep apnea puts extra strain on the heart over time. For people with heart conditions, getting tested and treated is especially important." });
    if (satisfaction === "stopped") signals.push({ icon: "🔄", label: "Stopped using CPAP", detail: "Stopping CPAP is more common than most people think. It usually comes down to the mask, the pressure, or just not having the right support. Most of the time, these problems can be fixed." });
    if (satisfaction === "struggling") signals.push({ icon: "⚙️", label: "Struggling with CPAP", detail: "Struggling with CPAP is really common, and it's almost always something we can help with. Better mask fitting, adjusted pressure, and some coaching make a real difference." });
    if (needs.includes("supplies")) signals.push({ icon: "📦", label: "Supplies may be due", detail: "CPAP masks, filters, and tubing wear out over time and can affect how well therapy works. Most insurance plans cover replacements every 90 days." });
    if (tags.includes("cdl-driver")) signals.push({ icon: "🚛", label: "CDL driver", detail: "Commercial drivers with sleep apnea need to be tested and treated to meet FMCSA rules. We handle all the paperwork your medical examiner needs." });
    return signals;
  }

  function getProductBullets(): string[] {
    if (isUndiagnosed) {
      if (tags.includes("cdl-driver")) return ["DOT-accepted testing that meets FMCSA requirements", "A sleep doctor reviews your results within 48 hours", "We prepare all the paperwork your medical examiner needs"];
      return ["An FDA-cleared device arrives at your door in 2 to 3 business days", "One night in your own bed, no clinic visit needed", "A sleep doctor reviews your results and calls you to walk through everything", "Most insurance plans cover the full cost"];
    }
    if (tags.includes("cpap-dropout") || tags.includes("cpap-struggling")) {
      return ["A consultation to find the right mask for you", "Pressure settings adjusted to match how you actually breathe", "Ongoing support through the Dumbo Health app", "Insurance-covered equipment and supplies delivered to you"];
    }
    return ["Insurance-covered CPAP supplies every 90 days", "Regular check-ins with your care team", "Sleep coaching and progress tracking through the Dumbo Health app", "Dedicated care team available by message"];
  }

  const signals = getSignals();
  const bullets = getProductBullets();

  function ResultBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={t(delay)}>
        {children}
      </motion.div>
    );
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Hero section */}
      <ResultBlock delay={0.05}>
        <div style={{ padding: "clamp(40px, 8vw, 72px) 20px clamp(32px, 6vw, 56px)", textAlign: "center", borderBottom: "1px solid rgba(3,31,61,0.06)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF8361", marginBottom: 16 }}>
              Your Results
            </p>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "#031F3D", lineHeight: 1.12, marginBottom: 16 }}>
              {hero?.title ?? "We've reviewed your answers."}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2.5vw, 1.125rem)", color: "rgba(3,31,61,0.6)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              {hero?.body ?? "Based on what you shared, here's what we recommend."}
            </p>
          </div>
        </div>
      </ResultBlock>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Waitlist (out-of-state) — replaces all other content ── */}
        {waitlist ? (
          <ResultBlock delay={0.1}>
            <div style={{ marginTop: 40, textAlign: "center", padding: "44px 32px", backgroundColor: "white", borderRadius: 28, boxShadow: "0 4px 32px rgba(3,31,61,0.07)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(120,191,188,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <span style={{ fontSize: "1.4rem" }}>📍</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.625rem", color: "#031F3D", marginBottom: 12 }}>
                {waitlist.title}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.65, maxWidth: 380, margin: "0 auto 28px" }}>
                {waitlist.body}
              </p>
              {waitlistSent ? (
                <p style={{ fontFamily: "var(--font-body)", color: "#78BFBC", fontWeight: 500 }}>
                  ✓ You&apos;re on the list — we&apos;ll reach out the moment we launch in your state.
                </p>
              ) : (
                <div style={{ display: "flex", gap: 8, maxWidth: 360, margin: "0 auto" }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    style={{ flex: 1, padding: "13px 16px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", border: "1.5px solid rgba(3,31,61,0.12)", borderRadius: 12, color: "#031F3D", backgroundColor: "white", outline: "none" }}
                  />
                  <button
                    onClick={() => waitlistEmail && setWaitlistSent(true)}
                    style={{ backgroundColor: "#FF8361", color: "white", border: "none", borderRadius: 12, padding: "13px 22px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 500, cursor: "pointer", flexShrink: 0 }}
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </ResultBlock>
        ) : (
          <>
            {/* ── Risk bar + narrative (undiagnosed) ── */}
            {isUndiagnosed && (
              <ResultBlock delay={0.1}>
                <div style={{ marginTop: 40, backgroundColor: "white", borderRadius: 24, padding: "28px 32px", boxShadow: "0 2px 20px rgba(3,31,61,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)" }}>
                      Your risk level
                    </p>
                    <span style={{ backgroundColor: risk.color, color: "white", fontSize: "0.7rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 20 }}>
                      {riskScore > 0 ? `${riskScore} indicator${riskScore !== 1 ? "s" : ""}` : "Low score"}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.25rem", color: "#031F3D", marginBottom: 14 }}>
                    {risk.label}
                  </p>
                  <div style={{ height: 7, backgroundColor: "rgba(3,31,61,0.06)", borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.bar * 100}%` }}
                      transition={t(0.3, 0.8)}
                      style={{ height: "100%", backgroundColor: risk.color, borderRadius: 4 }}
                    />
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.7 }}>
                    {getNarrative()}
                  </p>
                </div>
              </ResultBlock>
            )}

            {/* ── Narrative card (diagnosed) ── */}
            {!isUndiagnosed && (
              <ResultBlock delay={0.1}>
                <div style={{ marginTop: 40, backgroundColor: "white", borderRadius: 24, padding: "28px 32px", boxShadow: "0 2px 20px rgba(3,31,61,0.06)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 14 }}>
                    Where you are right now
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.75 }}>
                    {getNarrative()}
                  </p>
                </div>
              </ResultBlock>
            )}

            {/* ── Key signals (from answers) ── */}
            {signals.length > 0 && (
              <ResultBlock delay={0.15}>
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 14 }}>
                    What stood out in your answers
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {signals.map((signal, i) => (
                      <motion.div
                        key={signal.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={t(0.18 + i * 0.04)}
                        style={{ display: "flex", gap: 14, padding: "16px 20px", backgroundColor: "white", border: "1px solid rgba(3,31,61,0.07)", borderRadius: 16 }}
                      >
                        <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>{signal.icon}</span>
                        <div>
                          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#031F3D", marginBottom: 3 }}>{signal.label}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.6 }}>{signal.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ResultBlock>
            )}

            {/* ── Recommendation card (dark) ── */}
            {product && (
              <ResultBlock delay={0.22}>
                <div style={{ marginTop: 28, backgroundColor: "#031F3D", borderRadius: 28, padding: "36px 32px 32px", color: "white" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,131,97,0.8)", marginBottom: 14 }}>
                    Recommended for you
                  </p>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.5rem", color: "white", lineHeight: 1.2, marginBottom: 10 }}>
                    {product.title}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 22 }}>
                    {product.body}
                  </p>
                  <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {bullets.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: "#FF8361", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>✦</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.cta_url ?? "/at-home-sleep-test"}
                    style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "14px 30px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, boxShadow: "0 6px 24px rgba(255,131,97,0.35)" }}
                  >
                    {product.cta_label ?? "Get started →"}
                  </Link>
                </div>
              </ResultBlock>
            )}

            {/* ── Fallback CTA (no product card) ── */}
            {!product && hero?.cta_label && (
              <ResultBlock delay={0.22}>
                <div style={{ marginTop: 28, textAlign: "center" }}>
                  <Link href={hero.cta_url ?? "/at-home-sleep-test"}
                    style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "15px 36px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500, boxShadow: "0 4px 20px rgba(255,131,97,0.3)" }}>
                    {hero.cta_label}
                  </Link>
                </div>
              </ResultBlock>
            )}

            {/* ── What happens next (undiagnosed) ── */}
            {isUndiagnosed && (
              <ResultBlock delay={0.28}>
                <div style={{ marginTop: 36 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 20 }}>
                    Here's what happens next
                  </p>
                  {[
                    { n: "1", title: "We send your test kit", body: "An at-home sleep test kit arrives at your door in 2 to 3 business days. No clinic visit needed." },
                    { n: "2", title: "One night in your own bed", body: "Clip a small device to your finger before bed and sleep as usual. It records your breathing, oxygen levels, and heart rate overnight." },
                    { n: "3", title: "A sleep doctor calls you", body: "Within 48 hours, a sleep doctor reviews your results and calls you to talk through everything, at no extra cost." },
                  ].map((step, i) => (
                    <motion.div key={step.n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={t(0.3 + i * 0.06)}
                      style={{ display: "flex", gap: 18, marginBottom: 22 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: "rgba(255,131,97,0.1)", border: "1.5px solid rgba(255,131,97,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "0.9rem", color: "#FF8361" }}>{step.n}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9375rem", color: "#031F3D", marginBottom: 4 }}>{step.title}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.6 }}>{step.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ResultBlock>
            )}

            {/* ── Trust strip ── */}
            <ResultBlock delay={0.34}>
              <div style={{ marginTop: 12, padding: "20px 24px", backgroundColor: "rgba(120,191,188,0.07)", border: "1px solid rgba(120,191,188,0.18)", borderRadius: 20, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                {["Sleep physicians you can talk to", "FDA-cleared devices", "Insurance billing handled for you", "Your data is always private"].map((item) => (
                  <span key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "rgba(3,31,61,0.5)" }}>
                    <span style={{ color: "#78BFBC" }}>✓</span>
                    {item}
                  </span>
                ))}
              </div>
            </ResultBlock>
          </>
        )}

        {/* ── Back link ── */}
        <ResultBlock delay={0.4}>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(3,31,61,0.07)", textAlign: "center" }}>
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.35)", textDecoration: "none" }}>
              ← Back to Dumbo Health
            </Link>
          </div>
        </ResultBlock>
      </div>
    </div>
  );
}

// ── Main quiz page ─────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [flowSlug, setFlowSlug] = useState<string | null>(null);
  const [shownInterstitials, setShownInterstitials] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quiz = useQuiz(flowSlug ?? "undiagnosed");

  const shouldShowInterstitial =
    quiz.isNewSection &&
    !!quiz.currentSection?.subtitle &&
    !shownInterstitials.has(quiz.currentSection?.id ?? "");

  function handleFlowSelect(slug: string) {
    setFlowSlug(slug);
    setShownInterstitials(new Set());
  }

  function handleInterstitialContinue() {
    if (quiz.currentSection) {
      setShownInterstitials((prev) => new Set([...prev, quiz.currentSection!.id]));
    }
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await quiz.submitResults();
    setIsSubmitting(false);
  }

  // Visible question number (exclude skipped questions from count)
  const visibleQuestions = quiz.state.questions.filter((q) => {
    const section = quiz.state.sections.find((s) => s.id === q.section_id);
    return !section || !quiz.state.skippedSections.includes(section.slug);
  });
  const questionNumber = visibleQuestions.findIndex((q) => q.id === quiz.currentQuestion?.id) + 1;

  return (
    <>
      {/* Progress bar + minimal header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 68, zIndex: 50,
        backgroundColor: "rgba(252,246,237,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(245,230,209,0.7)",
      }}>
        {/* Progress bar */}
        {flowSlug && !quiz.state.isComplete && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "rgba(3,31,61,0.06)" }}>
            <motion.div
              animate={{ width: `${quiz.progress}%` }}
              transition={t(0, 0.5)}
              style={{ height: "100%", backgroundColor: "#FF8361", borderRadius: "0 2px 2px 0" }}
            />
          </div>
        )}
        {/* Logo */}
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link href="/" style={{ opacity: 0.85 }}>
            <Image src="/logos/wordmark-midnight.svg" alt="Dumbo Health" width={148} height={30} priority />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div style={{ paddingTop: 68 }}>
        <AnimatePresence mode="wait">
          {!flowSlug && (
            <motion.div key="splitter" {...fadeSlide} transition={t()}>
              <FlowSplitter onSelect={handleFlowSelect} />
            </motion.div>
          )}

          {flowSlug && quiz.state.isLoading && (
            <motion.div key="loading" {...fadeSlide} transition={t()}>
              <LoadingSkeleton />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && quiz.state.isComplete && (
            <motion.div key="results" {...fadeSlide} transition={t()}>
              <ResultsPage
                results={quiz.getResults()}
                riskScore={quiz.state.riskScore}
                tags={quiz.state.tags}
                flowSlug={quiz.state.flowSlug}
                answers={quiz.state.answers}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && !quiz.state.isComplete && shouldShowInterstitial && quiz.currentSection?.subtitle && (
            <motion.div key={`interstitial-${quiz.currentSection.id}`} {...fadeSlide} transition={t()}>
              <SectionInterstitial
                title={quiz.currentSection.title}
                subtitle={quiz.currentSection.subtitle}
                onContinue={handleInterstitialContinue}
              />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && !quiz.state.isComplete && !shouldShowInterstitial && quiz.currentQuestion && (
            <motion.div key={quiz.currentQuestion.id} {...fadeSlide} transition={t()}>
              <QuestionCard
                question={quiz.currentQuestion}
                currentAnswer={quiz.state.answers[quiz.currentQuestion.slug]}
                onAnswer={(answer) => quiz.answerQuestion(answer)}
                onBack={quiz.goBack}
                questionNumber={questionNumber}
                totalQuestions={visibleQuestions.length}
                canGoBack={quiz.state.currentQuestionIndex > 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skeleton pulse animation */}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </>
  );
}
