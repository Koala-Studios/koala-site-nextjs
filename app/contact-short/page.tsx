import type { Metadata } from "next";
import { Suspense } from "react";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { AmbientScene } from "@/components/three/AmbientScene";
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
    <div className={`koala-page ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <AmbientScene variant="dart" />

      <section className={styles.split} aria-labelledby="contact-title">
        <div className={styles.intro}>
          <SplitReveal
            accents={["shop."]}
            as="h1"
            className={styles.title}
            id="contact-title"
            text={"Let's talk\nshop."}
          />
          <a
            className={`${styles.email} koala-underline-link`}
            href="mailto:hello@koalastudios.ca"
          >
            hello@koalastudios.ca
          </a>
        </div>

        <Reveal className={styles.formColumn} delay={0.08}>
          <Suspense fallback={<p>Loading contact form...</p>}><ContactForm short /></Suspense>
        </Reveal>
      </section>
    </div>
  );
}
