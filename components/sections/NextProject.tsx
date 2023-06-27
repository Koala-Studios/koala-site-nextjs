import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Sections.module.css";
interface Props {
  next_link: string;
}

const NextProject: React.FC<Props> = (props) => {
  return (
    <Link to={`${props.next_link}`}>
      <section className={`${styles.next_project}`}>
        <div>Next Project</div>
      </section>
    </Link>
  );
};

export default NextProject;
