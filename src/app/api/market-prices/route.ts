type TickerPayload = {
  symbol: "XAUUSD";
  label: string;
  price: string;
  change: string;
};

// Fallback prices reflect approximate current market levels
const FALLBACK: TickerPayload[] = [
  { symbol: "XAUUSD", label: "XAUUSD", price: "4,683.64", change: "-0.32%" }
];

function formatPrice(value: number | undefined) {
  if (typeof value !== "number") return "--";
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPercent(value: number | undefined) {
  if (typeof value !== "number") return "0.00%";
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

type FinnhubQuote = {
  c: number;   // current price
  d: number;   // change
  dp: number;  // percent change
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

async function fetchFinnhubQuote(symbols: string[], apiKey: string) {
  for (const symbol of symbols) {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`,
        { next: { revalidate: 15 } }
      );
      if (!response.ok) continue;

      const data = (await response.json()) as FinnhubQuote;
      if (!data || data.c === 0 || !Number.isFinite(data.c)) continue;

      return {
        price: formatPrice(data.c),
        change: formatPercent(Number.isFinite(data.dp) ? data.dp : undefined)
      };
    } catch {
      continue;
    }
  }

  return null;
}

export async function GET() {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    return Response.json({ prices: FALLBACK, live: false }, { status: 200 });
  }

  try {
    // PAXG/XAUT are 24/7 gold tokens (1 token = 1 oz gold)
    const xauQuote = await fetchFinnhubQuote(["BINANCE:PAXGUSDT", "BINANCE:XAUTUSDT"], apiKey);

    const prices = [
      { ...FALLBACK[0], ...(xauQuote ?? {}) }
    ];

    return Response.json({ prices, live: Boolean(xauQuote) });
  } catch {
    return Response.json({ prices: FALLBACK, live: false }, { status: 200 });
  }
}
