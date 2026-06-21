import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { FunnelDiagram } from "@/components/services/FunnelDiagram";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import { AmbientScene } from "@/components/three/AmbientScene";
import { servicesContent } from "@/content/pages/services";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./services.module.css";

export const metadata: Metadata = createPageMetadata({
  title: servicesContent.seo.title,
  description: servicesContent.seo.description,
  path: servicesContent.seo.canonicalPath ?? "/services",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: servicesContent.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Shopify design, Meta ad management, and email marketing",
  description: servicesContent.seo.description,
  url: toAbsoluteUrl("/services"),
  provider: {
    "@type": "Organization",
    name: siteSettings.name,
    url: toAbsoluteUrl("/"),
  },
  areaServed: {
    "@type": "Country",
    name: "Canada",
  },
  serviceType: servicesContent.offerings.map((offering) => offering.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Koala Studios services",
    itemListElement: servicesContent.offerings.map((offering) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offering.title,
        description: offering.copy,
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className={`koala-page ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([servicesJsonLd, faqJsonLd]),
        }}
      />

      <section className={styles.hero} aria-labelledby="services-title">
        <AmbientScene variant="blueprint" />
        <div className={styles.heroInner}>
          <SplitReveal
            accents={["Grow."]}
            as="h1"
            className={styles.heroTitle}
            id="services-title"
            text={"Design.\nBuild.\nGrow."}
          />
        </div>
        <Reveal className={styles.heroProof} delay={0.1}>
          {servicesContent.proof.map((item) => (
            <div className={styles.proofItem} key={item.label}>
              <span className={styles.proofValue}>{item.value}</span>
              <span className={styles.proofLabel}>{item.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section
        className={styles.funnel}
        aria-labelledby="services-funnel-title"
      >
        <Reveal className={styles.sectionHead}>
          <h2 className="koala-section-title" id="services-funnel-title">
            Our Process
          </h2>
        </Reveal>
        <FunnelDiagram />
      </section>

      <section className={styles.offerings} aria-label="Service offerings">
        {servicesContent.offerings.map((offering, index) => (
          <Reveal delay={index * 0.05} key={offering.title}>
            <Link className={styles.offering} href={offering.href}>
              <div className={styles.offeringHead}>
                <span className={styles.offeringNumber}>{offering.number}</span>
                <span className={styles.offeringKicker}>{offering.kicker}</span>
              </div>
              <div className={styles.offeringBody}>
                <h2 className={styles.offeringTitle}>{offering.title}</h2>
                <p className={styles.offeringCopy}>{offering.copy}</p>
                <div className={styles.offeringChips}>
                  {offering.deliverables.map((deliverable) => (
                    <span className="koala-chip" key={deliverable}>
                      {deliverable}
                    </span>
                  ))}
                </div>

                <span className={styles.offeringLink}>
                  Full service details
                  <ArrowIcon className={styles.offeringArrow} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section
        className={styles.process}
        aria-labelledby="services-process-title"
      >
        <AmbientAccent
          className={styles.processAccent}
          shape="torus"
          side="left"
          parallax={6}
          opacity={0.24}
        />
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">How it runs</p>
          <h2 className="koala-section-title" id="services-process-title">
            The same four steps, every time.
          </h2>
        </Reveal>
        <div className={styles.processGrid}>
          {servicesContent.delivery.map((step, index) => (
            <Reveal
              className={styles.processStep}
              delay={index * 0.05}
              key={step.number}
            >
              <span className={styles.processNumber}>{step.number}</span>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processCopy}>{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className={styles.engagement}
        aria-labelledby="services-engagement-title"
      >
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">Ways to work</p>
          <h2 className="koala-section-title" id="services-engagement-title">
            Project or retainer.
          </h2>
        </Reveal>
        <div className={styles.engagementGrid}>
          {[
            servicesContent.engagement.project,
            servicesContent.engagement.retainer,
          ].map((mode) => (
            <Reveal className={styles.engagementCard} key={mode.title}>
              <h3 className={styles.engagementTitle}>{mode.title}</h3>
              <p className={styles.engagementCopy}>{mode.copy}</p>
              <ul className={styles.engagementList}>
                {mode.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.audit} aria-labelledby="services-audit-title">
        <Reveal className={styles.auditInner}>
          <div className={styles.auditCopy}>
            <p className="koala-eyebrow">Free audit</p>
            <h2 className={styles.auditTitle} id="services-audit-title">
              Not sure where to start? Get a free audit.
            </h2>
            <p className={styles.auditText}>
              We&apos;ll go through your site across design, conversion, ads,
              and email, then show you the few changes that would move the
              needle most. No pitch, no obligation.
            </p>
          </div>
          <Magnetic>
            <Cta
              data-analytics-cta="services-audit"
              href="/contact"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              Get a free audit
            </Cta>
          </Magnetic>
        </Reveal>
      </section>

      <section className={styles.faq} aria-labelledby="services-faq-title">
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">Questions</p>
          <h2 className="koala-section-title" id="services-faq-title">
            Asked before every project.
          </h2>
        </Reveal>
        <div className={styles.faqList}>
          {servicesContent.faq.map((item, index) => (
            <Reveal delay={index * 0.04} key={item.question}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  {item.question}
                  <span aria-hidden="true" className={styles.faqToggle} />
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="services-cta-title">
        <Reveal>
          <p className="koala-eyebrow">{servicesContent.cta.eyebrow}</p>
          <h2 className={styles.ctaTitle} id="services-cta-title">
            {servicesContent.cta.title}
          </h2>
          <p className={styles.ctaSummary}>{servicesContent.cta.summary}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <Magnetic>
            <Cta
              href="/contact"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              Contact Koala
            </Cta>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
