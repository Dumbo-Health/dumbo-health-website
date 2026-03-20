export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogIndexClient } from "@/components/blog/blog-index-client";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { getBlogPosts, getBlogCategories } from "@/lib/supabase";
import { collectionPageSchema } from "@/lib/schemas";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
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
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const label = categories.find((c) => c.slug === category)?.label
    ?? category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const schema = collectionPageSchema(
    `${label} Articles | Dumbo Health Blog`,
    `Browse ${label.toLowerCase()} articles on the Dumbo Health blog. Expert tips and guides for better sleep.`,
    `/blog-category/${category}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <section className="bg-daylight pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="font-mono uppercase tracking-widest mb-3"
              style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.45)" }}
            >
              The Sleep Journal
            </p>
            <h1
              className="font-heading font-medium text-midnight mb-4"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)" }}
            >
              {label}
            </h1>
            <p className="font-body text-midnight/70 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "44ch" }}>
              Browse all {label.toLowerCase()} articles.
            </p>
          </div>
        </section>
        <div className="bg-daylight">
          <BlogIndexClient posts={posts} initialCategory={category} />
        </div>
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
