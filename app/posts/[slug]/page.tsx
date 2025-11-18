import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { marked } from "marked";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

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
