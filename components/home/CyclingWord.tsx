"use client";

import { useEffect, useState } from "react";

import styles from "./CyclingWord.module.css";

type CyclingWordProps = {
  words: string[];
  interval?: number;
  syncHero?: boolean;
};

declare global {
  interface Window {
    /** Last index published here, so a late-mounting companion can sync. */
    koalaHeroWordIndex?: number;
  }
}

export function CyclingWord({ words, interval = 3200, syncHero = true }: CyclingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    const configure = () => {
      window.clearInterval(timer);
      if (!motion.matches) timer = window.setInterval(() => {
        if (!document.hidden) setIndex(value => (value + 1) % words.length);
      }, interval);
    };
    configure();
    motion.addEventListener("change", configure);
    return () => { window.clearInterval(timer); motion.removeEventListener("change", configure); };
  }, [interval, words.length]);

  // Let companions (e.g. the hero 3D stage) follow the active word. The index
  // is also parked on `window` because the stage mounts after its three.js
  // chunk loads and would otherwise miss every swap before that.
  useEffect(() => {
    if (!syncHero) return;
    window.koalaHeroWordIndex = index;
    window.dispatchEvent(
      new CustomEvent("koala:hero-word", { detail: { index } })
    );
  }, [index, syncHero]);

  const longest = words.reduce(
    (current, word) => (word.length > current.length ? word : current),
    ""
  );

  return (
    <span className={styles.host}>
      {/* Static phrase for screen readers and crawlers; the swap is visual only. */}
      <span className="koala-sr-only">{words[0]}</span>
      <span className={styles.sizer} aria-hidden="true">
        {longest}
      </span>
      <span aria-hidden="true" className={styles.word} key={words[index]}>
        {words[index]}
      </span>
    </span>
  );
}
