import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PlanHero } from "@/components/pricing/plan-hero";
import { BlockerSection } from "@/components/pricing/blocker-section";
import { ReframeSection } from "@/components/pricing/reframe-section";
import { SubscriptionArgument } from "@/components/pricing/subscription-argument";
import { AppDifferentiators } from "@/components/pricing/app-differentiators";
import { PlanTabs } from "@/components/pricing/plan-tabs";
import { CostFraming } from "@/components/pricing/cost-framing";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { FAQSection } from "@/components/shared/faq-section";
import { SleepTestCallout } from "@/components/pricing/sleep-test-callout";
import Image from "next/image";
import { SITE_URL } from "@/lib/constants";
import { faqSchema } from "@/lib/schemas";
import { medicalTeam } from "@/content/team";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea Treatment Plans & CPAP Pricing",
  description:
    "Transparent pricing for CPAP therapy. Plans from $59/mo with equipment, telehealth, and ongoing support. No hidden fees. Compare Essentials, Premium, and Elite.",
  path: "/cpap",
  ogImage: "/og/pricing.jpg",
});

function CpapFaqJsonLd() {
  const schema = faqSchema([
    {
      question: "What is CPAP therapy?",
      answer: "CPAP stands for Continuous Positive Airway Pressure. It's the most effective treatment for obstructive sleep apnea. A small machine delivers a steady stream of air through a mask while you sleep, keeping your airway open so breathing stays uninterrupted throughout the night.",
    },
    {
      question: "Does CPAP actually work?",
      answer: "Yes. CPAP is the gold standard for treating obstructive sleep apnea and has decades of clinical evidence behind it. Most people notice a difference within the first few nights: deeper sleep, less snoring, more energy during the day. The key is finding the right mask fit and pressure settings, which is where our team helps.",
    },
    {
      question: "Will CPAP feel claustrophobic or uncomfortable?",
      answer: "It can feel strange at first. That's normal. Most people adjust within one to two weeks. Modern CPAP machines are much quieter and lighter than older models, and today's masks come in a wide range of styles, including nasal pillows, nasal masks, and full-face masks, so you can find one that fits your face and sleeping style.",
    },
    {
      question: "What equipment comes with my Dumbo Health CPAP subscription?",
      answer: "Your subscription includes a prescription-grade CPAP machine, your choice of mask, all necessary accessories, and ongoing resupply of filters and cushions on a set schedule. We also include access to our care team and telehealth check-ins, so you're never dealing with equipment questions alone.",
    },
    {
      question: "What if I can't tolerate CPAP therapy?",
      answer: "Sticking with CPAP is the hardest part for most people. The most common reason people give up is a poor mask fit or incorrect pressure settings. Our team actively monitors your compliance data and reaches out when something looks off. If CPAP isn't working for you, we'll troubleshoot before giving up on it.",
    },
    {
      question: "How do I know if my CPAP is working?",
      answer: "Your machine tracks usage data every night: hours of use, events per hour, and mask leak rate. Our care team can review it with you. Over time, your AHI (apnea-hypopnea index) should drop significantly, and you should start feeling the difference in how rested you are.",
    },
    {
      question: "Do I need a prescription for CPAP?",
      answer: "Yes, CPAP requires a prescription in the US. If you tested with us, your physician prescription is already on file and we'll handle everything. If you have a diagnosis from another provider, you can upload your existing prescription and we'll take it from there.",
    },
    {
      question: "How often do I need to replace my CPAP equipment?",
      answer: "Masks, cushions, filters, and tubing wear out over time and should be replaced on a regular schedule, usually every one to six months depending on the part. Your Dumbo Health subscription automatically sends replacements before things wear out, so you're never using degraded equipment without realizing it.",
    },
  ]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function CpapSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dumbo Health CPAP Treatment Plans",
    description:
      "Monthly CPAP therapy subscription plans with equipment, telehealth support, and accessories.",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: [
      {
        "@type": "Offer",
        name: "Essentials",
        price: "59",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "89",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
      },
      {
        "@type": "Offer",
        name: "Elite",
        price: "129",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function CpapPage() {
  return (
    <>
      <CpapFaqJsonLd />
      <CpapSchema />
      <Navbar />
      <main>
        {/* 1. Hero — reframes the category for diagnosed-but-haven't-started patients */}
        <PlanHero />

        {/* 2. Problem framing — names the blockers, validates the delay */}
        <BlockerSection />

        {/* 3. Reframe — CPAP works when you're supported */}
        <ReframeSection />

        {/* 4. What Dumbo actually is — subscription includes + DME contrast */}
        <SubscriptionArgument />

        {/* 5. App + AI differentiators — what makes Dumbo different */}
        <AppDifferentiators />

        {/* 6. The plans — pricing appears only after trust is established */}
        <PlanTabs />

        {/* 7. Cost framing — per-day anchoring */}
        <CostFraming />

        {/* 8. Feature comparison table */}
        <FeatureComparison />

        {/* 9. FAQ + objection handling */}
        <FAQSection limit={7} />

        {/* 10. Medical team trust */}
        <section className="bg-white py-12 sm:py-16 border-t border-sunlight">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.45)" }}
              >
                Our Medical Team
              </p>
              <p className="font-body" style={{ fontSize: "1rem", color: "rgba(3,31,61,0.6)" }}>
                Your CPAP therapy is supported by board-certified sleep medicine physicians.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
              {medicalTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center">
                  {member.image && (
                    <div
                      className="relative flex-shrink-0 rounded-full overflow-hidden"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <Image src={member.image} alt={member.name} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div>
                    <p className="font-heading font-medium text-midnight" style={{ fontSize: "0.9375rem" }}>
                      {member.name}
                    </p>
                    <p className="font-body" style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.5)" }}>
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Sleep test safety net — for visitors not yet diagnosed */}
        <SleepTestCallout />
      </main>
      <Footer />
    </>
  );
}
