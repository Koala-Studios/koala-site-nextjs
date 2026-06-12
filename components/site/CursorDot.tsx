"use client";

import { useEffect, useRef } from "react";

import styles from "./CursorDot.module.css";

/**
 * Custom cursor accent for fine pointers. A small lime dot trails the
 * pointer; over elements with [data-cursor="..."] it grows into a labelled
 * disc (VIEW / DRAG / OPEN). Purely decorative — the native cursor stays.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!dot || !label || !finePointer) {
      return;
    }

    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let visible = false;

    const render = () => {
      const ease = reducedMotion ? 1 : 0.18;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        dot.classList.add(styles.visible);
      }

      const interactive = (event.target as Element | null)?.closest?.(
        "[data-cursor]"
      );
      const cursorLabel = interactive?.getAttribute("data-cursor") ?? "";

      if (cursorLabel) {
        label.textContent = cursorLabel.toUpperCase();
        dot.classList.add(styles.expanded);
      } else {
        dot.classList.remove(styles.expanded);
      }
    };

    const handleLeave = () => {
      visible = false;
      dot.classList.remove(styles.visible, styles.expanded);
    };

    frame = window.requestAnimationFrame(render);
    document.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className={styles.dot} ref={dotRef}>
      <span className={styles.label} ref={labelRef} />
    </div>
  );
}
