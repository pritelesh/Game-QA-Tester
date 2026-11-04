"use client";

import * as React from "react";
import { useAnimate, useReducedMotion } from "framer-motion";

interface RadialRevealButtonProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  iconSide?: "left" | "right";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  newTab?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

/**
 * Pointer-anchored circular reveal button.
 *
 * Two stacked faces inside a rounded-full overflow-hidden shell:
 *   - resting face sizes the button and carries the base styling
 *   - hover face sits absolutely on top and is revealed by a CSS `clip-path:
 *     circle()` whose origin + radius animate imperatively (Framer's `animate`
 *     on a ref — no React state) from the pointer's exact entry point.
 *
 * On leave the same clip collapses back to 0, re-anchored to the exit point
 * only when the circle already fully covered the shell (avoiding a torn edge
 * mid-contract). Reduced motion snaps instead of animating.
 */
export default function RadialRevealButton({
  label,
  href,
  onClick,
  icon,
  iconSide = "left",
  className = "",
  type = "button",
  disabled = false,
  newTab = false,
  download = false,
  ariaLabel,
}: RadialRevealButtonProps) {
  const [, animate] = useAnimate();
  const reduced = useReducedMotion();
  const rootRef = React.useRef<HTMLElement>(null);
  const hoverFaceRef = React.useRef<HTMLSpanElement>(null);
  const fullRef = React.useRef(false);

  /* circle() percentages resolve against sqrt(w²+h²)/sqrt(2) by spec, so the
   * max corner distance (px) must be converted to that unit's scale. */
  const radiusFor = (
    rect: DOMRect,
    x: number,
    y: number,
  ): { x: number; y: number; r: number } => {
    const px = x - rect.left;
    const py = y - rect.top;
    const nx = (px / rect.width) * 100;
    const ny = (py / rect.height) * 100;
    const diag = Math.hypot(rect.width, rect.height);
    const maxCorner = Math.max(
      Math.hypot(px, py),
      Math.hypot(rect.width - px, py),
      Math.hypot(px, rect.height - py),
      Math.hypot(rect.width - px, rect.height - py),
    );
    const r = (maxCorner / diag) * (Math.sqrt(2) * 100);
    return { x: nx, y: ny, r };
  };

  const runReveal = (
    rect: DOMRect,
    x: number,
    y: number,
    open: boolean,
  ) => {
    const face = hoverFaceRef.current;
    if (!face) return;
    const { x: nx, y: ny, r } = radiusFor(rect, x, y);
    const origin = `${nx}% ${ny}%`;
    face.style.clipPath = `circle(${open ? "0%" : `${r}%`} at ${origin})`;
    // will-change lives only for the active transition, never permanently
    face.style.willChange = "clip-path";
    animate(
      face,
      { clipPath: `circle(${open ? `${r}%` : "0%"} at ${origin})` },
      {
        duration: reduced ? 0 : 0.45,
        ease: "easeOut",
        onComplete: () => {
          if (!open) face.style.willChange = "auto";
        },
      },
    );
    fullRef.current = open;
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (disabled || reduced) {
      const face = hoverFaceRef.current;
      if (face) {
        fullRef.current = true;
        face.style.clipPath = "circle(150% at 50% 50%)";
      }
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    runReveal(root.getBoundingClientRect(), e.clientX, e.clientY, true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (disabled || reduced) {
      const face = hoverFaceRef.current;
      if (face) {
        fullRef.current = false;
        face.style.clipPath = "circle(0% at 50% 50%)";
      }
      return;
    }
    const face = hoverFaceRef.current;
    const root = rootRef.current;
    // only re-anchor the contract at the exit point when the reveal already
    // fully covered the shell — otherwise collapse back from the enter origin
    if (fullRef.current && face && root) {
      runReveal(root.getBoundingClientRect(), e.clientX, e.clientY, false);
    }
  };

  const showFace = () => {
    const face = hoverFaceRef.current;
    if (face && !disabled) face.style.opacity = "1";
  };
  const hideFace = () => {
    const face = hoverFaceRef.current;
    if (face) face.style.opacity = "0";
  };

  /* the clipped hover face must never intercept pointer events */
  React.useEffect(() => {
    const face = hoverFaceRef.current;
    if (face) {
      face.style.pointerEvents = "none";
      face.style.opacity = "0";
    }
  }, []);

  const commonFlow = {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onFocus: showFace,
    onBlur: hideFace,
    onClick,
  };

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {icon && iconSide === "left" ? icon : null}
        {label}
        {icon && iconSide === "right" ? icon : null}
      </span>
    </>
  );

  const shellClass = `relative inline-flex select-none items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-medium text-white transition-none ${className}`;

  const hoverFace = (
    <span
      ref={hoverFaceRef}
      aria-hidden
      className="absolute inset-0 z-0 flex items-center justify-center rounded-full bg-white text-black"
      style={{
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <span className="inline-flex items-center gap-2.5">
        {icon && iconSide === "left" ? icon : null}
        {label}
        {icon && iconSide === "right" ? icon : null}
      </span>
    </span>
  );

  const children = (
    <>
      {inner}
      {hoverFace}
    </>
  );

  if (href) {
    return (
      <a
        ref={rootRef as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={shellClass}
        {...(newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download ? { download: true } : {})}
        {...commonFlow}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={rootRef as unknown as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={shellClass}
      {...commonFlow}
    >
      {children}
    </button>
  );
}
