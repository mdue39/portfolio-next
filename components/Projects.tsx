import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";


const imageExists = (src?: string) =>
  !!src && fs.existsSync(path.join(process.cwd(), "public", src));

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="Featured projects" title="Things I've Built" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const image = imageExists(p.image) ? p.image : undefined;
          return (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-purple-500/20 bg-purple-950/40 backdrop-blur transition hover:border-purple-500/40"
            >
              {image && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-purple-500/20">
                  <Image
                    src={image}
                    alt={`${p.title} mockup`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>

                {p.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {p.links && p.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300"
                      >
                        {l.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}