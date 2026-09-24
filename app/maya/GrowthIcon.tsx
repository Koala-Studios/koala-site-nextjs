import styles from "./maya.module.css";

export function GrowthIcon({ kind }: { kind: string }) {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "visibility" ? <><g><path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9S3 16 3 16Z" /><circle className={styles.growthIconEye} cx="16" cy="16" r="4" /></g><path className={styles.growthIconRays} d="M16 2v2M5 5l2 2M27 5l-2 2" /></> : kind === "email" ? <g className={styles.growthIconMail}><rect x="3" y="7" width="26" height="19" rx="2" /><path d="m4 9 12 9L28 9" /></g> : <><rect x="4" y="5" width="24" height="23" rx="2" /><path d="M4 11h24M9 8h1M13 8h1" /><path className={styles.growthIconChart} d="M10 23l5-5 4 3 5-6M19 15h5v5" /></>}
  </svg>;
}
