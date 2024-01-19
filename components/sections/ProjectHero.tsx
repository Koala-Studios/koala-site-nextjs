"use client";

import React, { useEffect, useState } from "react";
import { IProjectPage } from "../utils";
import styles from "../../styles/ProjectSections.module.css";
import ScrollingText from "./ScrollingText";

interface Props {
  project: IProjectPage;
  title?: any;
  bg_color?: string;
  position?: "left" | "center";
  no_anim?: boolean;
}

const ProjectHero: React.FC<Props> = ({
  project,
  title,
  bg_color,
  position,
  no_anim,
}) => {
  const [animate, setAnimate] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const setScroll = () => {
    if (hasScrolled === false) {
      setHasScrolled(true);
      document.removeEventListener("scroll", setScroll);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", setScroll);

    // if (no_anim != true && animate == false) {
    //   window.scrollTo(0, 0);

    //   setTimeout(() => {
    //     setAnimate(true);
    //   }, 300);
    // }
  }, []);

  return (
    <div
      style={{
        background: `url(${project.hero_image})`,
        backgroundSize: "cover",
      }}
      className={`${styles.hero_container} ${
        position == "left" ? styles.left : ""
      }`}
    >
      <div
        className={`${styles.hero_info} ${
          animate ? styles.dark : styles.no_anim
        }`}
      >
        <img src={project.logo} />
        {/* {title} */}
      </div>

      {/* <div className={styles.title_image}>
        <img className={styles.hero_image} src={project.hero_image} />
      </div> */}

      <div
        className={`${styles.scroll_indicator} ${
          !hasScrolled && animate ? styles.show : ""
        }`}
      >
        {/* <p>Scroll to Discover</p> */}
        <div className={styles.scroll_wheel}></div>
      </div>
    </div>
  );
};

const ProjectTag = () => {};

export default ProjectHero;
