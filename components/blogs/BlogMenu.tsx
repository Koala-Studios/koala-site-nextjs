"use client"

import React, { useEffect, useState } from "react";
import styles from "../../styles/BlogPage.module.css"

interface Props {
  options: string[];
  topic: number;
  setTopic(idx: number): any;
}

const BlogMenu: React.FC<Props> = (props) => {
    

    return (
        <div
            className={styles.options_wrapper}
        >
            {
                props.options.map((element, index) => {
                    return (
                        <button 
                            key={index}
                            onClick={() => {props.setTopic(index)}}
                            className={styles.option_btn + ' ' + (index == props.topic ? styles.option_chosen : '')}
                        >
                            {props.options[index]}
                        </button>
                    )
                })
            }
        </div>
    );
};

export default BlogMenu;
