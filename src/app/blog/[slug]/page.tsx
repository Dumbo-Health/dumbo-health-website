export const revalidate = 300;

import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/supabase";
import { blogPostSchema } from "@/lib/schemas";
import { notFound } from "next/navigation";
import { parseHeadings, injectHeadingIds } from "@/lib/reading-time";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ArticleSidebar } from "@/components/blog/article-sidebar";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SocialShare } from "@/components/blog/social-share";
import { RelatedPosts } from "@/components/blog/related-posts";

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
      title: "Article Blog",
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

  const [relatedPosts] = await Promise.all([
    getRelatedPosts(post.category_slug, slug),
  ]);

  const author = post.blog_authors;
  const category = post.blog_categories;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  // Process content: inject heading IDs, parse ToC
  const contentWithIds = post.content ? injectHeadingIds(post.content) : null;
  const headings = post.content ? parseHeadings(post.content) : [];
  const showToC = headings.length >= 3;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostSchema({
              title: post.title,
              slug: post.slug,
              excerpt: post.short_description || "",
              publishedAt: post.published_at || new Date().toISOString(),
              updatedAt: post.updated_at ?? undefined,
              featuredImage: post.main_image ?? undefined,
              author: author?.name ?? undefined,
            })
          ),
        }}
      />
      <Navbar />
      <ReadingProgress />
      <main className="bg-daylight">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
          style={{ maxWidth: "1100px" }}
        >
          {/* Article header (left-column width) */}
          <div style={{ maxWidth: "680px" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blog"
                className="font-body text-sm transition-colors duration-150 hover:text-peach"
                style={{ color: "rgba(3,31,61,0.5)" }}
              >
                Blog
              </Link>
              {category && (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2l4 4-4 4" stroke="rgba(3,31,61,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <Link
                    href={`/blog-category/${category.slug}`}
                    className="font-body text-sm transition-colors duration-150 hover:text-peach"
                    style={{ color: "rgba(3,31,61,0.5)" }}
                  >
                    {category.label}
                  </Link>
                </>
              )}
            </div>

            {/* Category badge */}
            {category && (
              <span
                className="font-mono uppercase tracking-widest block mb-4"
                style={{ fontSize: "0.75rem", color: "#FF8361", letterSpacing: "0.08em" }}
              >
                {category.label}
              </span>
            )}

            {/* Title */}
            <h1
              className="font-heading font-medium text-midnight mb-6"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.18 }}
            >
              {post.title}
            </h1>

            {/* TL;DR */}
            {post.short_description && (
              <div
                className="mb-8 rounded-xl px-6 py-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(3,31,61,0.07)",
                  boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
                }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "#78BFBC" }}
                >
                  TL;DR
                </span>
                <p
                  className="mt-2 font-body leading-relaxed text-midnight"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {post.short_description}
                </p>
              </div>
            )}

            {/* Reviewer byline */}
            {post.reviewer_name && (
              <div className="flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M7 1a4 4 0 100 8A4 4 0 007 1zM2.5 10.5C1.5 11.3 1 12.2 1 13h12c0-.8-.5-1.7-1.5-2.5A6.97 6.97 0 007 9a6.97 6.97 0 00-4.5 1.5z" stroke="#78BFBC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 5.5l1 1 2-2" stroke="#78BFBC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>
                  Reviewed by{" "}
                  {post.reviewer_slug ? (
                    <a
                      href={`/blog-author/${post.reviewer_slug}`}
                      className="font-medium hover:underline"
                      style={{ color: "#031F3D" }}
                    >
                      {post.reviewer_name}
                    </a>
                  ) : (
                    <span className="font-medium" style={{ color: "#031F3D" }}>{post.reviewer_name}</span>
                  )}
                  {post.reviewer_title && (
                    <span style={{ color: "rgba(3,31,61,0.45)" }}>, {post.reviewer_title}</span>
                  )}
                </span>
              </div>
            )}

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
              {author?.profile_picture && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={author.profile_picture} alt={author.name} fill className="object-cover" />
                </div>
              )}
              {author && (
                <Link
                  href={`/blog-author/${author.slug}`}
                  className="font-body text-sm font-medium transition-colors hover:text-peach"
                  style={{ color: "#031F3D" }}
                >
                  {author.name}
                </Link>
              )}
              {author?.role && (
                <span
                  className="font-body text-sm"
                  style={{ color: "rgba(3,31,61,0.4)" }}
                >
                  {author.role}
                </span>
              )}
              {date && (
                <>
                  <span style={{ color: "rgba(3,31,61,0.25)" }}>·</span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "rgba(3,31,61,0.45)" }}
                  >
                    {date}
                  </span>
                </>
              )}
              {post.reading_time && (
                <>
                  <span style={{ color: "rgba(3,31,61,0.25)" }}>·</span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "rgba(3,31,61,0.45)" }}
                  >
                    {post.reading_time} min read
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="lg:grid lg:gap-14" style={{ gridTemplateColumns: "minmax(0,1fr) 280px" }}>
            {/* ── Left: Article body ── */}
            <div>
              {/* Mobile ToC (inline, collapsible) */}
              {showToC && (
                <div className="lg:hidden mb-6">
                  <TableOfContents headings={headings} inline />
                </div>
              )}

              {/* Hero image */}
              {post.main_image ? (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                  <Image
                    src={post.main_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-video bg-sunlight rounded-xl mb-8" />
              )}

              {/* Article prose */}
              <div style={{ maxWidth: "680px" }}>
                {contentWithIds ? (
                  <div
                    className="article-prose"
                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
                  />
                ) : (
                  <div className="article-prose">
                    <p>
                      This article is coming soon. Check back for expert insights on sleep apnea care, treatment options, and tips for better sleep.
                    </p>
                  </div>
                )}

                {/* AI Summary */}
                {post.ai_summary && (
                  <div
                    className="mt-10 rounded-xl p-6"
                    style={{ background: "#F5E6D1", border: "1px solid rgba(3,31,61,0.07)" }}
                  >
                    <p
                      className="font-mono uppercase tracking-widest mb-3"
                      style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.5)" }}
                    >
                      AI summary
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: "0.9375rem", color: "#031F3D", lineHeight: 1.7 }}
                    >
                      {post.ai_summary}
                    </p>
                  </div>
                )}

                {/* Social share */}
                <SocialShare title={post.title} slug={post.slug} />

                {/* Mobile CTA banner (sidebar equivalent on small screens) */}
                <div
                  className="lg:hidden mt-10 rounded-2xl p-6"
                  style={{ background: "#031F3D" }}
                >
                  <p
                    className="font-mono uppercase tracking-widest mb-1"
                    style={{ fontSize: "0.6875rem", color: "rgba(252,246,237,0.5)" }}
                  >
                    Struggling with sleep?
                  </p>
                  <h3
                    className="font-heading font-medium mb-3"
                    style={{ fontSize: "1.1875rem", color: "#FCF6ED", lineHeight: 1.3 }}
                  >
                    Find out if sleep apnea is the reason.
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/get-started"
                      className="flex-1 text-center rounded-xl py-3 font-body font-bold text-sm uppercase tracking-wide transition-all duration-200"
                      style={{ background: "#FF8361", color: "#fff" }}
                    >
                      Take the sleep quiz
                    </Link>
                    <Link
                      href="/sleep-test"
                      className="flex-1 text-center rounded-xl py-3 font-body text-sm transition-all duration-200"
                      style={{
                        background: "rgba(252,246,237,0.08)",
                        color: "rgba(252,246,237,0.75)",
                        border: "1px solid rgba(252,246,237,0.12)",
                      }}
                    >
                      Buy sleep test
                    </Link>
                  </div>
                </div>

                {/* Author bio */}
                {author?.short_bio && (
                  <div
                    className="mt-8 rounded-xl p-6 flex gap-4 items-start"
                    style={{ background: "#fff", border: "1px solid #F5E6D1" }}
                  >
                    {author.profile_picture && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={author.profile_picture} alt={author.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-heading font-medium text-midnight" style={{ fontSize: "1rem" }}>
                        {author.name}
                      </p>
                      {author.role && (
                        <p
                          className="font-mono uppercase tracking-widest mb-2"
                          style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.45)" }}
                        >
                          {author.role}
                        </p>
                      )}
                      <p
                        className="font-body"
                        style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.65 }}
                      >
                        {author.short_bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Related posts */}
              <RelatedPosts posts={relatedPosts} />
            </div>

            {/* ── Right: Sticky sidebar (desktop only) ── */}
            <aside className="hidden lg:block">
              <div
                className="sticky"
                style={{ top: "104px", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
              >
                <ArticleSidebar />
                {showToC && (
                  <TableOfContents headings={headings} />
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <BottomCTA />
      <Footer />
    </>
  );
}
