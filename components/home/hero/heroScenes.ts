import type {
  Addons,
  Kit,
  SceneDef,
  TMesh,
  TObject3D,
  TShape,
  TVector3,
  Three,
} from "./heroKit";
import { PALETTE, ease, lerp, makeKit } from "./heroKit";

/**
 * Something circling the vignette. Orbits are squashed in Z so a satellite
 * never travels further from centre than `radius` — that is what lets each
 * scene declare a reliable worst-case extent for the stage to fit-scale to.
 */
type Orbiter = {
  object: TObject3D;
  radius: number;
  height: number;
  speed: number;
  phase: number;
  bob: number;
  /** Multiplier on the orbit angle for self-rotation; omit to leave rotation alone. */
  spin?: number;
};
/**
 * Satellites ring the model horizontally, so the only place they can meet it is
 * the front/back crossing, where X passes through zero. The squash sets how far
 * they travel in Z at that moment — it has to exceed the subject's half-depth
 * (the models here run ~2 deep) or the props saw straight through the middle of
 * it. Anything below ~0.6 visibly clips.
 */
function driveOrbits(items: Orbiter[], elapsed: number, squash = 0.78) {
    for (const item of items){
        const angle = elapsed * item.speed + item.phase;
        item.object.position.set(Math.cos(angle) * item.radius, item.height + Math.sin(elapsed * 1.05 + item.phase) * item.bob, Math.sin(angle) * item.radius * squash);
        if (item.spin !== undefined) {
            item.object.rotation.y = angle * item.spin;
        }
    }
}
/** Add a mesh plus a lime edge outline of the same geometry, at one position. */
function addOutlined(
  parent: TObject3D,
  kit: Kit,
  mesh: TMesh,
  opacity: number
) {
    const outline = kit.edges(mesh.geometry, opacity);
    outline.position.copy(mesh.position);
    outline.rotation.copy(mesh.rotation);
    parent.add(mesh, outline);
}
/** Two thin bars crossed into a "+" — the engagement glyph. */
function makePlus(THREE: Three, kit: Kit) {
    const plus = new THREE.Group();
    const material = kit.lime(2.0);
    const horizontal = new THREE.Mesh(kit.box(0.34, 0.1, 0.1, 0.03), material);
    const vertical = new THREE.Mesh(kit.box(0.1, 0.34, 0.1, 0.03), material);
    plus.add(horizontal, vertical);
    return plus;
}
/** A small stack of fake text lines, for cards, letters and specimen sheets. */
function addTextLines(
  THREE: Three,
  kit: Kit,
  parent: TObject3D,
  options: {
    count: number;
    width: number;
    y: number;
    z: number;
    gap?: number;
    thickness?: number;
  }
) {
    const gap = options.gap ?? 0.1;
    const thickness = options.thickness ?? 0.035;
    for(let i = 0; i < options.count; i += 1){
        // Ragged right edge so it reads as copy rather than a barcode.
        const width = options.width * (i === options.count - 1 ? 0.55 : 0.82 + i % 2 * 0.18);
        const line = new THREE.Mesh(kit.box(width, thickness, 0.02, 0.01), kit.charcoal());
        line.position.set(-(options.width - width) / 2, options.y - i * gap, options.z);
        parent.add(line);
    }
}
/**
 * A market merchant stand — an open stall, not a building: a counter on a
 * plinth, two poles carrying a striped canopy with a scalloped valance, stock
 * on the counter, a swinging OPEN sign, and commerce props circling it.
 */
