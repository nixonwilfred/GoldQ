export const runtime = "nodejs";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: `/analysis/${post.slug}/opengraph-image` }]
    }
  };
}

export default async function AnalysisPostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
        {post.asset}
      </span>
      <h1 className="mt-4 text-4xl font-semibold text-white">{post.title}</h1>
      <p className="mt-3 text-zinc-400">{new Date(post.date).toLocaleDateString()}</p>

      <div className="mt-8 rounded-xl border border-white/10 bg-panel p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Directional Bias</p>
        <p
          className={`mt-2 text-lg font-semibold ${
            post.bias === "Bullish" ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {post.bias}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {post.priceZones.map((zone) => (
            <div key={zone} className="rounded-md border border-white/10 bg-black/30 p-3 text-sm">
              {zone}
            </div>
          ))}
        </div>
      </div>

      <div className="prose prose-invert prose-headings:text-white prose-strong:text-gold mt-8 max-w-none prose-p:text-zinc-300">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
