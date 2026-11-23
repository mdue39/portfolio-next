"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Loader2, Mail, MapPin, Send, TriangleAlert } from "lucide-react";
import { site } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

// These come from .env.local (and Vercel's Environment Variables)
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// Optional: a second template that emails a confirmation to the sender
const REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID;

const inputClass =
  "mt-1 w-full rounded-md border border-purple-500/20 bg-purple-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // bots fill this, people never see it
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== "sending") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Spam bot: pretend it worked, send nothing
    if (honeypot) {
      setStatus("sent");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS environment variables are missing.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    const params = { name: form.name, email: form.email, message: form.message };

    try {
      // 1. Message to you
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });

      // 2. Optional confirmation to the sender (never blocks success)
      if (REPLY_TEMPLATE_ID) {
        emailjs
          .send(SERVICE_ID, REPLY_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
          .catch((err) => console.error("Confirmation email failed:", err));
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
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
          {/* Honeypot: hidden from people */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

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
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                Sending <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>

          <div aria-live="polite">
            {status === "sent" && (
              <p className="flex items-start gap-2 text-sm text-emerald-300">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                Thank you! Your message was sent. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-start gap-2 text-sm text-red-300">
                <TriangleAlert size={18} className="mt-0.5 shrink-0" />
                <span>
                  Sorry, something went wrong and your message was not sent.
                  Please email me directly at{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="underline hover:text-white"
                  >
                    {site.email}
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}