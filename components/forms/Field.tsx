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
    <label className={["ks-field", className].filter(Boolean).join(" ")} style={style}>
      <span className="ks-label">{label}</span>
      {children}
      {hint ? <span className="ks-field__hint">{hint}</span> : null}
      {error ? <span className="ks-field__error">{error}</span> : null}
    </label>
  );
}
