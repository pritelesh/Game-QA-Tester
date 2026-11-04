import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import ScrollyHero from "@/components/ScrollyHero";
import DotGrid from "@/components/ui/dot-grid";

export default function Home() {
  return (
    <div id="top">
      <Header />

      <main>
        {/* 500vh cinematic scroll-scrubbed canvas with parallax copy */}
        <ScrollyHero />

        {/* Dot grid background — extends from About down to Footer */}
        <div className="relative">
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute inset-0 opacity-[0.6]">
              <DotGrid
                dotColor="#ffffff"
                dotSize={2}
                dotSpacing={26}
                impactRadius={110}
              />
            </div>
          </div>

          <div className="relative z-10">
            {/* Short bio + CV download */}
            <About />

          {/* Professional history cards */}
          <Experience />

          {/* Skills & tech stack grid */}
          <Skills />

          {/* Education list */}
          <Education />

          {/* Selected Work gallery built from /public/Gallery project folders */}
          <Work />

          {/* Email + LinkedIn contact channels */}
          <Contact />

          {/* Minimal footer */}
          <footer className="border-t border-white/10 px-6 py-16 sm:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="text-sm text-white/50">
                &copy; {new Date().getFullYear()} Pritelesh Bhowmik
              </p>
              <a
                href="mailto:priteleshnel@gmail.com"
                className="py-3 text-sm text-white transition-opacity hover:opacity-70 md:py-0"
              >
                priteleshnel@gmail.com
              </a>
            </div>
          </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
