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
  categories?: string[];
}

export function FAQSection({ limit = 5, showCta = true, categories }: FAQSectionProps) {
  const filtered = categories ? faqs.filter((f) => categories.includes(f.category)) : faqs;
  const displayFaqs = filtered.slice(0, limit);

  return (
    <section className="bg-daylight py-20 md:py-28">
      <div style={{ padding: "0 5%" }}>
        <div className="text-center">
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-teal">
            FAQ
          </p>
          <h2
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)" }}
          >
            Got questions?
          </h2>
          <p
            className="mx-auto mt-4 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.55)", maxWidth: "52ch" }}
          >
            From testing and treatment to pricing and support, here is
            everything you need to know about getting started with
            Dumbo Health.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {displayFaqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-sunlight"
            >
              <AccordionTrigger className="text-left font-heading text-lg font-medium text-midnight hover:no-underline py-6">
                <span className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-peach">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10 font-body text-[1rem] text-midnight/60 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {showCta && (
          <div className="mt-10 text-center">
            <p className="mb-4 font-body" style={{ color: "rgba(3,31,61,0.45)" }}>
              Still have questions?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                asChild
                className="h-12 rounded-[12px] border-midnight/20 bg-white px-7 font-body text-sm font-bold uppercase tracking-wider text-midnight shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-peach/30 hover:bg-white hover:shadow-md active:translate-y-0"
              >
                <Link href="/faqs">Visit FAQs</Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-12 rounded-[12px] px-7 font-body text-sm font-bold uppercase tracking-wider text-midnight transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:text-white active:translate-y-0"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
