import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const platformUrls: Record<string, string> = {
  Coursera: "https://www.coursera.org",
  Uxcel: "https://uxcel.com",
};

export default function Certifications() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="Certifications" title="Learning That Backs My Skills" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => {
          
          const href = c.link ?? (c.platform ? platformUrls[c.platform] : undefined);
          const label = c.link
            ? "View certificate"
            : c.platform
              ? `View on ${c.platform}`
              : "View";

          return (
            <article
              key={c.title}
              className="group flex flex-col rounded-xl border border-purple-500/20 bg-purple-950/40 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-purple-400/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
                <Award size={26} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-purple-400">
                {c.issuer}
              </p>
              <h3 className="mt-1 font-semibold text-white">{c.title}</h3>
              {c.platform && (
                <p className="mt-2 text-sm text-slate-400">via {c.platform}</p>
              )}

              {href && (
                <div className="mt-auto pt-5">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200 transition hover:bg-purple-500/25 hover:text-white"
                  >
                    {label} <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}