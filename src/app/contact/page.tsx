import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GoldQ for partnerships, support, and business inquiries."
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-gold">Contact</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Get in Touch</h1>
      <p className="mt-4 text-zinc-300">
        Reach out for support, partnerships, or media opportunities.
      </p>

      <ContactForm />
    </section>
  );
}
