const placeholders = ["AJ", "MK", "RS", "TN", "PL"];

export function SocialProofBar() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-panel/70 px-6 py-4 sm:flex-row">
        <p className="text-sm font-medium text-zinc-200">Trusted by 1,000+ traders</p>
        <div className="flex items-center">
          {placeholders.map((initials, index) => (
            <span
              key={initials}
              className={`-ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-black text-xs font-semibold text-black ${
                index % 2 === 0 ? "bg-gold" : "bg-amber"
              }`}
            >
              {initials}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
