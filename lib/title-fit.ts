import type { CSSProperties } from "react";

/** Archivo 800 at wdth 125, caps: advance widths in em, measured in the browser. */
const capWidths: Record<string, number> = {
  A: 0.92, B: 0.9, C: 0.93, D: 0.92, E: 0.85, F: 0.79, G: 1, H: 0.98, I: 0.36, J: 0.72, K: 0.94, L: 0.74, M: 1.14,
  N: 0.98, O: 1, P: 0.85, Q: 1, R: 0.92, S: 0.86, T: 0.84, U: 0.96, V: 0.89, W: 1.2, X: 0.93, Y: 0.91, Z: 0.85, " ": 0.28,
};

const width = (text: string) => [...text.toUpperCase()].reduce((sum, char) => sum + (capWidths[char] ?? 0.9), 0.41);

/**
 * --fit = 1 / width in em, so `font-size: 100cqi * var(--fit)` fills the column.
 * By default it measures the longest word, keeping whole words on a line; with
 * `oneLine` it measures the full title so it sits on a single line.
 */
export function titleFit(title: string, { oneLine = false } = {}) {
  const widest = oneLine ? width(title) : Math.max(...title.split(/[\s-]+/).map(width));
  return { "--fit": (1 / (widest * 1.04)).toFixed(4) } as CSSProperties;
}
