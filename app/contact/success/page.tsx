import type { Metadata } from "next";

import { ContactSubmitTracker } from "@/components/contact/ContactSubmitTracker";
import { Cta } from "@/components/site/Cta";
import { Folio } from "@/components/system";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/metadata";

import styles from "./success.module.css";

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: "Message Sent",
    description: "Confirmation page for Koala Studios contact form submissions.",
    path: "/contact/success",
  })
);

const preview = process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true";

export default function ContactSuccessPage() {
  return (
    <div className="ks-page">
      <ContactSubmitTracker />
      <section className={styles.hero} aria-labelledby="success-title">
        <Folio items={["Contact", preview ? "Local preview only" : "Message sent", "Canada"]} />
        <h1 className={`ks-x ${styles.title}`} id="success-title">
          {preview ? (
            <>
              Preview <em>complete.</em>
            </>
          ) : (
            <>
              Got it. <em>Talk soon.</em>
            </>
          )}
        </h1>
        <p className="ks-lede">
          {preview
            ? "The form passed validation. Your preview submission is stored in this browser session only. No inquiry or analytics event was sent."
            : "Your note is in. A real person reads it next and replies within two business days. Add hello@koalastudios.ca to your contacts so we don’t land in spam."}
        </p>
        <p className="ks-label ks-muted">Inbox: hello@koalastudios.ca</p>
        <div className={styles.actions}>
          <Cta href="/work">See the work meanwhile</Cta>
          <Cta href="/" variant="text">
            Back home
          </Cta>
        </div>
      </section>
    </div>
  );
}
