import Image from "next/image";
import type { Metadata } from "next";

import { Cta } from "@/components/site/Cta";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/metadata";

import styles from "../contact.module.css";

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: "Message Sent",
    description: "Confirmation page for Koala Studios contact form submissions.",
    path: "/contact/success",
  })
);

export default function ContactSuccessPage() {
  return (
    <div className={`koala-page ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="success-title">
        <div className={`${styles.heroCopy} koala-stack`}>
          <p className="koala-label">Message sent</p>
          <h1 className="koala-page-title" id="success-title">Thank you</h1>
          <Cta
            className={styles.contactAction}
            href="/"
            icon="circle"
            iconPosition="left"
            shape="box"
            size="large"
            variant="outlinedPanel"
          >
            Back home
          </Cta>
        </div>
        <div className={styles.heroImageWrap} aria-hidden="true">
          <Image
            className={styles.heroImage}
            src="/images/redesign/contact/koala-contact-paper-plane-v4-1500.webp"
            alt=""
            width={1500}
            height={938}
            sizes="(max-width: 900px) 100vw, 58vw"
            fetchPriority="high"
            priority
            unoptimized
          />
        </div>
      </section>
    </div>
  );
}
