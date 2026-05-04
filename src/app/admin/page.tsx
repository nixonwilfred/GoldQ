"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    asset: "Gold",
    bias: "Bullish",
    excerpt: "",
    priceZone1: "",
    priceZone2: "",
    priceZone3: "",
    priceZone4: "",
    content: "",
  });

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "goldqadmin") {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Try again.");
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const priceZones = [form.priceZone1, form.priceZone2, form.priceZone3, form.priceZone4].filter(Boolean);
    const slug = generateSlug(form.title);

    const mdxContent = `---
title: "${form.title}"
date: "${form.date}"
asset: "${form.asset}"
excerpt: "${form.excerpt}"
bias: "${form.bias}"
priceZones:
${priceZones.map((z) => `  - "${z}"`).join("\n")}
---
${form.content}`;

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: mdxContent, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      } else {
        setStatus("success");
        setMessage(`✅ Post published! Live at /analysis/${slug}`);
        setForm({
          title: "",
          date: new Date().toISOString().split("T")[0],
          asset: "Gold",
          bias: "Bullish",
          excerpt: "",
          priceZone1: "",
          priceZone2: "",
          priceZone3: "",
          priceZone4: "",
          content: "",
        });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gold text-center mb-2">GoldQ Admin</h1>
          <p className="text-zinc-400 text-center mb-8">Enter your admin password</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none"
            />
            {authError && <p className="text-rose-400 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-md bg-gold px-6 py-3 font-semibold text-black transition hover:bg-amber"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gold">📝 New Analysis Post</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-zinc-400 hover:text-white"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Title *</label>
            <input
              required
              type="text"
              placeholder="e.g. XAUUSD — Liquidity Swept at 4,700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none"
            />
            {form.title && (
              <p className="text-xs text-zinc-500 mt-1">Slug: {generateSlug(form.title)}</p>
            )}
          </div>

          {/* Date + Asset + Bias */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Asset *</label>
              <select
                value={form.asset}
                onChange={(e) => setForm({ ...form, asset: e.target.value })}
                className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                <option value="Gold">Gold</option>
                <option value="NQ">NQ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Bias *</label>
              <select
                value={form.bias}
                onChange={(e) => setForm({ ...form, bias: e.target.value })}
                className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
              >
                <option value="Bullish">Bullish</option>
                <option value="Bearish">Bearish</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Excerpt *</label>
            <textarea
              required
              rows={2}
              placeholder="Brief summary shown on the analysis card..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none resize-none"
            />
          </div>

          {/* Price Zones */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Price Zones</label>
            <div className="grid grid-cols-2 gap-3">
              {["priceZone1", "priceZone2", "priceZone3", "priceZone4"].map((key, i) => (
                <input
                  key={key}
                  type="text"
                  placeholder={`Zone ${i + 1} e.g. 1H IFVG: 4,660-4,672`}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none"
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Analysis Content * <span className="text-zinc-500">(Markdown supported)</span>
            </label>
            <textarea
              required
              rows={12}
              placeholder="## 1H Market Structure&#10;&#10;Write your analysis here...&#10;&#10;## Setup&#10;&#10;## Entry&#10;&#10;## Targets&#10;&#10;## Invalidation"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none font-mono text-sm resize-y"
            />
          </div>

          {/* Submit */}
          {message && (
            <p className={`text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-md bg-gold px-6 py-4 font-semibold text-black transition hover:bg-amber disabled:opacity-50 text-lg"
          >
            {status === "loading" ? "Publishing..." : "🚀 Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
