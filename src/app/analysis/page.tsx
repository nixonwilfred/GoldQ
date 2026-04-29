import type { Metadata } from "next";
import Link from "next/link";
import { AnalysisCard } from "@/components/analysis-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Analysis",
  description: "Daily NQ Futures and Gold trade analysis."
};

export default async function AnalysisPage({
  searchParams
}: {
  searchParams: { asset?: "NQ" | "Gold" };
}) {
  const posts = await getAllPosts();
  const currentFilter = searchParams.asset;
  const filteredPosts =
    currentFilter && (currentFilter === "NQ" || currentFilter === "Gold")
      ? posts.filter((post) => post.asset === currentFilter)
      : posts;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-gold">Research Archive</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">NQ &amp; Gold Analysis</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Top-down market structure analysis: 1H bias, 15M MSS setups, FVG/IFVG confluences, breaker blocks, and liquidity sweep targets for NQ and XAUUSD.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/analysis"
          className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
            !currentFilter
              ? "border-gold bg-gold text-black"
              : "border-white/20 text-zinc-200 hover:border-gold hover:text-gold"
          }`}
        >
          All
        </Link>
        <Link
          href="/analysis?asset=NQ"
          className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
            currentFilter === "NQ"
              ? "border-gold bg-gold text-black"
              : "border-white/20 text-zinc-200 hover:border-gold hover:text-gold"
          }`}
        >
          NQ
        </Link>
        <Link
          href="/analysis?asset=Gold"
          className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
            currentFilter === "Gold"
              ? "border-gold bg-gold text-black"
              : "border-white/20 text-zinc-200 hover:border-gold hover:text-gold"
          }`}
        >
          Gold
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <AnalysisCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
