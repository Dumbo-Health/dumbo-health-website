"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LIVE_STATES = ["Florida", "Texas"];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

export function Availability() {
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [interest, setInterest] = useState<"cash" | "insurance">("cash");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !selectedState) return;
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state: selectedState, interest, source: "availability_section" }),
      });
      const data = await res.json();
      if (data.already_exists) setAlreadyExists(true);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-2.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.1, zIndex: 0 }}
      />

      <div className="relative mx-auto max-w-5xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest mb-5"
          style={{ color: "#78BFBC" }}
        >
          Where we&apos;re available
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="font-heading font-medium text-white text-balance leading-tight"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          Starting in Florida and Texas.
          <br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Expanding fast.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          className="mx-auto mt-6 font-body leading-relaxed"
          style={{
            fontSize: "1.125rem",
            color: "rgba(252,246,237,0.75)",
            maxWidth: "48ch",
          }}
        >
          Currently available cash-pay in Florida and Texas. Insurance coverage
          is rolling out state by state, with more states coming soon.
        </motion.p>

        {/* State pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {LIVE_STATES.map((state) => (
            <span
              key={state}
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(120,191,188,0.15)",
                border: "1px solid rgba(120,191,188,0.3)",
                color: "#78BFBC",
              }}
            >
              {state} — Live
            </span>
          ))}
          <span
            className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            More states soon
          </span>
        </motion.div>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
          className="mt-10 mx-auto"
          style={{ maxWidth: "420px" }}
        >
          {!submitted ? (
            <>
              <p
                className="font-body mb-5"
                style={{ fontSize: "0.9375rem", color: "rgba(252,246,237,0.7)" }}
              >
                Not in Florida or Texas yet?
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl px-4 py-3.5 font-body text-base outline-none"
                  style={{
                    backgroundColor: "rgba(252,246,237,0.07)",
                    border: "1px solid rgba(252,246,237,0.15)",
                    color: "#FCF6ED",
                  }}
                />

                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-xl px-4 py-3.5 font-body text-base outline-none"
                  style={{
                    backgroundColor: "rgba(252,246,237,0.07)",
                    border: "1px solid rgba(252,246,237,0.15)",
                    color: selectedState ? "#FCF6ED" : "rgba(252,246,237,0.4)",
                  }}
                >
                  <option value="" style={{ color: "#031F3D" }}>Select your state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s} style={{ color: "#031F3D" }}>{s}</option>
                  ))}
                </select>

                <div className="flex justify-center gap-6">
                  {(["cash", "insurance"] as const).map((opt) => (
                    <label key={opt} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="availability-interest"
                        value={opt}
                        checked={interest === opt}
                        onChange={() => setInterest(opt)}
                        className="accent-peach"
                      />
                      <span className="font-body text-sm" style={{ color: "rgba(252,246,237,0.8)" }}>
                        {opt === "cash" ? "Cash-pay" : "Insurance"}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email || !selectedState}
                  className="inline-flex h-12 items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    backgroundColor: "#FF8361",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(255,131,97,0.3)",
                  }}
                >
                  {loading ? "Joining..." : "Join the early access waitlist"}
                </button>

                <p
                  className="font-body text-xs"
                  style={{ color: "rgba(252,246,237,0.35)" }}
                >
                  By joining you agree to our{" "}
                  <a href="/terms-of-use" className="underline hover:opacity-70">Terms of Use</a>. No spam, ever.
                </p>
              </div>
            </>
          ) : (
            <div className="py-2">
              {alreadyExists ? (
                <>
                  <p className="font-heading text-xl font-medium" style={{ color: "#FCF6ED" }}>
                    You&apos;re already on the list.
                  </p>
                  <p className="mt-2 font-body" style={{ color: "rgba(252,246,237,0.6)", fontSize: "1rem" }}>
                    We&apos;ll reach out as soon as Dumbo Health launches in {selectedState}.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-heading text-xl font-medium" style={{ color: "#FCF6ED" }}>
                    You&apos;re on the list.
                  </p>
                  <p className="mt-2 font-body" style={{ color: "rgba(252,246,237,0.6)", fontSize: "1rem" }}>
                    We&apos;ll reach out as soon as Dumbo Health launches in {selectedState}.
                  </p>
                </>
              )}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
