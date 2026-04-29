import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the GoldQ trading philosophy for NQ Futures and Gold."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-gold">About GoldQ</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Built for Serious Traders</h1>
      <div className="mt-8 space-y-6 text-zinc-300">
        <p>
          GoldQ is a focused market analysis brand covering NQ Futures and Gold (XAUUSD)
          through a pure market structure and liquidity framework. The mission is simple:
          replace noise with structure, and opinions with executable setups.
        </p>
        <p>
          Every session plan is built around a top-down process: 1-hour market structure
          defines the bias — Break of Structure (BOS) and Change of Character (CHoCH)
          are the only filters that matter. From there, 5 and 15-minute timeframes are
          used to identify Market Structure Shifts (MSS), Fair Value Gaps (FVG), Inverse
          Fair Value Gaps (IFVG), and Breaker Blocks as entry confluences. Precise
          entries are timed on the 1-minute chart after a confirmed reaction candle.
        </p>
        <p>
          We do not trade support or resistance. Every setup is anchored to liquidity —
          sweeps of previous highs and lows, engineered stop runs, and institutional
          order flow. First targets are 1:1 risk-to-reward; second targets reach the
          next liquidity pool on the 1-hour chart. That is the entire edge.
        </p>
        <p>
          The philosophy is precision over prediction. Define the setup, manage the risk,
          and let execution quality compound over time.
        </p>
      </div>
    </section>
  );
}
