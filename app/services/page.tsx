import GradientHero from "@/components/sections/GradientHero";
import ImageWithText from "@/components/sections/ImageWithText";
import ScrollingText from "@/components/sections/ScrollingText";
import VideoWithText from "@/components/sections/VideoWithText";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <div>
        <GradientHero
          gradient="linear-gradient(45deg, #2e2b38, #5c3b3b, #2d5448)"
          title="Our Services"
          bg_color="#0d0d0d"
          height="400px"
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
          video_placement="right"
          src="/videos/3dbag_in2.mp4"
          title=""
          videoStyles={{ borderRadius: "1.5rem", border: "2px solid #282420" }}
          loop={false}
        >
          <section
            style={{
              width: "100%!important",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="/images/shopify_bag.svg" height="50" />
            <h2 style={{ margin: 0, marginLeft: 25 }}>Shopify Experts</h2>
          </section>
          <p>
            As Shopify experts with professional experience, we create
            high-quality Shopify experiences that drive results. Our team
            specializes in designing and developing stunning, user-friendly
            online stores that engage customers and drive sales. We work closely
            with our clients to understand their unique needs and goals.
            <br />
            <br /> Whether you&apos;re launching a new online store or
            optimizing an existing one, our Shopify experts have the skills and
            experience to help you succeed.
          </p>
        </VideoWithText>
        <ImageWithText
          image_placement="left"
          src="/images/retro_computer.jpg"
          alt="TODO"
          title=""
          imgStyles={{ borderRadius: "1.5rem" }}
        >
          <section className={styles.services_section}>
            <h3 style={{ color: "#b3e2f1" }}>🖥️ Web Development</h3>
            <p>Building websites that convert visitors into customers.</p>
            <h3 style={{ color: "#f3c5bc" }}>🎨 UI/UX Design</h3>
            <p>
              Innovative design that captures attention and inspires action.
            </p>
            <h3 style={{ color: "#d3d3d3" }}>🗿 3D Renders</h3>
            <p>Enhance your brand&apos;s identity and message.</p>
            <h3 style={{ color: "#f3c797" }}>📋 Consulting</h3>
            <p>The help you need, when you need it.</p>
          </section>
        </ImageWithText>
      </div>
      <Footer />
    </>
  );
}
