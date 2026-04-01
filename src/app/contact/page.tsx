import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactCards } from "@/components/contact/contact-card";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

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
        <ContactHero />

        {/* Contact cards */}
        <section className="bg-daylight pb-20 pt-4">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ContactCards />
          </div>
        </section>

        {/* Patient section */}
        <section className="bg-midnight py-16 sm:py-20">
          <div
            className="mx-auto flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
            style={{ maxWidth: "900px", padding: "0 5%" }}
          >
            <div>
              <h2
                className="font-heading font-medium text-white"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Already a Dumbo Health patient?
              </h2>
              <p className="mt-2 font-body text-base" style={{ color: "rgba(252,246,237,0.55)", maxWidth: "42ch" }}>
                Log in for support tailored to your treatment, account, and device.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Button
                variant="outline"
                asChild
                className="rounded-[12px] border-white/20 bg-transparent font-body text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/40"
              >
                <a href={`${APP_URL}/login`}>Log in</a>
              </Button>
              <Button
                asChild
                className="rounded-[12px] bg-peach font-body text-sm font-bold uppercase tracking-wider text-white hover:bg-peach/90"
              >
                <a href={APP_URL}>Get started</a>
              </Button>
            </div>
          </div>
        </section>

        <ServiceAreaBanner />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
