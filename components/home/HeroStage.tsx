"use client";

import { useEffect, useRef } from "react";

import {
  type Pointer,
  type SceneDef,
  type TPhysical,
  type Three,
  PALETTE,
  cubicBezier,
} from "./hero/heroKit";
import { sceneBuilders } from "./hero/heroScenes";

import styles from "./HeroStage.module.css";

const CAMERA_Z = 8.6;
const CAMERA_FOV = 54;
/** Worst-case pointer drift of the camera, budgeted into the fit margins. */
const DRIFT_X = 0.22;
const DRIFT_Y = 0.16;
const BOB = 0.5;
const EDGE_MARGIN = 0.14;
/** sin() of the widest yaw/pitch any vignette applies to itself, rounded up. */
const YAW_REACH = 0.46;
const PITCH_REACH = 0.28;
/** One short, two-scene transition; scenes remain stationary between swaps. */
const SWAP_SECONDS = 1.5;
/** Fixed-radius helix around Three.js' vertical Y axis. */
const HELIX_TURNS = 0.3;
const HELIX_RADIUS = 0.8;
const HELIX_HEIGHT = 2.5;
const HELIX_SETTLED_ANGLE = Math.PI / 2;
/** Ease-in-out for progress along the helix. */
const EASE_SWAP = cubicBezier(0.65, 0, 0.35, 1);
/** Middle control for a shallow overshoot in the quartic motion curve. */
const BACK_CONTROL = 1;

type FadeTarget = { material: TPhysical; baseOpacity: number };
type SceneTransition = {
  elapsed: number;
  from: number;
  to: number;
};

function easeInOutBack(progress: number) {
  const inverse = 1 - progress;

  // Quartic Bezier with Y controls [0, 0, BACK_CONTROL, 1, 1]. Matching
  // controls at both endpoints gives the motion zero starting and ending
  // velocity while the raised middle control keeps one shallow overshoot.
  return (
    6 * BACK_CONTROL * inverse ** 2 * progress ** 2 +
    4 * inverse * progress ** 3 +
    progress ** 4
  );
}

