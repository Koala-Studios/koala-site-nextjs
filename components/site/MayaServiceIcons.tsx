import styles from "./MayaServiceIcons.module.css";

const services = [
  { label: "Brand development", path: "M16 3 28 10 16 17 4 10Zm-12 13 12 7 12-7M4 22l12 7 12-7" },
  { label: "Graphic design", path: "m6 23-1 5 5-1L27 10l-4-4ZM19 10l4 4M5 5h9M5 5v9" },
  { label: "Meta ads", path: "M5 12h6l14-7v22l-14-7H5Zm6 8 3 8H9l-3-8M29 12v8" },
  { label: "Google ads", path: "M23 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-3 7 8 8M10 14h8M14 10v8" },
  { label: "Email marketing", path: "M3 7h26v20H3ZM3 8l13 11L29 8" },
];
export function MayaServiceIcons() {
  return <ul className={styles.services} aria-label="How we help your brand grow">{services.map(service => <li key={service.label}><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={service.path} /></svg><span>{service.label}</span></li>)}</ul>;
}
