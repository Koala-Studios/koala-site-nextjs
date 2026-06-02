import Image from "next/image";
import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { Cta } from "@/components/site/Cta";
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

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ecommerce design and Shopify development",
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
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className={styles.hero} aria-labelledby="services-title">
        <Reveal className={styles.heroCopy}>
          <h1 id="services-title">Services</h1>
        </Reveal>
      </section>

      <section
        className={styles.mediaPanel}
        aria-label="Koala Studios service approach"
      >
        <Reveal className={styles.imageWrap}>
          <Image
            className={styles.image}
            src="/images/redesign/services/koala-services-desk-1600.webp"
            alt="Koala Studios service desk with ecommerce design and development screens"
            width={1600}
            height={900}
            sizes="(max-width: 900px) 100vw, 62vw"
            fetchPriority="high"
            priority
            unoptimized
          />
          <Cta
            className={styles.mediaCta}
            href="/contact"
            icon="circle"
            iconPosition="left"
            size="small"
            variant="overlay"
          >
            Start a project
          </Cta>
        </Reveal>
      </section>

      <section className={styles.summary} aria-label="Service summary">
        <Reveal>
          <h2>{servicesContent.hero.headline}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>{servicesContent.hero.summary}</p>
        </Reveal>
      </section>

      <section className={styles.offerings} aria-label="Service offerings">
        {servicesContent.offerings.map((offering, index) => (
          <Reveal
            className={styles.offering}
            key={offering.title}
            delay={index * 0.04}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{offering.title}</h2>
            <p>{offering.copy}</p>
          </Reveal>
        ))}
      </section>

      <section className={styles.cta} aria-labelledby="services-cta-title">
        <Reveal>
          <p>{servicesContent.cta.eyebrow}</p>
          <h2 id="services-cta-title">{servicesContent.cta.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Cta href="/contact" size="medium" variant="outlined">
            Contact Koala
          </Cta>
        </Reveal>
      </section>
    </div>
  );
}
