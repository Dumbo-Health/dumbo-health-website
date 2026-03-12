import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

export type { BlogPost };

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const author = post.blog_authors?.name ?? null;
  const categoryLabel = post.blog_categories?.label ?? post.category_slug ?? null;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Card className="border-0 shadow-sm overflow-hidden group">
      <div className="relative aspect-video bg-sunlight">
        <Image
          src={post.main_image || "/images/blog/default-blog.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        {categoryLabel && (
          <Badge variant="secondary" className="font-mono text-xs mb-3">
            {categoryLabel}
          </Badge>
        )}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-xl font-medium text-midnight mb-2 line-clamp-2 group-hover:text-peach transition-colors">
            {post.title}
          </h3>
        </Link>
        {post.short_description && (
          <p className="font-body text-sm text-midnight/60 line-clamp-3 mb-4">
            {post.short_description}
          </p>
        )}
        <div className="flex items-center justify-between">
          {author && <span className="font-body text-sm text-midnight/50">{author}</span>}
          {date && <span className="font-mono text-xs text-midnight/40">{date}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
