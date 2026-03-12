import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { getBlogPostBySlug } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    return createMetadata({
      title: `${post.seo_title || post.title} | Dumbo Health Blog`,
      description: post.seo_description || post.short_description || "",
      path: `/blog/${slug}`,
      type: "article",
    });
  } catch {
    return createMetadata({
      title: "Article | Dumbo Health Blog",
      description: "Expert sleep apnea tips and guides.",
      path: `/blog/${slug}`,
      type: "article",
    });
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  const author = post.blog_authors;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

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
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            {author && <span className="font-body text-sm text-midnight/60">{author.name}</span>}
            {date && <span className="font-mono text-xs text-midnight/40">{date}</span>}
          </div>
          {post.main_image ? (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Image src={post.main_image} alt={post.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="aspect-video bg-sunlight rounded-lg mb-8" />
          )}
          {post.content ? (
            <div
              className="prose prose-lg max-w-none font-body text-midnight/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose prose-lg max-w-none font-body text-midnight/80">
              <p>
                This article is coming soon. Check back for expert insights on sleep apnea care, treatment options, and tips for better sleep.
              </p>
            </div>
          )}
        </div>
      </article>
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
