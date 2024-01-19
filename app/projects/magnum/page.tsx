import React from "react";
import Link from "next/link";
import project from "../../assets/projects/magnum.json";
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
import "../nektr/light.css";

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
          title={
            <h1>
              Delivering Results <br />
              Since 2005
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
        <VideoWithText
          playback_speed={0.5}
          video_placement={"right"}
          src={"/images/project/magnum/magnum_line.mp4"}
          // alt={""}
          title={"About Magnum"}
          subtitle={"Health & Fitness, Nutrition"}
          text={
            "Magnum Nutraceuticals, a top-tier supplement brand powering champions worldwide. Endorsed by elite athletes and premier trainers, their renowned brand delivers award-winning, scientifically-formulated supplements to those striving for greatness."
          }
          videoStyles={{ borderRadius: "1.5rem" }}
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
        </VideoWithText>

        <VideoWithText
          video_placement={"left"}
          src={"../images/project/magnum/heat_slowmo.mp4"}
          loop
          title={"How did we Help?"}
          videoStyles={{ borderRadius: "1.5rem" }}
        >
          <p>
            We elevated Magnum&apos;s online presence by delivering a
            brand-aligned makeover that set them apart from the competition.
            <br />
            <br />
            Magnum originally had two separate websites. In an effort to enhance
            traffic and streamline operations, we migrated them into a single,
            unified platform, effectively minimizing operational complexities
            and optimizing user experience.
          </p>
        </VideoWithText>

        <h2 data-speed={1.1} style={{ color: "#ede7e0", fontSize: "2rem" }}>
          {" "}
          Our Results
        </h2>

        <div data-speed={1.1} className={styles.stat_badge_container}>
          <div style={{ display: "flex", gap: "inherit" }}>
            <StatBadge
              LargeText="3.17%"
              SmallText="Conversion Rate"
              UnderText={
                <Link
                  target="_blank"
                  href={
                    "https://lp.littledata.io/average/ecommerce-conversion-rate-(all-devices)/Shopify"
                  }
                >
                  (50.24% increase)
                </Link>
              }
            />
            <StatBadge
              dataLag={0.05}
              LargeText="9 Months"
              SmallText="Since Redesign"
            />
          </div>

          <div style={{ display: "flex", gap: "inherit" }}>
            <StatBadge
              dataLag={0.1}
              LargeText="+150,000"
              SmallText="Sessions"
            />
            <StatBadge dataLag={0.15} LargeText="23" SmallText="PRs Broken" />
          </div>
        </div>
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
            <source src="..\images\project\magnum/magnum_site_video.mp4"></source>
          </video>
        </div>

        <p style={{ color: "#ede7e0", marginBottom: 50 }}>Scrolling Video</p>
        <div data-speed={1.1} className={styles.mobile_flex_images_allo}>
          <div data-lag={0.15}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\magnum/product_list_magum.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>Shop List Page</p>
          </div>
          <div data-lag={0.1}>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\magnum/product_page_magnum.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>
              {" "}
              Mobile Product Page
            </p>
          </div>
          <div>
            <img
              style={{ borderRadius: "1rem", width: "100%" }}
              src="..\images\project\magnum\supp_facts_magnum.png"
            ></img>

            <p style={{ color: "#ede7e0", marginTop: 15 }}>
              {" "}
              Supplement Facts Page
            </p>
          </div>
        </div>

        <div style={{ padding: "var(--global-padding)" }}>
          <img
            style={{ maxWidth: "100%", borderRadius: "1rem" }}
            src="../images/project/magnum/product_page_desktop_magnum.png"
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
