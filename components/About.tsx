"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import CreepyButton from "@/components/ui/creepy-button";
import BlockTextReveal from "@/components/ui/block-text-reveal";
import FlipText from "@/components/ui/flip-text";

const CV_PATH = "/CV-pdf/Pritelesh-Bhowmik-Game-QA-Resume.pdf";

const SKILL_TAGS = [
  "Gameplay Testing",
  "Bug Reporting",
  "Test Cases",
  "Unreal Engine & Blender (Learning)",
];

export default function About() {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    downloadRef.current?.click();
  };

  return (
    <section
      id="about"
      className="relative border-t border-white/10 bg-white/[0.02] px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-12 md:p-16">
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            About
          </span>

          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            <FlipText>About Me</FlipText>
          </h2>

          <div className="mt-6 max-w-2xl">
            <BlockTextReveal
              text="Aspiring Game QA Tester with 10+ years of gaming experience across FPS, MOBA, RPG, Strategy and Simulation titles, including 18,000+ hours in competitive games. B.Sc in Computer Science & Engineering. Focused on gameplay analysis, bug reporting and clear test documentation, backed by a background in quality control, operations and international client communication. Learning game development with Unreal Engine and Blender to understand why bugs happen, not just how to reproduce them."
              font={{
                fontSize: "16px",
                fontFamily: "inherit",
                fontWeight: 400,
                lineHeight: "1.7em",
                letterSpacing: "0em",
              }}
              align="left"
              textColor="#FFFFFF99"
              blockColor="#FFFFFF"
              revealType="lines"
              direction="left"
              rounded={4}
              speed={60}
              highlight={[]}
            />
          </div>

          {/* Skill tags */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {SKILL_TAGS.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CV download */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              ref={downloadRef}
              href={CV_PATH}
              download="Pritelesh Bhowmik - Game QA Resume.pdf"
              className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
              aria-hidden
              tabIndex={-1}
            />
            <CreepyButton onClick={handleDownload}>
              Download CV
            </CreepyButton>
            <span className="text-xs text-white/40">PDF · 69 KB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
