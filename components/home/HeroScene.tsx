"use client";

import { useEffect, useRef } from "react";

import styles from "./HeroScene.module.css";

type Three = typeof import("three");
type Group = InstanceType<Three["Group"]>;

type Pointer = { x: number; y: number };

type SceneDef = {
  group: Group;
  /** Per-frame behaviour while visible. `pointer` is normalized -1..1. */
  update: (elapsed: number, pointer: Pointer) => void;
};

const BG = 0x0a0a09;
const DARK = 0x232720;
const DARK_SOFT = 0x31362c;
const LIME = 0xa3e635;

function lerp(current: number, target: number, ease: number) {
  return current + (target - current) * ease;
}

function makeMaterials(THREE: Three) {
  const dark = () =>
    new THREE.MeshStandardMaterial({
      color: DARK,
      metalness: 0.2,
      roughness: 0.42,
      transparent: true,
    });
  const soft = () =>
    new THREE.MeshStandardMaterial({
      color: DARK_SOFT,
      metalness: 0.15,
      roughness: 0.5,
      transparent: true,
    });
  const lime = (emissiveIntensity = 0.65) =>
    new THREE.MeshStandardMaterial({
      color: LIME,
      emissive: LIME,
      emissiveIntensity,
      metalness: 0.1,
      roughness: 0.4,
      transparent: true,
    });

  return { dark, soft, lime };
}

/** 0 — Shopify stores: a market merchant stand — striped canopy on poles,
 * counter with products, a swinging OPEN sign, and orbiting coins. */
function buildStore(THREE: Three): SceneDef {
  const { dark, soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();
  const stand = new THREE.Group();

  // Ground plinth.
  const ground = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.14, 2.0), dark());
  ground.position.y = -1.45;
  stand.add(ground);

  // Side poles holding the canopy.
  for (const x of [-1.45, 1.45]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 12), soft());
    pole.position.set(x, -0.1, 0.55);
    stand.add(pole);
  }

  // Striped canopy: alternating slats, tilted like a stall roof...
  const canopy = new THREE.Group();
  for (let i = 0; i < 6; i += 1) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.05, 1.5),
      i % 2 === 0 ? lime(0.45) : soft()
    );
    slat.position.x = -1.3 + i * 0.52;
    canopy.add(slat);
  }
  // ...with a scalloped front valance.
  for (let i = 0; i < 6; i += 1) {
    const flap = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.3, 0.04),
      i % 2 === 0 ? lime(0.45) : soft()
    );
    flap.position.set(-1.3 + i * 0.52, -0.16, 0.76);
    flap.rotation.x = 0.12;
    canopy.add(flap);
  }
  canopy.position.set(0, 1.32, 0.18);
  canopy.rotation.x = -0.22;
  stand.add(canopy);

  // Counter: top, front panel.
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.16, 1.3), dark());
  counterTop.position.set(0, -0.5, 0.25);
  const counterFront = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 0.1), soft());
  counterFront.position.set(0, -1.0, 0.78);
  stand.add(counterTop, counterFront);

  // Products on the counter.
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.62), soft());
  crate.position.set(-0.85, -0.2, 0.2);
  crate.rotation.y = 0.3;
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.5, 18), dark());
  jar.position.set(0.15, -0.16, 0.35);
  const limeBox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), lime(0.55));
  limeBox.position.set(0.95, -0.2, 0.15);
  limeBox.rotation.y = 0.5;
  stand.add(crate, jar, limeBox);

  // Hanging sign, swinging from the canopy edge.
  const sign = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.34, 0.05), lime(0.7));
  plate.position.y = -0.45;
  const cordLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.34, 6), soft());
  cordLeft.position.set(-0.24, -0.18, 0);
  const cordRight = cordLeft.clone();
  cordRight.position.x = 0.24;
  sign.add(plate, cordLeft, cordRight);
  sign.position.set(0, 1.06, 0.86);
  stand.add(sign);

  stand.position.y = 0.15;
  group.add(stand);

  // Coins orbiting the stand.
  const coins: InstanceType<Three["Mesh"]>[] = [];
  for (let i = 0; i < 3; i += 1) {
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.05, 24),
      lime(0.85)
    );
    coin.rotation.x = Math.PI / 2.4;
    group.add(coin);
    coins.push(coin);
  }

  return {
    group,
    update: (elapsed, pointer) => {
      stand.rotation.y = Math.sin(elapsed * 0.3) * 0.22 + pointer.x * 0.35;
      stand.rotation.x = pointer.y * 0.12;
      sign.rotation.z = Math.sin(elapsed * 1.6) * (0.12 + Math.abs(pointer.x) * 0.18);
      limeBox.position.y = -0.2 + Math.max(0, Math.sin(elapsed * 1.8)) * 0.18;
      limeBox.rotation.y += 0.01;

      for (const [i, coin] of coins.entries()) {
        const angle = elapsed * 0.7 + (i * Math.PI * 2) / 3;
        coin.position.set(
          Math.cos(angle) * 2.2,
          0.35 + Math.sin(elapsed * 1.1 + i * 2) * 0.55,
          Math.sin(angle) * 1.1
        );
        coin.rotation.z = angle;
      }
    },
  };
}

