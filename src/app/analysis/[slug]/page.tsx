export const runtime = "nodejs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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

function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold text-white mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-zinc-300">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc my-3">$&</ul>')
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-zinc-300 leading-7 my-3">$1</p>')
    .replace(/<p class="text-zinc-300 leading-7 my-3"><\/p>/g, '');
}

export default async function AnalysisPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const htmlContent = renderMarkdown(post.content);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
        {post.asset}
      </span>
      <h1 className="mt-4 text-4xl font-semibold text-white">{post.title}</h1>
      <p className="mt-3 text-zinc-400">{new Date(post.date).toLocaleDateString()}</p>

      <div className="mt-8 rounded-xl border border-white/10 bg-panel p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Directional Bias</p>
        <p className={`mt-2 text-lg font-semibold ${post.bias === "Bullish" ? "text-emerald-400" : "text-rose-400"}`}>
          {post.bias}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {post.priceZones.map((zone) => (
            <div key={zone} className="rounded-md border border-white/10 bg-black/30 p-3 text-sm text-zinc-300">
              {zone}
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
