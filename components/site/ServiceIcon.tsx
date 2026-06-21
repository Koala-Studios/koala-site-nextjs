type ServiceIconName =
  | "strategy"
  | "design"
  | "development"
  | "growth"
  | "email";

type ServiceIconProps = {
  name: ServiceIconName;
};

export function ServiceIcon({ name }: ServiceIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      {name === "strategy" ? (
        <>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="4" />
          <path d="M24 9v6M24 33v6M9 24h6M33 24h6" />
        </>
      ) : null}
      {name === "design" ? (
        <>
          <path d="M16 33l-4 3 1-5 18-18a4 4 0 0 1 6 6L19 37l-5 1 2-5Z" />
          <path d="M28 16l4 4" />
        </>
      ) : null}
      {name === "development" ? (
        <>
          <path d="M18 15 9 24l9 9" />
          <path d="m30 15 9 9-9 9" />
          <path d="M27 11 21 37" />
        </>
      ) : null}
      {name === "growth" ? (
        <>
          <path d="M9 34 19 24l7 7 13-17" />
          <path d="M30 14h9v9" />
        </>
      ) : null}
      {name === "email" ? (
        <>
          <rect x="8" y="13" width="32" height="22" rx="2" />
          <path d="M9 15 24 27 39 15" />
        </>
      ) : null}
    </svg>
  );
}

export type { ServiceIconName };
