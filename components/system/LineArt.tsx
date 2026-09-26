"use client";

import { useRef } from "react";

import { useDrawn } from "./DrawOnView";

/**
 * Editorial line drawings. Every stroke has pathLength=1 so CSS can draw it in
 * once the drawing scrolls into view; the arch in each drawing is Koala green.
 */
export type LineArtName = "store" | "ads" | "mail" | "package" | "arches";

type Stroke = { d: string; accent?: boolean };

const drawings: Record<LineArtName, { viewBox: string; strokes: Stroke[] }> = {
  store: {
    viewBox: "0 0 240 180",
    strokes: [
      { d: "M20 20h200v140H20Z" },
      { d: "M20 38h200" },
      { d: "M31 29h1M40 29h1M49 29h1" },
      { d: "M40 142V92a28 28 0 0 1 56 0v50", accent: true },
      { d: "M56 142v-26a12 5 0 0 1 24 0v26" },
      { d: "M56 116h24" },
      { d: "M116 72h84M116 86h56" },
      { d: "M116 108h40" },
      { d: "M116 124h60v16h-60Z" },
      { d: "M40 142h56" },
    ],
  },
  ads: {
    viewBox: "0 0 240 180",
    strokes: [
      { d: "M86 12h68a10 10 0 0 1 10 10v136a10 10 0 0 1-10 10H86a10 10 0 0 1-10-10V22a10 10 0 0 1 10-10Z" },
      { d: "M110 22h20" },
      { d: "M92 40a6 6 0 1 0 12 0 6 6 0 1 0-12 0" },
      { d: "M112 37h30M112 44h18" },
      { d: "M92 116V74a28 28 0 0 1 56 0v42", accent: true },
      { d: "M92 116h56" },
      { d: "M92 130h56M92 140h34" },
      { d: "M178 64a22 22 0 0 1 0 44", accent: true },
      { d: "M190 52a38 38 0 0 1 0 68" },
    ],
  },
  mail: {
    viewBox: "0 0 240 180",
    strokes: [
      { d: "M72 74V26h96v48" },
      { d: "M104 72V56a16 16 0 0 1 32 0v16", accent: true },
      { d: "M86 40h16M146 40h8" },
      { d: "M36 72h168v92H36Z" },
      { d: "M36 72l84 56 84-56" },
      { d: "M36 164l60-44M204 164l-60-44" },
    ],
  },
  package: {
    viewBox: "0 0 240 180",
    strokes: [
      { d: "M34 44a38 10 0 1 0 76 0 38 10 0 1 0-76 0" },
      { d: "M34 44v104a38 10 0 0 0 76 0V44" },
      { d: "M34 58a38 10 0 0 0 76 0" },
      { d: "M56 136v-34a16 16 0 0 1 32 0v34", accent: true },
      { d: "M130 98l44-22 44 22-44 22Z" },
      { d: "M130 98v46l44 22 44-22V98" },
      { d: "M174 120v46" },
      { d: "M152 87l44 22" },
    ],
  },
  arches: {
    viewBox: "0 0 200 200",
    strokes: [
      { d: "M20 200V100a80 80 0 0 1 160 0v100" },
      { d: "M45 200V110a55 55 0 0 1 110 0v90" },
      { d: "M70 200V120a30 30 0 0 1 60 0v80", accent: true },
    ],
  },
};

type LineArtProps = { name: LineArtName; className?: string; label?: string };

export function LineArt({ name, className, label }: LineArtProps) {
  const ref = useRef<SVGSVGElement>(null);
  const drawn = useDrawn(ref);
  const drawing = drawings[name];

  return (
    <svg
      ref={ref}
      className={["ks-lineart", className].filter(Boolean).join(" ")}
      data-drawn={drawn || undefined}
      viewBox={drawing.viewBox}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {drawing.strokes.map((stroke, index) => (
        <path
          d={stroke.d}
          key={stroke.d}
          pathLength={1}
          stroke={stroke.accent ? "var(--ks-green)" : "currentColor"}
          style={{ transitionDelay: `${index * 90}ms` }}
        />
      ))}
    </svg>
  );
}
