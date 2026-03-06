"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, faqCategories } from "@/content/faqs";

export function FAQsContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : faqs;

  return (
    <section className="bg-daylight pb-16 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full font-mono text-tag transition-colors ${
              activeCategory === null
                ? "bg-midnight text-white"
                : "bg-sunlight text-midnight hover:bg-light-peach"
            }`}
          >
            All
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-tag transition-colors ${
                activeCategory === cat.id
                  ? "bg-midnight text-white"
                  : "bg-sunlight text-midnight hover:bg-light-peach"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, i) => (
            <AccordionItem key={`${faq.category}-${i}`} value={`faq-${faq.category}-${i}`}>
              <AccordionTrigger className="text-left font-body text-body-lg text-midnight">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-body text-midnight/70">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
