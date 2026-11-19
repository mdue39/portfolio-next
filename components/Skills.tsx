import type { ComponentType, CSSProperties } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiDjango,
  SiFigma,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Webhook } from "lucide-react";
import { skills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

type TechIcon = ComponentType<{
  size?: number;
  color?: string;
  className?: string;
}>;


function CanvaIcon({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canva-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#canva-gradient)" />
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fontStyle="italic"
        fontFamily="Georgia, serif"
        fill="#fff"
      >
        C
      </text>
    </svg>
  );
}


const techIcons: Record<string, { icon: TechIcon; color: string }> = {
  HTML: { icon: FaHtml5, color: "#E34F26" },
  CSS: { icon: FaCss3Alt, color: "#1572B6" },
  JavaScript: { icon: FaJs, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  Python: { icon: FaPython, color: "#4B8BBE" },
  Django: { icon: SiDjango, color: "#44B78B" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  "REST APIs": { icon: Webhook, color: "#D8B4FE" },
  Git: { icon: FaGitAlt, color: "#F05032" },
  GitHub: { icon: FaGithub, color: "#FFFFFF" },
  "VS Code": { icon: VscVscode, color: "#007ACC" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  Canva: { icon: CanvaIcon, color: "#00C4CC" },
};

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