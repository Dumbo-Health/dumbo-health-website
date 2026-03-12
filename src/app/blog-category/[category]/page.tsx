export const revalidate = 300;

import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CategoryFilter } from "@/components/blog/category-filter";
import { PostGrid } from "@/components/blog/post-grid";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { getBlogPosts, getBlogCategories } from "@/lib/supabase";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return [
    { category: "cpap" },
    { category: "sleep-apnea" },
    { category: "sleep-disorders" },
    { category: "sleep-tracking" },
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
  const [posts, categories] = await Promise.all([
    getBlogPosts(category),
    getBlogCategories(),
  ]);
  const label = categories.find((c) => c.slug === category)?.label
    ?? category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

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
          <PostGrid posts={posts} />
        </div>
      </section>
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
