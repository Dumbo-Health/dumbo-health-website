export const revalidate = 300;

import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { PostCard } from "@/components/blog/post-card";
import { getAuthorBySlug, getPostsByAuthorId } from "@/lib/supabase";
import { personSchema } from "@/lib/schemas";
import { SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const author = await getAuthorBySlug(slug);
    return createMetadata({
      title: `${author.name} | Dumbo Health Blog`,
      description: author.short_bio ?? `Articles by ${author.name} on sleep apnea, sleep health, and better nights.`,
      path: `/blog-author/${slug}`,
    });
  } catch {
    return createMetadata({
      title: "Author | Dumbo Health Blog",
      description: "Expert articles on sleep apnea and sleep health.",
      path: `/blog-author/${slug}`,
    });
  }
}

export default async function BlogAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  let author;
  try {
    author = await getAuthorBySlug(slug);
  } catch {
    notFound();
  }

  const posts = await getPostsByAuthorId(author.id);

  const schema = personSchema({
    name: author.name,
    jobTitle: author.role ?? undefined,
    description: author.short_bio ?? undefined,
    url: `${SITE_URL}/blog-author/${author.slug}`,
    sameAs: [author.linkedin_url, author.twitter_url],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="bg-daylight">
        {/* ── Hero ── */}
        <section className="pt-16 sm:pt-24 pb-12 sm:pb-20" style={{ background: "#FCF6ED" }}>
          <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "900px" }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-10">
              <Link
                href="/blog"
                className="font-body text-sm transition-colors duration-150 hover:text-peach"
                style={{ color: "rgba(3,31,61,0.5)" }}
              >
                Blog
              </Link>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="rgba(3,31,61,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                Authors
              </span>
            </div>

            {/* Author card */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
              {/* Avatar */}
              {author.profile_picture && (
                <div
                  className="relative flex-shrink-0 rounded-full overflow-hidden"
                  style={{ width: "120px", height: "120px", boxShadow: "0 4px 24px rgba(3,31,61,0.12)" }}
                >
                  <Image
                    src={author.profile_picture}
                    alt={author.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="120px"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1">
                <p
                  className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.45)" }}
                >
                  The Sleep Journal
                </p>
                <h1
                  className="font-heading font-medium text-midnight mb-1"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
                >
                  {author.name}
                </h1>
                {author.role && (
                  <p
                    className="font-mono uppercase tracking-widest mb-4"
                    style={{ fontSize: "0.75rem", color: "#FF8361" }}
                  >
                    {author.role}
                  </p>
                )}
                {author.short_bio && (
                  <p
                    className="font-body mb-6"
                    style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.7)", lineHeight: 1.7, maxWidth: "58ch" }}
                  >
                    {author.short_bio}
                  </p>
                )}

                {/* Social links */}
                {(author.twitter_url || author.linkedin_url) && (
                  <div className="flex items-center gap-3">
                    {author.twitter_url && (
                      <a
                        href={author.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                        style={{
                          width: "36px",
                          height: "36px",
                          background: "#031F3D",
                          color: "#FCF6ED",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {author.linkedin_url && (
                      <a
                        href={author.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                        style={{
                          width: "36px",
                          height: "36px",
                          background: "#031F3D",
                          color: "#FCF6ED",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ height: "1px", background: "#F5E6D1" }} />

        {/* ── Articles ── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1100px" }}>
            <div className="flex items-baseline gap-3 mb-10">
              <h2
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.375rem, 3vw, 1.875rem)" }}
              >
                Articles by {author.name}
              </h2>
              {posts.length > 0 && (
                <span
                  className="font-mono"
                  style={{ fontSize: "0.8125rem", color: "rgba(3,31,61,0.4)" }}
                >
                  {posts.length} article{posts.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p
                  className="font-body"
                  style={{ fontSize: "1.0625rem", color: "rgba(3,31,61,0.45)" }}
                >
                  No articles published yet. Check back soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <BottomCTA />
      <Footer />
    </>
  );
}
