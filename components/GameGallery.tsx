"use client";

import SpotlightFrames from "@/components/SpotlightFrames";
import type { SpotlightImage } from "@/components/SpotlightFrames";

const GAME_FILES = [
  "age-of-empires.jpg",
  "apex-legends.jpg",
  "battle-for-troy.jpg",
  "battlefield.jpg",
  "black-myth-wukong.jpg",
  "Call Of Duty MW2.webp",
  "csgo 2.jpg",
  "delta-force.jpg",
  "diablo-iv.jpg",
  "doom-eternal.png",
  "Dota 2.jpg",
  "ea-fc.jpg",
  "efootball.jpg",
  "euro-truck-simulator-2.jpg",
  "f1-2015.jpg",
  "fall-guys.avif",
  "fishing-planet.jpg",
  "forza-horizon-5.jpg",
  "ghost-of-tsushima.jpg",
  "god-of-war-ragnarok.jpg",
  "Grand_Theft_Auto_V.png",
  "gta-iv.jpg",
  "hearthstone.jpg",
  "hitman-world-of-assassination.jpg",
  "king-of-fighters97.jpg",
  "metal-slug.jpg",
  "middle-earth-shadow-of-war.jpg",
  "path-of-exile.jpg",
  "payday-2.jpg",
  "pubg-battlegrounds.avif",
  "Realm_Royale_Reforged.png",
  "rocket-league.jpg",
  "rust.jpg",
  "sniper-ghost-warrior.jpg",
  "stronghold-kingdoms.jpg",
  "the-division.jpg",
  "the-sims-4.jpg",
  "thehunter-call-of-the-wild.jpg",
  "Tom_Clancy's_Rainbow_Six_Siege.jpg",
  "warframe.webp",
  "Watch_Dogs_2.jpg",
  "world-of-tanks.png",
  "world-of-warships.webp",
  "World_of_Warcraft.png",
];

const GAME_IMAGES: SpotlightImage[] = GAME_FILES.map((file) => ({
  image: `/games/${encodeURIComponent(file)}`,
  offsetY: 0,
}));

const MIDPOINT = Math.ceil(GAME_IMAGES.length / 2);
const ROWS = [GAME_IMAGES.slice(0, MIDPOINT), GAME_IMAGES.slice(MIDPOINT)];

const TRACK = { collapsedWidth: 44, expandedWidth: 480, gap: 2 };
const PANEL = { height: 340, radius: 10, dim: 4 };
const SELECTOR = {
  box: true,
  lines: true,
  lineLength: 600,
  thickness: 1,
  color: "rgba(255,255,255,0.7)",
};
const ENTRANCE = { animate: true, duration: 0.7, stagger: 0.025 };

export default function GameGallery() {
  return (
    <section
      id="games"
      className="relative border-t border-white/10 px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Gallery
        </span>

        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Games I Play &amp; Test
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          A slice of the games I play and test — shooters, RPGs, strategy,
          racing, and everything in between.
        </p>

        <div className="mt-12 space-y-3">
          {ROWS.map((row, index) => (
            <div
              key={index}
              className="h-[240px] overflow-hidden rounded-2xl border border-white/10 sm:h-[300px] lg:h-[340px]"
            >
              <SpotlightFrames
                images={row}
                startIndex={0}
                track={TRACK}
                panel={PANEL}
                selector={SELECTOR}
                entrance={ENTRANCE}
                trigger="hover"
                background="#0f0f0f"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
