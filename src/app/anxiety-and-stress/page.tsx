import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SymptomPageTemplate } from "@/components/symptom/symptom-page-template";
import { SYMPTOM_PAGES } from "@/content/symptom-pages";

const page = SYMPTOM_PAGES.find((p) => p.slug === "anxiety-and-stress")!;

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
  },
  robots: { index: true, follow: true },
};

export default function SymptomPage() {
  return (
    <>
      <Navbar />
      <main>
        <SymptomPageTemplate page={page} />
      </main>
      <Footer />
    </>
  );
}
