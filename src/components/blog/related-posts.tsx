import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/supabase";

interface RelatedPostsProps {
  posts: BlogPost[];
}

function RelatedCard({ post }: { post: BlogPost }) {
  const category = post.blog_categories?.label ?? null;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className="rounded-xl overflow-hidden transition-all duration-200 group-hover:-translate-y-1"
        style={{ boxShadow: "0 1px 4px rgba(3,31,61,0.06)" }}
      >
        <div className="relative aspect-video bg-sunlight overflow-hidden">
          <Image
            src={post.main_image || "/images/blog/default-blog.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5" style={{ background: "#fff" }}>
          {category && (
            <span
              className="font-mono uppercase tracking-widest block mb-2"
              style={{ fontSize: "0.6875rem", color: "#FF8361" }}
            >
              {category}
            </span>
          )}
          <h3
            className="font-heading font-medium text-midnight mb-2 line-clamp-2 transition-colors duration-150 group-hover:text-peach"
            style={{ fontSize: "1.0625rem", lineHeight: 1.4 }}
          >
            {post.title}
          </h3>
          <div className="flex items-center gap-2">
            {date && (
              <span
                className="font-mono"
                style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.4)" }}
              >
                {date}
              </span>
            )}
            {post.reading_time && (
              <>
                <span style={{ color: "rgba(3,31,61,0.25)", fontSize: "0.75rem" }}>·</span>
                <span
                  className="font-mono"
                  style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.4)" }}
                >
                  {post.reading_time} min read
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12" style={{ borderTop: "1px solid #F5E6D1" }}>
      <h2
        className="font-heading font-medium text-midnight mb-8"
        style={{ fontSize: "1.5rem" }}
      >
        Keep reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RelatedCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
