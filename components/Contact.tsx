"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { site } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const inputClass =
  "mt-1 w-full rounded-md border border-purple-500/20 bg-purple-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="Contact" title="Let's Work Together" />
      <div className="grid gap-8 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          <p className="text-slate-400">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you.
          </p>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 shrink-0 text-purple-400" />
            <a
              href={`mailto:${site.email}`}
              className="break-all text-sm hover:text-white"
            >
              {site.email}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-purple-400" />
            <span className="text-sm">{site.location}</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-purple-500/20 bg-purple-950/40 p-6 backdrop-blur md:col-span-3"
        >
          <label className="block text-sm text-white">
            Name
            <input
              required
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
              className={inputClass}
            />
          </label>
          <label className="block text-sm text-white">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
          <label className="block text-sm text-white">
            Message
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              placeholder="Tell me about your project..."
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Send Message <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}