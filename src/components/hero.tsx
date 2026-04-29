import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:38px_38px] opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-gold">GoldQ Research Desk</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Precision Analysis for NQ Futures &amp; Gold
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          Institutional-style level mapping, liquidity narratives, and high-probability trade
          plans for serious traders.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/analysis"
            className="rounded-md bg-gold px-6 py-3 text-center font-semibold text-black transition hover:bg-amber"
          >
            View Latest Analysis
          </Link>
          <Link
            href="/community"
            className="rounded-md border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-gold hover:text-gold"
          >
            Explore Community
          </Link>
        </div>
      </div>
    </section>
  );
}
