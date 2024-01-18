import React from "react";
import Link from "next/link";
import project from "../../assets/projects/ara.json";
import Button from "../../../components/Button";
import ImageWithText from "../../../components/sections/ImageWithText";
import NextProject from "../../../components/sections/NextProject";
import ProjectHero from "../../../components/sections/ProjectHero";
import ScrollingText from "../../../components/sections/ScrollingText";
import TitleWithText from "../../../components/sections/TitleWithText";
import styles from "../../../styles/ProjectSections.module.css";
import StatBadge from "../../../components/projects/StatBadge";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <div style={{ background: project["bg_color"], overflowX: "hidden" }}>
        <ProjectHero
          project={project}
          title={
            <h1>
              Your Sip of Nourishment <br />
              in Every Cup
            </h1>
          }
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
        <ImageWithText
          image_placement={"right"}
          src={"../images/project/ara/ara_plants.jpg"}
          alt={""}
          title={"About Ära"}
          subtitle={"Health & Fitness"}
          text={
            "Ära Nutrition is a Toronto-based company offering unique health products designed to enhance your everyday lifestyle. They have created the first protein powder that mixes seamlessly into hot coffee, with options for all types of coffee drinkers."
          }
          imgStyles={{ borderRadius: "1.5rem" }}
        >
          <div>
            <Link
              style={{ width: "fit-content", display: "block" }}
              href={project.site_link}
              target="_blank"
            >
              <Button type={"primary light"}>
                View Live Site
                <img
                  src="../images/cta_link_black.png"
                  height="12"
                  width="12"
                />
              </Button>
            </Link>
          </div>
        </ImageWithText>

        <ImageWithText
          image_placement={"left"}
          src={"../images/project/ara/ara_sachet_1.jpg"}
          alt={""}
          title={"How did we Help?"}
          imgStyles={{ borderRadius: "1.5rem" }}
        >
          <p>
            Formerly known as Allo, Ära sought a fresh aesthetic to align with their evolving brand. 
            Our team played a pivotal role in not only crafting their new look but also seamlessly integrating it into their revamped platform,
            ensuring a cohesive and sharp identity.
            <br />
            <br /> We worked closely with Ära to understand their brand and
            their goals, and crafted a website that truly represents their
            values and ethos.
          </p>
        </ImageWithText>

        {/* <h2 data-speed={1.1} style={{ color: "#ede7e0", fontSize: "2rem" }}>
          {" "}
          Our Results
        </h2>

        <div data-speed={1.1} className={styles.stat_badge_container}>
          <div style={{ display: "flex", gap: "inherit" }}>
            <StatBadge
              LargeText="4.02%"
              SmallText="Conversion Rate"
              UnderText={
                <Link
                  target="_blank"
                  href={
                    "https://lp.littledata.io/average/ecommerce-conversion-rate-(all-devices)/Shopify"
                  }
                >
                  (vs 2022 Shopify Avg 1.4%)
                </Link>
              }
            />
            <StatBadge
              dataLag={0.05}
              LargeText="1 Year"
              SmallText="Since Launch"
            />
          </div>

          <div style={{ display: "flex", gap: "inherit" }}>
            <StatBadge
              dataLag={0.1}
              LargeText="+300,000"
              SmallText="Sessions"
            />
            <StatBadge
              dataLag={0.15}
              LargeText="14"
              SmallText="Coffees Spilled"
            />
          </div>
        </div> */}
        <h2 style={{ color: "#ede7e0", marginTop: 60, marginBottom: 50 }}>
          Featured
        </h2>

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
            <source src="..\images\project\ara\ara_site_video.mp4"></source>
          </video>
        </div>

        <p style={{ color: "#ede7e0", marginBottom: 50 }}>
          Scrolling video in home page
        </p>
        <div data-speed={1.1} className={styles.mobile_flex_images_allo}>
          <div data-lag={0.15}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\ara\ara_product_list_mobile.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>Shop Page</p>
          </div>
          <div data-lag={0.1}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\ara\ara_product_mobile.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>
              {" "}
              Mobile Product Page
            </p>
          </div>
          <div>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\ara\ara_variety_mobile.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>
              {" "}
              Variety Pack Page
            </p>
          </div>
        </div>

        <div style={{ padding: "var(--global-padding)" }}>
          <img
            style={{ maxWidth: "100%", borderRadius: "1rem" }}
            src="../images/project/ara/ara_product_desktop.png"
          ></img>
        </div>

        <p style={{ color: "#ede7e0", marginTop: 15, marginBottom: 150 }}>
          {" "}
          Desktop Product Page
        </p>
        <NextProject next_link={`/projects/${project.next_handle}`} />
      </div>
      <Footer />
    </>
  );
}
