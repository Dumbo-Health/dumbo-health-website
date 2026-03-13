import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

interface FeaturedPostCardProps {
  post: BlogPost;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const category = post.blog_categories?.label ?? null;
  const author = post.blog_authors?.name ?? null;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block mb-10">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
        style={{ boxShadow: "0 2px 12px rgba(3,31,61,0.07)" }}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-video md:aspect-auto md:min-h-[320px] bg-sunlight overflow-hidden">
            <Image
              src={post.main_image || "/images/blog/default-blog.jpg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center" style={{ background: "#fff" }}>
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.6875rem", color: "#FF8361" }}
                >
                  {category}
                </span>
              )}
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "0.6875rem", color: "rgba(3,31,61,0.35)", background: "#F5E6D1", padding: "2px 8px", borderRadius: "100px" }}
              >
                Featured
              </span>
            </div>
            <h2
              className="font-heading font-medium text-midnight mb-3 transition-colors duration-200 group-hover:text-peach"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.25 }}
            >
              {post.title}
            </h2>
            {post.short_description && (
              <p
                className="font-body mb-5 line-clamp-3"
                style={{ fontSize: "1rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.65 }}
              >
                {post.short_description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-auto">
              {author && (
                <span className="font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                  {author}
                </span>
              )}
              {(author && (date || post.reading_time)) && (
                <span style={{ color: "rgba(3,31,61,0.25)" }}>·</span>
              )}
              {date && (
                <span className="font-mono text-xs" style={{ color: "rgba(3,31,61,0.4)" }}>
                  {date}
                </span>
              )}
              {post.reading_time && (
                <>
                  <span style={{ color: "rgba(3,31,61,0.25)" }}>·</span>
                  <span className="font-mono text-xs" style={{ color: "rgba(3,31,61,0.4)" }}>
                    {post.reading_time} min read
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
