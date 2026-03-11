"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const pillars = [
  {
    title: "Data-driven delivery",
    desc: "Ships based on your actual usage, not a generic calendar.",
  },
  {
    title: "No guesswork",
    desc: "We track component wear so you always have what you need, before you run out.",
  },
  {
    title: "Cancel anytime",
    desc: "No long-term commitment. Stay because it works, not because you're locked in.",
  },
];

export function ResupplySection() {
  return (
    <section id="resupply" className="bg-daylight py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Resupply program
          </p>
          <h2 className="mt-2 font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
            Supplies when you actually need them.
          </h2>
          <p className="mx-auto mt-5 font-body text-midnight/65 text-balance" style={{ fontSize: "1.125rem", maxWidth: "50ch" }}>
            Don't want to migrate your device? No problem. Dumbo uses your CPAP usage data to send supplies at exactly the right time, not on a fixed schedule. Less waste, lower cost, better results.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
          >
            <Link href={APP_URL}>Join the resupply program</Link>
          </Button>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {pillars.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="rounded-2xl border border-sunlight bg-white p-6 text-left"
            >
              <p className="font-body text-base font-bold text-midnight">{item.title}</p>
              <p className="mt-1.5 font-body text-sm text-midnight/60">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
