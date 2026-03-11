import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FAQsContent } from "./faqs-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { faqs } from "@/content/faqs";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea FAQs: Testing, Treatment & Insurance | Dumbo Health",
  description: "Get answers to 71 frequently asked questions about sleep apnea testing, CPAP treatment, insurance, prescriptions, and more. Expert answers from Dumbo Health.",
  path: "/faqs",
});

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FAQsPage() {
  return (
    <>
      <FAQSchema />
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="font-heading font-medium text-midnight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
          >
            FAQs
          </h1>
          <p className="font-body text-midnight/70 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
            From testing and treatment to pricing and support, here&apos;s everything you need to know about starting your sleep journey with Dumbo Health.
          </p>
        </div>
      </section>

      <FAQsContent />

      <section className="bg-sunlight py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <h2
            className="font-heading font-medium text-midnight mb-6"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Still have questions?
          </h2>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
