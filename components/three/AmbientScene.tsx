"use client";

import type { BufferGeometry } from "three";
import { useEffect, useRef } from "react";

import styles from "./AmbientScene.module.css";

type Three = typeof import("three");
type Object3D = InstanceType<Three["Object3D"]>;

type Pointer = { x: number; y: number };

export type AmbientVariant = "blueprint" | "frames" | "dart" | "cube";

type AmbientSceneProps = {
  variant: AmbientVariant;
  className?: string;
};

type VariantDef = {
  group: Object3D;
  /** scroll is the host's viewport progress, -1 (below) .. 1 (above). */
  update: (elapsed: number, pointer: Pointer, scroll: number) => void;
};

const BG = 0x0a0a09;
const DARK = 0x2a2e26;
const LIME = 0xa3e635;

function wire(THREE: Three, geometry: BufferGeometry, opacity: number, color = LIME) {
  return new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
}

function solid(THREE: Three, geometry: BufferGeometry, color = DARK) {
  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color,
      metalness: 0.2,
      roughness: 0.5,
      transparent: true,
    })
  );
}

function limeSolid(THREE: Three, geometry: BufferGeometry) {
  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: LIME,
      emissive: LIME,
      emissiveIntensity: 0.7,
      transparent: true,
    })
  );
}

type Drifting = { object: Object3D; baseY: number; depth: number; spin: number };

function drift(
  objects: Drifting[],
  elapsed: number,
  pointer: Pointer,
  scroll: number
) {
  for (const [i, item] of objects.entries()) {
    item.object.position.y =
      item.baseY + scroll * item.depth * 1.6 + Math.sin(elapsed * 0.5 + i * 1.7) * 0.12;
    item.object.position.x += (pointer.x * item.depth * -0.35 - item.object.position.x) * 0.002;
    item.object.rotation.y += item.spin;
    item.object.rotation.x += item.spin * 0.6;
  }
}

/** Floating design-in-progress wireframes (services). */
function buildBlueprint(THREE: Three): VariantDef {
  const group = new THREE.Group();
  const items: Drifting[] = [];

  const specs: Array<{ object: Object3D; x: number; y: number; z: number; depth: number; spin: number }> = [
    { object: wire(THREE, new THREE.BoxGeometry(1.3, 1.3, 1.3), 0.22), x: -3.4, y: 1.0, z: -1.5, depth: 0.8, spin: 0.0012 },
    { object: wire(THREE, new THREE.TorusGeometry(0.7, 0.2, 10, 26), 0.16), x: 3.3, y: 1.4, z: -2.0, depth: 1.1, spin: 0.0018 },
    { object: wire(THREE, new THREE.ConeGeometry(0.6, 1.1, 8), 0.2), x: 2.6, y: -1.2, z: -0.8, depth: 0.5, spin: 0.0015 },
    { object: wire(THREE, new THREE.IcosahedronGeometry(0.55, 0), 0.26), x: -2.4, y: -1.4, z: 0.2, depth: 0.35, spin: 0.002 },
    { object: solid(THREE, new THREE.BoxGeometry(0.5, 0.5, 0.5)), x: -1.2, y: 1.7, z: -2.4, depth: 1.3, spin: 0.001 },
    { object: limeSolid(THREE, new THREE.OctahedronGeometry(0.14, 0)), x: 1.2, y: 0.6, z: 0.6, depth: 0.25, spin: 0.003 },
  ];

  for (const spec of specs) {
    spec.object.position.set(spec.x, spec.y, spec.z);
    group.add(spec.object);
    items.push({ object: spec.object, baseY: spec.y, depth: spec.depth, spin: spec.spin });
  }

  return {
    group,
    update: (elapsed, pointer, scroll) => {
      drift(items, elapsed, pointer, scroll);
      group.rotation.y = pointer.x * 0.06;
      group.rotation.x = pointer.y * 0.04;
    },
  };
}

