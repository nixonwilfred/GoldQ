import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://goldq.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticPages = ["", "/analysis", "/community", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/analysis/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [...staticPages, ...postPages];
}
