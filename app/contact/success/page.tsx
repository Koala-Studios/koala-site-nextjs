import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ArrowIcon } from "@/components/site/ArrowIcon";
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
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="success-title">
        <div className={styles.heroCopy}>
          <p>Message sent</p>
          <h1 id="success-title">Thank you</h1>
          <Link className={styles.contactAction} href="/">
            <span className={styles.contactIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
            <span className={styles.contactText}>
              <strong>Back home</strong>
            </span>
          </Link>
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
