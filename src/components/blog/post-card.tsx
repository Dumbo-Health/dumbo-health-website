import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

export type { BlogPost };

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const author = post.blog_authors?.name ?? null;
  const authorAvatar = post.blog_authors?.profile_picture ?? null;
  const categoryLabel = post.blog_categories?.label ?? post.category_slug ?? null;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className="rounded-xl overflow-hidden h-full flex flex-col transition-all duration-200 group-hover:-translate-y-1"
        style={{
          background: "#fff",
          boxShadow: "0 1px 4px rgba(3,31,61,0.06)",
        }}
      >
        {/* Image */}
        <div className="relative aspect-video bg-sunlight overflow-hidden flex-shrink-0">
          <Image
            src={post.main_image || "/images/blog/default-blog.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {categoryLabel && (
            <span
              className="font-mono uppercase tracking-widest block mb-2"
              style={{ fontSize: "0.6875rem", color: "#FF8361" }}
            >
              {categoryLabel}
            </span>
          )}
          <h3
            className="font-heading font-medium text-midnight mb-2 line-clamp-2 transition-colors duration-150 group-hover:text-peach"
            style={{ fontSize: "1.125rem", lineHeight: 1.35 }}
          >
            {post.title}
          </h3>
          {post.short_description && (
            <p
              className="font-body line-clamp-2 mb-4"
              style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.6 }}
            >
              {post.short_description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid #F5E6D1" }}>
            <div className="flex items-center gap-2">
              {authorAvatar && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={authorAvatar} alt={author ?? ""} fill className="object-cover" />
                </div>
              )}
              {author && (
                <span className="font-body text-xs" style={{ color: "rgba(3,31,61,0.5)" }}>
                  {author}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {date && (
                <span className="font-mono text-xs" style={{ color: "rgba(3,31,61,0.4)" }}>
                  {date}
                </span>
              )}
              {post.reading_time && (
                <>
                  <span style={{ color: "rgba(3,31,61,0.25)", fontSize: "0.75rem" }}>·</span>
                  <span className="font-mono text-xs" style={{ color: "rgba(3,31,61,0.4)" }}>
                    {post.reading_time} min
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
