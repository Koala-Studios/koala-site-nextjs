"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./ArchWindow.module.css";

type ArchWindowProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Horizontal centre of the colour arch, as a percentage of the width. */
  archX?: number;
  className?: string;
  position?: string;
  children?: ReactNode;
};

/**
 * The signature image: grayscale, with the colour original showing through an
 * arch. One image; a grayscale backdrop filter covers everything except the
 * arch, which rises from the bottom once the image is on screen.
 */
export function ArchWindow({ src, alt, sizes, priority, archX = 74, className, position, children }: ArchWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setOpen(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = { "--arch-x": `${archX}%` } as CSSProperties;
  const imageStyle = position ? { objectPosition: position } : undefined;

  return (
    <div className={[styles.window, open ? styles.open : "", className].filter(Boolean).join(" ")} ref={ref} style={style}>
      <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} priority={priority} style={imageStyle} />
      <div className={styles.gray} aria-hidden="true" />
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
