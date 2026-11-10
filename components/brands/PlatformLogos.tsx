import Image from "next/image";

import styles from "./PlatformLogos.module.css";

/** Platform marks (public/images/platforms, see SOURCE.md). They name channels, never a partnership. */
export const platforms = {
  shopify: "Shopify",
  meta: "Meta",
  instagram: "Instagram",
  facebook: "Facebook",
  google: "Google",
  googleads: "Google Ads",
  tiktok: "TikTok",
  googlemaps: "Google Maps",
} as const;

export type PlatformId = keyof typeof platforms;

const allPlatforms = Object.keys(platforms) as PlatformId[];

export function PlatformLogos({
  ids = allPlatforms,
  label = "Platforms we work in",
  className,
  compact = false,
}: {
  ids?: readonly PlatformId[];
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul className={[styles.list, compact ? styles.compact : "", className].filter(Boolean).join(" ")} aria-label={label}>
      {ids.map((id) => (
        <li className={styles.item} key={id}>
          <Image src={`/images/platforms/${id}.svg`} alt="" width={28} height={28} unoptimized />
          <span>{platforms[id]}</span>
        </li>
      ))}
    </ul>
  );
}
