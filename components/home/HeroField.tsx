"use client";

import { useEffect, useRef } from "react";

import styles from "./HeroField.module.css";

const SPACING = 46;
const POINTER_RADIUS = 220;

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        return;
      }

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const t = reducedMotion ? 0 : time * 0.00045;

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const wave = reducedMotion
            ? 0
            : Math.sin(t + x * 0.012 + y * 0.016) * 0.5 + 0.5;
          let radius = 1 + wave * 0.6;
          let alpha = 0.1 + wave * 0.08;
          let lime = false;

          if (pointer.active) {
            const distance = Math.hypot(pointer.x - x, pointer.y - y);

            if (distance < POINTER_RADIUS) {
              const pull = 1 - distance / POINTER_RADIUS;
              radius += pull * 2.4;
              alpha += pull * 0.55;
              lime = pull > 0.55;
            }
          }

          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fillStyle = lime
            ? `rgba(163, 230, 53, ${Math.min(alpha, 0.9)})`
            : `rgba(143, 196, 116, ${Math.min(alpha, 0.7)})`;
          context.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();

    if (reducedMotion) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(loop);
    }

    const host = canvas.parentElement ?? canvas;

    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />;
}
