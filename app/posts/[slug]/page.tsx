import { getPostBySlug } from "@/lib/posts";
import { marked } from "marked";

interface Props {
  params: { slug: string };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  // 🔥 防呆：避免 post 為 null 導致 build error
  if (!post) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p>The article you're looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
      />
    </main>
  );
}

// 🔥 Static generation for each post
export function generateStaticParams() {
  const posts = require("@/lib/posts").getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}
