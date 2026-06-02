import type { InputHTMLAttributes, CSSProperties } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  style?: CSSProperties;
};

const controlStyle: CSSProperties = {
  minHeight: "3rem",
  padding: "0.8rem 0.95rem",
  borderRadius: "0.75rem",
  border: "1px solid var(--koala-color-line)",
  background: "var(--koala-color-surface)",
  color: "var(--koala-color-ink)",
  font: "inherit",
};

export function Input({ className, style, ...props }: InputProps) {
  return <input className={className} style={{ ...controlStyle, ...style }} {...props} />;
}
