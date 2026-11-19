import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="Certifications" title="Learning That Backs My Skills" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
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

            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
              >
                View certificate <ArrowUpRight size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}