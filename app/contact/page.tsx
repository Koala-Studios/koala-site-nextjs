import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocalClock } from "@/components/contact/LocalClock";
import { AmbientScene } from "@/components/three/AmbientScene";
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
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
