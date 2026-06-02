import type { CSSProperties, ReactNode } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Field({ label, hint, error, children, className, style }: FieldProps) {
  return (
    <label
      className={className}
      style={{
        display: "grid",
        gap: "0.5rem",
        color: "var(--koala-color-ink)",
        ...style,
      }}
    >
      <span style={{ fontSize: "var(--koala-text-sm)", fontWeight: 600 }}>{label}</span>
      {children}
      {hint ? <span style={{ fontSize: "var(--koala-text-xs)", color: "var(--koala-color-ink-muted)" }}>{hint}</span> : null}
      {error ? <span style={{ fontSize: "var(--koala-text-xs)", color: "var(--koala-color-danger)" }}>{error}</span> : null}
    </label>
  );
}
