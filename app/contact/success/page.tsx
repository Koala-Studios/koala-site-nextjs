import type { Metadata } from "next";

import { SplitReveal } from "@/components/animation/SplitReveal";
import { ContactSubmitTracker } from "@/components/contact/ContactSubmitTracker";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { AmbientScene } from "@/components/three/AmbientScene";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/metadata";

import styles from "./success.module.css";

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
      <ContactSubmitTracker />
      <p aria-hidden="true" className={`koala-outline-text ${styles.backdrop}`}>
        Sent
      </p>
      <AmbientScene variant="dart" />

      <section className={styles.hero} aria-labelledby="success-title">
        <p className="koala-eyebrow">{process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true" ? "Local preview only" : "Message sent"}</p>
        <SplitReveal
          accents={["soon."]}
          as="h1"
          className={styles.title}
          id="success-title"
          text={process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true" ? "Preview complete." : "Got it.\nTalk soon."}
        />
        <p className={styles.copy}>
          {process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true" ? "The form passed validation. Your preview submission is stored in this browser session only. No inquiry or analytics event was sent." : <>Your note is in. A real person reads it next and will reply from
          hello@koalastudios.ca within two business days. Add us to your
          contacts so we don&apos;t land in spam.</>}
        </p>

        <div className={styles.statusRow}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Inbox: hello@koalastudios.ca</span>
        </div>

        <div className={styles.actions}>
          <Magnetic>
            <Cta
              href="/work"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              See the work meanwhile
            </Cta>
          </Magnetic>
          <Cta href="/" size="medium" variant="outlined">
            Back home
          </Cta>
        </div>
      </section>
    </div>
  );
}
