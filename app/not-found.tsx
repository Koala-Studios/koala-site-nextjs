import type { Metadata } from "next";

import { Cta } from "@/components/site/Cta";
import { Arch, Folio } from "@/components/system";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | Koala Studios",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="ks-page">
      <section className={styles.hero} aria-labelledby="not-found-title">
        <Folio items={["No. 404", "Not found", "Canada"]} />
        <div className={styles.body}>
          <div className={styles.copy}>
            <h1 className={`ks-x ${styles.title}`} id="not-found-title">
              This page <em>didn’t ship.</em>
            </h1>
            <p className="ks-lede">It’s missing, moved or never existed. The rest of the site works hard, so pick a better landing spot.</p>
            <div className={styles.actions}>
              <Cta href="/">Back home</Cta>
              <Cta href="/work" variant="text">
                See the work
              </Cta>
            </div>
          </div>
          <Arch className={styles.arch} src="/images/project/ara/ara_plants.jpg" alt="" sizes="(max-width: 900px) 60vw, 26vw" />
        </div>
      </section>
    </div>
  );
}
