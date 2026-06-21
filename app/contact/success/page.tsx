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
        <p className="koala-eyebrow">Message sent</p>
        <SplitReveal
          accents={["soon."]}
          as="h1"
          className={styles.title}
          id="success-title"
          text={"Got it.\nTalk soon."}
        />
        <p className={styles.copy}>
          Your note is in. A real person reads it next and will reply from
          hello@koalastudios.ca within two business days. Add us to your
          contacts so we don&apos;t land in spam.
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
