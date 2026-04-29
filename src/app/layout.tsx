import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketTicker } from "@/components/market-ticker";

const siteUrl = "https://goldq.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GoldQ | NQ Futures & Gold Analysis",
    template: "%s | GoldQ"
  },
  description:
    "Professional NQ Futures and XAUUSD analysis with daily levels, bias mapping, and trade plans.",
  openGraph: {
    title: "GoldQ | NQ Futures & Gold Analysis",
    description:
      "Precision analysis for NQ Futures & Gold with institutional level mapping and directional bias.",
    url: siteUrl,
    siteName: "GoldQ",
    type: "website",
    images: [{ url: "/opengraph-image" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "GoldQ | NQ Futures & Gold Analysis",
    description: "Get high-conviction NQ and Gold market analysis.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <MarketTicker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
