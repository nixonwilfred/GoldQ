const features = [
  {
    title: "Daily NQ Levels",
    description:
      "Pre-market 1H structure bias, identified FVG/IFVG zones, breaker blocks, and liquidity sweep targets — no support or resistance, only structure."
  },
  {
    title: "Gold Analysis",
    description:
      "XAUUSD top-down analysis: 1H market structure, 15M MSS confluences, and precision 1M entry plans targeting the next liquidity pool."
  },
  {
    title: "Member Community",
    description:
      "A focused Discord community with shared trade ideas, live session callouts, and accountability around a consistent SMC framework."
  }
];

export function WhyGoldQ() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-gold">Why GoldQ</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">A Process Built for Consistency</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-white/10 bg-panel p-6 transition hover:border-gold/40"
          >
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-zinc-300">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
