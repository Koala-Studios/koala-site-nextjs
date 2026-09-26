"use client";

import { useRef } from "react";

import { useDrawn } from "./DrawOnView";

/** Small hand-drawn marks that sit inside existing sections and draw in on view. */
export type DoodleName = "underline" | "arrow" | "spark";

const doodles: Record<DoodleName, { viewBox: string; paths: string[] }> = {
  underline: { viewBox: "0 0 200 14", paths: ["M3 10C48 4 104 2 150 4c17 1 32 3 46 6"] },
  arrow: { viewBox: "0 0 60 30", paths: ["M4 22C18 9 35 7 52 14", "M44 8l9 6-10 5"] },
  spark: { viewBox: "0 0 24 24", paths: ["M11 3v5", "M19 6l-4 3.5", "M21 14h-5"] },
};

export function Doodle({ name, className }: { name: DoodleName; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const drawn = useDrawn(ref, 0.8);
  const doodle = doodles[name];

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={["ks-lineart", "ks-doodle", `ks-doodle--${name}`, className].filter(Boolean).join(" ")}
      data-drawn={drawn || undefined}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox={doodle.viewBox}
    >
      {doodle.paths.map((d, index) => (
        <path d={d} key={d} pathLength={1} style={{ transitionDelay: `${300 + index * 180}ms` }} />
      ))}
    </svg>
  );
}
