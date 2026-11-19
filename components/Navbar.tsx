"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const link of navLinks) {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-purple-500/20 bg-[#0a0514]/70 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#home" className="text-lg font-bold text-white">
          {site.shortName}
          <span className="text-purple-400">.</span>
        </a>

      
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`border-b-2 pb-1 text-sm transition ${
                    isActive
                      ? "border-purple-500 text-white"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500 lg:inline-block"
        >
          Hire Me
        </a>

       
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-white lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-purple-500/20 bg-[#0a0514]/95 px-6 py-4 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm ${
                  active === link.href.slice(1)
                    ? "text-white"
                    : "text-slate-400"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-md bg-purple-600 px-4 py-3 text-center text-sm font-medium text-white"
            >
              Hire Me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}