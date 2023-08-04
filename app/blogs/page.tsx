"use client"

import BlogCard from "@/components/blogs/BlogCard";
import GradientHero from "@/components/sections/GradientHero";
import styles from "../../styles/BlogPage.module.css"
import ScrollingText from "@/components/sections/ScrollingText";
import BlogMenu from "@/components/blogs/BlogMenu";
import React, {useEffect, useState } from "react";

export default function Page() {

  const [topic, setTopic] = useState<number>(0)
  const options = ['All', 'Fitness & Nutrition', 'Shopify']

  return (
    <div>
      <GradientHero
        gradient="linear-gradient(45deg, #2e2b38, #5C583B, #2d5448)"
        title="Blogs & Education"
        height="450px"
      />
      <ScrollingText
        TextArray={[
          "Shopify",
          "E-Commerce",
          "Fitness / Nutrition Brands",
          "Brand Development",
        ]}
      />
      <section
        className={styles.blogs_section}>
        <BlogMenu
          options={options}
          topic={topic}
          setTopic={setTopic}
        />
        <BlogCard
          title={"The Come Up of Bob The Builder"}
          bio={"Riveting story of how a small time builder monopolized the construction world through Shopify"}
          tag={"Construction"}
          read_time={"2 min"}
          date={"Jul 29 2023"}
          image={"/images/shopify_bag.svg"}
          alt={"bag"}
        />
        <BlogCard
          title={"The Come Up of Bob The Builder"}
          bio={"Riveting story of how a small time builder monopolized the construction world through Shopify"}
          tag={"Construction"}
          read_time={"2 min"}
          date={"Jul 29 2023"}
          image={"/images/shopify_bag.svg"}
          alt={"bag"}
        />
        <BlogCard
          title={"The Come Up of Bob The Builder"}
          bio={"Riveting story of how a small time builder monopolized the construction world through Shopify"}
          tag={"Construction"}
          read_time={"2 min"}
          date={"Jul 29 2023"}
          image={"/images/shopify_bag.svg"}
          alt={"bag"}
        />

      </section>
    </div>
  );
}
