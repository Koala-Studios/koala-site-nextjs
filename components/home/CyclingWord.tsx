"use client";

import { useEffect, useState } from "react";

import styles from "./CyclingWord.module.css";

type CyclingWordProps = {
  words: string[];
  interval?: number;
};

export function CyclingWord({ words, interval = 3200 }: CyclingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, words.length]);

  // Let companions (e.g. the hero 3D scene) follow the active word.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("koala:hero-word", { detail: { index } })
    );
  }, [index]);

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
