import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactCards } from "@/components/contact/contact-card";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";

export const metadata: Metadata = createMetadata({
  title: "Contact Dumbo Health - Sleep Apnea Support & Help",
  description: "Get in touch with Dumbo Health. Reach our support team, investors, or media contacts. Call +1 (786) 348-2820 or email contact@dumbo.health.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Gradient wrapper: light peach → daylight */}
        <div
          style={{
            background: "linear-gradient(to bottom, #FFD6AD 0%, #FCF6ED 100%)",
          }}
        >
          <ContactHero />

          <section className="pb-24 pt-4">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ContactCards />
            </div>
          </section>

          <FAQSection className="py-20 md:py-28" />
        </div>

        <ServiceAreaBanner />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
