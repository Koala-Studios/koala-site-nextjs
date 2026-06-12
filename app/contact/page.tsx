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

const nextSteps = [
  {
    number: "01",
    title: "We read it",
    copy: "A real person reads the note and checks fit. No autoresponder essays.",
  },
  {
    number: "02",
    title: "We reply",
    copy: contactPageContent.responseWindow,
  },
  {
    number: "03",
    title: "We talk",
    copy: "A short call to align on scope, timeline, and the clearest next step.",
  },
];

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
          <p className="koala-eyebrow">Contact</p>
          <SplitReveal
            accents={["shop."]}
            as="h1"
            className={styles.title}
            id="contact-title"
            text={"Let's talk\nshop."}
          />
          <Reveal delay={0.12}>
            <p className={styles.summary}>
              Tell us what you&apos;re selling, where the store lives today,
              and what needs to change. The URL and the goal are enough.
            </p>
          </Reveal>
          <a
            className={`${styles.email} koala-underline-link`}
            href="mailto:hello@koalastudios.ca"
          >
            hello@koalastudios.ca
          </a>

          <div className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Booking new projects</span>
            <span className={styles.statusTime}>
              Toronto&nbsp;
              <LocalClock />
            </span>
          </div>

          <div className={styles.steps}>
            {nextSteps.map((step) => (
              <div className={styles.step} key={step.number}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div className={styles.stepBody}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepCopy}>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal className={styles.formColumn} delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
