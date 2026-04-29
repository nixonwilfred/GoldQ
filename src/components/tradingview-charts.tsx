"use client";

import { useEffect } from "react";

function ChartWidget({ id, symbol }: { id: string; symbol: string }) {
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      withdateranges: true,
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });
    container.appendChild(script);
  }, [id, symbol]);

  return <div id={id} className="h-[420px] w-full" />;
}

export function TradingViewCharts() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-gold">Live Charts</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">NQ &amp; XAUUSD</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-panel p-2">
          <div className="px-3 py-2 text-sm font-medium text-zinc-300">Nasdaq 100 (NQ)</div>
          <ChartWidget id="tv-nq-chart" symbol="FOREXCOM:NSXUSD" />
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-panel p-2">
          <div className="px-3 py-2 text-sm font-medium text-zinc-300">Gold Spot (XAUUSD)</div>
          <ChartWidget id="tv-xau-chart" symbol="OANDA:XAUUSD" />
        </div>
      </div>
    </section>
  );
}