export function buildStorefront(THREE: Three, addons: Addons): SceneDef {
  const kit = makeKit(THREE, addons);
  const group = new THREE.Group();
  const stand = new THREE.Group();

  // Ground plinth the stall sits on.
  const plinth = new THREE.Mesh(kit.box(3.3, 0.16, 1.9, 0.05), kit.graphite());
  plinth.position.y = -1.5;
  stand.add(plinth);

  // The two poles carrying the canopy. Nothing encloses the back — an open
  // stall is what separates a stand from a shopfront.
  const POLE_TOP = 1.06;

  for (const x of [-1.42, 1.42]) {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 2.5, 12),
      kit.charcoal()
    );
    pole.position.set(x, POLE_TOP - 1.25, 0.5);
    stand.add(pole);

    const foot = new THREE.Mesh(kit.box(0.24, 0.08, 0.24, 0.03), kit.graphite());
    foot.position.set(x, -1.4, 0.5);
    stand.add(foot);
  }

  // Header beam tying the two poles together. The canopy rests on this rather
  // than floating above the posts.
  const header = new THREE.Mesh(kit.box(3.0, 0.1, 0.16, 0.03), kit.graphite());
  header.position.set(0, POLE_TOP, 0.5);
  stand.add(header);

  // Striped canopy: slats ride a shallow arc so the fabric reads as sagging
  // rather than as a flat lid. Slats overlap slightly so the stripes read as
  // one sheet instead of separate floating tiles.
  const canopy = new THREE.Group();
  const slatCount = 7;
  const slatStep = 2.64 / (slatCount - 1);

  for (let i = 0; i < slatCount; i += 1) {
    const t = i / (slatCount - 1);
    const x = -1.32 + t * 2.64;
    const drop = Math.cos((t - 0.5) * 2.1) * 0.1 - 0.1;
    const limeStripe = i % 2 === 0;

    const slat = new THREE.Mesh(
      kit.box(slatStep + 0.04, 0.07, 1.5, 0.03),
      limeStripe ? kit.lime(0.8) : kit.charcoal()
    );
    slat.position.set(x, drop, 0);
    slat.rotation.z = -(t - 0.5) * 0.2;
    canopy.add(slat);

    // Scalloped valance hanging off the leading edge.
    const flap = new THREE.Mesh(
      kit.box(slatStep + 0.02, 0.28, 0.05, 0.05),
      limeStripe ? kit.lime(0.8) : kit.charcoal()
    );
    flap.position.set(x, drop - 0.16, 0.74);
    flap.rotation.x = 0.14;
    canopy.add(flap);
  }

  // Sits on the header beam, at the poles' own depth.
  canopy.position.set(0, POLE_TOP + 0.09, 0.5);
  canopy.rotation.x = -0.16;
  stand.add(canopy);

  // Counter: a top slab and a front panel with a lime kick rail.
  const counterTop = new THREE.Mesh(kit.box(3.0, 0.16, 1.25, 0.04), kit.charcoal());
  counterTop.position.set(0, -0.52, 0.2);
  const counterFront = new THREE.Mesh(kit.box(2.86, 0.84, 0.12, 0.04), kit.graphite());
  counterFront.position.set(0, -0.98, 0.76);
  // Stands proud of the front panel — level with it, the two faces z-fight.
  const kickRail = new THREE.Mesh(kit.box(2.5, 0.09, 0.07, 0.03), kit.lime(0.9));
  kickRail.position.set(0, -0.68, 0.87);
  stand.add(counterTop, counterFront, kickRail);

  // Stock laid out on the counter.
  const crate = new THREE.Mesh(kit.box(0.6, 0.4, 0.6, 0.05), kit.bone());
  crate.position.set(-0.92, -0.24, 0.16);
  crate.rotation.y = 0.3;
  const crateBand = new THREE.Mesh(kit.box(0.62, 0.08, 0.62, 0.03), kit.lime(0.9));
  crateBand.position.copy(crate.position);
  crateBand.position.y = -0.12;
  crateBand.rotation.y = 0.3;

  const jar = new THREE.Mesh(
    kit.lathe([
      [0, -0.26],
      [0.17, -0.26],
      [0.19, -0.1],
      [0.17, 0.12],
      [0.1, 0.2],
      [0.1, 0.26],
      [0, 0.26],
    ], 20),
    kit.glass()
  );
  jar.position.set(0.16, -0.18, 0.3);

  const limeBox = new THREE.Mesh(kit.box(0.38, 0.38, 0.38, 0.05), kit.lime(1));
  limeBox.position.set(0.98, -0.25, 0.12);
  limeBox.rotation.y = 0.5;
  stand.add(crate, crateBand, jar, limeBox);

  // Hanging OPEN sign. Parented to the canopy and pivoting from its own origin,
  // so the cords stay fixed to the leading edge however the canopy is posed.
  const sign = new THREE.Group();
  const plate = new THREE.Mesh(
    kit.extrude(kit.rect(0.66, 0.3, 0.05), 0.06, 0.015),
    kit.lime(1.2)
  );
  plate.position.y = -0.5;

  for (const x of [-0.23, 0.23]) {
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.36, 6),
      kit.charcoal()
    );
    // Hangs from y = 0 down to the plate's top edge.
    cord.position.set(x, -0.18, 0);
    sign.add(cord);
  }

  sign.add(plate);
  sign.position.set(0, -0.16, 0.6);
  canopy.add(sign);

  stand.position.y = 0.16;
  group.add(stand);

  // Commerce props circling the stall.
  const card = new THREE.Group();
  const cardBody = new THREE.Mesh(
    kit.extrude(kit.rect(0.66, 0.86, 0.06), 0.06, 0.016),
    kit.bone()
  );
  const cardMedia = new THREE.Mesh(kit.box(0.52, 0.4, 0.03, 0.02), kit.ink());
  cardMedia.position.set(0, 0.16, 0.05);
  const cardCta = new THREE.Mesh(kit.box(0.52, 0.11, 0.03, 0.02), kit.lime(1.2));
  cardCta.position.set(0, -0.3, 0.05);
  card.add(cardBody, cardMedia, cardCta);
  addTextLines(THREE, kit, card, { count: 2, width: 0.5, y: -0.08, z: 0.05, gap: 0.1 });
  group.add(card);

  const bag = new THREE.Group();
  const bagBody = new THREE.Mesh(kit.box(0.44, 0.52, 0.26, 0.04), kit.kraft());
  const bagTape = new THREE.Mesh(kit.box(0.46, 0.08, 0.28, 0.03), kit.lime(0.9));
  bagTape.position.y = 0.16;
  const bagHandle = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.016, 8, 18, Math.PI),
    kit.charcoal()
  );
  bagHandle.position.y = 0.26;
  bag.add(bagBody, bagTape, bagHandle);
  group.add(bag);

  // Two satellites, not a swarm: the stall is the subject and every extra prop
  // crossing it just reads as clutter.
  const orbiters: Orbiter[] = [
    { object: card, radius: 2.2, height: 0.62, speed: 0.5, phase: 0.2, bob: 0.3 },
    { object: bag, radius: 2.12, height: -0.55, speed: 0.44, phase: 3.6, bob: 0.26, spin: 0.8 },
  ];

  return {
    group,
    // Widest orbit plus the prop's own half-width, so the props clear the
    // 3.3-wide plinth and the stall still dominates the frame.
    radius: 2.5,
    update: (elapsed, pointer) => {
      stand.rotation.y = Math.sin(elapsed * 0.28) * 0.2 + pointer.x * 0.34;
      stand.rotation.x = pointer.y * 0.1;

      sign.rotation.z = Math.sin(elapsed * 1.5) * (0.1 + Math.abs(pointer.x) * 0.16);

      // The lime crate hops on the counter, so the stall never reads as static.
      limeBox.position.y = -0.25 + Math.max(0, Math.sin(elapsed * 1.8)) * 0.16;
      limeBox.rotation.y += 0.01;

      driveOrbits(orbiters, elapsed);

      // Cards stay legible: face front rather than tumbling.
      card.rotation.y = Math.sin(elapsed * 0.5) * 0.25;
      card.rotation.z = Math.sin(elapsed * 0.9) * 0.08;
    },
  };
}
export function buildAds(THREE: Three, addons: Addons): SceneDef {
    const kit = makeKit(THREE, addons);
    const group = new THREE.Group();
    const board = new THREE.Group();
    // Glass dashboard slab with a lime outline.
    const slab = new THREE.Mesh(kit.box(2.74, 1.94, 0.1, 0.05), kit.glass());
    slab.position.set(0, 0.16, -0.4);
    addOutlined(board, kit, slab, 0.5);
    const header = new THREE.Mesh(kit.box(2.3, 0.06, 0.03, 0.02), kit.lime(1.5));
    header.position.set(0, 0.98, -0.33);
    board.add(header);
    for (const [i, x] of [
        -0.92,
        -0.62,
        -0.32
    ].entries()){
        const chip = new THREE.Mesh(kit.box(0.2, 0.07, 0.03, 0.02), i === 0 ? kit.lime(1.2) : kit.charcoal());
        chip.position.set(x, 0.82, -0.33);
        board.add(chip);
    }
    const baseline = new THREE.Mesh(kit.box(2.34, 0.06, 0.3, 0.02), kit.charcoal());
    baseline.position.set(0, -0.8, -0.2);
    board.add(baseline);
    // Bars grow from the baseline; the emissive cap is a sibling that rides the
    // top so it never stretches with the bar's scale.
    const barHeights = [
        0.44,
        0.74,
        0.6,
        0.98,
        0.84,
        1.32
    ];
    const bars: { mesh: TMesh; cap: TMesh; base: number }[] = [];
    const barBase = -0.77;
    for (const [i, base] of barHeights.entries()){
        const geometry = kit.box(0.3, 1, 0.3, 0.04);
        geometry.translate(0, 0.5, 0);
        const isPeak = i === barHeights.length - 1;
        const mesh = new THREE.Mesh(geometry, isPeak ? kit.lime(1.1) : kit.graphite());
        mesh.position.set(-1.2 + i * 0.48, barBase, -0.2);
        const cap = new THREE.Mesh(kit.box(0.32, 0.05, 0.32, 0.02), kit.lime(2.1));
        cap.position.set(mesh.position.x, barBase + base, -0.2);
        board.add(mesh, cap);
        bars.push({
            mesh,
            cap,
            base
        });
    }
    // Trend tube over the bar tops, running off the top-right corner.
    const trendPoints = barHeights.map((height, i)=>new THREE.Vector3(-1.2 + i * 0.48, barBase + height + 0.2, 0.02));
    trendPoints.push(trendPoints[trendPoints.length - 1].clone().add(new THREE.Vector3(0.42, 0.34, 0)));
    const trendCurve = new THREE.CatmullRomCurve3(trendPoints, false, "catmullrom", 0.4);
    const trend = new THREE.Mesh(new THREE.TubeGeometry(trendCurve, 60, 0.024, 8, false), kit.lime(2.4));
    board.add(trend);
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 16), kit.lime(2.4));
    const arrowBase = trendPoints[trendPoints.length - 1].clone();
    arrow.position.copy(arrowBase);
    arrow.rotation.z = -Math.PI / 4;
    board.add(arrow);
    // KPI tile floating off the panel's left edge.
    const kpi = new THREE.Group();
    const kpiBody = new THREE.Mesh(kit.extrude(kit.rect(0.84, 0.56, 0.06), 0.07, 0.016), kit.bone());
    const kpiBar = new THREE.Mesh(kit.box(0.46, 0.12, 0.03, 0.02), kit.lime(1.9));
    kpiBar.position.set(-0.12, 0.13, 0.05);
    kpi.add(kpiBody, kpiBar);
    addTextLines(THREE, kit, kpi, {
        count: 2,
        width: 0.56,
        y: -0.08,
        z: 0.05,
        gap: 0.13
    });
    kpi.position.set(-1.72, 0.86, 0.34);
    kpi.rotation.y = 0.34;
    group.add(kpi);
    group.add(board);
    // Phone running the ad creative.
    const phone = new THREE.Group();
    const phoneBody = new THREE.Mesh(kit.box(0.68, 1.3, 0.1, 0.07), kit.graphite());
    const phoneScreen = new THREE.Mesh(kit.box(0.58, 1.16, 0.03, 0.04), kit.ink());
    phoneScreen.position.z = 0.06;
    const phoneMedia = new THREE.Mesh(kit.box(0.5, 0.52, 0.02, 0.02), kit.charcoal());
    phoneMedia.position.set(0, 0.28, 0.08);
    const phoneCta = new THREE.Mesh(kit.box(0.5, 0.14, 0.02, 0.02), kit.lime(1.9));
    phoneCta.position.set(0, -0.36, 0.08);
    phone.add(phoneBody, phoneScreen, phoneMedia, phoneCta);
    addTextLines(THREE, kit, phone, {
        count: 2,
        width: 0.46,
        y: -0.08,
        z: 0.08,
        gap: 0.1
    });
    phone.position.set(1.86, 0.32, 0.5);
    phone.rotation.y = -0.42;
    group.add(phone);
    const cursor = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.32, 5), kit.lime(2.3));
    cursor.rotation.z = Math.PI * 0.86;
    group.add(cursor);
    // An impression counter orbiting the dashboard: a tapered slab, wide face
    // forward, reading as a rising bid rather than a social reaction.
    const wedgeShape = new THREE.Shape();
    wedgeShape.moveTo(-0.26, -0.17);
    wedgeShape.lineTo(0.26, -0.17);
    wedgeShape.lineTo(0.16, 0.17);
    wedgeShape.lineTo(-0.16, 0.17);
    wedgeShape.lineTo(-0.26, -0.17);
    const wedge = new THREE.Mesh(kit.extrude(wedgeShape, 0.11, 0.02), kit.lime(2.1));
    group.add(wedge);
    const plusA = makePlus(THREE, kit);
    group.add(plusA);
    const orbiters = [
        {
            object: wedge,
            radius: 2.15,
            height: 0.9,
            speed: 0.62,
            phase: 0.6,
            bob: 0.32
        },
        {
            object: plusA,
            radius: 2.22,
            height: -0.55,
            speed: 0.7,
            phase: 2.6,
            bob: 0.36
        }
    ];
    return {
        group,
        radius: 2.5,
        update: (elapsed, pointer)=>{
            board.rotation.y = Math.sin(elapsed * 0.22) * 0.14 + pointer.x * 0.28;
            board.rotation.x = pointer.y * 0.1;
            // The bar nearest the pointer lifts and brightens.
            const hovered = Math.min(bars.length - 1, Math.max(0, Math.floor((pointer.x * 0.5 + 0.5) * bars.length)));
            for (const [i, bar] of bars.entries()){
                const pulse = 0.92 + Math.sin(elapsed * 1.25 + i * 0.85) * 0.07;
                const boost = i === hovered ? 1.26 : 1;
                const target = bar.base * pulse * boost;
                bar.mesh.scale.y = lerp(bar.mesh.scale.y, target, 0.11);
                bar.cap.position.y = barBase + bar.mesh.scale.y;
                const capMaterial = bar.cap.material as { emissiveIntensity?: number };
                if (capMaterial.emissiveIntensity !== undefined) {
                    capMaterial.emissiveIntensity = i === hovered ? 3.2 : 2.1;
                }
            }
            arrow.position.y = arrowBase.y + Math.sin(elapsed * 2) * 0.055;
            phone.position.y = 0.32 + Math.sin(elapsed * 0.85) * 0.13;
            phone.rotation.y = -0.42 + Math.sin(elapsed * 0.48) * 0.09 + pointer.x * 0.12;
            // Cursor drops onto the CTA on a loop and the button flares on contact.
            const clickPhase = elapsed % 2.8 / 2.8;
            const press = clickPhase < 0.12 ? Math.sin(clickPhase / 0.12 * Math.PI) : 0;
            cursor.position.set(phone.position.x + 0.34 - press * 0.08, phone.position.y - 0.46 - press * 0.07, 0.72);
            cursor.scale.setScalar(1 - press * 0.22);
            const ctaMaterial = phoneCta.material;
            if (ctaMaterial.emissiveIntensity !== undefined) {
                ctaMaterial.emissiveIntensity = 1.9 + press * 2.4;
            }
            driveOrbits(orbiters, elapsed);
            wedge.rotation.z = Math.sin(elapsed * 1.2) * 0.2;
            wedge.scale.setScalar(0.92 + Math.sin(elapsed * 2.4) * 0.08);
            plusA.rotation.z = elapsed * 0.7;
        }
    };
}
export function buildEmailFlow(THREE: Three, addons: Addons): SceneDef {
    const kit = makeKit(THREE, addons);
    const group = new THREE.Group();
    const mail = new THREE.Group();
    // Envelope body with a recessed interior.
    const body = new THREE.Mesh(kit.box(1.56, 1.04, 0.16, 0.04), kit.bone());
    const cavity = new THREE.Mesh(kit.box(1.44, 0.92, 0.04, 0.02), kit.charcoal());
    cavity.position.z = 0.07;
    mail.add(body, cavity);
    // Letter rides up out of the envelope as the flap opens.
    const letter = new THREE.Group();
    const sheet = new THREE.Mesh(kit.box(1.32, 0.9, 0.03, 0.02), kit.bone());
    const sheetHeader = new THREE.Mesh(kit.box(1.06, 0.13, 0.02, 0.02), kit.lime(1.9));
    sheetHeader.position.set(0, 0.28, 0.03);
    letter.add(sheet, sheetHeader);
    addTextLines(THREE, kit, letter, {
        count: 3,
        width: 1.02,
        y: 0.06,
        z: 0.03,
        gap: 0.15
    });
    letter.position.set(0, 0, 0.02);
    mail.add(letter);
    // Triangular flap on a hinge at the top edge.
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-0.78, 0);
    flapShape.lineTo(0.78, 0);
    flapShape.lineTo(0, -0.58);
    flapShape.lineTo(-0.78, 0);
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.52, 0.08);
    const flap = new THREE.Mesh(new THREE.ExtrudeGeometry(flapShape, {
        depth: 0.05,
        bevelEnabled: true,
        bevelSize: 0.012,
        bevelThickness: 0.012,
        bevelSegments: 1
    }), kit.bone());
    const flapSeam = new THREE.Mesh(kit.box(0.3, 0.05, 0.04, 0.02), kit.lime(1.4));
    flapSeam.position.set(0, -0.2, 0.06);
    hinge.add(flap, flapSeam);
    mail.add(hinge);
    mail.position.set(-0.62, -0.42, 0);
    group.add(mail);
    // Automation graph: nodes wired into a branch, with pulses running the wires.
    const flow = new THREE.Group();
    const nodePositions: [number, number, number][] = [
        [
            -0.5,
            0.72,
            0.1
        ],
        [
            0.42,
            1.16,
            0.1
        ],
        [
            1.36,
            1.52,
            0.1
        ],
        [
            1.3,
            0.6,
            0.1
        ],
        [
            2.06,
            0.06,
            0.1
        ]
    ];
    const nodes: TMesh[] = [];
    for (const [i, position] of nodePositions.entries()){
        const node = new THREE.Mesh(kit.box(0.26, 0.26, 0.26, 0.05), i === 0 ? kit.lime(1.5) : kit.graphite());
        node.position.set(...position);
        addOutlined(flow, kit, node, 0.55);
        nodes.push(node);
    }
    const wires: [number, number][] = [
        [
            0,
            1
        ],
        [
            1,
            2
        ],
        [
            1,
            3
        ],
        [
            3,
            4
        ]
    ];
    const pulses: { mesh: TMesh; from: TVector3; to: TVector3; phase: number }[] = [];
    for (const [i, [from, to]] of wires.entries()){
        const start = new THREE.Vector3(...nodePositions[from]);
        const end = new THREE.Vector3(...nodePositions[to]);
        const wire = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            start,
            end
        ]), kit.line(0.4));
        flow.add(wire);
        const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 14), kit.lime(2.6));
        flow.add(pulse);
        pulses.push({
            mesh: pulse,
            from: start,
            to: end,
            phase: i * 0.24
        });
    }
    group.add(flow);

    // A folded paper dart. Real paper planes are flat panels creased along a
    // centre fold, so this is built from thin sheets rather than the chamfered
    // solids the rest of the set uses — anything bevelled reads as an arrow.
    //
    // `plane` only ever carries the heading; the sheets inside it are authored
    // nose-along-+Z, which is the axis the flight code aims.
    const plane = new THREE.Group();
    const paper = kit.bone();

    /** Thin flat sheet from a 2D outline — no bevel, so the edges stay crisp. */
    const foldSheet = (shape: TShape) =>
        new THREE.ExtrudeGeometry(shape, {
            depth: 0.014,
            bevelEnabled: false,
            curveSegments: 1,
        });

    // Wing panel, authored looking down on it: nose on the fold at the front,
    // a long swept leading edge out to the tip, then the trailing edge back in.
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.68);
    wingShape.lineTo(0.54, -0.34);
    wingShape.lineTo(0.12, -0.28);
    wingShape.closePath();

    const wingGeometry = foldSheet(wingShape);
    // Lay the sheet flat: authored +Y (nose) becomes world +Z, span stays X.
    wingGeometry.rotateX(Math.PI / 2);

    for (const side of [1, -1]) {
        const wing = new THREE.Mesh(wingGeometry, paper);
        // Mirror across the fold, then lift the tip: rotating about Z (the fold
        // axis) after the mirror gives both wings the same upward dihedral.
        wing.scale.x = side;
        wing.rotation.z = side * 0.24;
        plane.add(wing);
    }

    // Keel: the folded strip hanging under the tail that you hold to throw it.
    const keelShape = new THREE.Shape();
    keelShape.moveTo(0.66, 0);
    keelShape.lineTo(-0.3, 0);
    keelShape.lineTo(-0.3, -0.19);
    keelShape.closePath();

    const keelGeometry = foldSheet(keelShape);
    // Stand it up in the centre plane: authored +X (nose) becomes world +Z.
    keelGeometry.rotateY(-Math.PI / 2);
    keelGeometry.translate(0.007, 0, 0);
    plane.add(new THREE.Mesh(keelGeometry, paper));

    // A faint lime crease along each fold ties it to the palette without
    // turning the plane into a glowing dart.
    for (const side of [1, -1]) {
        const crease = kit.edges(wingGeometry, 0.3);
        crease.scale.x = side;
        crease.rotation.z = side * 0.24;
        plane.add(crease);
    }

    group.add(plane);

    // Three chamfered chips shedding behind it, sized down along the path — the
    // stage has no bloom, so the wake has to be geometry rather than glow.
    const trail: TMesh[] = [];

    for (let i = 0; i < 3; i += 1) {
        const chip = new THREE.Mesh(kit.box(0.1, 0.1, 0.1, 0.03), kit.lime(1.4));
        trail.push(chip);
        group.add(chip);
    }

    /** The dart's flight path: a wide ellipse that also rises and dips. */
    const flightAt = (t: number, out: TVector3) =>
        out.set(
            Math.cos(t) * 1.66,
            0.34 + Math.sin(t * 2) * 0.44,
            Math.sin(t) * 0.95
        );

    /**
     * Lap time (0..1) to path angle, with the speed swelling and easing off
     * instead of running at a constant rate: it slows through the near side of
     * the arc and accelerates away round the back.
     *
     * Note this is a sine reparameterisation rather than a cubic Bézier —
     * derivative at the wrap has to match (here it is 1 - SWING at both ends),
     * and a Bézier ease would restart from a different speed every lap, which
     * shows up as a hitch each time round.
     */
    const SWING = 0.78;
    const lapAngle = (lap: number) =>
        (lap + (SWING / (Math.PI * 2)) * (Math.cos(lap * Math.PI * 2) - 1)) *
        Math.PI * 2;

    const LAP_SECONDS = 12;
    const planeAt = new THREE.Vector3();
    const planeNext = new THREE.Vector3();
    const heading = new THREE.Vector3();
    const NOSE = new THREE.Vector3(0, 0, 1);

    return {
        group,
        // The flight path is the widest thing here.
        radius: 1.95,
        update: (elapsed, pointer)=>{
            group.rotation.y = Math.sin(elapsed * 0.24) * 0.16 + pointer.x * 0.3;
            group.rotation.x = pointer.y * 0.1;

            // Fly the path, then aim the nose down the tangent by sampling a
            // moment ahead — cheaper and steadier than differentiating it.
            const lap = (elapsed / LAP_SECONDS) % 1;
            const t = lapAngle(lap);
            flightAt(t, planeAt);
            flightAt(lapAngle((lap + 0.004) % 1), planeNext);
            plane.position.copy(planeAt);
            // Orient in local space: lookAt would read the target as a world
            // point and so drift with the parent group's own rotation.
            heading.subVectors(planeNext, planeAt).normalize();
            plane.quaternion.setFromUnitVectors(NOSE, heading);
            // Bank into the turn, around the heading axis.
            plane.rotateZ(Math.sin(t) * 0.45);

            for (const [i, chip] of trail.entries()) {
                // Trail behind along the flown path, so the chips bunch up as
                // the dart slows and string out as it accelerates.
                flightAt(lapAngle((lap - (i + 1) * 0.012 + 1) % 1), planeAt);
                chip.position.copy(planeAt);
                chip.rotation.set(elapsed * 0.9 + i, elapsed * 0.7 + i, 0);
                chip.scale.setScalar(0.85 - i * 0.22);
            }
            // Flap opens and the letter rises with it.
            const open = 0.5 + Math.sin(elapsed * 0.72) * 0.5;
            hinge.rotation.x = open * 2.3;
            letter.position.y = -0.05 + ease(open) * 0.86;
            letter.rotation.z = Math.sin(elapsed * 0.9) * 0.03;
            for (const pulse of pulses){
                const t = (elapsed * 0.44 + pulse.phase) % 1;
                pulse.mesh.position.lerpVectors(pulse.from, pulse.to, t);
                // Fade in and out at the wire ends by scaling, so the crossfade's own
                // opacity pass stays authoritative.
                pulse.mesh.scale.setScalar(Math.sin(t * Math.PI) * 1.1 + 0.05);
            }
            for (const [i, node] of nodes.entries()){
                node.rotation.y = elapsed * 0.4 + i;
                node.scale.setScalar(0.94 + Math.sin(elapsed * 1.9 + i * 1.3) * 0.08);
            }
        }
    };
}
/**
 * A packaging family staged like a product shot: jar, tube, dropper bottle and
 * carton stepped across risers so the silhouette reads at four different
 * heights, each carrying the same lime label system.
 */
