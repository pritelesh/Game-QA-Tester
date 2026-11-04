"use client";

import { motion } from "framer-motion";
import { skillGroups, type SkillGroup } from "@/lib/skills";

/**
 * Skills & Tech Stack section — grouped skill cards in the dark glassmorphism
 * language, each revealing with a fade + slide-up on scroll, staggered by
 * index.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/10 bg-white/[0.02] px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Skills
        </span>

        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          QA Skills &amp; Tools
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group: SkillGroup, index) => (
            <motion.article
              key={group.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="mb-5 text-lg font-semibold text-white">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wider text-white/60 transition-all duration-300 ease-out will-change-transform hover:scale-110 hover:border-white/30 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
