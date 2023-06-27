import React, { useEffect, useState } from "react";
import { IProjectPage } from "../utils";
import styles from "../../styles/ProjectSections.module.css";
import ScrollingText from "./ScrollingText";
import { useLocation } from "react-router-dom";

interface Props {
  project: IProjectPage;
  title?: any;
  bg_color?: string;
}

const ProjectHero: React.FC<Props> = ({ project, title, bg_color }) => {
  const [animate, setAnimate] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  const setScroll = () => {
    if (hasScrolled === false) {
      setHasScrolled(true);
      document.removeEventListener("scroll", setScroll);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", setScroll);

    if (animate == false) {
      window.scrollTo(0, 0);

      setTimeout(() => {
        setAnimate(true);
      }, 300);
    }
  }, [location.key]);

  return (
    <div
      style={{ background: bg_color }}
      className={`${styles.hero_container} ${animate ? styles.dark : ""}`}
    >
      <div className={styles.hero_info}>
        <img src={project.logo} />
        {title}
      </div>

      <div className={styles.title_image}>
        <img className={styles.hero_image} src={project.hero_image} />
      </div>

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
