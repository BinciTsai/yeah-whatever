import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { marked } from "marked";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>

      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
      />
    </main>
  );
}
