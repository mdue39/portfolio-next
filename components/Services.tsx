import { services } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading label="My services" title="What I Can Do For You" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-purple-500/20 bg-purple-950/40 p-6 backdrop-blur transition hover:border-purple-500/40"
          >
            <Icon className="text-purple-400" size={28} />
            <h3 className="mt-4 font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}