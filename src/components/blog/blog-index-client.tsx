"use client";

import { useState, useRef, useEffect } from "react";
import type { BlogPost } from "@/lib/supabase";
import { PostCard } from "./post-card";
import { FeaturedPostCard } from "./featured-post-card";

const CATEGORIES = [
  { label: "All", slug: "all" },
  { label: "Sleep Tracking", slug: "sleep-tracking" },
  { label: "Sleep Apnea", slug: "sleep-apnea" },
  { label: "Sleep Disorders", slug: "sleep-disorders" },
  { label: "CPAP", slug: "cpap" },
];

const PAGE_SIZE = 9;

interface BlogIndexClientProps {
  posts: BlogPost[];
  initialCategory?: string;
}

export function BlogIndexClient({ posts, initialCategory = "all" }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterStuck, setFilterStuck] = useState(false);

  // Detect when filter bar is stuck (for visual shadow)
  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-82px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset visible count when category changes
  function handleCategory(slug: string) {
    setActiveCategory(slug);
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category_slug === activeCategory);

  const featuredPost = filtered.find((p) => p.featured) ?? null;
  const regularPosts = featuredPost ? filtered.filter((p) => p.slug !== featuredPost.slug) : filtered;
  const visiblePosts = regularPosts.slice(0, visibleCount);
  const hasMore = visibleCount < regularPosts.length;

  return (
    <>
      {/* Sticky filter bar */}
      <div
        ref={filterRef}
        className="sticky z-40 transition-shadow duration-200"
        style={{
          top: "80px",
          background: "rgba(252,246,237,0.96)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid #F5E6D1",
          boxShadow: filterStuck ? "0 4px 16px rgba(3,31,61,0.06)" : "none",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          paddingLeft: "calc(50vw - 50%)",
          paddingRight: "calc(50vw - 50%)",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Desktop: flex row */}
          <div className="hidden sm:flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategory(cat.slug)}
                className="px-4 py-2 rounded-full font-mono text-xs transition-all duration-150"
                style={{
                  background: activeCategory === cat.slug ? "#031F3D" : "#F5E6D1",
                  color: activeCategory === cat.slug ? "#FCF6ED" : "#031F3D",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Mobile: horizontal scroll (no scrollbar) */}
          <div
            className="sm:hidden flex gap-2 no-scrollbar"
            style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategory(cat.slug)}
                className="px-4 py-2 rounded-full font-mono text-xs flex-shrink-0 transition-all duration-150"
                style={{
                  background: activeCategory === cat.slug ? "#031F3D" : "#F5E6D1",
                  color: activeCategory === cat.slug ? "#FCF6ED" : "#031F3D",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-lg" style={{ color: "rgba(3,31,61,0.65)" }}>
              No articles in this category yet.
            </p>
          </div>
        ) : (
          <>
            {/* Featured hero card */}
            {featuredPost && <FeaturedPostCard post={featuredPost} />}

            {/* Regular grid */}
            {visiblePosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex flex-col items-center mt-12 gap-2">
                <button
                  onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                  className="px-8 py-3 rounded-xl font-body font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "#F5E6D1", color: "#031F3D", border: "none", cursor: "pointer" }}
                >
                  Load more articles
                </button>
                <p
                  className="font-mono text-xs"
                  style={{ color: "rgba(3,31,61,0.4)" }}
                >
                  Showing {visiblePosts.length + (featuredPost ? 1 : 0)} of {filtered.length} articles
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
