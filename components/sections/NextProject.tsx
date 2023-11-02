import React from "react";
import Link from "next/link";
import styles from "../../styles/Sections.module.css";
interface Props {
  next_link: string;
}

const NextProject: React.FC<Props> = (props) => {
  return (
    <Link href={`${props.next_link}`}>
      <section className={`${styles.next_project}`}>
        <div>Next Project</div>
      </section>
    </Link>
  );
};

export default NextProject;
