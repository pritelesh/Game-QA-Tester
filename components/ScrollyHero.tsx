"use client";

import Overlay from "@/components/Overlay";
import ScrollyCanvas from "@/components/ScrollyCanvas";

/**
 * Client composition root for the hero.
 *
 * Lives on the client so the render-prop (`(progress) => <Overlay/>`) never
 * crosses the server -> client component boundary — Next.js forbids passing
 * functions through that boundary directly.
 */
export default function ScrollyHero() {
  return (
    <ScrollyCanvas>
      {(progress) => <Overlay progress={progress} />}
    </ScrollyCanvas>
  );
}
