// app/posts/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function PostsPage() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(postsDir, filename),
      "utf-8"
    );
    const { data } = matter(fileContent);

    return {
      title: data.title || filename,
      date: data.date || "No date",
      filename,
    };
  });

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">文章列表</h1>

      <ul className="space-y-6">
        {posts.map((p) => (
          <li
            key={p.filename}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-2xl font-semibold">{p.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{p.date}</p>

            <pre className="text-sm text-gray-700 overflow-x-auto">
              文章檔案：{p.filename}
            </pre>
          </li>
        ))}
      </ul>
    </main>
  );
}
