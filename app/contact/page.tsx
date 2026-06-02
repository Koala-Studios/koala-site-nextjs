import Image from "next/image";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Cta } from "@/components/site/Cta";
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
      <section className={styles.hero} aria-labelledby="contact-title">
        <Reveal className={`${styles.heroCopy} koala-stack`}>
          <h1 className="koala-page-title" id="contact-title">Contact</h1>
          <Cta
            className={styles.contactAction}
            icon="circle"
            iconPosition="left"
            shape="box"
            size="large"
            variant="outlinedPanel"
          >
            Contact Koala
          </Cta>
        </Reveal>

        <Reveal className={styles.heroImageWrap} delay={0.08}>
          <Image
            className={styles.heroImage}
            src="/images/redesign/contact/koala-contact-paper-plane-v4-1500.webp"
            alt="Paper plane visual representing a Koala Studios project inquiry"
            width={1500}
            height={938}
            sizes="(max-width: 900px) 100vw, 58vw"
            fetchPriority="high"
            priority
            unoptimized
          />
        </Reveal>
      </section>

      <section className={styles.formSection} aria-label="Project inquiry form">
        <Reveal className={styles.formIntro}>
          <h2 className="koala-section-title">Tell us what to build.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
