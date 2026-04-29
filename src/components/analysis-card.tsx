import Link from "next/link";
import type { AnalysisPost } from "@/lib/posts";

type AnalysisCardProps = {
  post: AnalysisPost;
};

export function AnalysisCard({ post }: AnalysisCardProps) {
  return (
    <article className="group rounded-xl border border-white/10 bg-panel p-6 transition hover:border-gold/50">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
          {post.asset}
        </span>
        <span className="text-sm text-zinc-400">
          {new Date(post.date).toLocaleDateString()}
        </span>
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white">{post.title}</h3>
      <p className="mb-5 text-sm leading-6 text-zinc-300">{post.excerpt}</p>
      <Link
        href={`/analysis/${post.slug}`}
        className="inline-flex items-center text-sm font-semibold text-gold transition group-hover:text-amber"
      >
        Read More &rarr;
      </Link>
    </article>
  );
}
