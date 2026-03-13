"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATS = [
  { value: "93%", label: "diagnostic accuracy vs. in-lab sleep study" },
  { value: "48h", label: "average time to physician report" },
  { value: "FDA", label: "cleared Type 3 and 4 sleep study" },
  { value: "1 night", label: "all it takes" },
];

// TOV: testimonials require name, age, and location.
// Only named, credentialed physicians are shown here.
const TESTIMONIALS = [
  {
    quote:
      "The WatchPAT ONE consistently delivers accurate AHI scores in a format patients can actually follow. Convenience removes one of the biggest barriers to getting people properly diagnosed.",
    name: "Dr. Zachary Adams, MD, MBA",
    credential: "Sleep medicine physician, Fellow of the American Academy of Sleep Medicine",
    image: "/images/team/medical/zachary-adams.avif",
    featured: true,
  },
  {
    quote:
      "Home sleep testing has transformed how we diagnose. Patients sleep better in their own environment, which means the data is more representative of a real night. That matters clinically.",
    name: "Dr. Harrison Gimbel, MD, MS",
    credential: "Sleep medicine physician, telemedicine specialist",
    image: "/images/team/medical/harrison-gimbel.avif",
    featured: false,
  },
  {
    quote:
      "What makes the real difference is what happens after diagnosis. Having a team that reads nightly CPAP data and steps in early gives patients a genuine chance at staying on therapy.",
    name: "Kandace DeSadier, APRN, FNP-BC",
    credential: "Nurse practitioner, sleep care specialist",
    image: "/images/team/medical/kandace-desadier.avif",
    featured: false,
  },
];

export function ExpertTrust() {
  return (
    <section
      className="relative py-20 md:py-24"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div
          className="text-center"
          style={{ maxWidth: "560px", margin: "0 auto 3.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            Reviewed by our medical team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Clinically validated.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Personally proven.
            </span>
          </motion.h2>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          style={{ maxWidth: "820px", margin: "0 auto 3rem" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center"
              style={{
                backgroundColor: "rgba(252,246,237,0.7)",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                {s.value}
              </p>
              <p
                className="font-body mt-2 text-pretty"
                style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.4 }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-5 md:grid-cols-3"
          style={{ maxWidth: "1080px", margin: "0 auto" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="rounded-2xl p-7"
              style={
                t.featured
                  ? {
                      backgroundColor: "#031F3D",
                      border: "1px solid rgba(120,191,188,0.2)",
                      boxShadow: "0 8px 32px rgba(3,31,61,0.18)",
                    }
                  : {
                      backgroundColor: "#FCF6ED",
                      border: "1px solid rgba(3,31,61,0.1)",
                      boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
                    }
              }
            >
              <p
                className="font-heading"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 0.8,
                  marginBottom: "1rem",
                  color: t.featured
                    ? "rgba(120,191,188,0.3)"
                    : "rgba(255,131,97,0.18)",
                }}
              >
                &ldquo;
              </p>
              <p
                className="font-body text-pretty"
                style={{
                  fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                  lineHeight: 1.72,
                  color: t.featured
                    ? "rgba(252,246,237,0.8)"
                    : "rgba(3,31,61,0.72)",
                }}
              >
                {t.quote}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover shrink-0"
                  style={{ width: 40, height: 40 }}
                />
                <div>
                  <p
                    className="font-heading font-medium"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.2,
                      color: t.featured ? "#FCF6ED" : "#031F3D",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-body mt-0.5"
                    style={{
                      fontSize: "0.72rem",
                      color: t.featured
                        ? "rgba(252,246,237,0.4)"
                        : "rgba(3,31,61,0.45)",
                    }}
                  >
                    {t.credential}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
