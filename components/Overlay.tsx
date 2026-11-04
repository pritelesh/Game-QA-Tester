"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface OverlayProps {
  /** Shared scroll progress of the 500vh scrollytelling track (0 -> 1). */
  progress: MotionValue<number>;
}

const HERO_COPY = {
  block1: { title: "Pritelesh Bhowmik.", subtitle: "Game QA Tester." },
  block2: { title: "I find the bugs", subtitle: "players would hit." },
  block3: { title: "Clear reports.", subtitle: "Reproducible steps." },
} as const;

/**
 * Parallax text overlay pinned above the sticky canvas.
 *
 * Three copy blocks, each with its own fade window on the scroll progress and
 * a vertical parallax drift (moves slower than scroll for depth):
 *   - Block 1 @  0%: intro name/title, centered
 *   - Block 2 @ 30%: Chobicode statement, left aligned
 *   - Block 3 @ 60%: design x engineering, right aligned
 */
export default function Overlay({ progress }: OverlayProps) {
  /* --- Block 1: visible at the very start, gone before Block 2 arrives --- */
  const opacity1 = useTransform(progress, [0, 0.02, 0.2, 0.28], [0, 1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.28], [0, -90]);

  /* --- Block 2: fades in around 30% --- */
  const opacity2 = useTransform(progress, [0.26, 0.33, 0.5, 0.57], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.26, 0.57], [70, -70]);

  /* --- Block 3: fades in around 60% --- */
  const opacity3 = useTransform(progress, [0.56, 0.63, 0.8, 0.87], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.56, 0.87], [70, -70]);

  return (
    <div className="absolute inset-0">
      {/* Section 1 — centered intro */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <h1 className="max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-[#1a1205] sm:text-6xl md:text-7xl">
          {HERO_COPY.block1.title}
          <span className="mt-2 block text-[#1a1205]/55">
            {HERO_COPY.block1.subtitle}
          </span>
        </h1>
      </motion.div>

      {/* Section 2 — left aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center px-6 sm:px-16 lg:px-24"
      >
        <h2 className="max-w-2xl text-left text-3xl font-semibold leading-tight tracking-tight text-[#1a1205] sm:text-5xl md:text-6xl">
          {HERO_COPY.block2.title}{" "}
          <span className="text-[#1a1205]/55">{HERO_COPY.block2.subtitle}</span>
        </h2>
      </motion.div>

      {/* Section 3 — left aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center px-6 sm:px-16 lg:px-24"
      >
        <h2 className="max-w-2xl text-left text-3xl font-semibold leading-tight tracking-tight text-[#1a1205] sm:text-5xl md:text-6xl">
          {HERO_COPY.block3.title}
          <span className="block text-[#1a1205]/55">
            {HERO_COPY.block3.subtitle}
          </span>
        </h2>
      </motion.div>
    </div>
  );
}
