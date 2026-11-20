import type { CSSProperties } from "react";
import { skills } from "@/data/portfolio";
import { techIcons } from "@/data/techIcons";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="My skills" title="Technologies I Work With" />

      <div className="space-y-10">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group}>
            <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-purple-300">
              {group}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {items.map((name, i) => {
                const tech = techIcons[name];
                const Icon = tech?.icon;
                return (
                  <div
                    key={name}
                    className="tech-tile flex w-28 flex-col items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-5 backdrop-blur transition hover:border-purple-400/60"
                    style={{ "--glow": tech?.color ?? "#C084FC" } as CSSProperties}
                  >
                    {Icon ? (
                      <div
                        className="animate-float"
                        style={{ animationDelay: `${(i % 6) * 0.3}s` }}
                      >
                        <Icon size={40} color={tech.color} className="tech-icon" />
                      </div>
                    ) : null}
                    <span className="text-center text-xs text-slate-300">
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}