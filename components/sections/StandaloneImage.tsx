import React from "react";
import styles from "../../styles/Sections.module.css";
interface Props {
  src: string;
  alt: string;
  width: string;
  height: string;
  fullwidth: boolean;
}

const StandaloneImage: React.FC<Props> = (props) => {
  return (
    <section
      className={`${styles.image_container} ${
        props.fullwidth ? styles.full_width : ""
      }`}
    >
      <img
        className={styles.image}
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </section>
  );
};

export default StandaloneImage;
