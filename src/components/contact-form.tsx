"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(data.message ?? "Unable to send your message. Please try again.");
        return;
      }

      setState("success");
      setMessage("Your message was sent successfully. We will get back to you soon.");
      form.reset();
    } catch {
      setState("error");
      setMessage("Network error. Please try again in a moment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-xl border border-white/10 bg-panel p-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-200" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-3 text-white focus:border-gold focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-md bg-gold px-6 py-3 font-semibold text-black transition hover:bg-amber disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "loading" ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p className={state === "success" ? "text-sm text-emerald-400" : "text-sm text-red-400"}>{message}</p>
      ) : null}
    </form>
  );
}
