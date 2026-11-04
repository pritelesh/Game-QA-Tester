"use client";

import { motion } from "framer-motion";
import MorphText from "@/components/ui/morph-text";
import { experience, type ExperienceEntry } from "@/lib/experience";

/**
 * Experience section — single-column cards of professional history, matching
 * the dark glassmorphism language used across the site. Each card reveals with
 * a slight fade + slide-up on scroll, staggered by index.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/10 bg-white/[0.02] px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Experience
        </span>

        <div className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          <MorphText
            words={["Professional Experience"]}
            fontSize="clamp(1.875rem, 4vw, 2.25rem)"
            fontFamily="inherit"
            className="exp-morph-heading items-start"
            interval={9000}
          />
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
          Operations, quality control and documentation experience that carries over to Game QA: accuracy, clear communication and consistent process.
        </p>

        <div className="mt-12 space-y-8">
          {experience.map((entry: ExperienceEntry, index) => (
            <motion.article
              key={`${entry.company}-${entry.role}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                {entry.period}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm text-white/60">{entry.company}</p>

              <ul className="mt-5 space-y-2.5">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
