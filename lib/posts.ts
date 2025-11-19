import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Posts directory not found:", postsDirectory);
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  return fileNames.map((fileName) => {
    const rawSlug = fileName.replace(/\.md$/, "");

    // 🔥 Normalize slug（非常重要！避免 build 出現 slug 空白與奇怪字元）
    const slug = rawSlug.trim().replace(/\s+/g, "-");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      content,
    };
  });
}

export function getPostBySlug(slug: string): Post | null {
  // 🔥 防呆：避免 slug 名稱含空白或不可解析字元
  const safeSlug = slug.trim().replace(/\s+/g, "-");

  const fullPath = path.join(postsDirectory, `${safeSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error("Post not found:", fullPath);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: safeSlug,
    title: data.title || safeSlug,
    date: data.date || "",
    content,
  };
}
