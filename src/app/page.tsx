import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { SymptomsProblems } from "@/components/home/symptoms-problems";
import { HowItWorks } from "@/components/home/how-it-works";
import { SolutionsGrid } from "@/components/home/solutions-grid";
import { BenefitsGrid } from "@/components/shared/benefits-grid";
import { Testimonials } from "@/components/shared/testimonials";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { FAQSection } from "@/components/shared/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { organizationSchema, faqSchema } from "@/lib/schemas";
import { faqs } from "@/content/faqs";
import { features } from "@/config/features";

export const metadata: Metadata = {
  title: "Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health",
  description:
    "Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149. Expert telehealth care in FL & TX. Start sleeping better today.",
  alternates: { canonical: "https://www.dumbo.health/" },
  openGraph: {
    title: "Sleep Apnea Treatment Online | Dumbo Health",
    description:
      "Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149. Expert telehealth care in FL & TX.",
    url: "https://www.dumbo.health/",
    siteName: "Dumbo Health",
    images: [
      { url: "https://www.dumbo.health/og/default.jpg", width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Apnea Treatment Online | Dumbo Health",
    description:
      "Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149.",
    images: ["https://www.dumbo.health/og/default.jpg"],
  },
  robots: { index: true, follow: true },
};

function HomeJsonLd() {
  const homeFaqs = faqs.slice(0, 5).map((f) => ({ question: f.question, answer: f.answer }));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Navbar />
      <main>
        <HomeHero />
        {features.sections.trustMarquee && <TrustMarquee />}
        <SymptomsProblems />
        <HowItWorks />
        <SolutionsGrid />
        <BenefitsGrid />
        <Testimonials />
        {features.sections.serviceArea && <ServiceAreaBanner />}
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
