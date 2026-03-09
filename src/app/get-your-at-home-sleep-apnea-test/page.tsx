import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SleepTestLanding } from "@/components/sleep-test/sleep-test-landing";

const SHOPIFY_BUY_URL =
  "https://checkout.dumbo.health/cart/add?id=8933198397592&quantity=1";

export const metadata: Metadata = {
  title: "At Home Sleep Apnea Test | One Night Results",
  description:
    "Get your at-home sleep apnea test. No sleep lab required. Sleep in your own bed, test in one night, get doctor-reviewed results with clear next steps. Only $149.",
  alternates: {
    canonical: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
  },
  openGraph: {
    title: "At Home Sleep Apnea Test | One Night Results | Dumbo Health",
    description:
      "No sleep lab required. Sleep in your own bed, test in one night. Doctor-reviewed results for $149.",
    url: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
    siteName: "Dumbo Health",
    images: [
      {
        url: "https://www.dumbo.health/og/sleep-test.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

function LandingProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "At-Home Sleep Apnea Test",
    description:
      "FDA-cleared at-home sleep apnea test. One night of testing, doctor-reviewed results, prescription included.",
    image: "https://www.dumbo.health/images/products/hst-box.png",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: {
      "@type": "Offer",
      url: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
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

export default function LandingPage() {
  return (
    <>
      <LandingProductJsonLd />

      {/* Minimal header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(252,246,237,0.92)",
          borderBottom: "1px solid rgba(245,230,209,0.5)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "5%", paddingRight: "5%" }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/wordmark-midnight.svg"
              alt="Dumbo Health"
              width={150}
              height={30}
              priority
            />
          </Link>
          <a
            href={SHOPIFY_BUY_URL}
            className="inline-flex h-10 items-center rounded-[12px] px-6 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            style={{ backgroundColor: "#FF8361" }}
          >
            Get your test
          </a>
        </div>
      </header>

      <main>
        <SleepTestLanding />
      </main>

      {/* Minimal footer */}
      <footer style={{ backgroundColor: "#031F3D", paddingTop: "40px", paddingBottom: "40px", paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <Image
            src="/logos/wordmark-white.svg"
            alt="Dumbo Health"
            width={120}
            height={24}
          />
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; {new Date().getFullYear()} Dumbo Health. All rights reserved.{" "}
            <Link href="/privacy-policy" className="underline hover:opacity-70">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms-of-use" className="underline hover:opacity-70">
              Terms of Use
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
