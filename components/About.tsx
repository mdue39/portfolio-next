import { Download, Mail, MapPin } from "lucide-react";
import { aboutClosing, aboutParagraphs, site } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        label="About me"
        title="Building Solutions That Make an Impact"
      />
      <div className="grid gap-8 md:grid-cols-5">
        <div className="space-y-4 text-sm leading-relaxed md:col-span-3">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-white">{aboutClosing}</p>
          <a
            href={site.cvUrl}
            download
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Download CV <Download size={16} />
          </a>
        </div>

        <div className="h-fit rounded-xl border border-purple-500/20 bg-purple-950/40 p-6 backdrop-blur md:col-span-2">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-purple-400" />
            <div>
              <p className="text-sm font-medium text-white">Location</p>
              <p className="text-sm text-slate-400">{site.location}</p>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-3 border-t border-purple-500/20 pt-5">
            <Mail size={18} className="mt-0.5 shrink-0 text-purple-400" />
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="break-all text-sm text-slate-400 hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}