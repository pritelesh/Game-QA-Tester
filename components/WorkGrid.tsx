"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryProject } from "@/lib/gallery";

interface WorkGridProps {
  projects: GalleryProject[];
}

/** Cycle speed (ms) for the hover screenshot flip-through. */
const CYCLE_MS = 900;

/**
 * Animated gallery grid.
 * - Entrance: staggered fade/slide-up as each card scrolls into view.
 * - Hover: cover image zooms and auto-flips through the project's real
 *   screenshots; a glass overlay reveals title, shot count and a View action.
 */
export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: GalleryProject;
  index: number;
}) {
  const [shotIndex, setShotIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* While hovered, flip through every screenshot of this project. */
  useEffect(() => {
    if (!hovered || project.images.length < 2) return;

    intervalRef.current = setInterval(() => {
      setShotIndex((prev) => (prev + 1) % project.images.length);
    }, CYCLE_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered, project.images.length]);

  const handleEnter = () => setHovered(true);
  const handleLeave = () => {
    setHovered(false);
    setShotIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  /* Stagger columns nicely: delay grows with position in its row. */
  const entranceDelay = (index % 3) * 0.08;

  return (
    <motion.a
      href={project.images[0]}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} screenshots`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: entranceDelay, ease: "easeOut" }}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Screenshot viewport */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.images[shotIndex]}
          alt={`${project.title} website screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Shot counter dots */}
        {project.images.length > 1 && (
          <div className="absolute right-3 top-3 flex gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
            {project.images.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                  i === shotIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Glass hover overlay with View action */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#121212]/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white">
            View
          </span>
          <span className="text-[11px] text-white/50">
            {project.images.length}{" "}
            {project.images.length === 1 ? "shot" : "shots"}
          </span>
        </div>
      </div>

      {/* Caption bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-sm font-semibold tracking-tight text-white transition-opacity duration-300 group-hover:opacity-70">
          {project.title}
        </h3>
        <span
          aria-hidden
          className="text-white/40 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white"
        >
          &#8599;
        </span>
      </div>
    </motion.a>
  );
}
