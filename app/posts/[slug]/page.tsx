import { getPostBySlug } from "@/lib/posts";
import { marked } from "marked";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div className="prose mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: marked(post.content || "") }}
      />
    </div>
  );
}
