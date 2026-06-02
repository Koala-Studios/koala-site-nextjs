import type { TextareaHTMLAttributes, CSSProperties } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  style?: CSSProperties;
};

const controlStyle: CSSProperties = {
  minHeight: "8rem",
  padding: "0.9rem 0.95rem",
  borderRadius: "0.75rem",
  border: "1px solid var(--koala-color-line)",
  background: "var(--koala-color-surface)",
  color: "var(--koala-color-ink)",
  font: "inherit",
  resize: "vertical",
};

export function Textarea({ className, style, ...props }: TextareaProps) {
  return <textarea className={className} style={{ ...controlStyle, ...style }} {...props} />;
}
