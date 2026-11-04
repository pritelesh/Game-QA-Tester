"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Constants for wave animation behavior
const WAVE_THRESH = 3;
const CHAR_MULT = 3;
const ANIM_STEP = 40;
const WAVE_BUF = 5;

export interface AsciiGlitchRippleProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The text to display and animate.
   */
  children: string;
  /**
   * The HTML element or component to render as.
   * @default "a"
   */
  as?: React.ElementType;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Duration of each ripple wave in milliseconds.
   * @default 1000
   */
  dur?: number;
  /**
   * Character set to scramble through during the ripple wave.
   * @default '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*'
   */
  chars?: string;
  /**
   * Whether to preserve space characters or scramble them too.
   * @default true
   */
  preserveSpaces?: boolean;
  /**
   * The spread of the ripple wave. Larger numbers mean wider waves.
   * @default 1.0
   */
  spread?: number;
}

export function AsciiGlitchRipple({
  children,
  as = "a",
  className,
  dur = 1000,
  chars = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*',
  preserveSpaces = true,
  spread = 1.0,
  ...props
}: AsciiGlitchRippleProps) {
  const Component = as;
  const elRef = useRef<HTMLElement | null>(null);

  // Use a mutable ref to store animation state, preventing unnecessary React renders
  const stateRef = useRef({
    origTxt: children,
    origChars: children.split(""),
    isAnim: false,
    cursorPos: 0,
    waves: [] as Array<{ startPos: number; startTime: number; id: number }>,
    animId: null as number | null,
    isHover: false,
    origW: null as number | null,
    dur,
    chars,
    preserveSpaces,
    spread,
  });

  // Keep internal mutable state updated when props change
  useEffect(() => {
    stateRef.current.origTxt = children;
    stateRef.current.origChars = children.split("");
    stateRef.current.dur = dur;
    stateRef.current.chars = chars;
    stateRef.current.preserveSpaces = preserveSpaces;
    stateRef.current.spread = spread;

    // Reset layout widths if text changes dynamically
    if (stateRef.current.origW !== null && elRef.current) {
      elRef.current.style.width = "";
      stateRef.current.origW = null;
    }

    if (!stateRef.current.isAnim && elRef.current) {
      elRef.current.textContent = children;
    }
  }, [children, dur, chars, preserveSpaces, spread]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const state = stateRef.current;

    // Initialize content
    el.textContent = children;

    const updateCursorPos = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const len = state.origTxt.length;
      const pos = Math.round((x / rect.width) * len);
      state.cursorPos = Math.max(0, Math.min(pos, len - 1));
    };

    const stop = () => {
      el.textContent = state.origTxt;
      el.classList.remove("as");

      // Restore natural width layout
      if (state.origW !== null) {
        el.style.width = "";
        state.origW = null;
      }
      state.isAnim = false;
      if (state.animId) {
        cancelAnimationFrame(state.animId);
        state.animId = null;
      }
    };

    const start = () => {
      if (state.isAnim) return;

      // Lock current width to prevent layout shifts during ASCII scrambling
      if (state.origW === null) {
        state.origW = el.getBoundingClientRect().width;
        el.style.width = `${state.origW}px`;
      }

      state.isAnim = true;
      el.classList.add("as");

      const animate = () => {
        const t = Date.now();

        // Evict finished waves
        state.waves = state.waves.filter(
          (w) => t - w.startTime < state.dur
        );

        if (state.waves.length === 0) {
          stop();
          return;
        }

        // Apply visual scramble
        el.textContent = genScrambledTxt(t);
        state.animId = requestAnimationFrame(animate);
      };

      state.animId = requestAnimationFrame(animate);
    };

    const startWave = () => {
      state.waves.push({
        startPos: state.cursorPos,
        startTime: Date.now(),
        id: Math.random(),
      });

      if (!state.isAnim) start();
    };

    const calcWaveEffect = (charIdx: number, t: number) => {
      let shouldAnim = false;
      let resultChar = state.origChars[charIdx];

      for (const w of state.waves) {
        const age = t - w.startTime;
        const prog = Math.min(age / state.dur, 1);
        const dist = Math.abs(charIdx - w.startPos);
        const maxDist = Math.max(w.startPos, state.origChars.length - w.startPos - 1);
        const rad = (prog * (maxDist + WAVE_BUF)) / state.spread;

        if (dist <= rad) {
          shouldAnim = true;
          const intens = Math.max(0, rad - dist);

          // Wave distortion characters
          if (intens <= WAVE_THRESH && intens > 0) {
            const index =
              (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % state.chars.length;
            resultChar = state.chars[index];
          }
        }
      }

      return { shouldAnim, char: resultChar };
    };

    const genScrambledTxt = (t: number) =>
      state.origChars
        .map((char, i) => {
          if (state.preserveSpaces && char === "") return "";
          const res = calcWaveEffect(i, t);
          return res.shouldAnim ? res.char : char;
        })
        .join("");

    const handleEnter = (e: MouseEvent) => {
      state.isHover = true;
      updateCursorPos(e);
      startWave();
    };

    const handleMove = (e: MouseEvent) => {
      if (!state.isHover) return;
      const old = state.cursorPos;
      updateCursorPos(e);
      if (state.cursorPos !== old) startWave();
    };

    const handleLeave = () => {
      state.isHover = false;
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      const animId = state.animId;
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [children]);

  return (
    <Component
      ref={elRef}
      className={cn(
        "cursor-pointer select-none relative inline-block transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
}

export default AsciiGlitchRipple;
