/**
 * Contact section — big closing statement plus direct channels:
 * email and LinkedIn. Same dark glassmorphism language as the rest of the
 * site; pure CSS hovers, so it stays a lightweight server component.
 */

const EMAIL = "priteleshnel@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/pritelesh-nel/";
const GITHUB_URL = "https://github.com/pritelesh";
const STEAM_URL = "https://steamcommunity.com/profiles/76561198127311812/";

const HEADLINE_WORDS = ["Looking", "for", "a", "Game", "QA", "Tester?"];
const AVAILABILITY_CHIPS = [
  "Entry-Level Game QA",
  "QA Internship",
  "Remote Game QA",
  "Contract QA",
  "Freelance Testing",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/10 px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow + headline */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            Contact
          </span>
          <h2 className="contact-headline mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="contact-vibe block">
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={word}
                  className="contact-word whitespace-pre"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {word}
                  {i < HEADLINE_WORDS.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <span className="contact-word contact-word--accent !block mt-2">
              Let&apos;s talk.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
            Open to entry-level Game QA roles, internships, remote and contract
            testing. Drop a message and I&apos;ll get back within a day.
          </p>
        </div>

        {/* Availability */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {AVAILABILITY_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/40">
          Kishoregonj, Bangladesh · +8801683336603 · BST (UTC+6) · English
          (Professional), Bengali (Native), Hindi · Available immediately
        </p>

        {/* Channel cards */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between">
              {/* Mail icon */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white/70 transition-colors duration-300 group-hover:text-white"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span
                aria-hidden
                className="text-white/40 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-white"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
              Email
            </p>
            <p className="mt-1 break-all text-sm font-medium text-white transition-opacity duration-300 group-hover:opacity-70">
              {EMAIL}
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between">
              {/* LinkedIn mark */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-white/70 transition-colors duration-300 group-hover:text-white"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
              <span
                aria-hidden
                className="text-white/40 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-white"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
              LinkedIn
            </p>
            <p className="mt-1 break-all text-sm font-medium text-white transition-opacity duration-300 group-hover:opacity-70">
              pritelesh-nel
            </p>
          </a>

          {/* GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between">
              {/* GitHub mark */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-white/70 transition-colors duration-300 group-hover:text-white"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
              </svg>
              <span
                aria-hidden
                className="text-white/40 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-white"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
              GitHub
            </p>
            <p className="mt-1 break-all text-sm font-medium text-white transition-opacity duration-300 group-hover:opacity-70">
              pritelesh
            </p>
          </a>

          {/* Steam */}
          <a
            href={STEAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between">
              {/* Gamepad icon */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white/70 transition-colors duration-300 group-hover:text-white"
              >
                <path d="M7.5 7h9a4.5 4.5 0 0 1 4.4 5.4l-.7 3.6a3 3 0 0 1-5.2 1.4L13.7 16h-3.4l-1.3 1.4a3 3 0 0 1-5.2-1.4l-.7-3.6A4.5 4.5 0 0 1 7.5 7Z" />
                <path d="M6 12h4" />
                <path d="M8 10v4" />
                <circle cx="16" cy="11" r="1" />
                <circle cx="18" cy="13" r="1" />
              </svg>
              <span
                aria-hidden
                className="text-white/40 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-white"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
              Steam
            </p>
            <p className="mt-1 break-all text-sm font-medium text-white transition-opacity duration-300 group-hover:opacity-70">
              18,000+ hours played
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
