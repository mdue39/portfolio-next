import { ArrowUpRight } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { experiences } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="Experience" title="Beyond the Code" />
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {experiences.map(({ icon: Icon, role, description, links }) => (
          <article
            key={role}
            className="group rounded-xl border border-purple-500/20 bg-purple-950/40 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-purple-400/60"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
              <Icon size={26} />
            </div>
            <h3 className="mt-5 font-semibold text-white">{role}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {description}
            </p>

            {links && links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                  >
                    <FaFacebook size={16} />
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}