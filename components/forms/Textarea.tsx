import type { TextareaHTMLAttributes, CSSProperties } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  style?: CSSProperties;
};

const controlStyle: CSSProperties = {
  minHeight: "8rem",
  padding: "0.9rem",
  borderRadius: 0,
  border: "1px solid var(--koala-color-line)",
  background: "transparent",
  color: "var(--koala-color-ink)",
  font: "inherit",
  fontSize: "var(--koala-text-md)",
  resize: "vertical",
  transition: "border-color 240ms var(--koala-ease-out)",
};

export function Textarea({ className, style, ...props }: TextareaProps) {
  return <textarea className={className} style={{ ...controlStyle, ...style }} {...props} />;
}