/** 1 — Meta ads: a climbing bar chart with a rising trend line; bars chase the pointer. */
function buildAds(THREE: Three): SceneDef {
  const { dark, soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();
  const chart = new THREE.Group();

  const board = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.2, 0.06), dark());
  board.position.set(0, 0.25, -0.55);
  chart.add(board);

  const baseline = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.06, 0.4), soft());
  baseline.position.y = -0.95;
  chart.add(baseline);

  const barHeights = [0.5, 0.85, 0.7, 1.15, 1.0, 1.55];
  const bars: { mesh: InstanceType<Three["Mesh"]>; base: number }[] = [];

  for (const [i, base] of barHeights.entries()) {
    const geometry = new THREE.BoxGeometry(0.32, 1, 0.32);
    geometry.translate(0, 0.5, 0);
    const isPeak = i === barHeights.length - 1;
    const mesh = new THREE.Mesh(geometry, isPeak ? lime(0.6) : soft());
    mesh.position.set(-1.25 + i * 0.5, -0.92, 0);
    chart.add(mesh);
    bars.push({ mesh, base });
  }

  // Trend line across the bar tops, ending in an arrow head.
  const points = barHeights.map(
    (height, i) => new THREE.Vector3(-1.25 + i * 0.5, -0.92 + height + 0.28, 0.1)
  );
  points.push(points[points.length - 1].clone().add(new THREE.Vector3(0.45, 0.4, 0)));
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.9 })
  );
  chart.add(line);

  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.34, 16), lime(0.9));
  arrow.position.copy(points[points.length - 1]);
  arrow.rotation.z = -Math.PI / 4;
  chart.add(arrow);

  group.add(chart);

  // A floating ad creative beside the chart, with media area + lime CTA bar.
  const adCard = new THREE.Group();
  const adBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.25, 0.06), soft());
  const adMedia = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.6, 0.07), dark());
  adMedia.position.y = 0.22;
  const adCta = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.16, 0.07), lime(0.6));
  adCta.position.y = -0.42;
  adCard.add(adBody, adMedia, adCta);
  adCard.position.set(-2.2, 0.45, 0.35);
  adCard.rotation.y = 0.45;
  group.add(adCard);

  // A cursor that periodically clicks the ad's CTA.
  const cursor = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.36, 4), lime(0.95));
  cursor.rotation.z = Math.PI * 0.85;
  group.add(cursor);

  // Engagement "+" marks orbiting the chart.
  const plusses: Group[] = [];
  for (let i = 0; i < 2; i += 1) {
    const plus = new THREE.Group();
    const horizontal = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.1), lime(0.8));
    const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.1), lime(0.8));
    plus.add(horizontal, vertical);
    group.add(plus);
    plusses.push(plus);
  }

  return {
    group,
    update: (elapsed, pointer) => {
      chart.rotation.y = Math.sin(elapsed * 0.25) * 0.16 + pointer.x * 0.3;
      chart.rotation.x = pointer.y * 0.12;

      const hovered = Math.min(
        bars.length - 1,
        Math.max(0, Math.floor((pointer.x * 0.5 + 0.5) * bars.length))
      );

      for (const [i, bar] of bars.entries()) {
        const pulse = 0.9 + Math.sin(elapsed * 1.3 + i * 0.9) * 0.08;
        const boost = i === hovered ? 1.3 : 1;
        bar.mesh.scale.y = lerp(bar.mesh.scale.y, bar.base * pulse * boost, 0.12);

        const material = bar.mesh.material as { emissiveIntensity?: number };

        if (material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = i === hovered ? 0.95 : 0.6;
        }
      }

      arrow.position.y = points[points.length - 1].y + Math.sin(elapsed * 2) * 0.06;

      // Ad card drifts; cursor approaches its CTA and "clicks" on a cycle.
      adCard.position.y = 0.45 + Math.sin(elapsed * 0.9) * 0.12;
      adCard.rotation.y = 0.45 + Math.sin(elapsed * 0.5) * 0.08 + pointer.x * 0.15;

      const clickPhase = (elapsed % 2.6) / 2.6;
      const press = clickPhase < 0.12 ? Math.sin((clickPhase / 0.12) * Math.PI) : 0;
      cursor.position.set(
        adCard.position.x + 0.5 - press * 0.1,
        adCard.position.y - 0.5 - press * 0.08,
        0.55
      );
      cursor.scale.setScalar(1 - press * 0.25);

      const ctaMaterial = adCta.material as { emissiveIntensity?: number };

      if (ctaMaterial.emissiveIntensity !== undefined) {
        ctaMaterial.emissiveIntensity = 0.6 + press * 0.8;
      }

      for (const [i, plus] of plusses.entries()) {
        const angle = elapsed * 0.8 + i * Math.PI;
        plus.position.set(
          Math.cos(angle) * 2.4,
          0.4 + Math.sin(elapsed * 1.4 + i * 2.4) * 0.6,
          Math.sin(angle) * 0.8
        );
        plus.rotation.z = elapsed * 0.6 + i;
        const breathe = 0.85 + Math.sin(elapsed * 2 + i * 1.7) * 0.15;
        plus.scale.setScalar(breathe);
      }
    },
  };
}

