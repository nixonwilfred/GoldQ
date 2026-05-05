import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the GoldQ Discord community for premium market analysis."
};

const features = [
  "Daily pre-market 1H structure bias, FVG/IFVG zones, and liquidity sweep targets for NQ and Gold",
  "Intraday voice notes and real-time MSS callouts during London and NY sessions",
  "Weekly structure review: BOS/CHoCH mapping, breaker block recaps, and trade post-mortems",
  "Private Discord channels with disciplined traders focused on SMC execution"
];

export default function CommunityPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-gold">Discord Membership</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Trade with an Edge</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        The GoldQ Community gives you a structured top-down framework — 1H market structure bias, 15M MSS entries, FVG/IFVG confluences, and liquidity sweep triggers — with live callouts and accountability to execute with discipline in NQ and XAUUSD.
      </p>

      <div className="mt-10 rounded-2xl border border-gold/30 bg-panel p-8 shadow-[0_0_60px_rgba(245,166,35,0.08)]">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Monthly Membership</p>
        <p className="mt-2 text-5xl font-bold text-gold">$50</p>
        <p className="mt-1 text-zinc-400">per month</p>
        <ul className="mt-7 space-y-3 text-zinc-200">
          {features.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
        <a
          href="https://discord.gg/trGGwwS3fm"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block w-full rounded-md bg-gold px-6 py-3 text-center font-semibold text-black transition hover:bg-amber sm:w-auto"
        >
          Join GoldQ Discord
        </a>
      </div>
    </section>
  );
}
