"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq, FaqCategory } from "@/lib/supabase";

interface FAQsContentProps {
  faqs: Faq[];
  categories: FaqCategory[];
}

export function FAQsContent({ faqs, categories }: FAQsContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = activeCategory
    ? faqs.filter((f) => f.category_slug === activeCategory)
    : faqs;

  return (
    <section className="bg-daylight pb-20 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-full font-mono text-sm transition-colors ${
              activeCategory === null
                ? "bg-midnight text-white"
                : "bg-sunlight text-midnight hover:bg-light-peach"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full font-mono text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "bg-midnight text-white"
                  : "bg-sunlight text-midnight hover:bg-light-peach"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left font-body text-xl font-medium text-midnight">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-lg" style={{ color: "rgba(3,31,61,0.70)" }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
