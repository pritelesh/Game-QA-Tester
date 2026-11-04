/**
 * Frame-sequence filename generator
 * ---------------------------------
 * Builds the ordered list of image URLs for the canvas scrub sequence from a
 * single config object — no hardcoded filenames.
 *
 * ACTIVE PRESET: the raw render sequence currently shipped in /public
 * (portfoliotest00086400.png ... portfoliotest00086540.png, 141 frames).
 *
 * To switch to the WebP export pattern from the design spec
 * (frame_00_delay-0.067s.webp ... frame_88_delay-0.067s.webp, 89 frames),
 * replace FRAME_SEQUENCE with:
 *
 *   export const FRAME_SEQUENCE: FrameSequenceConfig = {
 *     directory: "/portfolio-test.01",
 *     count: 89,
 *     startIndex: 0,
 *     padding: 2,
 *     prefix: "frame_",
 *     suffix: "_delay-0.067s",
 *     extension: "webp",
 *   };
 */

export interface FrameSequenceConfig {
  /** Public path (relative to /public) that holds the frames. */
  directory: string;
  /** Total number of frames in the sequence. */
  count: number;
  /** Numeric value encoded in the first filename. */
  startIndex: number;
  /** Zero-padding width of the numeric part (e.g. 2 -> "00"). */
  padding: number;
  /** Literal text before the number ("frame_" / "portfoliotest"). */
  prefix: string;
  /** Literal text after the number ("_delay-0.067s" / ""). */
  suffix: string;
  /** File extension without the dot ("webp" / "png"). */
  extension: string;
}

export const FRAME_SEQUENCE: FrameSequenceConfig = {
  directory: "/portfolio-test.01",
  count: 141,
  startIndex: 86400,
  padding: 8,
  prefix: "portfoliotest",
  suffix: "",
  extension: "png",
};

export const FRAME_COUNT: number = FRAME_SEQUENCE.count;

/** Build the public URL for a single frame by its 0-based position. */
export function getFrameSrc(index: number): string {
  const { directory, startIndex, padding, prefix, suffix, extension } =
    FRAME_SEQUENCE;
  const number = String(startIndex + index).padStart(padding, "0");
  return `${directory}/${prefix}${number}${suffix}.${extension}`;
}

/** Generate the full ordered frame list for preloading/scrubbing. */
export function generateFrameList(count: number = FRAME_COUNT): string[] {
  return Array.from({ length: count }, (_, i) => getFrameSrc(i));
}
