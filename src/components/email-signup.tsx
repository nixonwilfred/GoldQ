"use client";

import { FormEvent, useState } from "react";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in. Watch your inbox for daily GoldQ levels.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-8">
      <h2 className="text-2xl font-semibold text-white">
        Get Free Daily Levels - Join 1,000+ Traders
      </h2>
      <p className="mt-3 max-w-2xl text-zinc-300">
        Receive daily 1H structure bias, identified FVG/IFVG zones, breaker blocks, and liquidity sweep targets for NQ and Gold — delivered before the New York open.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber"
        >
          {status === "loading" ? "Submitting..." : "Join Free"}
        </button>
      </form>
      {message ? (
        <p className={`mt-3 text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
          {message}
        </p>
      ) : null}
    </section>
  );
}
