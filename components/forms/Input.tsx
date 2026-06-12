import type { InputHTMLAttributes, CSSProperties } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  style?: CSSProperties;
};

const controlStyle: CSSProperties = {
  minHeight: "3.2rem",
  padding: "0.8rem 0.9rem",
  borderRadius: 0,
  border: "1px solid var(--koala-color-line)",
  background: "transparent",
  color: "var(--koala-color-ink)",
  font: "inherit",
  fontSize: "var(--koala-text-md)",
  transition: "border-color 240ms var(--koala-ease-out)",
};

export function Input({ className, style, ...props }: InputProps) {
  return <input className={className} style={{ ...controlStyle, ...style }} {...props} />;
}