/** 2 — Email flows: a pointer-chasing dart, pulsing trail, orbiting envelopes. */
function buildEmail(THREE: Three): SceneDef {
  const { soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();

  const dart = new THREE.Group();
  const wingGeometry = new THREE.BufferGeometry();
  wingGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [0, 0, 2.0, -1.1, 0, -0.8, 0, 0.3, -0.5],
      3
    )
  );
  wingGeometry.computeVertexNormals();
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a4034,
    metalness: 0.15,
    roughness: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const wingLeft = new THREE.Mesh(wingGeometry, wingMaterial);
  const wingRight = new THREE.Mesh(wingGeometry.clone(), wingMaterial.clone());
  wingRight.scale.x = -1;
  const keel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 1.6), lime(0.55));
  keel.position.set(0, -0.16, 0.1);
  dart.add(wingLeft, wingRight, keel);
  dart.rotation.set(0.16, -0.5, -0.1);
  dart.position.set(0.5, 0.3, 0);
  group.add(dart);

  const trail: InstanceType<Three["Mesh"]>[] = [];
  for (let i = 0; i < 5; i += 1) {
    const crumb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), lime(0.85));
    group.add(crumb);
    trail.push(crumb);
  }

  const envelopes: Group[] = [];
  for (let i = 0; i < 2; i += 1) {
    const envelope = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.38, 0.05), soft());
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 0.05), lime(0.7));
    flap.position.y = 0.16;
    envelope.add(body, flap);
    group.add(envelope);
    envelopes.push(envelope);
  }

  return {
    group,
    update: (elapsed, pointer) => {
      dart.position.x = lerp(dart.position.x, 0.5 + pointer.x * 0.9, 0.05);
      dart.position.y = lerp(
        dart.position.y,
        0.3 - pointer.y * 0.7 + Math.sin(elapsed * 0.9) * 0.1,
        0.05
      );
      dart.rotation.z = lerp(dart.rotation.z, -0.1 - pointer.x * 0.25, 0.06);

      for (const [i, crumb] of trail.entries()) {
        const lag = (i + 1) * 0.55;
        crumb.position.set(
          dart.position.x - 1.0 - i * 0.5,
          dart.position.y - 0.45 - i * 0.26 + Math.sin(elapsed * 2.4 - lag) * 0.08,
          -0.3 - i * 0.28
        );
        const pulse = 1 + Math.sin(elapsed * 3 - i * 0.9) * 0.3;
        crumb.scale.setScalar(pulse);
      }

      for (const [i, envelope] of envelopes.entries()) {
        const angle = elapsed * 0.55 + i * Math.PI;
        envelope.position.set(
          Math.cos(angle) * 2.1,
          Math.sin(angle * 1.3) * 0.8,
          Math.sin(angle) * 0.9
        );
        envelope.rotation.y = angle * 0.7;
        envelope.rotation.z = Math.sin(elapsed + i) * 0.2;
      }
    },
  };
}

