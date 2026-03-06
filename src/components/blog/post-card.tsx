import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  image?: string;
}

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="border-0 shadow-sm overflow-hidden group">
      <div className="relative aspect-video bg-sunlight">
        <Image
          src={post.image || "/images/blog/default-blog.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <Badge variant="secondary" className="font-mono text-tag mb-3">
          {post.category}
        </Badge>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading text-lg text-midnight mb-2 line-clamp-2 group-hover:text-peach transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="font-body text-sm text-midnight/60 line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-midnight/50">{post.author}</span>
          <span className="font-mono text-tag text-midnight/40">{post.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
