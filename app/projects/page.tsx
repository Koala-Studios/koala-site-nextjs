"use client";

import Link from "next/link";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
} from "@react-three/drei";
import ProjectFile from "../assets/projects/projects.json";
import ProjectItem from "../../components/projects/ProjectItem";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, Vector2 } from "three";
import "../../styles/ProjectList.css";

const projects = ProjectFile.projects;
const title = "Featured| Work|";
const isMobile = () => {
  return window.innerWidth < 1024;
};

export default function Page() {
  return (
    <div style={{ width: "100vw" }} className="canvas-container">
      <TitleSection />
      <Canvas
        camera={{ fov: 30, position: [0, 0, isMobile() ? 37 : 30] }}
        className="canvas"
      >
        <Environment
          path="/images/project/"
          files="venice_sunset_1k.hdr"
          blur={0.5}
        />
        {/* <pointLight position={[15, 0, 5]} /> */}
        <ProjectList />
      </Canvas>
    </div>
  );
}

const ProjectList = () => {
  const image_plate = useLoader(OBJLoader, "/objects/image_plate_mesh.obj");
  const geometry = useMemo(() => {
    let g;
    image_plate.traverse((c: any) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [image_plate]);

  const { width } = useThree((state: any) => state.viewport);
  const w = 4,
    gap = 5;
  const xW = w + gap;
  let mouse = useRef<Vector2>();

  useEffect(() => {
    const update = (e: MouseEvent) => {
      mouse.current = new Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", update);
    return () => {
      window.removeEventListener("pointermove", update);
    };
  }, []);

  return (
    <ScrollControls
      horizontal
      //   damping={50}
      pages={(width - xW + projects.length * xW) / width}
      // style={{ overflowX: "hidden" }}
    >
      <Scroll>
        {
          projects.map((project, i) => <ProjectItem handle={project.handle} logo_color={project.logo_color} logo={project.logo} index={i} obj={geometry} key={i} xpos={i * xW} scale={[w, 4, 3]} url={project.list_image} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
};

const TitleSection = () => {
  // const [anim, setAnim] = useState(false);

  // useEffect(() => {
  //   // setAnim(true);
  //   window.scrollTo(0, 0);
  //   setTimeout(() => {
  //     setAnim(true);
  //   }, 3100);
  // }, []);

  return (
    <div className={`overlay-container show`}>
      <div className="title-section">
        <h1 className="title-el">
          {title.split("|").map((l, idx) => {
            return <span key={idx}>{l}</span>;
          })}
        </h1>
      </div>
      <div className="scroll-indicator">
        {/* <p>{isMobile() ? "Swipe" : "Scroll"} to Discover</p> */}
        <div className="scroll-wheel "></div>
      </div>
    </div>
  );
};
