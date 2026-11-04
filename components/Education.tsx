"use client";

import { motion } from "framer-motion";
import { education, type EducationEntry } from "@/lib/education";

/**
 * Education section — simple vertical list of rows inside one glassmorphism
 * card. Lighter-weight than the Experience cards since there are no bullet
 * points here. The card reveals with a fade + slide-up on scroll.
 */
export default function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-white/10 bg-white/[0.02] px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Education
        </span>

        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Education
        </h2>

        <motion.div
          className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {education.map((entry: EducationEntry) => (
            <div
              key={entry.degree}
              className="flex flex-col gap-1 border-b border-white/10 py-6 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {entry.degree}
                </h3>
                <p className="mt-0.5 text-sm text-white/60">
                  {entry.institution}
                </p>
              </div>
              {entry.period ? (
                <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-white/40">
                  {entry.period}
                </span>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
