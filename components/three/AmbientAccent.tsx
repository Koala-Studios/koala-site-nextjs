"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import styles from "./AmbientAccent.module.css";

type Three = typeof import("three");

export type AccentShape = "icosphere" | "torus" | "octa" | "box";

type AmbientAccentProps = {
  shape: AccentShape;
  /** Which edge of the hosting section to hug. */
  side?: "left" | "right";
  /** Vertical drift in rem over the section's scroll-through (lags the page). */
  parallax?: number;
  /** Wireframe line opacity. Keep low — these are background flair. */
  opacity?: number;
  className?: string;
};

const LIME = 0xa3e635;

function buildGeometry(THREE: Three, shape: AccentShape) {
  switch (shape) {
    case "icosphere":
      return new THREE.IcosahedronGeometry(1.05, 1);
    case "torus":
      return new THREE.TorusGeometry(0.85, 0.3, 10, 26);
    case "octa":
      return new THREE.OctahedronGeometry(1.1, 0);
    case "box":
      return new THREE.BoxGeometry(1.5, 1.5, 1.5);
  }
}

function initAccent(
  THREE: Three,
  host: HTMLDivElement,
  shape: AccentShape,
  opacity: number,
  reducedMotion: boolean
) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    35,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    20
  );
  camera.position.z = 4;

  const object = new THREE.LineSegments(
    new THREE.WireframeGeometry(buildGeometry(THREE, shape)),
    new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity })
  );
  scene.add(object);

  const pointer = { x: 0, y: 0 };
  const handlePointer = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", handlePointer, { passive: true });

  const resize = () => {
    const width = host.clientWidth;
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  const timer = new THREE.Timer();
  timer.connect(document);
  let frame = 0;
  let running = false;

  const render = (timestamp?: number) => {
    timer.update(timestamp);
    const elapsed = timer.getElapsed();
    object.rotation.y = elapsed * 0.16 + pointer.x * 0.25;
    object.rotation.x = elapsed * 0.1 + pointer.y * 0.2;
    renderer.render(scene, camera);

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(render);
    }
  };

  const start = () => {
    if (running) {
      return;
    }

    running = true;

    if (reducedMotion) {
      render();
    } else {
      frame = window.requestAnimationFrame(render);
    }
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };

  const visibility = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      start();
    } else {
      stop();
    }
  });
  visibility.observe(host);

  return () => {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", handlePointer);
    object.geometry.dispose();
    object.material.dispose();
    timer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

/**
 * A single slowly-rotating wireframe drifting through a section's margin at
 * a different speed than the scroll. Pure flair: behind content (z -1),
 * pointer-tilted, paused offscreen, hidden on small screens, static under
 * prefers-reduced-motion. Hosting section needs `position: relative` and
 * `isolation: isolate`.
 */
export function AmbientAccent({
  shape,
  side = "right",
  parallax = 6,
  opacity = 0.3,
  className,
}: AmbientAccentProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    let drift: gsap.core.Tween | undefined;

    if (!reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      const travel = parallax * 16;
      drift = gsap.fromTo(
        host,
        { y: -travel },
        {
          y: travel,
          ease: "none",
          scrollTrigger: {
            trigger: host.parentElement ?? host,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    void import("three").then((THREE) => {
      if (disposed || !hostRef.current) {
        return;
      }

      try {
        cleanup = initAccent(THREE, hostRef.current, shape, opacity, reducedMotion);
      } catch {
        // WebGL unavailable — no accent.
      }
    });

    return () => {
      disposed = true;
      drift?.scrollTrigger?.kill();
      drift?.kill();
      cleanup?.();
    };
  }, [opacity, parallax, shape]);

  return (
    <div
      aria-hidden="true"
      className={`${styles.host} ${side === "left" ? styles.left : styles.right} ${className ?? ""}`}
      ref={hostRef}
    />
  );
}
