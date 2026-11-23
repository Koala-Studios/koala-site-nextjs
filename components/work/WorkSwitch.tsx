"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";

import styles from "./WorkSwitch.module.css";

type View = "stores" | "marketing";

type WorkSwitchProps = {
  stores: ReactNode;
  marketing: ReactNode;
  counts: Record<View, number>;
};

const labels: Record<View, string> = { stores: "Stores", marketing: "Marketing" };

/** Stores / Marketing switch on /work. Both lists are in the page; /work#marketing opens on marketing. */
export function WorkSwitch({ stores, marketing, counts }: WorkSwitchProps) {
  const [view, setView] = useState<View>("stores");
  const id = useId();

  useEffect(() => {
    const fromHash = () => setView(window.location.hash === "#marketing" ? "marketing" : "stores");
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const choose = (next: View) => {
    setView(next);
    window.history.replaceState(null, "", next === "marketing" ? "#marketing" : window.location.pathname);
  };

  const views: View[] = ["stores", "marketing"];

  return (
    <div className={styles.wrap}>
      <div className={styles.switch} role="tablist" aria-label="Kind of work">
        {views.map((item) => (
          <button
            aria-controls={`${id}-${item}`}
            aria-selected={view === item}
            className={styles.tab}
            id={`${id}-${item}-tab`}
            key={item}
            onClick={() => choose(item)}
            role="tab"
            type="button"
          >
            <span className="ks-x">{labels[item]}</span>
            <span className={`ks-label ${styles.count}`}>{counts[item]}</span>
          </button>
        ))}
      </div>
      <div aria-labelledby={`${id}-stores-tab`} hidden={view !== "stores"} id={`${id}-stores`} role="tabpanel">
        {stores}
      </div>
      <div aria-labelledby={`${id}-marketing-tab`} hidden={view !== "marketing"} id={`${id}-marketing`} role="tabpanel">
        {marketing}
      </div>
    </div>
  );
}
