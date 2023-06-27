import React from "react";
import styles from "../../styles/Sections.module.css";
interface Props {
  image_placement: "left" | "right";
  src: string;
  alt: string;
  title: string;
  text?: string;
  // width: string;
  // height: string;
  children?: any;
  imgStyles?: any;
  styles?: any;
  textColor?: string;
  subtitle?: any;
  dataSpeed?: number;
}

const ImageWithText: React.FC<Props> = (props) => {
  const dataSpeed = props.dataSpeed !== 0 ? props.dataSpeed : 1.1;

  return (
    <section
      style={props.styles}
      className={`${styles.image_with_text_container} ${
        props.image_placement == "left" ? styles.left : ""
      }`}
    >
      <div data-speed={dataSpeed} className={styles.image_with_text_info}>
        <h2 style={{ color: props.textColor }}>{props.title}</h2>
        {props.subtitle && (
          <div
            className={styles.subtitle_pill}
            style={{ color: props.textColor }}
          >
            {props.subtitle}
          </div>
        )}

        {props.text && <p style={{ color: props.textColor }}>{props.text}</p>}
        {props.children}
      </div>
      <img
        style={props.imgStyles}
        className={styles.image_with_text_image}
        src={props.src}
        alt={props.alt}
      />
    </section>
  );
};
export default ImageWithText;
