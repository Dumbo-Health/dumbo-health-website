import type { Metadata } from "next";
import { OralHero } from "@/components/oral-appliance/oral-hero";
import { OralQualifier } from "@/components/oral-appliance/oral-qualifier";
import { OralHowItWorks } from "@/components/oral-appliance/oral-how-it-works";
import { OralDevice } from "@/components/oral-appliance/oral-device";
import { OralPricing } from "@/components/oral-appliance/oral-pricing";
import { OralClinical } from "@/components/oral-appliance/oral-clinical";
import { OralComparison } from "@/components/oral-appliance/oral-comparison";
import { OralFaq } from "@/components/oral-appliance/oral-faq";
import { OralCta } from "@/components/oral-appliance/oral-cta";

export const metadata: Metadata = {
  title: "Oral Appliance Therapy | Dumbo Health",
  description:
    "A custom-fitted device for mild to low-moderate sleep apnea. No machine, no mask, no hose. Prescribed and managed by board-certified physicians.",
};

export default function OralApplianceTherapyPage() {
  return (
    <main>
      <OralHero />
      <OralQualifier />
      <OralHowItWorks />
      <OralDevice />
      <OralPricing />
      <OralClinical />
      <OralComparison />
      <OralFaq />
      <OralCta />
    </main>
  );
}