/** Drifting gallery frames (work index). */
function buildFrames(THREE: Three): VariantDef {
  const group = new THREE.Group();
  const items: Drifting[] = [];

  const frameSpecs = [
    { w: 1.7, h: 1.15, x: -3.2, y: 1.1, z: -1.6, rotY: 0.5, depth: 0.9, spin: 0.0006 },
    { w: 1.3, h: 1.7, x: 3.2, y: 0.6, z: -1.2, rotY: -0.45, depth: 0.7, spin: 0.0008 },
    { w: 1.5, h: 1.0, x: -2.0, y: -1.3, z: -0.4, rotY: 0.3, depth: 0.4, spin: 0.0007 },
    { w: 1.1, h: 1.45, x: 2.4, y: -1.0, z: -2.2, rotY: -0.25, depth: 1.2, spin: 0.0005 },
  ];

  for (const spec of frameSpecs) {
    const frame = new THREE.Group();
    const edges = wire(THREE, new THREE.PlaneGeometry(spec.w, spec.h), 0.3);
    const canvasFill = solid(THREE, new THREE.PlaneGeometry(spec.w * 0.92, spec.h * 0.92), 0x191c16);
    (canvasFill.material as { side?: unknown }).side = THREE.DoubleSide;
    canvasFill.position.z = -0.01;
    frame.add(edges, canvasFill);
    frame.position.set(spec.x, spec.y, spec.z);
    frame.rotation.y = spec.rotY;
    group.add(frame);
    items.push({ object: frame, baseY: spec.y, depth: spec.depth, spin: spec.spin });
  }

  const dotA = limeSolid(THREE, new THREE.SphereGeometry(0.09, 16, 16));
  dotA.position.set(0.6, 1.6, -0.8);
  const dotB = limeSolid(THREE, new THREE.SphereGeometry(0.06, 16, 16));
  dotB.position.set(-1.1, -0.4, 0.4);
  group.add(dotA, dotB);
  items.push(
    { object: dotA, baseY: 1.6, depth: 0.6, spin: 0 },
    { object: dotB, baseY: -0.4, depth: 0.3, spin: 0 }
  );

  return {
    group,
    update: (elapsed, pointer, scroll) => {
      drift(items, elapsed, pointer, scroll);
      group.rotation.y = pointer.x * 0.05;
    },
  };
}

/** A quiet paper dart cruising the background (contact / success). */
function buildDart(THREE: Three): VariantDef {
  const group = new THREE.Group();

  const dart = new THREE.Group();
  const wingGeometry = new THREE.BufferGeometry();
  wingGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([0, 0, 1.3, -0.7, 0, -0.5, 0, 0.2, -0.32], 3)
  );
  wingGeometry.computeVertexNormals();
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x39402f,
    metalness: 0.15,
    roughness: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const wingLeft = new THREE.Mesh(wingGeometry, wingMaterial);
  const wingRight = new THREE.Mesh(wingGeometry.clone(), wingMaterial.clone());
  wingRight.scale.x = -1;
  const keel = limeSolid(THREE, new THREE.BoxGeometry(0.04, 0.26, 1.05));
  keel.position.set(0, -0.11, 0.07);
  dart.add(wingLeft, wingRight, keel);
  dart.rotation.y = -0.6;
  group.add(dart);

  const crumbs: Object3D[] = [];
  for (let i = 0; i < 4; i += 1) {
    const crumb = limeSolid(THREE, new THREE.SphereGeometry(0.045, 12, 12));
    group.add(crumb);
    crumbs.push(crumb);
  }

  // Sit deeper in the fog so the dart stays a quiet background note.
  group.position.z = -1.8;

  return {
    group,
    update: (elapsed, pointer, scroll) => {
      const pathX = Math.sin(elapsed * 0.22) * 2.6;
      const pathY = Math.cos(elapsed * 0.3) * 0.9 + scroll * 1.1;
      dart.position.x += (pathX + pointer.x * 0.7 - dart.position.x) * 0.02;
      dart.position.y += (pathY - pointer.y * 0.5 - dart.position.y) * 0.02;
      dart.rotation.z = Math.sin(elapsed * 0.4) * 0.18 - pointer.x * 0.15;
      dart.rotation.x = Math.cos(elapsed * 0.35) * 0.12;

      for (const [i, crumb] of crumbs.entries()) {
        crumb.position.set(
          dart.position.x - 0.6 - i * 0.42,
          dart.position.y - 0.22 - i * 0.16 + Math.sin(elapsed * 2 - i) * 0.05,
          -0.3 - i * 0.2
        );
        crumb.scale.setScalar(1 + Math.sin(elapsed * 2.4 - i * 0.8) * 0.25);
      }
    },
  };
}

