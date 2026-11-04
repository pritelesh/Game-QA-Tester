"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Bug Reports", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/**
 * Fixed dark-glass header with the "notch" hairline-rule accent.
 * Transparent over the hero, gains a blurred translucent backdrop (plus the
 * decorative horizontal rules) once the page is scrolled.
 */
export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overHero = !scrolled && !menuOpen;

  /* Flip the visual state just past the first viewport pixels. */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/50 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Notch hairline rules */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="39.5%"
          x2="100%"
          y2="39.5%"
          stroke="white"
          strokeOpacity={0.05}
          strokeWidth={0.5}
        />
        <line
          x1="0"
          y1="45%"
          x2="100%"
          y2="45%"
          stroke="white"
          strokeOpacity={0.05}
          strokeWidth={0.5}
        />
      </svg>

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        {/* Logo / name */}
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className={`py-2 text-lg font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-xl md:py-0 ${
            overHero ? "text-[#1a1205]" : "text-white"
          }`}
        >
          Pritelesh
          <span className={overHero ? "text-[#1a1205]/50" : "text-white/40"}>
            .qa
          </span>
        </a>

        {/* Nav links */}
        <ul className="hidden items-center gap-6 sm:gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
                  overHero
                    ? "text-[#1a1205]/70 hover:text-[#1a1205]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="flex flex-col items-center gap-1.5">
            <span
              className={`h-0.5 w-6 transition-transform duration-300 ${
                overHero ? "bg-[#1a1205]" : "bg-white"
              } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 transition-opacity duration-300 ${
                overHero ? "bg-[#1a1205]" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 transition-transform duration-300 ${
                overHero ? "bg-[#1a1205]" : "bg-white"
              } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-black/80 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col px-6 pb-6 sm:px-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
