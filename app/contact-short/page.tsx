import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIntro, ContactIntroView } from "@/components/contact/ContactIntro";
import { Folio } from "@/components/system";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "../contact/contact.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Koala Studios",
  description: "Tell us a little about your company to get started with Koala Studios.",
  path: "/contact-short",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Koala Studios",
  description: "Tell us a little about your company to get started with Koala Studios.",
  url: toAbsoluteUrl("/contact-short"),
  mainEntity: {
    "@type": "Organization",
    name: siteSettings.name,
    url: toAbsoluteUrl("/"),
  },
};

export default function ContactShortPage() {
  return (
    <div className="ks-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Folio className={styles.folio} items={["Contact", "Short intake", "Canada"]} />
      <section className={styles.split} aria-labelledby="contact-title">
        <div className={styles.intro}>
          <Suspense fallback={<ContactIntroView isAudit />}>
            <ContactIntro />
          </Suspense>
        </div>
        <Suspense fallback={<p className="ks-label ks-muted" style={{ minHeight: "24rem" }}>Loading the form…</p>}>
          <ContactForm short />
        </Suspense>
      </section>
    </div>
  );
}
