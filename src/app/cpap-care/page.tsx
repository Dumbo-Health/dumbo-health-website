import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SupportHero } from "@/components/cpap-support/support-hero";
import { SupportMarquee } from "@/components/cpap-support/support-marquee";
import { EmpathySection } from "@/components/cpap-support/empathy-section";
import { ReframeSection } from "@/components/cpap-support/reframe-section";
import { AdherenceIntelligence } from "@/components/cpap-support/adherence-intelligence";
import { HowSupportWorks } from "@/components/cpap-support/how-support-works";
import { SupportPricing } from "@/components/cpap-support/support-pricing";
import { WithoutWithComparison } from "@/components/cpap-support/without-with-comparison";
import { ObjectionsSection } from "@/components/cpap-support/objections-section";
import { SupportClose } from "@/components/cpap-support/support-close";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPAP Care",
  description:
    "CPAP therapy monitoring, clinical care, and adherence intelligence. Dumbo Health reads your nightly data and intervenes before small problems become reasons to quit.",
};

export default function CpapCarePage() {
  return (
    <>
      <Navbar />
      <main>
        <SupportHero />
        <SupportMarquee />
        <EmpathySection />
        <ReframeSection />
        <AdherenceIntelligence />
        <HowSupportWorks />
        <SupportPricing />
        <WithoutWithComparison />
        <ObjectionsSection />
        <SupportClose />
      </main>
      <Footer />
    </>
  );
}
