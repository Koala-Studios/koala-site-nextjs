import Image from "next/image";

import type { CaseStudyCreative } from "@/lib/content";

import styles from "./Creative.module.css";

type CreativeProps = {
  item: CaseStudyCreative;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Hide the caption, e.g. on cards that link elsewhere. */
  bare?: boolean;
  /** Crop to this ratio from the top, e.g. "4 / 5", instead of the default. */
  aspect?: string;
};

/** A real ad at its own ratio, or an email as a tall crop from the top with a link to the whole thing. */
export function Creative({ item, sizes, priority, className, bare, aspect }: CreativeProps) {
  const width = item.width ?? 600;
  const height = item.height ?? 1600;
  const [w, h] = (aspect ?? "2 / 5").split("/").map(Number);
  const cropped = aspect ? height / width > h / w + 0.02 : item.kind === "email" && height / width > 2.5;

  return (
    <figure className={[styles.creative, styles[item.kind], cropped ? styles.cropped : "", className].filter(Boolean).join(" ")}>
      <span className={styles.frame} style={aspect ? { aspectRatio: aspect } : undefined}>
        <Image src={item.src} alt={item.alt} width={width} height={height} sizes={sizes} priority={priority} />
      </span>
      {bare ? null : (
        <figcaption className={styles.caption}>
          <span>{item.caption}</span>
          {cropped ? (
            <a className="ks-tlink" href={item.src} target="_blank" rel="noreferrer">
              Whole email <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
