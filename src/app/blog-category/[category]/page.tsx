import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BottomCTA } from "@/components/shared/bottom-cta";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "sleep-tracking" },
    { category: "sleep-apnea" },
    { category: "sleep-disorders" },
    { category: "cpap" },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const label = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return createMetadata({
    title: `${label} Articles | Dumbo Health Blog`,
    description: `Browse ${label.toLowerCase()} articles on the Dumbo Health blog. Expert tips and guides for better sleep.`,
    path: `/blog-category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const label = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            className="font-heading font-medium text-midnight text-center mb-4"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
          >
            {label}
          </h1>
          <p className="font-body text-midnight/70 text-center mb-12 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "44ch" }}>
            Browse all {label.toLowerCase()} articles.
          </p>
          <CategoryFilter />
          <div className="text-center py-16">
            <p className="font-body text-base text-midnight/50">
              Blog posts for this category will be loaded from the CMS.
            </p>
          </div>
        </div>
      </section>
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
