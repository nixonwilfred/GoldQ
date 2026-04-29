import Link from "next/link";

const socials = [
  { label: "Telegram", href: "https://t.me" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TradingView", href: "https://tradingview.com" },
  { label: "Discord", href: "https://discord.com" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} GoldQ. Precision over noise.</p>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              className="transition hover:text-gold"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
