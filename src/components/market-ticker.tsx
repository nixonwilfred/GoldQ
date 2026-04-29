"use client";

import { useEffect, useState } from "react";

type TickerPrice = {
  symbol: "XAUUSD";
  label: string;
  price: string;
  change: string;
};

export function MarketTicker() {
  const [prices, setPrices] = useState<TickerPrice[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadPrices() {
      try {
        const response = await fetch("/api/market-prices", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { prices: TickerPrice[]; live: boolean };
        if (!mounted) return;
        setPrices(data.prices);
        setIsLive(data.live);
      } catch {
        // Keep previous prices on transient errors.
      }
    }

    loadPrices();
    const interval = window.setInterval(loadPrices, 30000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="border-y border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          {prices.length === 0 ? (
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Loading prices...</span>
          ) : (
            prices.map((item) => {
              const positive = item.change.trim().startsWith("+");
              return (
                <div key={item.symbol} className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.price}</span>
                  <span className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}>
                    {item.change}
                  </span>
                </div>
              );
            })
          )}
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {isLive ? "Live: Finnhub" : "Delayed/Fallback"}
        </span>
      </div>
    </div>
  );
}
