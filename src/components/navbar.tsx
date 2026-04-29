import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/analysis", label: "Analysis" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gold">
          GoldQ
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/community"
          className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber"
        >
          Join Community
        </Link>
      </div>
    </header>
  );
}
