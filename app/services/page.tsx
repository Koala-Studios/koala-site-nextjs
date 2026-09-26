import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Cta } from "@/components/site/Cta";
import { ArchWindow } from "@/components/system/ArchWindow";
import { Folio, IndexList, SectionHead } from "@/components/system";
import { serviceIcon } from "@/components/system/Icons";
import { LineArt } from "@/components/system/LineArt";
import { servicesContent } from "@/content/pages/services";
import { siteSettings } from "@/lib/content";
import { auditOffer } from "@/lib/content/audit";
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
  name: "Shopify design, packaging, Meta ad management, and email marketing",
  description: servicesContent.seo.description,
  url: toAbsoluteUrl("/services"),
  provider: { "@type": "Organization", name: siteSettings.name, url: toAbsoluteUrl("/") },
  areaServed: { "@type": "Country", name: "Canada" },
  serviceType: servicesContent.offerings.map((offering) => offering.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Koala Studios services",
    itemListElement: servicesContent.offerings.map((offering) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: offering.title, description: offering.copy },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />

      <section className={styles.hero} aria-labelledby="services-title">
        <Folio items={["Services", "Build · Product · Traffic · Retention", "Canada"]} />
        <h1 className={`ks-x ${styles.title}`} id="services-title">
          Design. Build. <em>Grow.</em>
        </h1>
        <div className={styles.heroFoot}>
          <p className="ks-lede">{servicesContent.hero.summary}</p>
          <dl className={styles.proof}>
            {servicesContent.proof.map((item) => (
              <div key={item.label}>
                <dt className="ks-label ks-muted">{item.label}</dt>
                <dd className="ks-x">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ArchWindow
        className={styles.band}
        src="/images/project/ara/ara_hero.webp"
        alt="Ära protein coffee sachet, mug and box rendered in warm morning light"
        sizes="100vw"
        archX={50}
        priority
      >
        <p className={`ks-label ${styles.bandCaption}`}>Ära · 3D renders</p>
      </ArchWindow>

      {servicesContent.offerings.map((offering) => (
        <section className="ks-section" aria-labelledby={`service-${offering.number}`} key={offering.href}>
          <SectionHead
            index={offering.number}
            id={`service-${offering.number}`}
            title={offering.title}
            aside={<span className={`ks-it ${styles.kicker}`}>{offering.kicker}</span>}
          />
          <div className={styles.offering}>
            <Reveal className={styles.offeringCopy}>
              <LineArt className={styles.art} name={serviceIcon(offering.href)} />
              <p className="ks-lede">{offering.copy}</p>
              <p className={`ks-it ${styles.note}`}>{offering.note}</p>
              <Link className="ks-tlink" href={offering.href}>
                Full service details <span aria-hidden="true">↗</span>
              </Link>
            </Reveal>
            <IndexList items={offering.deliverables.map((item, index) => ({ key: item, lead: String(index + 1).padStart(2, "0"), name: item }))} />
          </div>
        </section>
      ))}

      <section className="ks-section" aria-labelledby="services-process-title">
        <SectionHead index="05" id="services-process-title" title={<>How we <em>work</em></>} />
        <ol className={styles.steps}>
          {servicesContent.delivery.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className="ks-num">{step.number}</span>
              <h3 className="ks-x ks-h3">{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ks-section" aria-labelledby="services-engagement-title">
        <SectionHead index="06" id="services-engagement-title" title={<>Two ways <em>in</em></>} />
        <div className={styles.engagements}>
          {[servicesContent.engagement.project, servicesContent.engagement.retainer].map((mode) => (
            <div className={styles.engagement} key={mode.title}>
              <h3 className="ks-x ks-h3">{mode.title}</h3>
              <p>{mode.copy}</p>
              <IndexList items={mode.points.map((point) => ({ key: point, name: point, lead: "·" }))} />
            </div>
          ))}
        </div>
      </section>

      <section className="ks-section" aria-labelledby="services-audit-title">
        <div className={styles.audit}>
          <LineArt className={styles.auditArt} name="arches" />
          <span className="ks-label">{auditOffer.title}</span>
          <h2 className="ks-x ks-h2" id="services-audit-title">
            Not sure where <em>to start?</em>
          </h2>
          <p>{auditOffer.summary}</p>
          <Cta href={auditOffer.href} data-analytics-cta="services-audit">
            {auditOffer.cta}
          </Cta>
        </div>
      </section>
    </div>
  );
}
