import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StatsGrid } from "@/components/struggling/stats-grid";
import { WhySwitch } from "@/components/struggling/why-switch";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { Testimonials } from "@/components/shared/testimonials";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Affordable Sleep Apnea Treatment | Dumbo Health",
  description: "Struggling with the cost of sleep apnea treatment? Dumbo Health offers affordable, transparent plans from $59/mo. No hidden costs, no confusing steps.",
  path: "/struggling-with-cost",
});

export default function StrugglingWithCostPage() {
  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl md:text-4xl lg:text-hero text-midnight mb-6">
            Struggling with the Cost of Sleep Apnea Treatment?
          </h1>
          <p className="font-body text-body-lg text-midnight/70 mb-8">
            Affordable, expert sleep care made simple with no hidden costs, no confusing steps, and one predictable monthly price.
          </p>
          <Button size="lg" asChild>
            <a href={APP_URL}>Start Sleeping Better</a>
          </Button>
        </div>
      </section>

      <TrustMarquee />

      <section className="bg-sunlight py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <StatsGrid />
        </div>
      </section>

      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h2 text-midnight mb-8">
            Why More People Are Switching to Dumbo Health
          </h2>
          <Button size="lg" asChild>
            <a href={APP_URL}>Take the First Step</a>
          </Button>
        </div>
      </section>

      <WhySwitch />
      <Testimonials />

      <section className="bg-sunlight py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-h2 text-midnight mb-8">
            Dumbo Health makes sleep apnea treatment more accessible.
          </h2>
        </div>
      </section>

      <FAQSection />
      <ServiceAreaBanner />
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
