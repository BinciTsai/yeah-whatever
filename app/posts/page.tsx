import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-6">Articles</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <a
              href={`/posts/${post.slug}`}
              className="text-blue-600 text-xl hover:underline"
            >
              {post.title}
            </a>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
