import type { ComponentType } from "react";
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

export type TechIcon = ComponentType<{
  size?: number;
  color?: string;
  className?: string;
}>;

// react-icons has no Canva logo, so this is a simple Canva-style badge
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

// Skill name (must match the names in data/portfolio.ts) -> logo + brand colour
export const techIcons: Record<string, { icon: TechIcon; color: string }> = {
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