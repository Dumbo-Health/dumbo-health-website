import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SleepTestLanding } from "@/components/sleep-test/sleep-test-landing";
import { faqSchema } from "@/lib/schemas";
import { medicalTeam } from "@/content/team";
import { getStatesWithCities, type StateWithCities } from "@/lib/go/at-home-sleep-test";
import { SHOPIFY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "At-Home Sleep Apnea Test — FDA Cleared, $149",
  description:
    "Order your FDA-cleared at-home sleep apnea test for just $149. Sleep in your own bed, get doctor-reviewed results in days, prescription included. Ships next business day.",
  alternates: { canonical: "https://www.dumbo.health/at-home-sleep-test" },
  openGraph: {
    title: "At-Home Sleep Apnea Test — FDA Cleared, $149",
    description:
      "Sleep in your own bed, test in one night. Doctor-reviewed results for $149. Ships next business day.",
    url: "https://www.dumbo.health/at-home-sleep-test",
    siteName: "Dumbo Health",
    images: [
      { url: "https://www.dumbo.health/og/sleep-test.jpg", width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

function FaqJsonLd() {
  const schema = faqSchema([
    {
      question: "What exactly is an at-home sleep test?",
      answer: "An at-home sleep test is a small, wearable device you sleep with for one night in your own bed. It measures your breathing patterns, blood oxygen levels, heart rate, and sleep position while you sleep. A licensed physician then reviews the data and tells you whether you have sleep apnea.",
    },
    {
      question: "How accurate is an at-home sleep test compared to a sleep lab?",
      answer: "For the most common type of sleep apnea (obstructive sleep apnea), at-home sleep tests are clinically validated and widely used by physicians. They're not a replacement for a full polysomnography in every case, but for the vast majority of people being evaluated for obstructive sleep apnea, they're just as reliable and far more comfortable.",
    },
    {
      question: "Who is a good candidate for an at-home sleep test?",
      answer: "At-home sleep tests work well for most adults who suspect they have obstructive sleep apnea. If you snore, wake up exhausted, feel foggy during the day, or have a partner who notices your breathing stops at night, you're likely a good candidate. A physician will review your results and let you know if a more detailed in-lab study is needed.",
    },
    {
      question: "What does the test involve? Will it be uncomfortable?",
      answer: "The device is small and worn on your wrist or finger. Most people sleep through the night without issue. There are no wires attached to your head, no sensors glued to your scalp, and no technician in the room. You do it at home, on your schedule.",
    },
    {
      question: "How long until I get my results?",
      answer: "Most patients receive their physician-reviewed results within 3 to 5 business days of returning the device. We'll notify you when they're ready, and a physician will walk you through what the data shows.",
    },
    {
      question: "What if the test shows I don't have sleep apnea?",
      answer: "That's still a useful result. If sleep apnea is ruled out, your physician can help point you toward other possible causes of your symptoms and guide next steps. You'll leave with a real answer either way.",
    },
    {
      question: "Does insurance cover the at-home sleep test?",
      answer: "Our sleep test is available as a direct-pay service. We keep it simple and affordable: no insurance paperwork, no prior authorizations, no surprise bills. The cost is $149, which includes the device, physician interpretation, and your results.",
    },
    {
      question: "What happens after my results come back?",
      answer: "If sleep apnea is detected, your physician will issue a prescription and you can move straight to treatment. No additional appointments required. If CPAP therapy is recommended, we can have your equipment shipped within days.",
    },
  ]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "At-Home Sleep Apnea Test",
    description:
      "FDA-cleared at-home sleep test. One night to diagnose sleep apnea from the comfort of your own bed.",
    image: "https://www.dumbo.health/images/products/hst-box.png",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: {
      "@type": "Offer",
      url: "https://www.dumbo.health/at-home-sleep-test",
      priceCurrency: "USD",
      price: "149.00",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Dumbo Health" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocationsSection({ states }: { states: StateWithCities[] }) {
  if (!states.length) return null;
  return (
    <section className="bg-sunlight py-16 sm:py-20 border-t border-light-peach">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="font-mono uppercase tracking-widest mb-3"
            style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.45)" }}
          >
            Service Areas
          </p>
          <h2
            className="font-heading font-medium text-midnight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.15 }}
          >
            At-Home Sleep Testing Near You
          </h2>
          <p
            className="font-body mx-auto max-w-xl"
            style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.65 }}
          >
            We ship directly to your door in every city below. Order today, test tonight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {states.map((s) => (
            <div key={s.state} className="bg-daylight rounded-2xl p-6 sm:p-8">
              {/* State header */}
              <div className="flex items-center justify-between mb-5">
                <Link
                  href={`/go/at-home-sleep-test/${s.stateSlug}`}
                  className="font-heading font-medium text-midnight hover:text-peach transition-colors"
                  style={{ fontSize: "1.25rem" }}
                >
                  {s.state} →
                </Link>
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.4)" }}
                >
                  {s.cities.length} cities
                </span>
              </div>
              {/* City grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                {s.cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/go/at-home-sleep-test/${c.slug}`}
                    className="font-body text-sm hover:text-peach transition-colors truncate"
                    style={{ color: "rgba(3,31,61,0.7)" }}
                  >
                    {c.city}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function AtHomeSleepTestPage() {
  const states = await getStatesWithCities();
  return (
    <>
      <FaqJsonLd />
      <ProductJsonLd />
      <Navbar />
      <main>
        <SleepTestLanding />
        {/* Medical team trust */}
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
                Every result reviewed by a board-certified sleep medicine physician.
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

        <LocationsSection states={states} />

        <section className="bg-daylight py-8 border-t border-sunlight">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>
              Prefer a streamlined checkout?{" "}
              <a
                href={SHOPIFY.buyUrl}
                data-shopify-checkout="sleep-test"
                className="font-medium hover:underline"
                style={{ color: "#FF8361" }}
              >
                Order your at-home sleep apnea test →
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