/** 3 — Packaging: a mailer carton whose flaps breathe open while a labelled
 * product rises from inside; a hang tag and tape roll orbit around it. */
function buildPackaging(THREE: Three): SceneDef {
  const { dark, soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();
  const crate = new THREE.Group();

  // Carton body, open at the top.
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.25, 1.7), soft());
  body.position.y = -0.5;
  crate.add(body);

  // A lime tape seam and a label panel on the front face.
  const seam = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.27, 0.04), lime(0.4));
  seam.position.set(0, -0.5, 0.87);
  const label = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.5, 0.03), dark());
  label.position.set(0.42, -0.5, 0.88);
  crate.add(seam, label);

  // Four hinged flaps around the top rim; rotation.x opens them in update().
  const flaps: Group[] = [];
  for (let i = 0; i < 4; i += 1) {
    const hinge = new THREE.Group();
    hinge.rotation.y = (i * Math.PI) / 2;
    const arm = new THREE.Group();
    // Stagger heights slightly so the closed flaps don't z-fight at center.
    arm.position.set(0, 0.12 + i * 0.012, 0.85);
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(1.66, 0.05, 0.85),
      i % 2 === 0 ? soft() : lime(0.35)
    );
    panel.position.z = -0.42;
    arm.add(panel);
    hinge.add(arm);
    crate.add(hinge);
    flaps.push(arm);
  }

  // Product rising out of the box: a bottle with a wrap-around label and cap.
  const product = new THREE.Group();
  const bottle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.34, 0.95, 22),
    dark()
  );
  const wrap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.42, 22, 1, true),
    lime(0.55)
  );
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.22, 18),
    lime(0.7)
  );
  cap.position.y = 0.58;
  product.add(bottle, wrap, cap);
  crate.add(product);

  crate.position.y = 0.1;
  group.add(crate);

  // A hang tag and a roll of packing tape orbiting the carton.
  const tag = new THREE.Group();
  const tagBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.32, 0.04), lime(0.75));
  const tagHole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12),
    dark()
  );
  tagHole.rotation.x = Math.PI / 2;
  tagHole.position.set(-0.16, 0.08, 0);
  tag.add(tagBody, tagHole);
  group.add(tag);

  const tape = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.13, 12, 28), soft());
  group.add(tape);

  return {
    group,
    update: (elapsed, pointer) => {
      crate.rotation.y = Math.sin(elapsed * 0.3) * 0.2 + pointer.x * 0.35;
      crate.rotation.x = pointer.y * 0.12;

      // Flaps breathe open; the product rides up as the box opens.
      const open = 0.5 + Math.sin(elapsed * 0.8) * 0.5;
      for (const flap of flaps) {
        flap.rotation.x = open * 1.25;
      }
      product.position.y = -0.55 + open * 0.95;
      product.rotation.y = elapsed * 0.6;

      const tagAngle = elapsed * 0.7;
      tag.position.set(
        Math.cos(tagAngle) * 2.2,
        0.5 + Math.sin(elapsed * 1.2) * 0.45,
        Math.sin(tagAngle) * 1.0
      );
      tag.rotation.y = tagAngle;
      tag.rotation.z = Math.sin(elapsed * 1.4) * 0.3;

      const tapeAngle = elapsed * 0.6 + Math.PI;
      tape.position.set(
        Math.cos(tapeAngle) * 2.4,
        -0.2 + Math.sin(elapsed * 1.05 + 1.5) * 0.55,
        Math.sin(tapeAngle) * 0.9
      );
      tape.rotation.x = elapsed * 0.8;
      tape.rotation.y = elapsed * 0.5;
    },
  };
}

/** 4 — 3D renders: a hero product spinning on a studio turntable inside a lime
 * wireframe render box, a scan ring resolving up it, and a camera circling. */
