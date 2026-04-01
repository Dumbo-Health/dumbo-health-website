"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATS = [
  { value: "ADA", label: "approved treatment modality for sleep apnea" },
  { value: "AASM", label: "guidelines support oral appliances for mild to moderate OSA" },
  { value: "FDA", label: "cleared device class" },
  { value: "1 device", label: "lasts up to five years with proper care" },
];

const TESTIMONIALS = [
  {
    quote:
      "For patients who cannot tolerate CPAP, a well-fitted oral appliance is a genuinely effective alternative. The key is proper diagnosis and physician oversight throughout the process.",
    name: "Dr. Zachary Adams, MD, MBA",
    credential: "Sleep medicine physician, Fellow of the American Academy of Sleep Medicine",
    image: "/images/team/medical/zachary-adams.avif",
    featured: true,
  },
  {
    quote:
      "CPAP non-compliance is one of the biggest barriers in sleep medicine. Oral appliance therapy gives mild to moderate patients a path they will actually follow through on.",
    name: "Dr. Harrison Gimbel, MD, MS",
    credential: "Sleep medicine physician, telemedicine specialist",
    image: "/images/team/medical/harrison-gimbel.avif",
    featured: false,
  },
  {
    quote:
      "What matters most is that patients start treatment and stay on it. For the right candidate, an oral appliance removes every excuse not to.",
    name: "Kandace DeSadier, APRN, FNP-BC",
    credential: "Nurse practitioner, sleep care specialist",
    image: "/images/team/medical/kandace-desadier.avif",
    featured: false,
  },
];

export function OralClinical() {
  return (
    <section
      className="relative py-20 md:py-24"
      style={{
        background:
          "linear-gradient(to bottom, #FCF6ED 0%, #F5E6D1 30%, #FFD6AD 100%)",
      }}
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
            Clinically supported.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Physician approved.
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
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1 }}
              >
                {s.value}
              </p>
              <p
                className="font-body mt-2 text-pretty"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(3,31,61,0.65)",
                  lineHeight: 1.4,
                }}
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
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
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
