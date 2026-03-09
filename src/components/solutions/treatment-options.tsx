"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const options = [
  {
    title: "CPAP Machine",
    description:
      "The right CPAP machine, with all the parts and refills shipped on your schedule.",
    image: "/images/products/cpap-machine.png",
    imageAlt: "CPAP Machine",
  },
  {
    title: "Oral Device",
    description: "A custom crafted oral device delivered to your door.",
    image: "/images/products/oral-appliance.jpg",
    imageAlt: "Oral device for sleep apnea",
  },
  {
    title: "Telehealth Experts",
    description:
      "Licensed sleep specialists guide your diagnosis and care with expert help, when you need it.",
    image: "/images/team/doctor-2.jpg",
    imageAlt: "Telehealth Experts",
  },
];

export function TreatmentOptions() {
  return (
    <section id="step-2" className="bg-sunlight py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-tag uppercase tracking-widest text-teal">
            Patient first personalized care
          </p>
          <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-h2">
            Sleep Apnea treatment options
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {options.map((opt) => (
            <motion.div
              key={opt.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="overflow-hidden rounded-2xl bg-white"
            >
              <div className="relative aspect-[4/3] bg-light-peach/30">
                <Image
                  src={opt.image}
                  alt={opt.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-medium text-midnight">
                  {opt.title}
                </h3>
                <p className="mt-2 font-body text-body text-midnight/70">
                  {opt.description}
                </p>
                <Button asChild size="lg" className="mt-4 w-full rounded-[12px] bg-peach text-white hover:bg-peach/90 font-body font-bold">
                  <Link href="https://app.dumbo.health/">Get started</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
