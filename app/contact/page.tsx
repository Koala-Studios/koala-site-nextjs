import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIntro, ContactIntroView } from "@/components/contact/ContactIntro";
import { Folio } from "@/components/system";
import { contactPageContent } from "@/content/pages/contact";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./contact.module.css";

export const metadata: Metadata = createPageMetadata({
  title: contactPageContent.seo.title,
  description: contactPageContent.seo.description,
  path: contactPageContent.seo.canonicalPath ?? "/contact",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Koala Studios",
  description: contactPageContent.seo.description,
  url: toAbsoluteUrl("/contact"),
  mainEntity: {
    "@type": "Organization",
    name: siteSettings.name,
    url: toAbsoluteUrl("/"),
  },
};

export default function ContactPage() {
  return (
    <div className="ks-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Folio className={styles.folio} items={["Contact", "Start a project", "Toronto, Canada"]} />
      <section className={styles.split} aria-labelledby="contact-title">
        <div className={styles.intro}>
          <Suspense fallback={<ContactIntroView />}>
            <ContactIntro />
          </Suspense>
        </div>
        <Suspense fallback={<p className="ks-label ks-muted" style={{ minHeight: "50rem" }}>Loading the form…</p>}>
          <ContactForm />
        </Suspense>
      </section>
    </div>
  );
}
