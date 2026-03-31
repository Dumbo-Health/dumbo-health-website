import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SymptomPageTemplate } from "@/components/symptom/symptom-page-template";
import { SYMPTOM_PAGES } from "@/content/symptom-pages";
import { medicalWebPageSchema } from "@/lib/schemas";

const page = SYMPTOM_PAGES.find((p) => p.slug === "constantly-getting-sick")!;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: page.canonical },
  openGraph: {
    title: page.seoTitle,
    description: page.seoDescription,
    url: page.canonical,
    siteName: "Dumbo Health",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: page.seoTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.seoTitle,
    description: page.seoDescription,
  },
  robots: { index: true, follow: true },
};

export default function SymptomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            medicalWebPageSchema(page.seoTitle, page.seoDescription, `/${page.slug}`)
          ),
        }}
      />
      <Navbar />
      <main>
        <SymptomPageTemplate page={page} />
      </main>
      <Footer />
    </>
  );
}
