import React from "react";
import project from "../../assets/projects/elikai.json";
import Footer from "../../../components/sections/Footer";
import ImageWithText from "../../../components/sections/ImageWithText";
import NextProject from "../../../components/sections/NextProject";
import ProjectHero from "../../../components/sections/ProjectHero";
import ScrollingText from "../../../components/sections/ScrollingText";
import TitleWithText from "../../../components/sections/TitleWithText";
import VideoWithText from "../../../components/sections/VideoWithText";
import styles from "../../../styles/ProjectSections.module.css";

export default function Page() {
  return (
    <div style={{ background: project["bg_color"], overflowX: "hidden" }}>
      <ProjectHero
        project={project}
        bg_color="linear-gradient(45deg, #2e1f2e, #202944, #625c51)"
      />

      <ScrollingText
        TextArray={[
          "Amazon",
          "Design",
          "3D Renders",
          "Amazon",
          "Design",
          "3D Renders",
        ]}
      />
      <ImageWithText
        image_placement={"right"}
        src={"../images/project/elikai/shot1.jpg"}
        title={"About Elikai"}
        subtitle={"Home & Decoration"}
        text={
          "Elikai is a company that produces household goods and decorations. They specialize in creating a wide range of products that are typically used in homes, such as office items, kitchenware, bathroom items, and more. Elikai sells exclusively on Amazon."
        }
        imgStyles={{ border: "1px #ffffff36 solid", borderRadius: "1.5rem" }}
        alt={""}
      ></ImageWithText>

      <ImageWithText
        image_placement={"left"}
        src={"../images/project/elikai/shot3_less_contrast.jpg"}
        alt={""}
        title={"Our Role"}
        imgStyles={{ borderRadius: "1.5rem" }}
      >
        <p>
          Our role with Elikai is to provide 3D rendering services that showcase
          the functionality, style, and quality of their products in an
          effective and visually stunning way.
        </p>
      </ImageWithText>

      <h2 style={{ color: "#ede7e0", fontSize: 32, marginBottom: 60 }}>
        Gallery
      </h2>

      <div className={styles.gallery_images} style={{ marginBottom: 60 }}>
        <img src="..\images\project\elikai\shot3_less_contrast.jpg" />
        <img src="..\images\project\elikai\shot4_3_ps.jpg" />
        <img src="..\images\project\elikai\water1_test1_ps.jpg" />
        <img src="..\images\project\elikai\shot1.jpg" />
      </div>
      <NextProject next_link={`/projects/${project.next_handle}`} />
      <Footer></Footer>
    </div>
  );
}
