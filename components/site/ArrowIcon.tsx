import type { SVGProps } from "react";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  direction?: "left" | "right";
};

export function ArrowIcon({
  direction = "right",
  style,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="1.15em"
      viewBox="0 0 24 24"
      width="1.15em"
      style={{
        transform: direction === "left" ? "rotate(180deg)" : undefined,
        ...style,
      }}
      {...props}
    >
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
