import type { Metadata } from "next";

import { ContactSubmitTracker } from "@/components/contact/ContactSubmitTracker";
import { Cta } from "@/components/site/Cta";
import { analyticsConfig } from "@/lib/analytics";
import { freeAuditPage } from "@/lib/content/audit";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/metadata";

import styles from "../../contact/success/success.module.css";

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: "Audit Requested",
    description: "Confirmation page for free website audit requests.",
    path: "/free-audit/thanks",
  })
);

const preview = process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true";

export default function FreeAuditThanksPage() {
  return (
    <div className="ks-page">
      <ContactSubmitTracker action={analyticsConfig.auditRequestEventName} label="free audit request" />
      <section className={styles.hero} aria-labelledby="audit-thanks-title" style={{ paddingTop: "calc(var(--ks-header-h) + 3rem)" }}>
        <h1 className={`ks-x ${styles.title}`} id="audit-thanks-title">
          {freeAuditPage.thanksTitle} <em>{freeAuditPage.thanksAccent}</em>
        </h1>
        <p className="ks-lede">
          {preview
            ? "The form passed validation. Your preview request is stored in this browser session only. Nothing was sent."
            : freeAuditPage.thanksCopy}
        </p>
        <div className={styles.actions}>
          <Cta href="/work">See the brands we work with</Cta>
          <Cta href="/blog" variant="text">
            Read the Journal
          </Cta>
        </div>
      </section>
    </div>
  );
}
