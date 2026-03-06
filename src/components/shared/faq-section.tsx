import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/content/faqs";

interface FAQSectionProps {
  limit?: number;
  showCta?: boolean;
}

export function FAQSection({ limit = 5, showCta = true }: FAQSectionProps) {
  const displayFaqs = faqs.slice(0, limit);

  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-medium text-midnight md:text-[40px]">
            FAQs
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-midnight/60">
            From testing and treatment to pricing and support, here is
            everything you need to know about getting started with
            Dumbo Health.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {displayFaqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-sunlight"
            >
              <AccordionTrigger className="text-left font-heading text-base font-medium text-midnight hover:no-underline">
                <span className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-peach">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10 font-body text-midnight/60 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {showCta && (
          <div className="mt-10 text-center">
            <p className="mb-4 font-body text-midnight/50">
              Still have questions?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                asChild
                className="h-12 rounded-lg border-midnight/12 bg-white px-7 font-body text-base font-bold uppercase tracking-wider text-midnight shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-peach/30 hover:bg-white hover:shadow-md hover:shadow-peach/10 active:translate-y-0 active:shadow-sm"
              >
                <Link href="/faqs">Visit FAQs</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-12 rounded-lg border-midnight/12 bg-white px-7 font-body text-base font-bold uppercase tracking-wider text-midnight shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-peach/30 hover:bg-white hover:shadow-md hover:shadow-peach/10 active:translate-y-0 active:shadow-sm"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
