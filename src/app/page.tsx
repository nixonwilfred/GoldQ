import { AnalysisCard } from "@/components/analysis-card";
import { EmailCapturePopup } from "@/components/email-capture-popup";
import { EmailSignup } from "@/components/email-signup";
import { Hero } from "@/components/hero";
import { SocialProofBar } from "@/components/social-proof-bar";
import { TradingViewCharts } from "@/components/tradingview-charts";
import { WhyGoldQ } from "@/components/why-goldq";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <SocialProofBar />
      <TradingViewCharts />
      <WhyGoldQ />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gold">Latest Views</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Market Analysis</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <AnalysisCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <EmailSignup />
      </section>
      <EmailCapturePopup />
    </>
  );
}
