"use client";

import { FormEvent, useEffect, useState } from "react";

const DISMISS_KEY = "goldq-popup-dismissed";

export function EmailCapturePopup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISS_KEY);
    if (dismissed === "true") return;

    const timer = window.setTimeout(() => setOpen(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "true");
    setOpen(false);
  };

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
      setMessage("You're in. Daily levels are on the way.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-xl border border-gold/35 bg-panel p-5 shadow-2xl">
      <button
        type="button"
        aria-label="Close popup"
        onClick={dismiss}
        className="absolute right-3 top-3 text-zinc-400 transition hover:text-white"
      >
        ×
      </button>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Get Free Daily Levels</p>
      <h3 className="mt-2 text-lg font-semibold text-white">Join GoldQ Updates</h3>
      <p className="mt-2 text-sm text-zinc-300">
        Daily 1H structure bias, FVG/IFVG zones, and liquidity targets for NQ and Gold — before NY open.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-white/20 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : "Get Free Daily Levels"}
        </button>
      </form>

      {message ? (
        <p className={`mt-3 text-xs ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
