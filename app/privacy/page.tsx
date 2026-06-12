import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

import styles from "./privacy.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Koala Studios collects, uses, and protects the information you share through this site.",
  path: "/privacy",
});

const LAST_UPDATED = "June 11, 2026";

export default function PrivacyPage() {
  return (
    <div className={`koala-page ${styles.page}`}>
      <section className={styles.intro}>
        <p className="koala-eyebrow">Legal</p>
        <h1 className={styles.title}>Privacy policy.</h1>
        <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>
      </section>

      <section className={styles.body}>
        <h2>What we collect</h2>
        <p>
          When you submit the contact form we collect the information you
          provide: your name, company, email, optional phone number, the
          services you&apos;re interested in, an optional budget range, and
          your message. Form submissions are processed by Netlify Forms and
          delivered to our inbox.
        </p>

        <h2>Analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use the site
          (pages viewed, approximate location, device type). This data is
          aggregated and does not directly identify you. You can opt out with
          the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>

        <h2>How we use your information</h2>
        <p>
          Contact details are used only to reply to your inquiry and discuss
          your project. We do not sell, rent, or share your personal
          information with third parties for their marketing.
        </p>

        <h2>Retention</h2>
        <p>
          We keep inquiry emails for as long as needed to manage the
          relationship. You can ask us to delete your information at any time.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of the
          personal information we hold about you. Email{" "}
          <a href="mailto:hello@koalastudios.ca">hello@koalastudios.ca</a> and
          we&apos;ll respond within two business days.
        </p>

        <h2>Contact</h2>
        <p>
          Koala Studios, Toronto, Ontario, Canada. Questions about this policy
          go to <a href="mailto:hello@koalastudios.ca">hello@koalastudios.ca</a>.
        </p>
      </section>
    </div>
  );
}