/** A tumbling lost-parcel cube (404). */
function buildCube(THREE: Three): VariantDef {
  const group = new THREE.Group();

  const shell = wire(THREE, new THREE.BoxGeometry(1.7, 1.7, 1.7), 0.4);
  const core = limeSolid(THREE, new THREE.BoxGeometry(0.4, 0.4, 0.4));
  const ring = wire(THREE, new THREE.TorusGeometry(1.7, 0.02, 8, 60), 0.18);
  ring.rotation.x = Math.PI / 2.4;
  group.add(shell, core, ring);

  return {
    group,
    update: (elapsed, pointer) => {
      const speed = 1 + Math.hypot(pointer.x, pointer.y) * 1.4;
      shell.rotation.x = elapsed * 0.3 * speed;
      shell.rotation.y = elapsed * 0.4 * speed;
      core.rotation.x = -elapsed * 0.6;
      core.rotation.y = -elapsed * 0.5;
      ring.rotation.z = elapsed * 0.2;
      group.position.y = Math.sin(elapsed * 0.7) * 0.2;
      group.rotation.y = pointer.x * 0.2;
    },
  };
}

const builders: Record<AmbientVariant, (THREE: Three) => VariantDef> = {
  blueprint: buildBlueprint,
  frames: buildFrames,
  dart: buildDart,
  cube: buildCube,
};

function initAmbient(
  THREE: Three,
  host: HTMLDivElement,
  variant: AmbientVariant,
  reducedMotion: boolean
) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 6.5, 12);

  const camera = new THREE.PerspectiveCamera(
    40,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    40
  );
  camera.position.set(0, 0, 7.5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(LIME, 9, 13);
  rim.position.set(-3, 2, 3);
  scene.add(rim);

  const def = builders[variant](THREE);
  scene.add(def.group);

  const pointer: Pointer = { x: 0, y: 0 };
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

  const clock = new THREE.Clock();
  let frame = 0;
  let running = false;

  const scrollProgress = () => {
    const rect = host.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    // 0 when the host is centered in the viewport, ±1 at the edges.
    return ((rect.top + rect.height / 2) / viewport - 0.5) * -2;
  };

  const render = () => {
    const elapsed = clock.getElapsedTime();
    def.update(elapsed, pointer, scrollProgress());
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

  // Only animate while the host is on screen.
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

    scene.traverse((child) => {
      const mesh = child as {
        geometry?: { dispose: () => void };
        material?: { dispose: () => void };
      };
      mesh.geometry?.dispose?.();
      mesh.material?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}

/**
 * Decorative three.js backdrop for hero sections: floating wireframes,
 * gallery frames, a cruising dart, or a tumbling cube. Lazy-loads three,
 * pauses offscreen, blends into the page via fog + a soft mask, and renders
 * a single static frame under prefers-reduced-motion. The parent section
 * needs position: relative; content should sit at z-index 1+.
 */
export function AmbientScene({ variant, className }: AmbientSceneProps) {
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

    void import("three").then((THREE) => {
      if (disposed || !hostRef.current) {
        return;
      }

      try {
        cleanup = initAmbient(THREE, hostRef.current, variant, reducedMotion);
      } catch {
        // WebGL unavailable — the section simply has no backdrop.
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [variant]);

  return (
    <div
      aria-hidden="true"
      className={`${styles.host} ${className ?? ""}`}
      ref={hostRef}
    />
  );
}