function buildRenders(THREE: Three): SceneDef {
  const { dark, soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();
  const studio = new THREE.Group();

  // Turntable pedestal.
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.15, 0.18, 32),
    dark()
  );
  base.position.y = -1.15;
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(0.82, 0.85, 0.12, 32),
    soft()
  );
  platform.position.y = -1.0;
  studio.add(base, platform);

  // Hero product on the turntable — a smooth bottle the render shows off.
  const turntable = new THREE.Group();
  turntable.position.y = -0.94;
  const product = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.42, 0.82, 10, 24),
    soft()
  );
  product.position.y = 0.72;
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.44, 0.26, 26, 1, true),
    lime(0.55)
  );
  band.position.y = 0.66;
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.21, 0.2, 20),
    dark()
  );
  cap.position.y = 1.42;
  turntable.add(product, band, cap);
  studio.add(turntable);

  // Lime wireframe render box framing the product like a 3D viewport.
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6, 2.4, 1.6)),
    new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.85 })
  );
  wire.position.y = -0.1;
  studio.add(wire);

  // A scan ring that resolves up the product, like a render pass.
  const scan = new THREE.Mesh(
    new THREE.TorusGeometry(0.52, 0.025, 8, 36),
    lime(0.95)
  );
  scan.rotation.x = Math.PI / 2;
  studio.add(scan);

  studio.position.y = 0.15;
  group.add(studio);

  // A camera circling the studio, keeping the product framed.
  const camera3d = new THREE.Group();
  const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.52), dark());
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.16, 0.24, 18),
    lime(0.7)
  );
  lens.rotation.x = Math.PI / 2;
  lens.position.z = 0.34;
  const reel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.06, 16),
    soft()
  );
  reel.position.set(0.1, 0.24, -0.05);
  camera3d.add(camBody, lens, reel);
  group.add(camera3d);

  return {
    group,
    update: (elapsed, pointer) => {
      studio.rotation.y = pointer.x * 0.3;
      studio.rotation.x = pointer.y * 0.1;

      // The product spins on the turntable for the render.
      turntable.rotation.y = elapsed * 0.85;

      // Scan ring sweeps up and down the product height.
      const t = Math.sin(elapsed * 1.1) * 0.5 + 0.5;
      scan.position.y = -1.0 + t * 1.85;
      scan.scale.setScalar(0.85 + Math.sin(elapsed * 3) * 0.06);

      // Camera orbits and keeps the product framed.
      const angle = elapsed * 0.5;
      camera3d.position.set(
        Math.cos(angle) * 2.6,
        0.5 + Math.sin(elapsed * 0.8) * 0.35,
        Math.sin(angle) * 1.5
      );
      camera3d.lookAt(0, 0.2, 0);
    },
  };
}

/** 5 — brands: an asterisk brand mark on a plinth, surrounded by the
 * designer's shape language — circle, square, triangle — in parallax depth. */
function buildBrand(THREE: Three): SceneDef {
  const { dark, soft, lime } = makeMaterials(THREE);
  const group = new THREE.Group();

  // The mark: a six-arm asterisk of lime bars over a dark core.
  const mark = new THREE.Group();
  for (let i = 0; i < 3; i += 1) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.9, 0.22), lime(0.6));
    arm.rotation.z = (i * Math.PI) / 3;
    mark.add(arm);
  }
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 24), dark());
  mark.add(hub);
  mark.position.y = 0.35;
  group.add(mark);

  // Plinth under the mark, like a logo on a pedestal.
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.16, 1.5), dark());
  plinth.position.y = -1.25;
  const plinthTop = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.0), soft());
  plinthTop.position.y = -1.0;
  group.add(plinth, plinthTop);

  // Shape language floating at different depths.
  const circle = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.07, 14, 48),
    soft()
  );
  circle.position.set(-1.9, 1.0, -0.6);

  const square = new THREE.Group();
  for (let i = 0; i < 4; i += 1) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.1, 0.1), soft());
    edge.rotation.z = (i * Math.PI) / 2;
    edge.position.set(
      Math.cos((i * Math.PI) / 2 + Math.PI / 2) * 0.38,
      Math.sin((i * Math.PI) / 2 + Math.PI / 2) * 0.38,
      0
    );
    square.add(edge);
  }
  square.position.set(1.95, 0.75, -0.9);

  const triangle = new THREE.Mesh(new THREE.TetrahedronGeometry(0.4, 0), lime(0.75));
  triangle.position.set(-1.55, -0.75, 0.5);

  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 18), lime(0.9));
  dot.position.set(1.7, -0.55, 0.7);

  group.add(circle, square, triangle, dot);
  const shapes = [
    { object: circle, depth: -0.6, baseX: -1.9, baseY: 1.0 },
    { object: square, depth: -0.9, baseX: 1.95, baseY: 0.75 },
    { object: triangle, depth: 0.5, baseX: -1.55, baseY: -0.75 },
    { object: dot, depth: 0.7, baseX: 1.7, baseY: -0.55 },
  ];

  return {
    group,
    update: (elapsed, pointer) => {
      // The mark spins like a rotating logo reveal and leans to the pointer.
      mark.rotation.z = elapsed * 0.4 + pointer.x * 0.3;
      mark.rotation.y = Math.sin(elapsed * 0.5) * 0.35 + pointer.x * 0.4;
      mark.rotation.x = pointer.y * 0.3;
      mark.position.y = 0.35 + Math.sin(elapsed * 0.9) * 0.1;

      // Shapes drift opposite the pointer, scaled by depth, for parallax.
      for (const [i, shape] of shapes.entries()) {
        shape.object.position.x = shape.baseX - pointer.x * shape.depth * 0.9;
        shape.object.position.y =
          shape.baseY + pointer.y * shape.depth * 0.6 + Math.sin(elapsed * 1.1 + i * 1.8) * 0.12;
        shape.object.rotation.z = Math.sin(elapsed * 0.7 + i) * 0.4;
        shape.object.rotation.y = elapsed * 0.3 + i;
      }
    },
  };
}

