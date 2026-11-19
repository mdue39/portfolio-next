import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24"
    >
      <p className="text-lg text-purple-400">Hello, I&apos;m</p>
      <h1 className="mt-2 text-5xl font-bold text-white md:text-7xl">
        {site.name}
      </h1>
      <h2 className="mt-1 text-3xl font-semibold text-white md:text-5xl">
        {site.role}
      </h2>
      <p className="mt-6 max-w-xl text-slate-400">{site.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-500"
        >
          View My Work <ArrowRight size={16} />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-md border border-purple-500/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-500/10"
        >
          <Mail size={16} /> Contact Me
        </a>
      </div>
    </section>
  );
}