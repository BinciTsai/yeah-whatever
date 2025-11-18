import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(".md", "");
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

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    content,
  };
}
