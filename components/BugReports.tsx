"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import {
  bugReports,
  type BugReport,
  type Severity,
} from "@/lib/bug-reports";

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "text-red-300 border-red-400/30 bg-red-400/10",
  High: "text-orange-300 border-orange-400/30 bg-orange-400/10",
  Medium: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  Low: "text-sky-300 border-sky-400/30 bg-sky-400/10",
};

const BADGE_BASE =
  "rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider";
const NEUTRAL_BADGE = "border-white/10 bg-white/5 text-white/60";

function BugReportCard({
  report,
  index,
}: {
  report: BugReport;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const detailsId = `bug-details-${report.id}`;

  return (
    <motion.article
      className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-white/40">
          {report.id}
        </span>
        <span className="text-right text-xs text-white/40">
          {report.category}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-white">{report.title}</h3>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`${BADGE_BASE} ${SEVERITY_STYLES[report.severity]}`}
        >
          {report.severity}
        </span>
        <span className={`${BADGE_BASE} ${NEUTRAL_BADGE}`}>
          Priority: {report.priority}
        </span>
        <span className={`${BADGE_BASE} ${NEUTRAL_BADGE}`}>
          {report.status}
        </span>
      </div>

      <p className="mt-3 break-words text-xs text-white/40">
        {report.platform} · {report.buildVersion} · {report.environment}
      </p>

      <div className="mt-5">
        <span className="text-xs uppercase tracking-wider text-white/40">
          Actual result
        </span>
        <p className="mt-1 text-sm leading-relaxed text-white/60">
          {report.actualResult}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="mt-5 text-xs font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        {open ? "Hide details" : "Show steps & expected result"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailsId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-white/60">
              {report.stepsToReproduce.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-white/40">
                Expected result
              </span>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {report.expectedResult}
              </p>
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-white/40">
                Notes
              </span>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {report.notes}
              </p>
            </div>

            {report.media && report.media.length > 0 && (
              <div className="mt-4 space-y-4">
                {report.media.map((item) => (
                  <figure key={item.src}>
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={item.caption || report.title}
                        loading="lazy"
                        className="max-h-72 w-full rounded-xl border border-white/10 object-cover"
                      />
                    ) : (
                      <video
                        controls
                        preload="metadata"
                        playsInline
                        className="max-h-72 w-full rounded-xl border border-white/10"
                      >
                        <source src={item.src} />
                      </video>
                    )}
                    {item.caption && (
                      <figcaption className="mt-2 text-xs text-white/40">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function BugReports() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mb-14 flex flex-col items-center gap-3 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">
          Bug Reports
        </span>
        <h2 className="max-w-xs text-3xl font-semibold tracking-tight text-white sm:max-w-none sm:whitespace-nowrap sm:text-4xl md:text-5xl">
          <GooeyTextReveal mode="scroll" stagger={0.05} duration={1.2}>
            Reports developers can act on.
          </GooeyTextReveal>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/50">
          Practice reports written on local test builds, formatted like a studio
          bug tracker entry: severity, priority, reproduction steps, expected vs
          actual result.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {bugReports.map((report, index) => (
          <BugReportCard key={report.id} report={report} index={index} />
        ))}
      </div>
    </section>
  );
}
