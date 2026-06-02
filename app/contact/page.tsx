import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowIcon } from "@/components/site/ArrowIcon";
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
    email: siteSettings.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteSettings.contact.city,
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "project inquiries",
      email: siteSettings.contact.email,
      availableLanguage: "English",
    },
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className={styles.hero} aria-labelledby="contact-title">
        <Reveal className={styles.heroCopy}>
          <h1 id="contact-title">Contact</h1>
          <Link
            className={styles.contactAction}
            href={`mailto:${siteSettings.contact.email}`}
          >
            <span className={styles.contactIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
            <span className={styles.contactText}>
              <strong>Contact Koala</strong>
            </span>
          </Link>
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

      <section className={styles.details} aria-label="Contact details">
        <div className={styles.detail}>
          <span>Email</span>
          <p>
            <a href={`mailto:${siteSettings.contact.email}`}>
              {siteSettings.contact.email}
            </a>
          </p>
        </div>
        <div className={styles.detail}>
          <span>Location</span>
          <p>Toronto</p>
        </div>
        <div className={styles.detail}>
          <span>Response</span>
          <p>{contactPageContent.responseWindow}</p>
        </div>
      </section>

      <section className={styles.formSection} aria-label="Project inquiry form">
        <Reveal className={styles.formIntro}>
          <h2>Tell us what to build.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
