import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type AssetType = "NQ" | "Gold";
export type BiasType = "Bullish" | "Bearish";

export type AnalysisPost = {
  slug: string;
  title: string;
  date: string;
  asset: AssetType;
  excerpt: string;
  bias: BiasType;
  priceZones: string[];
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "analysis");

function parsePost(slug: string, fileContent: string): AnalysisPost {
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    asset: data.asset === "Gold" ? "Gold" : "NQ",
    excerpt: String(data.excerpt ?? ""),
    bias: data.bias === "Bearish" ? "Bearish" : "Bullish",
    priceZones: Array.isArray(data.priceZones)
      ? data.priceZones.map((zone) => String(zone))
      : [],
    content
  };
}

export async function getAllPosts(): Promise<AnalysisPost[]> {
  const files = await fs.readdir(postsDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(postsDir, file), "utf8");
      return parsePost(slug, raw);
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<AnalysisPost | null> {
  try {
    const raw = await fs.readFile(path.join(postsDir, `${slug}.mdx`), "utf8");
    return parsePost(slug, raw);
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
