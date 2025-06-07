"use client";

import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Footer from "../sections/Footer";

const HomepageHero = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 500);

    window.addEventListener("resize", () => {
      console.log("Resize");
      setMobile(window.innerWidth < 500);
    });
  }, []);

  return (
    <div className={styles.hero_section}>
      <section className={`${styles.hero_container} ${styles.hero_homepage}`}>
        <div className={styles.overlay_fade}></div>
        <div className={styles.hero_video}>
          {/* <img src="/images/koala_square.png" /> */}
          <video
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source
              src={
                mobile
                  ? "/videos/koalavideo2_60fps.mp4"
                  : "/videos/koala_wide.mp4"
              }
            />
          </video>
        </div>
        <div className={styles.hero_content}>
          <h1 className={styles.title}>
            We Build <br /> Koality
            <br /> ECommerce <br />
            Websites
          </h1>
          {/* <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p> */}
          <div className={styles.hero_ctas}>
            <Link href="/contact">
              <Button type="secondary light" classes={styles.contact_btn}>
                Contact Us
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                style={{
                  backgroundColor: "#3d7431",
                  borderColor: "#3d7431",
                  color: "white",
                }}
                type="primary light"
              >
                View Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomepageHero;
