import type { Metadata } from "next";

import { SplitReveal } from "@/components/animation/SplitReveal";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { AmbientScene } from "@/components/three/AmbientScene";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | Koala Studios",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={`koala-page ${styles.page}`}>
      <p aria-hidden="true" className={`koala-outline-text ${styles.backdrop}`}>
        404
      </p>
      <AmbientScene variant="cube" />

      <section className={styles.hero} aria-labelledby="not-found-title">
        <p className="koala-eyebrow">404 — Not found</p>
        <SplitReveal
          accents={["convert."]}
          as="h1"
          className={styles.title}
          id="not-found-title"
          text={"This page\ndoesn't convert."}
        />
        <p className={styles.copy}>
          It&apos;s missing, moved, or never shipped. The rest of the site
          works hard &mdash; pick a better landing spot.
        </p>
        <div className={styles.actions}>
          <Magnetic>
            <Cta
              href="/"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              Back home
            </Cta>
          </Magnetic>
          <Cta href="/work" size="medium" variant="outlined">
            See the work
          </Cta>
        </div>
      </section>
    </div>
  );
}
