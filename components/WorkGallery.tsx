"use client";

import { useMemo } from "react";
import SphereGallery3D from "@/components/SphereGallery3D";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import type { GalleryProject } from "@/lib/gallery";

interface WorkGalleryProps {
  projects: GalleryProject[];
}

export default function WorkGallery({ projects }: WorkGalleryProps) {
  const items = useMemo(
    () =>
      projects.map((p) => ({
        image: p.images[0] || "",
        link: p.images[0] || "#",
      })),
    [projects],
  );

  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mb-14 flex flex-col items-center gap-3 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Selected Work
        </span>
        <h2 className="max-w-xs text-3xl font-semibold tracking-tight text-white sm:max-w-none sm:whitespace-nowrap sm:text-4xl md:text-5xl">
          <GooeyTextReveal mode="scroll" stagger={0.05} duration={1.2}>
            Websites shipped, pixel by pixel.
          </GooeyTextReveal>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/50">
          {projects.length} projects — drag to orbit the sphere, hover a card,
          click to open.
        </p>
      </div>

      <div className="h-[60vh] min-h-[380px] w-full sm:h-[70vh] sm:min-h-[520px]">
        <SphereGallery3D
          images={items}
          branches={projects.length}
          background="#060010"
          scale={60}
          size={28}
          speed={18}
          hover={200}
          rounded={18}
          core={{ coreSize: 24, coreColor: "#FFFFFF59", lineColor: "#FFFFFF59" }}
        />
      </div>
    </section>
  );
}
