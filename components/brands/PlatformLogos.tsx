import type { CSSProperties } from "react";

import styles from "./PlatformLogos.module.css";

/** Platform marks (public/images/platforms, see SOURCE.md). They name channels, never a partnership. */
const platforms = [
  { id: "shopify", name: "Shopify" },
  { id: "meta", name: "Meta" },
  { id: "instagram", name: "Instagram" },
  { id: "facebook", name: "Facebook" },
  { id: "google", name: "Google" },
  { id: "googleads", name: "Google Ads" },
  { id: "tiktok", name: "TikTok" },
  { id: "googlemaps", name: "Google Maps" },
];

/** The platforms we work in, set as index rows under the homepage service list. */
export function PlatformLogos({ className }: { className?: string }) {
  return (
    <div className={[styles.platforms, className].filter(Boolean).join(" ")}>
      <p className={`ks-label ${styles.label}`}>Platforms we work in</p>
      <ul className={styles.list}>
        {platforms.map((platform) => (
          <li className={styles.item} key={platform.id}>
            <span
              className={styles.mark}
              style={{ "--mark": `url("/images/platforms/${platform.id}.svg")` } as CSSProperties}
              aria-hidden="true"
            />
            <span className="ks-label">{platform.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
