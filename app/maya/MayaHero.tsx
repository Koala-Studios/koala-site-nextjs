"use client";
import Image from "next/image";
import gsap from "gsap";
import { CyclingWord } from "@/components/home/CyclingWord";
import { LinkedInButton } from "./LinkedInButton";
import { useEffect, useId, useRef } from "react";
import { mayaContent as maya } from "@/lib/content/maya";
import styles from "./maya.module.css";

export function MayaHeadline() {
  return <h1 id="maya-title" className={styles.headline}>
    I build brands<br /><CyclingWord words={["worth choosing.", "worth backing.", "worth buying."]} syncHero={false} />
  </h1>;
}

function shape(p: number) {
  const a = .42 - .06*p, b = .08 + .04*p, c = .35 - .06*p, d = .08 + .04*p;
  return `M ${a} 0 H ${1-b} Q 1 0 1 ${b} V ${1-c} Q 1 1 ${1-c} 1 H ${d} Q 0 1 0 ${1-d} V ${a} Q 0 0 ${a} 0 Z`;
}

export function MayaPortrait() {
  const id = useId().replace(/:/g, "");
  const figure = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Tween | undefined;
    let visible = true;
    const playback = () => { if (visible && !document.hidden) tween?.resume(); else tween?.pause(); };
    const configure = () => {
      tween?.kill();
      path.current?.setAttribute("d", shape(0));
      if (!motion.matches && path.current) {
        tween = gsap.to(path.current, { attr: { d: shape(1) }, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        playback();
      }
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; playback(); });
    if (figure.current) observer.observe(figure.current);
    motion.addEventListener("change", configure);
    document.addEventListener("visibilitychange", playback);
    configure();
    return () => { tween?.kill(); observer.disconnect(); motion.removeEventListener("change", configure); document.removeEventListener("visibilitychange", playback); };
  }, []);
  return <figure className={styles.portrait} ref={figure}>
    <svg width="0" height="0" aria-hidden="true" className={styles.clipDefinition}><defs><clipPath id={id} clipPathUnits="objectBoundingBox"><path ref={path} d={shape(0)} /></clipPath></defs></svg>
    <div className={styles.portraitImage} style={{ clipPath: `url(#${id})` }}>
      <Image src={maya.portrait} alt="Maya Amani, Chief Marketing & Growth Officer at Koala Studios" width={941} height={1672} sizes="(max-width: 800px) 90vw, 42vw" priority />
    </div>
    <figcaption><div className={styles.identityRow}><strong>{maya.name}</strong><LinkedInButton /></div><span>{maya.title}</span></figcaption>
  </figure>;
}
