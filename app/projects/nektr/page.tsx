import React from "react";
import Link from "next/link";
import project from "../../assets/projects/nektr.json";
import Button from "../../../components/Button";
import ImageWithText from "../../../components/sections/ImageWithText";
import NextProject from "../../../components/sections/NextProject";
import ProjectHero from "../../../components/sections/ProjectHero";
import ScrollingText from "../../../components/sections/ScrollingText";
import TitleWithText from "../../../components/sections/TitleWithText";
import styles from "../../../styles/ProjectSections.module.css";
import StatBadge from "../../../components/projects/StatBadge";
import Footer from "@/components/sections/Footer";
import VideoWithText from "@/components/sections/VideoWithText";
import "./light.css";

export default function Page() {
  return (
    <>
      <div
        id="LIGHT"
        style={{ background: project["bg_color"], overflowX: "hidden" }}
      >
        <ProjectHero
          position="left"
          project={project}
          title={<h1>DAILY GREENS + SUPERFOODS</h1>}
        />

        <ScrollingText
          TextArray={[
            "Shopify Ecommerce",
            "UI/UX Design",
            "Web Development",
            "Consulting",
            "3D Renders",
            "Graphic Design",
          ]}
        />
        <VideoWithText
          video_placement={"right"}
          src={"../images/project/nektr/pineapple_peach_video.mp4"}
          title={"About NEKTR"}
          subtitle={"Health & Wellness"}
          loop
          videoStyles={{
            border: "1px #ffffff36 solid",
          }}
        >
          <p>
            NEKTR is a flavorful powerhouse of micronutrients and antioxidants,
            bursting with 54 fruits and vegetables, from land and sea, blended
            for optimal nutrition.
            <br />
            <br />
            People struggle to get their daily greens. In fact, according to the
            CDC, 90% of North Americans aren&apos;t getting their daily
            recommended intake of fruits and vegetables.
          </p>
          {/* <Link
            style={{ width: "fit-content", display: "block" }}
            href={project.site_link}
            target="_blank"
          >
            <Button type={"primary light"}>
              View Live Site
              <img src="../images/cta_link_black.png" height="12" width="12" />
            </Button>
          </Link> */}
        </VideoWithText>

        <ImageWithText
          image_placement={"left"}
          src={"../images/project/nektr/mobile_hero.jpg"}
          alt={""}
          title={"How did we Help?"}
        >
          <p>
            NEKTR wanted to show how{" "}
            <span style={{ color: "#cb4732" }}>flavorful</span> their product
            was. A lot of time was spent getting the visuals to portray the
            product&apos;s main quality. This was seamlessly integrated into a
            custom built website we made for them.
            <br />
            <br /> We worked closely with NEKTR to understand their brand and
            their goals, and crafted a website that shows their product in the
            best light.
          </p>
        </ImageWithText>

        <h2 style={{ marginTop: 60, marginBottom: 50 }}>Featured</h2>

        <div
          style={{
            padding: "var(--global-padding)",
          }}
        >
          <video
            style={{
              maxWidth: "100%",
              borderRadius: "1rem",
              border: "2px solid #282420",
            }}
            loop
            autoPlay
            muted
          >
            <source src="..\images\project\nektr\nektr_scroll.mp4"></source>
          </video>
        </div>

        <p style={{ marginBottom: 50 }}>Scrolling video in home page</p>

        <div style={{ padding: "var(--global-padding)" }}>
          <img
            style={{
              maxWidth: "100%",
              borderRadius: "1rem",
              border: "1px solid #282420",
            }}
            src="..\images\project\nektr\nektr_page.png"
          ></img>
        </div>
        <p style={{ marginTop: 15, marginBottom: 75 }}> Desktop Product Page</p>
        <div style={{ padding: "var(--global-padding)" }}>
          <img
            style={{
              maxWidth: "100%",
              borderRadius: "1rem",
            }}
            src="..\images\project\nektr\nektr_plate.png"
          ></img>
        </div>

        <p style={{ marginTop: 15, marginBottom: 75 }}> Nutrients in Product</p>

        <div style={{ padding: "var(--global-padding)" }}>
          <img
            style={{
              maxWidth: "100%",
              borderRadius: "1rem",
            }}
            src="..\images\project\nektr\nektr_oversized (1).jpg"
          ></img>
        </div>

        <div data-speed={1.1} className={styles.mobile_flex_images_allo}>
          <div data-lag={0.15}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\nektr\Magnum-NEKTR-JournalismShots-Extra-7.jpg"
            ></img>
          </div>
          <div data-lag={0.1}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\nektr\Magnum-NEKTR-JournalismShots-Extra-6.jpg"
            ></img>
          </div>
          <div>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\nektr\mobile_hero.jpg"
            ></img>
          </div>
        </div>

        <NextProject next_link={`/projects/${project.next_handle}`} />
      </div>
      <Footer />
    </>
  );
}