function initScene(THREE: Three, host: HTMLDivElement, reducedMotion: boolean) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Fog pulls every silhouette toward the page background — no hard edges.
  scene.fog = new THREE.Fog(BG, 7.5, 13.5);

  const camera = new THREE.PerspectiveCamera(
    36,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    40
  );
  camera.position.set(0, 0.1, 8.2);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(LIME, 14, 14);
  rim.position.set(-3.5, 2.2, 3.5);
  scene.add(rim);

  const defs = [
    buildStore(THREE),
    buildAds(THREE),
    buildEmail(THREE),
    buildPackaging(THREE),
    buildRenders(THREE),
    buildBrand(THREE),
  ];

  for (const [index, def] of defs.entries()) {
    def.group.userData.fade = index === 0 ? 1 : 0;
    def.group.visible = index === 0;
    def.group.position.y = 0.1;
    scene.add(def.group);
  }

  let activeIndex = 0;
  const handleWord = (event: Event) => {
    const detail = (event as CustomEvent<{ index: number }>).detail;

    if (typeof detail?.index === "number") {
      activeIndex = detail.index % defs.length;
    }
  };
  window.addEventListener("koala:hero-word", handleWord);

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

  const render = () => {
    const elapsed = clock.getElapsedTime();

    for (const [index, def] of defs.entries()) {
      const group = def.group;
      const target = index === activeIndex ? 1 : 0;
      const fade = group.userData.fade as number;
      const next = reducedMotion ? target : fade + (target - fade) * 0.065;
      group.userData.fade = next;
      group.visible = next > 0.015;

      if (!group.visible) {
        continue;
      }

      const eased = next * next * (3 - 2 * next);
      group.scale.setScalar(0.78 + eased * 0.26);

      if (!reducedMotion) {
        group.position.y = 0.1 + Math.sin(elapsed * 0.7 + index * 2) * 0.1;
        def.update(elapsed, pointer);
      }

      group.traverse((child) => {
        const material = (child as { material?: unknown }).material as
          | (InstanceType<Three["Material"]> & { baseOpacity?: number })
          | undefined;

        if (material && "opacity" in material) {
          if (material.baseOpacity === undefined) {
            material.baseOpacity = material.opacity;
          }

          material.opacity = material.baseOpacity * eased;
        }
      });
    }

    if (!reducedMotion) {
      camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.3 + 0.1 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.1, 0);
    }

    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(render);
  };

  frame = window.requestAnimationFrame(render);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("koala:hero-word", handleWord);
    window.removeEventListener("pointermove", handlePointer);
    resizeObserver.disconnect();

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
 * Hero companion: interactive 3D vignettes (storefront + coins, climbing ad
 * chart, pointer-chasing dart, unboxing carton, render turntable, orbiting
 * brand mark) that crossfade in sync with the cycling headline word. three.js
 * loads lazily on the client.
 */
export function HeroScene() {
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
        cleanup = initScene(THREE, hostRef.current, reducedMotion);
      } catch {
        // WebGL unavailable — the hero simply stays 2D.
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div aria-hidden="true" className={styles.host} ref={hostRef} />;
}
