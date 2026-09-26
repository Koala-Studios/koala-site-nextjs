import type { SVGProps } from "react";

/** Thin-line icon set: 24px grid, 1.5 stroke, round joins, currentColor. */
export type IconName = "store" | "ads" | "mail" | "package" | "eye" | "cart" | "repeat" | "arch";

const paths: Record<IconName, string[]> = {
  store: ["M4 10v10h16V10", "M3 10 4.5 4h15L21 10Z", "M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0", "M10 20v-5h4v5"],
  ads: ["M4 10v4h3l8 4.5v-13L7 10H4Z", "M18 9a3.5 3.5 0 0 1 0 6", "M7 14l1.2 5h2.3L10 14"],
  mail: ["M3.5 6.5h17v11h-17Z", "M4 7l8 6 8-6"],
  package: ["M12 3 20 7.5v9L12 21l-8-4.5v-9Z", "M4 7.5 12 12l8-4.5", "M12 12v9", "M8 5.3l8 4.5"],
  eye: ["M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z", "M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"],
  cart: ["M3 4h2.2l2.3 10.4h10.3L20 7.5H6.3", "M8.5 19a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0", "M15.5 19a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0"],
  repeat: ["M4.5 11a7.5 7.5 0 0 1 13-4.6L20 9", "M20 4.5V9h-4.5", "M19.5 13a7.5 7.5 0 0 1-13 4.6L4 15", "M4 19.5V15h4.5"],
  arch: ["M6 20v-9a6 6 0 0 1 12 0v9", "M4 20h16"],
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={["ks-icon", className].filter(Boolean).join(" ")}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name].map((d) => (
        <path d={d} key={d} pathLength={1} />
      ))}
    </svg>
  );
}

/** Service slug or path to its icon (also a LineArt drawing name). */
export function serviceIcon(key: string): "store" | "ads" | "mail" | "package" {
  if (key.includes("meta")) return "ads";
  if (key.includes("email")) return "mail";
  if (key.includes("packaging")) return "package";
  return "store";
}
