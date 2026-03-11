"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./team-card";
import { scientificCommittee, medicalTeam } from "@/content/team";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function TeamSection() {
  return (
    <>
      {/* Scientific Committee */}
      <section
        id="experts"
        className="py-24 md:py-32"
        style={{ backgroundColor: "#FCF6ED" }}
      >
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "#78BFBC" }}
            >
              Scientific committee
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium text-midnight text-balance leading-tight"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", maxWidth: "22ch" }}
            >
              Backed by the people who wrote the book on sleep medicine.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed"
              style={{
                fontSize: "1.0625rem",
                color: "rgba(3,31,61,0.6)",
                maxWidth: "56ch",
              }}
            >
              We are a technology company that takes the medicine as seriously
              as the product. Our scientific committee is the foundation of
              everything we do — UCLA, Yale, Guy&apos;s and St Thomas&apos;,
              AP-HP Paris, and a former French Health Minister.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {scientificCommittee.map((member) => (
              <motion.div
                key={member.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
              >
                <TeamCard member={member} variant="committee" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Medical Team */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "#F5E6D1" }}
      >
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "#78BFBC" }}
            >
              Medical team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium text-midnight text-balance leading-tight"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", maxWidth: "22ch" }}
            >
              The medical minds behind your care.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed"
              style={{
                fontSize: "1.0625rem",
                color: "rgba(3,31,61,0.6)",
                maxWidth: "52ch",
              }}
            >
              These are the clinicians patients actually interact with. Board-certified,
              telehealth-native, and focused on one thing: helping you sleep better.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {medicalTeam.map((member) => (
              <motion.div
                key={member.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                }}
              >
                <TeamCard member={member} variant="medical" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
