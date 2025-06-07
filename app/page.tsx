import styles from "./page.module.css";
import VideoWithText from "@/components/sections/VideoWithText";
import Link from "next/link";
import Button from "@/components/Button";
import ScrollingText from "@/components/sections/ScrollingText";
import HomepageHero from "@/components/home/HomepageHero";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#181A17" }}>
      <HomepageHero />
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
        video_placement="right"
        src="/videos/cupcake_video.mp4"
        title=""
        loop
        videoStyles={{
          width: "50%",
          height: "50%",
        }} //marginBottom for mobile version + dataSpeed
        styles={{ backgroundColor: "#181A17" }}
        dataSpeed={1.2}
      >
        <h2 className={styles.box1_title}>
          BIG Or Small, <br /> <span>Koala Studios </span>
          <br />
          will help you SURPASS your Ecommerce
          <br /> goals
        </h2>
      </VideoWithText>
      <VideoWithText
        video_placement="left"
        src="/videos/3dbag_in2.mp4"
        title="Your Website's Look Matters"
        text=""
        styles={{ backgroundColor: "#ede7e0" }}
        textColor="#282420"
        loop={false}
      >
        <p style={{ color: "#282420" }}>
          In today&apos;s world of ecommerce, having a unique website for your
          products is essential due to the high levels of competition. Your
          website is the face of your business and should reflect your
          brand&apos;s uniqueness. <br />
          <br />
          So, whether you&apos;re just starting out or looking to revamp your
          existing website, we can help you create a distinct and compelling
          online presence that sets you apart from the competition.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/services">
            <Button
              style={{
                borderColor: "#3d7431",
                whiteSpace: "nowrap",
                border: "2px solid black",
              }}
              type={"secondary"}
            >
              Our Services
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              style={{
                backgroundColor: "#3d7431",
                whiteSpace: "nowrap",
                border: "2px solid #3d7431",
              }}
              type={"primary"}
            >
              View Our Work
            </Button>
          </Link>
        </div>
      </VideoWithText>
      <Footer />
      {/* <Testimonials /> */}
    </div>
  );
}