/** Clearance every label shell keeps off the product wall it wraps. */
const LABEL_CLEARANCE = 0.016;

export function buildLabel(THREE: Three, addons: Addons): SceneDef {
  const kit = makeKit(THREE, addons);
  const group = new THREE.Group();
  const set = new THREE.Group();

  /* ---------- Risers ---------- */

  // Base slab everything stands on.
  const slab = new THREE.Mesh(kit.box(3.3, 0.22, 1.55, 0.04), kit.graphite());
  slab.position.set(0.05, -1.34, 0.1);
  set.add(slab);

  // Two blocks that lift half the family, the way a product shot stages depth.
  const riserBack = new THREE.Mesh(kit.box(1.34, 0.62, 0.9, 0.04), kit.charcoal());
  riserBack.position.set(-0.98, -0.92, -0.26);
  const riserMid = new THREE.Mesh(kit.box(0.92, 0.32, 0.8, 0.04), kit.charcoal());
  riserMid.position.set(-0.18, -1.07, 0.2);
  set.add(riserBack, riserMid);

/**
 * Wraps a label around a product. `bodyRadius` is the wall the label sits on —
 * everything is offset off it by a real clearance, because a shell only a few
 * thousandths proud of a curved wall z-fights into stripes at this scale.
 */
  const wrapLabel = (
    parent: TObject3D,
    bodyRadius: number,
    y: number,
    height: number
  ) => {
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(
        bodyRadius + LABEL_CLEARANCE,
        bodyRadius + LABEL_CLEARANCE,
        height,
        32,
        1,
        true
      ),
      kit.lime(1.6)
    );
    band.position.y = y;
    parent.add(band);

    // Sits clear below the band, and further out again, so neither shell can
    // ever share a surface with the other or with the body.
    const rule = new THREE.Mesh(
      new THREE.CylinderGeometry(
        bodyRadius + LABEL_CLEARANCE * 2,
        bodyRadius + LABEL_CLEARANCE * 2,
        0.022,
        32,
        1,
        true
      ),
      kit.ink()
    );
    rule.position.y = y - height / 2 - 0.04;
    parent.add(rule);
  };

  /* ---------- 01 — Jar, on the mid riser ---------- */

  const jar = new THREE.Group();
  const jarBody = new THREE.Mesh(
    kit.lathe([
      [0, 0],
      [0.4, 0],
      [0.43, 0.06],
      [0.43, 0.42],
      [0.41, 0.5],
      [0, 0.5],
    ], 34),
    kit.glass()
  );
  const jarLid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.44, 0.2, 34),
    kit.graphite()
  );
  jarLid.position.y = 0.58;
  jar.add(jarBody, jarLid);
  wrapLabel(jar, 0.43, 0.24, 0.3);
  jar.position.set(-0.18, -0.91, 0.2);
  set.add(jar);

  /* ---------- 02 — Tube, tallest of the front row ---------- */

  const tube = new THREE.Group();
  const tubeBody = new THREE.Mesh(
    kit.lathe([
      [0, 0],
      [0.2, 0.02],
      [0.22, 0.16],
      [0.22, 0.92],
      [0.19, 1.02],
      [0, 1.04],
    ], 28),
    kit.bone()
  );
  // Crimped seam across the foot, which is what makes it read as a tube.
  const crimp = new THREE.Mesh(kit.box(0.42, 0.1, 0.05, 0.02), kit.charcoal());
  crimp.position.y = 0.02;
  const tubeCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.11, 0.16, 22),
    kit.graphite()
  );
  tubeCap.position.y = 1.1;
  tube.add(tubeBody, crimp, tubeCap);
  wrapLabel(tube, 0.22, 0.52, 0.44);
  tube.position.set(0.62, -1.22, 0.44);
  set.add(tube);

  /* ---------- 03 — Dropper bottle, front right ---------- */

  const dropper = new THREE.Group();
  const dropperBody = new THREE.Mesh(
    kit.lathe([
      [0, 0],
      [0.24, 0],
      [0.26, 0.06],
      [0.26, 0.68],
      [0.2, 0.78],
      [0.11, 0.86],
      [0.11, 0.94],
      [0, 0.94],
    ], 30),
    kit.glass()
  );
  const dropperOil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.46, 26),
    kit.liquid()
  );
  dropperOil.position.y = 0.3;
  const dropperCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.125, 0.125, 0.14, 22),
    kit.graphite()
  );
  dropperCollar.position.y = 1.0;
  const dropperBulb = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.085, 0.24, 18),
    kit.graphite()
  );
  dropperBulb.position.y = 1.18;
  dropper.add(dropperBody, dropperOil, dropperCollar, dropperBulb);
  wrapLabel(dropper, 0.26, 0.34, 0.4);
  dropper.position.set(1.28, -1.22, 0.3);
  set.add(dropper);

  /* ---------- 04 — Carton, standing on the back riser ---------- */

  const carton = new THREE.Group();
  const cartonBody = new THREE.Mesh(kit.box(0.62, 1.42, 0.42, 0.02), kit.bone());
  const cartonEdges = kit.edges(kit.box(0.62, 1.42, 0.42, 0.02), 0.4);
  const cartonPanel = new THREE.Mesh(kit.box(0.44, 0.3, 0.02, 0.01), kit.lime(1.6));
  cartonPanel.position.set(0, 0.22, 0.226);
  carton.add(cartonBody, cartonEdges, cartonPanel);
  addTextLines(THREE, kit, carton, {
    count: 3,
    width: 0.4,
    y: -0.12,
    z: 0.226,
    gap: 0.11,
    thickness: 0.03,
  });
  carton.position.set(-0.98, 0.1, -0.26);
  carton.rotation.y = 0.32;
  set.add(carton);

  set.position.y = 0.18;
  group.add(set);

  /* ---------- A single spec sheet, propped behind the set ---------- */

  const sheet = new THREE.Group();
  const sheetGeometry = kit.box(1.1, 0.82, 0.03, 0.01);
  sheet.add(new THREE.Mesh(sheetGeometry, kit.charcoal()), kit.edges(sheetGeometry, 0.45));
  const sheetSwatch = new THREE.Mesh(kit.box(0.34, 0.16, 0.02, 0.01), kit.lime(1.5));
  sheetSwatch.position.set(-0.3, 0.22, 0.03);
  sheet.add(sheetSwatch);
  addTextLines(THREE, kit, sheet, {
    count: 3,
    width: 0.6,
    y: -0.02,
    z: 0.03,
    gap: 0.12,
    thickness: 0.03,
  });
  // Propped opposite the carton, so the two tall elements bracket the row.
  sheet.position.set(1.32, 0.52, -0.55);
  sheet.rotation.set(-0.08, -0.4, -0.06);
  group.add(sheet);

  const products: { object: TObject3D; base: number; phase: number }[] = [
    { object: jar, base: -0.91, phase: 0.4 },
    { object: tube, base: -1.22, phase: 1.7 },
    { object: dropper, base: -1.22, phase: 3.1 },
    { object: carton, base: 0.1, phase: 4.6 },
  ];

  return {
    group,
    // The lineup is wide and static, so the built geometry sets the extent.
    radius: 1.75,
    update: (elapsed, pointer) => {
      // The whole set turns as one, like a rotating product platform.
      set.rotation.y = Math.sin(elapsed * 0.24) * 0.18 + pointer.x * 0.32;
      set.rotation.x = pointer.y * 0.09;

      // Each product breathes on its own phase so the row never looks welded.
      for (const product of products) {
        product.object.position.y =
          product.base + Math.sin(elapsed * 0.9 + product.phase) * 0.035;
      }

      jar.rotation.y = Math.sin(elapsed * 0.5) * 0.2;
      dropper.rotation.y = -Math.sin(elapsed * 0.44 + 1) * 0.24;

      sheet.rotation.y = -0.4 + Math.sin(elapsed * 0.4) * 0.1 - pointer.x * 0.2;
      sheet.position.y = 0.52 + Math.sin(elapsed * 0.8) * 0.06;
    },
  };
}
export function buildRenders(THREE: Three, addons: Addons): SceneDef {
    const kit = makeKit(THREE, addons);
    const group = new THREE.Group();
    const studio = new THREE.Group();
    // Turntable.
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 1.12, 0.16, 40), kit.graphite());
    base.position.y = -1.18;
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.84, 0.12, 40), kit.charcoal());
    platform.position.y = -1.04;
    studio.add(base, platform);
    // Hero product being rendered.
    const turntable = new THREE.Group();
    turntable.position.y = -0.98;
    // Tall wine bottle: wide punted base, a long shoulder taper into a slim
    // neck, finished with a flared lip.
    const product = new THREE.Mesh(kit.lathe([
        [0.0, 0.0],
        [0.38, 0.0],
        [0.42, 0.06],
        [0.42, 0.92],
        [0.4, 1.06],
        [0.3, 1.24],
        [0.19, 1.44],
        [0.15, 1.7],
        [0.15, 2.16],
        [0.17, 2.24],
        [0.16, 2.3],
        [0.0, 2.3]
    ]), kit.glass());
    // Waist label, sitting on the straight part of the barrel.
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.435, 0.435, 0.5, 34, 1, true), kit.lime(1.9));
    band.position.y = 0.5;
    // Foil capsule over the cork.
    const productCap = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.3, 22), kit.graphite());
    productCap.position.y = 2.12;
    turntable.add(product, band, productCap);
    studio.add(turntable);
    // Axis gizmo at the turntable's near-bottom corner.
    const gizmo = new THREE.Group();
    for (const [axis, color] of [
        [
            "x",
            PALETTE.lime
        ],
        [
            "y",
            PALETTE.panel
        ],
        [
            "z",
            PALETTE.soft
        ]
    ] as const){
        const arm = new THREE.Mesh(kit.box(axis === "x" ? 0.34 : 0.05, axis === "y" ? 0.34 : 0.05, axis === "z" ? 0.34 : 0.05, 0.02), new THREE.MeshPhysicalMaterial({
            color,
            emissive: color,
            emissiveIntensity: 1.3,
            roughness: 0.4,
            transparent: true
        }));
        arm.position.set(axis === "x" ? 0.17 : 0, axis === "y" ? 0.17 : 0, axis === "z" ? 0.17 : 0);
        gizmo.add(arm);
    }
    gizmo.position.set(-0.92, -1.3, 0.98);
    studio.add(gizmo);
    // Scan ring resolving up the product.
    const scan = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.024, 8, 44), kit.lime(3.0));
    scan.rotation.x = Math.PI / 2;
    studio.add(scan);
    studio.position.y = 0.12;
    group.add(studio);
    // Camera rig orbiting the set.
    const rig = new THREE.Group();
    const rigBody = new THREE.Mesh(kit.box(0.42, 0.32, 0.54, 0.05), kit.graphite());
    const rigLens = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.24, 20), kit.ink());
    rigLens.rotation.x = Math.PI / 2;
    rigLens.position.z = 0.36;
    const rigGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 20), kit.lime(2.2));
    rigGlass.rotation.x = Math.PI / 2;
    rigGlass.position.z = 0.49;
    const rigTop = new THREE.Mesh(kit.box(0.16, 0.09, 0.2, 0.03), kit.charcoal());
    rigTop.position.set(0.08, 0.2, -0.04);
    rig.add(rigBody, rigLens, rigGlass, rigTop);
    group.add(rig);
    return {
        group,
        // The turntable itself is compact, so the camera rig's orbit is what
        // sets the extent — keeping it tight is what keeps the product large.
        radius: 2.0,
        update: (elapsed, pointer)=>{
            studio.rotation.y = pointer.x * 0.28;
            studio.rotation.x = pointer.y * 0.09;
            turntable.rotation.y = elapsed * 0.78;
            // Scan ring sweeps the bottle's full height, base to lip.
            const sweep = Math.sin(elapsed * 1.05) * 0.5 + 0.5;
            scan.position.y = -1.0 + sweep * 2.4;
            scan.scale.setScalar(0.9 + Math.sin(elapsed * 3.2) * 0.05);
            // Rig orbits and keeps facing the product. Rotation is derived rather
            // than using lookAt so it stays correct inside a rotating parent.
            const angle = elapsed * 0.46;
            // Rides above the bottle's shoulder and swings wide, so it reads as
            // circling the product rather than passing through it.
            rig.position.set(Math.cos(angle) * 1.95, 0.98 + Math.sin(elapsed * 0.78) * 0.26, Math.sin(angle) * 1.3);
            rig.rotation.y = Math.atan2(-rig.position.x, -rig.position.z);
        }
    };
}
export function buildBrand(THREE: Three, addons: Addons): SceneDef {
    const kit = makeKit(THREE, addons);
    const group = new THREE.Group();
    // The mark: three bevelled bars crossed into a six-arm asterisk.
    const mark = new THREE.Group();
    const armGeometry = kit.extrude(kit.rect(0.26, 1.96, 0.1), 0.18, 0.03);
    for(let i = 0; i < 3; i += 1){
        const arm = new THREE.Mesh(armGeometry, kit.limeMetal());
        arm.rotation.z = i * Math.PI / 3;
        mark.add(arm);
    }
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.32, 28, 28), kit.ink());
    const hubRing = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.03, 10, 36), kit.lime(2.1));
    mark.add(hub, hubRing);
    mark.position.y = 0.42;
    group.add(mark);
    // Plinth.
    const plinth = new THREE.Mesh(kit.box(1.62, 0.18, 1.62, 0.04), kit.graphite());
    plinth.position.y = -1.32;
    const plinthTop = new THREE.Mesh(kit.box(1.08, 0.44, 1.08, 0.04), kit.charcoal());
    plinthTop.position.y = -1.05;
    const inlay = new THREE.Mesh(kit.box(0.72, 0.04, 0.04, 0.015), kit.lime(1.8));
    inlay.position.set(0, -0.83, 0.42);
    group.add(plinth, plinthTop, inlay);
    // Collateral at varying depths.
    const card = new THREE.Group();
    const cardBody = new THREE.Mesh(kit.extrude(kit.rect(0.94, 0.58, 0.05), 0.06, 0.014), kit.bone());
    const cardMark = new THREE.Mesh(kit.box(0.16, 0.16, 0.03, 0.02), kit.lime(1.9));
    cardMark.position.set(-0.28, 0.13, 0.05);
    card.add(cardBody, cardMark);
    addTextLines(THREE, kit, card, {
        count: 2,
        width: 0.44,
        y: -0.06,
        z: 0.05,
        gap: 0.11
    });
    const swatches = new THREE.Group();
    for (const [i, material] of [
        kit.lime(1.7),
        kit.ink(),
        kit.bone()
    ].entries()){
        const chip = new THREE.Mesh(kit.extrude(kit.rect(0.3, 0.42, 0.04), 0.05, 0.012), material);
        chip.position.set(i * 0.13, -i * 0.04, i * 0.05);
        chip.rotation.z = (i - 1) * 0.2;
        swatches.add(chip);
    }
    const specimen = new THREE.Group();
    const specimenSheet = new THREE.Mesh(kit.box(0.9, 1.18, 0.03, 0.01), kit.bone());
    const specimenGlyph = new THREE.Mesh(kit.box(0.44, 0.5, 0.02, 0.02), kit.ink());
    specimenGlyph.position.set(-0.1, 0.28, 0.03);
    specimen.add(specimenSheet, specimenGlyph);
    addTextLines(THREE, kit, specimen, {
        count: 4,
        width: 0.66,
        y: -0.12,
        z: 0.03,
        gap: 0.13
    });
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.42, 1)), kit.line(0.55));
    group.add(card, swatches, specimen, wire);
    const drifters = [
        {
            object: card,
            depth: -0.55,
            baseX: -1.94,
            baseY: 0.96
        },
        {
            object: swatches,
            depth: -0.85,
            baseX: 1.9,
            baseY: 0.82
        },
        {
            object: specimen,
            depth: 0.5,
            baseX: -1.66,
            baseY: -0.88
        },
        {
            object: wire,
            depth: 0.75,
            baseX: 1.78,
            baseY: -0.76
        }
    ];
    for (const drifter of drifters){
        drifter.object.position.set(drifter.baseX, drifter.baseY, drifter.depth);
    }
    return {
        group,
        // Drifters slide up to ~0.7 further out under full pointer deflection.
        radius: 2.6,
        update: (elapsed, pointer)=>{
            // Mark turns like a logo reveal and leans into the pointer.
            mark.rotation.z = elapsed * 0.36 + pointer.x * 0.28;
            mark.rotation.y = Math.sin(elapsed * 0.46) * 0.32 + pointer.x * 0.36;
            mark.rotation.x = pointer.y * 0.26;
            mark.position.y = 0.42 + Math.sin(elapsed * 0.85) * 0.1;
            const ringMaterial = hubRing.material;
            if (ringMaterial.emissiveIntensity !== undefined) {
                ringMaterial.emissiveIntensity = 1.9 + Math.sin(elapsed * 2.1) * 0.6;
            }
            // Collateral drifts against the pointer, scaled by depth.
            for (const [i, drifter] of drifters.entries()){
                drifter.object.position.x = drifter.baseX - pointer.x * drifter.depth * 0.85;
                drifter.object.position.y = drifter.baseY + pointer.y * drifter.depth * 0.55 + Math.sin(elapsed * 1.05 + i * 1.7) * 0.12;
                drifter.object.rotation.z = Math.sin(elapsed * 0.65 + i) * 0.28;
                drifter.object.rotation.y = Math.sin(elapsed * 0.4 + i * 1.2) * 0.4;
            }
            wire.rotation.x = elapsed * 0.4;
            wire.rotation.y = elapsed * 0.32;
        }
    };
}
/** Builders in the same order as the cycling headline words. */
export const sceneBuilders = [
  buildStorefront,
  buildAds,
  buildEmailFlow,
  buildLabel,
  buildRenders,
  buildBrand,
];