function initStage(
  THREE: Three,
  addons: {
    RoundedBoxGeometry: typeof import("three/addons/geometries/RoundedBoxGeometry.js").RoundedBoxGeometry;
  },
  host: HTMLDivElement,
  reducedMotion: boolean
) {
  const width = Math.max(host.clientWidth, 1);
  const height = Math.max(host.clientHeight, 1);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  // Fully transparent: the page's own background — and the dot field painted
  // behind this canvas — show straight through.
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Fog pulls every silhouette toward the page background, so nothing ends in a
  // hard edge against it.
  scene.fog = new THREE.Fog(PALETTE.bg, 8, 14.5);

  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    width / height,
    0.1,
    60
  );
  camera.position.set(0, 0, CAMERA_Z);

  // A plain three-light rig, no environment map. An env map is what was putting
  // white and steel-blue speculars on surfaces that are meant to read as the
  // site's greys.
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(4, 6, 6);
  const limeRim = new THREE.PointLight(PALETTE.lime, 12, 15, 2);
  limeRim.position.set(-3.5, 2.2, 3.5);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5), key, limeRim);

  /* ---------- Vignettes ---------- */

  const defs: SceneDef[] = sceneBuilders.map((build) => build(THREE, addons));
  const rigs = defs.map(() => new THREE.Group());
  const fades: FadeTarget[][] = [];
  // Per-axis worst-case half extents. Fitting a wide, short model against a
  // single sphere radius wastes most of the frame; measuring X and Y separately
  // is what lets each vignette actually fill the space it is given.
  const extents: { halfX: number; halfY: number }[] = [];
  const box = new THREE.Box3();

  for (const [index, def] of defs.entries()) {
    const rig = rigs[index];
    rig.userData.fade = 0;
    rig.visible = false;
    rig.add(def.group);
    scene.add(rig);

    box.setFromObject(def.group);
    const halfZ = Math.max(box.max.z, -box.min.z, 0);
    extents.push({
      // Satellites sweep a horizontal ring, so X reaches the declared radius;
      // depth is budgeted at the angle the scenes actually turn through rather
      // than at the full diagonal.
      halfX: Math.max(
        Math.max(box.max.x, -box.min.x) + halfZ * YAW_REACH,
        def.radius,
        Number.EPSILON
      ),
      halfY: Math.max(
        Math.max(box.max.y, -box.min.y) + halfZ * PITCH_REACH,
        def.radius * 0.72,
        Number.EPSILON
      ),
    });

    const targets: FadeTarget[] = [];
    const seen = new Set<TPhysical>();

    def.group.traverse((child) => {
      const material = (child as { material?: unknown }).material as
        | TPhysical
        | undefined;

      if (material && "opacity" in material && !seen.has(material)) {
        seen.add(material);
        targets.push({ material, baseOpacity: material.opacity });
      }
    });

    fades.push(targets);
  }

  /* ---------- Layout ---------- */

  const layout = { availX: 2, availY: 2 };

  const measure = () => {
    const logicalWidth = Math.max(host.parentElement?.clientWidth ?? width, 1);
    const logicalHeight = Math.max(
      host.parentElement?.clientHeight ?? height,
      1
    );
    const halfHeight =
      Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_Z;
    const halfWidth = halfHeight * (logicalWidth / logicalHeight);

    // Fit against the visual column's logical frame. The WebGL host has extra
    // vertical rendering room, but that overscan must not alter the authored
    // helix dimensions or the settled scene scale.
    layout.availX = Math.max(halfWidth - DRIFT_X - EDGE_MARGIN, 0.4);
    layout.availY = Math.max(halfHeight - DRIFT_Y - BOB - EDGE_MARGIN, 0.4);
  };

  const resize = () => {
    const nextWidth = Math.max(host.clientWidth, 1);
    const nextHeight = Math.max(host.clientHeight, 1);
    const logicalHeight = Math.max(
      host.parentElement?.clientHeight ?? nextHeight,
      1
    );
    const overscanRatio = nextHeight / logicalHeight;

    renderer.setSize(nextWidth, nextHeight);
    // Widen the vertical frustum by the same ratio as the CSS overscan. This
    // keeps the world-to-screen scale and trajectory unchanged while moving
    // the actual WebGL clipping planes beyond the visual column's edges.
    camera.fov = THREE.MathUtils.radToDeg(
      2 *
        Math.atan(
          Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2)) * overscanRatio
        )
    );
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();

    measure();
  };

  /* ---------- Input + word sync ---------- */

  const pointer: Pointer = { x: 0, y: 0 };
  const smoothed: Pointer = { x: 0, y: 0 };

  const handlePointer = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  window.addEventListener("pointermove", handlePointer, { passive: true });

  // Seeded from the last published index: this stage mounts only once its
  // three.js chunk has loaded, so it would otherwise miss every swap before that.
  let settledIndex = Math.min(
    defs.length - 1,
    Math.max(0, window.koalaHeroWordIndex ?? 0)
  );
  let transition: SceneTransition | null = null;

  const handleWord = (event: Event) => {
    const detail = (event as CustomEvent<{ index: number }>).detail;

    if (typeof detail?.index === "number") {
      const nextIndex = detail.index % defs.length;

      if (reducedMotion) {
        settledIndex = nextIndex;
        transition = null;
        draw();
        return;
      }

      // Word changes are farther apart than SWAP_SECONDS. If an external event
      // does interrupt a swap, finish its destination before starting the next
      // discrete two-scene transition so a third scene can never join it.
      if (transition) {
        settledIndex = transition.to;
        transition = null;
      }

      if (nextIndex !== settledIndex) {
        transition = {
          elapsed: 0,
          from: settledIndex,
          to: nextIndex,
        };
      }
    }
  };

  window.addEventListener("koala:hero-word", handleWord);

  for (const index of defs.keys()) {
    const initial = index === settledIndex ? 1 : 0;
    const rig = rigs[index];
    rig.userData.fade = initial;
    rig.visible = initial > 0;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  measure();

  /* ---------- Loop ---------- */

  const clock = new THREE.Clock();
  let lastElapsed = 0;
  let frame = 0;
  let running = false;

  function draw() {
    const elapsed = clock.getElapsedTime();
    const delta = Math.min(elapsed - lastElapsed, 0.05);
    lastElapsed = elapsed;

    if (!reducedMotion) {
      smoothed.x += (pointer.x - smoothed.x) * 0.05;
      smoothed.y += (pointer.y - smoothed.y) * 0.05;
    }

    const activeTransition = transition;
    let rawProgress = 0;
    let easedProgress = 0;
    let motionProgress = 0;

    if (activeTransition) {
      activeTransition.elapsed = Math.min(
        SWAP_SECONDS,
        activeTransition.elapsed + delta
      );
      rawProgress = activeTransition.elapsed / SWAP_SECONDS;
      easedProgress = EASE_SWAP(rawProgress);
      motionProgress = easeInOutBack(rawProgress);
    }

    for (const [index, def] of defs.entries()) {
      const rig = rigs[index];
      const incoming = activeTransition?.to === index;
      const outgoing = activeTransition?.from === index;
      const settled = !activeTransition && index === settledIndex;
      const fade = incoming
        ? easedProgress
        : outgoing
          ? 1 - easedProgress
          : settled
            ? 1
            : 0;

      rig.userData.fade = fade;
      rig.visible = fade > 0.004;

      if (!rig.visible) {
        continue;
      }

      const fit = Math.min(
        layout.availX / extents[index].halfX,
        layout.availY / extents[index].halfY
      );
      rig.scale.setScalar(fit);

      let helixAngle = HELIX_SETTLED_ANGLE;
      let helixY = 0;

      if (incoming) {
        helixAngle =
          HELIX_SETTLED_ANGLE -
          Math.PI * 2 * HELIX_TURNS * (1 - motionProgress);
        helixY = layout.availY * HELIX_HEIGHT * (1 - motionProgress);
      } else if (outgoing) {
        helixAngle =
          HELIX_SETTLED_ANGLE +
          Math.PI * 2 * HELIX_TURNS * motionProgress;
        helixY = -layout.availY * HELIX_HEIGHT * motionProgress;
      }

      const helixRadius =
        Math.min(layout.availX, layout.availY) * HELIX_RADIUS;
      const bob = reducedMotion
        ? 0
        : Math.sin(elapsed * 0.65 + index * 2) * BOB;

      rig.position.set(
        Math.cos(helixAngle) * helixRadius,
        helixY + bob,
        Math.sin(helixAngle) * helixRadius - helixRadius
      );

      if (!reducedMotion) {
        def.update(elapsed, smoothed);
      }

      // Each vignette's authored front is +Z. Point that axis along the
      // helix's outward radial vector; at the settled point the yaw is zero,
      // so the authored resting pose is unchanged.
      rig.rotation.set(0, HELIX_SETTLED_ANGLE - helixAngle, 0);

      for (const entry of fades[index]) {
        entry.material.opacity = entry.baseOpacity * fade;
      }
    }

    if (!reducedMotion) {
      // Pure translation, no lookAt — keeping the frustum axis-aligned is what
      // makes the fit clamp in measure() exact.
      camera.position.x = smoothed.x * DRIFT_X;
      camera.position.y = -smoothed.y * DRIFT_Y;
    }

    renderer.render(scene, camera);

    if (activeTransition && rawProgress >= 1) {
      settledIndex = activeTransition.to;
      transition = null;
    }
  }

  const loop = () => {
    draw();
    frame = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) {
      return;
    }

    running = true;

    if (reducedMotion) {
      draw();
    } else {
      frame = window.requestAnimationFrame(loop);
    }
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };

  // Idle whenever the hero is scrolled away.
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
    window.removeEventListener("koala:hero-word", handleWord);
    window.removeEventListener("pointermove", handlePointer);

    scene.traverse((child) => {
      const mesh = child as {
        geometry?: { dispose?: () => void };
        material?: { dispose?: () => void };
      };
      mesh.geometry?.dispose?.();
      mesh.material?.dispose?.();
    });

    renderer.dispose();
    renderer.domElement.remove();
  };
}

/**
 * The homepage hero's WebGL stage: a transparent canvas filling the hero's
 * visual column, carrying six interactive product vignettes that crossfade in
 * step with the cycling headline word. three.js loads lazily on the client.
 */
export function HeroStage() {
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

    void Promise.all([
      import("three"),
      import("three/addons/geometries/RoundedBoxGeometry.js"),
    ])
      .then(([THREE, rounded]) => {
        if (disposed || !hostRef.current) {
          return;
        }

        try {
          cleanup = initStage(
            THREE,
            { RoundedBoxGeometry: rounded.RoundedBoxGeometry },
            hostRef.current,
            reducedMotion
          );
        } catch {
          // WebGL unavailable — the hero simply stays 2D.
        }
      })
      .catch(() => {
        // three failed to load — same graceful fallback.
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div aria-hidden="true" className={styles.host} ref={hostRef} />;
}
