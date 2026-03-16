import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SleepTestLanding } from "@/components/sleep-test/sleep-test-landing";

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

export default function AtHomeSleepTestPage() {
  return (
    <>
      <ProductJsonLd />
      <Navbar />
      <main>
        <SleepTestLanding />
      </main>
      <Footer />
    </>
  );
}
