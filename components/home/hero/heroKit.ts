import type {
  BufferGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  Points,
  Shape,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import type { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * The three.js namespace, passed in at runtime so the library stays lazily
 * imported. The `import type` above is erased at compile time and costs nothing.
 */
export type Three = typeof import("three");

export type TGroup = Group;
export type TMesh = Mesh;
export type TObject3D = Object3D;
export type TPhysical = MeshPhysicalMaterial;
export type TLineMaterial = LineBasicMaterial;
export type TLineSegments = LineSegments;
export type TBufferGeometry = BufferGeometry;
export type TShape = Shape;
export type TVector3 = Vector3;
export type TPoints = Points;
export type TRenderer = WebGLRenderer;
export type TRenderTarget = WebGLRenderTarget;

export type Addons = {
  RoundedBoxGeometry: typeof RoundedBoxGeometry;
};

/**
 * The whole stage paints from the site's own palette and nothing else: the page
 * background, two greys off it, and lime. No white, no warm neutrals — anything
 * outside this set immediately reads as foreign against the rest of the page.
 */
export const PALETTE = {
  bg: 0x0a0a09,
  /** Primary structural surface. */
  dark: 0x232720,
  /** Secondary volumes, one step up from `dark`. */
  soft: 0x31362c,
  /** Panels that need to separate from `soft` without going pale. */
  panel: 0x3d4438,
  /** Screens, insets and shadow gaps. */
  ink: 0x151812,
  lime: 0xa3e635,
} as const;

export type Pointer = { x: number; y: number };

/**
 * One interactive vignette. `radius` is the design-time worst-case extent
 * (including anything that orbits outward) — the stage fit-scales against it so
 * a scene can never spill outside the canvas.
 */
export type SceneDef = {
  group: TGroup;
  radius: number;
  update: (elapsed: number, pointer: Pointer) => void;
};

export function lerp(current: number, target: number, ease: number) {
  return current + (target - current) * ease;
}

/** Smoothstep-eased 0..1. */
export function ease(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

/**
 * CSS-style `cubic-bezier(x1, y1, x2, y2)` easing, as a reusable function of
 * progress. The curve's X is time and Y is output, so each call has to invert X
 * first — Newton from `x` converges in a couple of steps for the ordinary
 * ease-in-out control points used here, with a bisection fallback for the
 * near-flat regions Newton handles badly.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (progress: number) => {
    const x = Math.min(1, Math.max(0, progress));

    if (x === 0 || x === 1) {
      return x;
    }

    let t = x;

    for (let i = 0; i < 4; i += 1) {
      const error = sampleX(t) - x;

      if (Math.abs(error) < 1e-5) {
        return sampleY(t);
      }

      const slope = slopeX(t);

      if (Math.abs(slope) < 1e-6) {
        break;
      }

      t -= error / slope;
    }

    let low = 0;
    let high = 1;
    t = x;

    for (let i = 0; i < 20; i += 1) {
      const value = sampleX(t);

      if (Math.abs(value - x) < 1e-5) {
        break;
      }

      if (value < x) {
        low = t;
      } else {
        high = t;
      }

      t = (low + high) / 2;
    }

    return sampleY(t);
  };
}

export type Kit = {
  /** Dark body panels — the default structural material. */
  graphite: () => TPhysical;
  /** Softer mid-dark for secondary volumes. */
  charcoal: () => TPhysical;
  /** Near-black for screens, insets and label plates. */
  ink: () => TPhysical;
  /** Card / paper stock. Still a grey — the page has no white in it. */
  bone: () => TPhysical;
  /** Packaging stock, one shade off `bone`. */
  kraft: () => TPhysical;
  /** Lime. Intensity is damped hard — this is an accent, not a lamp. */
  lime: (intensity?: number) => TPhysical;
  /** Slightly polished lime — reads as the brand mark in the round. */
  limeMetal: () => TPhysical;
  /** Smoked panel. Translucent and dark rather than clear glass. */
  glass: (tint?: number) => TPhysical;
  /** Lime-tinted contents for bottles. */
  liquid: () => TPhysical;
  /** Lime wireframe/edge lines. */
  line: (opacity?: number) => TLineMaterial;

  /** Chamfered box — the chamfer is what catches the rim light. */
  box: (w: number, h: number, d: number, radius?: number) => TBufferGeometry;
  /** Bevelled extrusion of a 2D shape, recentred on its own bounds. */
  extrude: (shape: TShape, depth?: number, bevel?: number) => TBufferGeometry;
  /** Rounded-rectangle shape, for cards, tags and plates. */
  rect: (w: number, h: number, radius: number) => TShape;
  /** Spline-smoothed lathe profile, for bottles and jars. */
  lathe: (points: [number, number][], segments?: number) => TBufferGeometry;
  /** Lime edge lines around any geometry. */
  edges: (geometry: TBufferGeometry, opacity?: number) => TLineSegments;
};

/**
 * Per-scene material + geometry kit. Materials are cached inside one kit (so a
 * scene shares instances and stays cheap) but never across scenes — the
 * crossfade writes `opacity`/`emissiveIntensity` per group, so two scenes
 * sharing a material would fade each other.
 *
 * Everything is matte: no clearcoat, no env map, low emissive. The stage has no
 * bloom pass, so lime has to read as colour rather than as light.
 */
export function makeKit(THREE: Three, addons: Addons): Kit {
  const cache = new Map<string, TPhysical>();

  const physical = (key: string, params: Record<string, unknown>) => {
    const hit = cache.get(key);

    if (hit) {
      return hit;
    }

    const material = new THREE.MeshPhysicalMaterial({
      transparent: true,
      ...params,
    });
    cache.set(key, material);

    return material;
  };

  return {
    graphite: () =>
      physical("graphite", {
        color: PALETTE.dark,
        metalness: 0.2,
        roughness: 0.46,
      }),
    charcoal: () =>
      physical("charcoal", {
        color: PALETTE.soft,
        metalness: 0.15,
        roughness: 0.52,
      }),
    ink: () =>
      physical("ink", {
        color: PALETTE.ink,
        metalness: 0.25,
        roughness: 0.44,
      }),
    bone: () =>
      physical("bone", {
        color: PALETTE.panel,
        metalness: 0.05,
        roughness: 0.62,
      }),
    kraft: () =>
      physical("kraft", {
        color: PALETTE.soft,
        metalness: 0.05,
        roughness: 0.66,
      }),
    // Scenes ask for intensities on a 0.4–3.0 scale. Damping to main's range
    // keeps lime an accent colour and stops the hero glowing through the page.
    lime: (intensity = 1) =>
      physical(`lime-${intensity}`, {
        color: PALETTE.lime,
        emissive: PALETTE.lime,
        emissiveIntensity: Math.min(intensity, 2) * 0.3,
        metalness: 0.1,
        roughness: 0.42,
      }),
    limeMetal: () =>
      physical("limeMetal", {
        color: PALETTE.lime,
        emissive: PALETTE.lime,
        emissiveIntensity: 0.22,
        metalness: 0.35,
        roughness: 0.34,
      }),
    // Smoked, not clear: enough body to read as a product against the page,
    // enough translucency to still say "glass".
    glass: (tint = PALETTE.panel) =>
      physical(`glass-${tint}`, {
        color: tint,
        metalness: 0.15,
        roughness: 0.24,
        opacity: 0.72,
      }),
    liquid: () =>
      physical("liquid", {
        color: PALETTE.lime,
        emissive: PALETTE.lime,
        emissiveIntensity: 0.24,
        metalness: 0.1,
        roughness: 0.3,
        opacity: 0.8,
      }),
    line: (opacity = 0.7) =>
      new THREE.LineBasicMaterial({
        color: PALETTE.lime,
        transparent: true,
        opacity,
      }),

    box: (w, h, d, radius = 0.05) => {
      // The chamfer must stay under half of the smallest side or the geometry
      // inverts on thin panels.
      const safe = Math.max(0.004, Math.min(radius, Math.min(w, h, d) / 2 - 0.002));

      return new addons.RoundedBoxGeometry(w, h, d, 3, safe);
    },

    extrude: (shape, depth = 0.07, bevel = 0.018) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSize: bevel,
        bevelThickness: bevel,
        bevelSegments: 2,
        curveSegments: 10,
      });
      geometry.center();

      return geometry;
    },

    rect: (w, h, radius) => {
      const r = Math.min(radius, Math.min(w, h) / 2);
      const x = -w / 2;
      const y = -h / 2;
      const shape = new THREE.Shape();
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);

      return shape;
    },

    lathe: (points, segments = 42) => {
      const curve = new THREE.SplineCurve(
        points.map(([x, y]) => new THREE.Vector2(x, y))
      );
      // Lathe interpolates linearly between profile points, so smooth the
      // silhouette by sampling the spline instead of feeding corners.
      const sampled = curve.getPoints(48).map((point) => {
        point.x = Math.max(point.x, 0);

        return point;
      });

      return new THREE.LatheGeometry(sampled, segments);
    },

    edges: (geometry, opacity = 0.65) =>
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: PALETTE.lime,
          transparent: true,
          opacity,
        })
      ),
  };
}
