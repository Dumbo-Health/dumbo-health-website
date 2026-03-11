"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TreatmentStepProps {
  id: string;
  label: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export function TreatmentStep({
  id,
  label,
  title,
  body,
  cta,
  image,
  imageAlt,
  reverse = false,
}: TreatmentStepProps) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:grid-flow-dense" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={reverse ? "lg:col-start-2" : ""}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-teal">
              {label}
            </p>
            <h2
              className="mt-2 font-heading font-medium text-midnight"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              {title}
            </h2>
            <p className="mt-4 font-body text-midnight/70" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
              {body}
            </p>
            {cta && (
              <Button asChild size="lg" className="mt-6 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-sunlight ${reverse ? "lg:col-start-1" : ""}`}
          >
            {image ? (
              <Image
                src={image}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-midnight/30 font-body">
                <p className="text-sm">{imageAlt || "Step image"}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
