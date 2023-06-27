import React, { useEffect } from "react";
import Button from "../../components/Button";
import styles from "../../styles/Home.module.css";

interface Props {
  gradient: string;
  title: string;
  height?: string;
  bg_color?: string;
}

const GradientHero: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        height: props.height,
        background: props.bg_color,
        overflow: "hidden",
      }}
      className={styles.hero_section}
    >
      <section
        style={{ height: props.height }}
        className={styles.hero_container}
      >
        <div
          style={{
            // background: "linear-gradient(45deg, #181a17, #203f44,#433960)",
            background: props.gradient,
          }}
          className={styles.hero_gradient}
        >
          <div className={styles.gradient_bg}></div>
        </div>
        <div className={styles.hero_content}>
          <h1 className={styles.title}>{props.title}</h1>
        </div>
      </section>
    </div>
  );
};

export default GradientHero;
