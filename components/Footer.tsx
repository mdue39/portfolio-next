import type { ComponentType } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "@/data/portfolio";

const socialIcons: Record<string, ComponentType<{ size?: number }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-purple-500/20 bg-[#0a0514]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <p>© 2026 {site.name}. All rights reserved.</p>

        <ul className="flex items-center gap-3">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.label];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-950/40 text-slate-300 transition hover:-translate-y-1 hover:border-purple-400/60 hover:text-white hover:shadow-[0_0_14px_rgba(192,132,252,0.5)]"
                >
                  {Icon ? <Icon size={18} /> : s.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              title="Email"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-950/40 text-slate-300 transition hover:-translate-y-1 hover:border-purple-400/60 hover:text-white hover:shadow-[0_0_14px_rgba(192,132,252,0.5)]"
            >
              <Mail size={18} />
            </a>
          </li>
        </ul>

        <a
          href="#home"
          className="inline-flex items-center gap-1 transition hover:text-white"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}