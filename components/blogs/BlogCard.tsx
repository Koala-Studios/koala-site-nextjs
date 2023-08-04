import React, { useEffect } from "react";
import styles from "../../styles/BlogPage.module.css"

interface Props {
  title: string;
  bio: string;
  read_time: string;
  tag: string;
  date: string;
  image: string;
  alt: string;
}

const BlogCard: React.FC<Props> = (props) => {
  return (
    <div
      
      className={styles.blog_card}
    >
        <img
            src={props.image}
            alt={props.alt}
            className={styles.card_img}
        ></img>
        <div>
            <h3><a href={"#"}>{props.title}</a></h3>
            <p>{props.bio}</p>
            <div 
                className={styles.blog_card_bottom}
            >
                {/* <p className={styles.blog_card_tag}>{props.tag}</p>  */}
                <p className={styles.secondary_text}>{props.read_time}</p>
                <p className={styles.secondary_text}>{props.date}</p>
            </div>
        </div>
    </div>
  );
};

export default BlogCard;
