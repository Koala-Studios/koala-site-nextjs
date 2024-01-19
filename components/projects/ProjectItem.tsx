"use client";

import * as THREE from "three";
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import gsap, { Power2, Back } from "gsap";
import { Mesh, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils";
import { useRouter } from "next/navigation";

interface Props {
  xpos: number;
  index: number;
  scale: number[];
  url: string;
  logo: string;
  obj: any;
  logo_color: string;
  handle: string;
}
let startAnimDone = false;
let pointerPos = [0, 0];

const ProjectItem: React.FC<Props> = ({
  logo,
  xpos,
  scale,
  url,
  obj,
  index,
  logo_color,
  handle,
}) => {
  const [mobile, setMobile] = useState(false);

  const ref =
    useRef<Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();
  const refText =
    useRef<Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();

  const router = useRouter();

  const texture = useLoader(THREE.TextureLoader, url);
  const logo_texture = useLoader(THREE.TextureLoader, logo);

  const tilt = {
    x: 0,
    y: 0,
  };
  let mouseOver = false;

  const clamp = (n: number, min: number, max: number) => {
    return Math.max(Math.min(n, max), min);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    tilt.x = clamp(
      1.0 * (((e.clientX / window.innerWidth) * 2 - 1) * 0.2),
      -0.14,
      0.14
    );
    tilt.y = clamp(
      1.0 * (((e.clientY / window.innerHeight) * 2 - 1) * 0.2),
      -0.14,
      0.14
    );
  };

  useEffect(() => {
    setMobile(window.innerWidth < 1024);

    window.addEventListener("resize", () => {
      console.log("Resize");
      setMobile(window.innerWidth < 1024);
    });

    startAnimDone = false;
    if (ref.current && refText.current) {
      gsap
        .timeline({
          onComplete: () => {
            startAnimDone = true;
          },
        })
        .to(ref.current.position, {
          y: mobile ? -0.2 : 0.5,
          duration: 2,
          ease: Power2.easeOut,
        })
        .delay(0.4 + 0.2 * index);

      gsap
        .to(ref.current.rotation, {
          x: 0,
          y: 0,
          duration: 2,
          ease: Power2.easeOut,
        })
        .delay(0.4 + 0.2 * index);

      gsap
        .to(refText.current.material, {
          opacity: 1,
          duration: 2,
          ease: Power2.easeOut,
        })
        .delay(1.8 + 0.3 * index);
    }
  }, []);

  const handlePointerEnter = () => {
    //@ts-ignore
    window.hoveredItem = index;
    mouseOver = true;
    gsap.to(ref.current!.position, {
      z: 1,
    });
    document.body.style.cursor = "pointer";
  };
  const handlePointerLeave = () => {
    mouseOver = false;
    gsap.to(ref.current!.position, {
      z: 0,
    });
    document.body.style.cursor = "initial";
  };
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    router.push("/projects/" + handle, { scroll: false });
    pointerPos = [event.clientX, event.clientY];
  };
  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (
      Math.abs(event.clientX - pointerPos[0]) < 10 &&
      Math.abs(event.clientY - pointerPos[1]) < 10
    ) {
      document.body.style.cursor = "initial";
      // navigate(handle);
    }
  };

  const handleAwake = () => {};

  useFrame(({ scene, camera }) => {
    if (startAnimDone && ref.current) {
      if (mouseOver === false && tilt.x !== 0) {
        tilt.x = 0;
        tilt.y = 0;
      }
      gsap.to(ref.current.rotation, {
        x: tilt.y,
        y: tilt.x,
        duration: 0.4,
      });
    }
  });

  const logoSize = mobile ? 2.2 : 1.6;

  return (
    <>
      <mesh
        //@ts-ignore
        ref={ref}
        position={[xpos, 14, 0]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        geometry={obj}
        //@ts-ignore
        scale={scale}
        rotation={[-1, -1, 0]}
      >
        <meshStandardMaterial
          envMapIntensity={1.2}
          roughness={0.15}
          attach="material"
          metalness={0.1}
          map={texture}
        />
      </mesh>
      <mesh
        //@ts-ignore
        ref={refText}
        position={[xpos, mobile ? -6.4 : -5.35, 1]}
      >
        <planeGeometry args={[logoSize * 1.5, logoSize]}></planeGeometry>
        <meshStandardMaterial
          opacity={0}
          envMapIntensity={2.5}
          roughness={0.05}
          color={logo_color}
          metalness={0.7}
          attach="material"
          map={logo_texture}
          transparent
        />
      </mesh>
    </>
  );
};

export default ProjectItem;
