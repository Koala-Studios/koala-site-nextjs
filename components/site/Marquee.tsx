import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
};

export function Marquee({ children, className, duration = 28 }: MarqueeProps) {
  const style = {
    "--koala-marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div className={`koala-marquee ${className ?? ""}`} style={style}>
      <div className="koala-marquee__track">
        <div className="koala-marquee__group">{children}</div>
        <div className="koala-marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
