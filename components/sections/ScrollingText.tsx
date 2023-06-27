import React from "react";
import styles from "../../styles/Sections.module.css";

interface Props {
  TextArray: string[];
}

const ScrollingText: React.FC<Props> = ({ TextArray }) => {
  return (
    <div className={styles.scrolltext_container}>
      <div className={styles.scroll_text}>
        {TextArray.map((text, idx) => {
          return <span key={idx}>{text}</span>;
        })}
        {TextArray.map((text, idx) => {
          return <span key={idx * 2}>{text}</span>;
        })}
        {TextArray.map((text, idx) => {
          return <span key={idx * 3}>{text}</span>;
        })}
      </div>
    </div>
  );
};

export default ScrollingText;
