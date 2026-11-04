"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FRAME_COUNT, generateFrameList } from "@/lib/frames";

/**
 * Children can either be plain nodes OR a render function that receives
 * the scroll progress (0 -> 1), e.g. `{(progress) => <Overlay progress={progress} />}`.
 */
type ScrollyChildren = ReactNode | ((progress: MotionValue<number>) => ReactNode);

interface ScrollyCanvasProps {
  children?: ScrollyChildren;
}

/**
 * CORE SCROLLYTELLING MECHANIC
 * ----------------------------
 * - Outer wrapper spans 500vh of scrollable track.
 * - Inner sticky container pins a full-screen <canvas>.
 * - Frames stream in PRIORITY order (frame 0 first, bounded concurrency); the
 *   loading veil lifts as soon as the first frame paints, so startup is never
 *   blocked on downloading the full sequence.
 * - scrollYProgress (0 -> 1) maps linearly to frame index (0 -> N-1); every
 *   update redraws the canvas with cover-fit math (image always fills the
 *   screen on any aspect ratio, mobile included).
 * - Window resizes recalculate the backing store and repaint the current frame.
 */
export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [firstPaintDone, setFirstPaintDone] = useState(false);
  const targetIndexRef = useRef(0);

  /* Scroll progress across the whole 500vh track. */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  /* Map 0 -> 1 progress onto 0 -> (last frame) index. */
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1],
  );

  /**
   * Paint one frame with cover-fit math:
   * scale by the larger axis ratio, center the overflowing axis.
   */
  const drawFrame = useCallback((index: number): void => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    /* Sync the backing store with CSS size x DPR (handles resize too). */
    const targetW = Math.round(cssWidth * dpr);
    const targetH = Math.round(cssHeight * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const scale = Math.max(
      cssWidth / img.naturalWidth,
      cssHeight / img.naturalHeight,
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    ctx.drawImage(
      img,
      (cssWidth - drawW) / 2,
      (cssHeight - drawH) / 2,
      drawW,
      drawH,
    );
  }, []);

  /* Convenience: paint whatever frame the progress currently points at. */
  const drawCurrentFrame = useCallback((): void => {
    drawFrame(Math.round(frameIndex.get()));
  }, [drawFrame, frameIndex]);

  /* Load frames in priority order (frame 0 first) with bounded concurrency.
     The loading veil lifts as soon as the FIRST frame paints; the remaining
     frames stream in behind the scene, so startup is never blocked on the
     full 27MB sequence download. */
  useEffect(() => {
    let cancelled = false;
    const sources = generateFrameList();
    const total = sources.length;
    const MAX_CONCURRENCY = 6;

    framesRef.current = new Array<HTMLImageElement | null>(total).fill(null);

    let loaded = 0;
    let cursor = 0;
    let inFlight = 0;

    const pump = (): void => {
      while (inFlight < MAX_CONCURRENCY && cursor < total) {
        const i = cursor;
        cursor += 1;
        inFlight += 1;

        const img = new Image();
        /* Frame 0 decodes synchronously so it can paint the instant it lands. */
        img.decoding = i === 0 ? "sync" : "async";

        const report = (ready: boolean): void => {
          inFlight -= 1;
          if (cancelled) return;

          loaded += 1;
          setLoadedCount(loaded);
          if (ready) {
            framesRef.current[i] = img;
            /* If this frame matches where the user is currently scrolled,
               paint it now (the scroll handler may have skipped it earlier). */
            if (Math.abs(i - targetIndexRef.current) <= 1) drawFrame(i);
            if (i === 0) requestAnimationFrame(() => setFirstPaintDone(true));
          } else {
            console.warn(`[ScrollyCanvas] failed to load frame: ${sources[i]}`);
          }

          /* Fallback: if everything settled but frame 0 never painted,
             lift the veil anyway rather than blocking the page forever. */
          if (loaded === total) {
            requestAnimationFrame(() => setFirstPaintDone(true));
          }

          pump();
        };

        img.onload = () => report(true);
        img.onerror = () => report(false);
        img.src = sources[i];
      }
    };

    pump();

    return () => {
      cancelled = true;
    };
  }, [drawFrame, frameIndex]);

  /* Scrub: repaint whenever the mapped frame index changes. */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    targetIndexRef.current = idx;
    drawFrame(idx);
  });

  /* Resize: recalc canvas metrics and redraw the current frame. */
  useEffect(() => {
    const onResize = () => drawCurrentFrame();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawCurrentFrame]);

  const loadPercent = Math.min(
    100,
    Math.round((loadedCount / FRAME_COUNT) * 100),
  );

  return (
    <div ref={wrapperRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* Loading veil — removed only after the first frame is painted. */}
        {!firstPaintDone && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#121212]">
            <div className="flex flex-col items-center gap-4">
              <span className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <span
                  className="block h-full rounded-full bg-white/80 transition-all duration-200"
                  style={{ width: `${loadPercent}%` }}
                />
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                Loading {loadPercent}%
              </span>
            </div>
          </div>
        )}

        {/* Overlay layer (parallax text) sits above the canvas. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {typeof children === "function" ? children(scrollYProgress) : children}
        </div>
      </div>
    </div>
  );
}
