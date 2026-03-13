import { PostCard, type BlogPost } from "./post-card";

interface PostGridProps {
  posts: BlogPost[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
