"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./HeroReel.module.css";

const base = "/videos/reel/koala-reel";

/**
 * The studio reel: muted, inline and looping. It waits until most of it is on
 * screen so the opening is seen, pauses once it leaves, stays on its poster for
 * reduced motion, and always offers a pause control.
 */
export function HeroReel({ className, label }: { className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Safari only allows autoplay when muted is set as an attribute, which React leaves off.
    video.muted = true;
    video.setAttribute("muted", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setHeld(true), 0);
      return () => window.clearTimeout(id);
    }
    // Safari delivers IntersectionObserver callbacks late while a scroll is in
    // motion, so visibility is measured directly on each scroll frame instead.
    // Playback is retried while in view, because Safari can reject the first
    // play() while the file is still loading.
    let inView = false;
    let frame = 0;
    const tryPlay = () => {
      if (inView && video.paused && !video.dataset.held) video.play().catch(() => {});
    };
    const measure = () => {
      frame = 0;
      const rect = video.getBoundingClientRect();
      const visible = Math.max(0, Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top));
      inView = rect.height > 0 && visible / rect.height >= 0.6;
      if (inView) tryPlay();
      else if (visible === 0 && !video.paused) video.pause();
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    const retry = window.setInterval(tryPlay, 500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      window.cancelAnimationFrame(frame);
      window.clearInterval(retry);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      delete video.dataset.held;
      setHeld(false);
      video.play().catch(() => {});
    } else {
      video.dataset.held = "1";
      setHeld(true);
      video.pause();
    }
  };

  return (
    <div className={[styles.reel, className].filter(Boolean).join(" ")}>
      <video
        ref={ref}
        className={styles.video}
        poster={`${base}-poster.webp`}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        {/* H.264 first: it plays everywhere, Safari included, at the same size as the VP9 encode */}
        <source src={`${base}-1280.mp4`} type="video/mp4" media="(max-width: 900px)" />
        <source src={`${base}-1920.mp4`} type="video/mp4" />
        <source src={`${base}-1920.webm`} type="video/webm" />
      </video>
      <button type="button" className={styles.toggle} onClick={toggle} aria-label={paused || held ? "Play reel" : "Pause reel"}>
        {paused || held ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" /></svg>
        )}
      </button>
    </div>
  );
}
