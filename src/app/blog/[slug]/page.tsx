import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BottomCTA } from "@/components/shared/bottom-cta";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return createMetadata({
    title: `${title} | Dumbo Health Blog`,
    description: `Read about ${title.toLowerCase()} on the Dumbo Health blog. Expert sleep apnea tips and guides.`,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Navbar />
      <main>
      <article className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog" className="font-body text-sm text-peach hover:underline">
              &larr; Back to Blog
            </Link>
          </div>
          <h1
            className="font-heading font-medium text-midnight mb-4"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            {title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-body text-sm text-midnight/60">Dumbo Health Team</span>
            <span className="font-mono text-xs text-midnight/40">2026</span>
          </div>
          <div className="aspect-video bg-sunlight rounded-lg mb-8" />
          <div className="prose prose-lg max-w-none font-body text-midnight/80">
            <p>
              This article is coming soon. Check back for expert insights on sleep apnea care, treatment options, and tips for better sleep.
            </p>
          </div>
        </div>
      </article>
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
