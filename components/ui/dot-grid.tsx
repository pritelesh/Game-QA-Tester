"use client";

import { useEffect, useRef, type CSSProperties } from "react";

interface DotGridBackgroundProps {
  /** Dot color (hex). */
  dotColor?: string;
  /** Dot radius in px. */
  dotSize?: number;
  /** Grid spacing in px. */
  dotSpacing?: number;
  /** Orbital rotation speed. */
  orbitSpeed?: number;
  /** Radius (px) around the cursor that reacts. */
  impactRadius?: number;
  /** Scale multiplier for dots near the cursor. */
  scaleOnHover?: number;
  /** Enable orbiting dots near the cursor. */
  enableRevolve?: boolean;
  /** Extra classes on the canvas. */
  className?: string;
  style?: CSSProperties;
}

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function parseColor(raw: string): { r: number; g: number; b: number } {
  const color = raw.trim();
  if (color.startsWith("rgb")) {
    const m = color.match(/[\d.]+/g) || [];
    return { r: Number(m[0]) || 0, g: Number(m[1]) || 0, b: Number(m[2]) || 0 };
  }
  let h = color.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return { r: 136, g: 136, b: 136 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function DotGridBackground({
  dotColor = "#6366f1",
  dotSize = 3,
  dotSpacing = 28,
  orbitSpeed = 1.5,
  impactRadius = 100,
  scaleOnHover = 1.8,
  enableRevolve = true,
  className,
  style,
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cfgRef = useRef({
    dotColor,
    dotSize,
    dotSpacing,
    orbitSpeed,
    impactRadius,
    scaleOnHover,
    enableRevolve,
  });
  cfgRef.current.dotColor = dotColor;
  cfgRef.current.dotSize = dotSize;
  cfgRef.current.dotSpacing = dotSpacing;
  cfgRef.current.orbitSpeed = orbitSpeed;
  cfgRef.current.impactRadius = impactRadius;
  cfgRef.current.scaleOnHover = scaleOnHover;
  cfgRef.current.enableRevolve = enableRevolve;

  const dotsRef = useRef<Array<{
    bx: number;
    by: number;
    inclination: number;
    ascension: number;
    phase: number;
    speedMult: number;
  }>>([]);
  const spacingSnapRef = useRef(dotSpacing);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cv = canvas;
    const c2d = ctx;

    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;
    const mouse = { x: -9999, y: -9999 };
    const hovering = true;
    const leaveTs = 0;
    let prevTs = 0;
    let raf = 0;
    let globalAngle = 0;

    function buildDots() {
      const sp = cfgRef.current.dotSpacing;
      spacingSnapRef.current = sp;
      dotsRef.current = [];
      const cols = Math.ceil(W / sp) + 2;
      const rows = Math.ceil(H / sp) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({
            bx: c * sp,
            by: r * sp,
            inclination: Math.random() * Math.PI,
            ascension: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            speedMult: 0.7 + Math.random() * 0.6,
          });
        }
      }
    }

    function resize() {
      const rect = cv.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();

    // Track the cursor globally so the dots react even though the canvas
    // sits behind content. Canvas is inset-0, so clientX/Y map to canvas px.
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    function loop(ts: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((ts - (prevTs || ts)) / 1e3, 0.05);
      prevTs = ts;
      const cfg = cfgRef.current;
      if (spacingSnapRef.current !== cfg.dotSpacing) buildDots();
      globalAngle += cfg.orbitSpeed * dt;

      c2d.clearRect(0, 0, W, H);
      const rgb = parseColor(cfg.dotColor);
      const mx = mouse.x;
      const my = mouse.y;
      const timeSinceLeave = hovering ? 0 : Math.max(0, ts - leaveTs) / 1e3;
      const decay = hovering ? 1 : smoothstep(Math.max(0, 1 - timeSinceLeave * 1.5));

      for (const d of dotsRef.current) {
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inRange = dist < cfg.impactRadius && dist > 0;

        let x = d.bx;
        let y = d.by;
        let scale = 1;
        let alpha = 0.3;

        if (inRange) {
          const t = dist / cfg.impactRadius;
          const inf = smoothstep(1 - t) * decay;

          if (cfg.enableRevolve) {
            const orbitR = (1 - t) * cfg.dotSpacing * 0.7 * inf;
            const theta = globalAngle * d.speedMult + d.phase;
            const cosA = Math.cos(d.ascension);
            const sinA = Math.sin(d.ascension);
            const cosI = Math.cos(d.inclination);
            const sinI = Math.sin(d.inclination);
            const lx = Math.cos(theta);
            const ly = Math.sin(theta) * cosI;
            const lz = Math.sin(theta) * sinI;
            const ox = (lx * cosA - ly * sinA) * orbitR;
            const oy = (lx * sinA + ly * cosA) * orbitR;
            x = d.bx + ox;
            y = d.by + oy;
            const depthScale = 0.75 + 0.25 * ((lz + 1) * 0.5);
            scale = (1 + (cfg.scaleOnHover - 1) * inf) * depthScale;
            alpha = (0.3 + 0.7 * inf) * depthScale;
          } else {
            scale = 1 + (cfg.scaleOnHover - 1) * inf;
            alpha = 0.3 + 0.7 * inf;
          }
        }

        const r = (cfg.dotSize / 2) * scale;
        c2d.beginPath();
        c2d.arc(x, y, r, 0, Math.PI * 2);
        c2d.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        c2d.fill();
      }
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
