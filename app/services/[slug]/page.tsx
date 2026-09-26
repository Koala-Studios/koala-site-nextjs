import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { Folio, IndexList, SectionHead } from "@/components/system";
import { serviceIcon } from "@/components/system/Icons";
import { LineArt } from "@/components/system/LineArt";
import { WorkGrid } from "@/components/work/WorkGrid";
import { auditOffer } from "@/lib/content/audit";
import {
  getServiceDetail,
  serviceDetails,
} from "@/content/pages/service-details";
import { getPublishedCaseStudies, siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./service-detail.module.css";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

/** Render the headline lines, setting the accent word in the serif italic. */
function Headline({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line.split(" ").map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              {wordIndex > 0 ? " " : null}
              {word === accent ? <em>{word}</em> : word}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const all = getPublishedCaseStudies();
  const lead = all.find((caseStudy) => caseStudy.slug === service.caseSlug);
  const caseStudies = lead ? [lead, ...all.filter((caseStudy) => caseStudy !== lead)].slice(0, 6) : all.slice(0, 6);
  const number = String(serviceDetails.indexOf(service) + 1).padStart(2, "0");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navLabel,
    description: service.seoDescription,
    url: toAbsoluteUrl(`/services/${service.slug}`),
    serviceType: service.navLabel,
    provider: { "@type": "Organization", name: siteSettings.name, url: toAbsoluteUrl("/") },
    areaServed: ["Canada", "United States"],
  };

  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero} aria-labelledby="service-title">
        <Link className={`ks-label ${styles.back}`} href="/services">
          <ArrowIcon direction="left" /> All services
        </Link>
        <Folio items={[`No. ${number}`, "Services", <em className="ks-it" key="e">{service.eyebrow}</em>]} />
        <div className={styles.titleRow}>
          <h1 className={`ks-x ${styles.title}`} id="service-title">
            <Headline text={service.headline} accent={service.accent} />
          </h1>
          <LineArt className={styles.art} name={serviceIcon(service.slug)} />
        </div>
        <div className={styles.heroFoot}>
          <p className="ks-lede">{service.lede}</p>
          <div className={styles.actions}>
            <Cta href="/contact" data-analytics-cta="service-hero">
              Start a project
            </Cta>
            <Cta href={auditOffer.href} variant="text" data-analytics-cta="service-audit">
              Or get a free audit
            </Cta>
          </div>
        </div>
      </section>

      <section className="ks-section" aria-labelledby="service-deliverables-title">
        <SectionHead index="01" id="service-deliverables-title" title={<>What’s <em>included</em></>} />
        <IndexList className={styles.indent} items={service.deliverables.map((item, index) => ({ key: item, lead: String(index + 1).padStart(2, "0"), name: item }))} />
      </section>

      <section className="ks-section" aria-labelledby="service-steps-title">
        <SectionHead index="02" id="service-steps-title" title={<>How it <em>runs</em></>} />
        <ol className={styles.steps}>
          {service.steps.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className="ks-num">{step.number}</span>
              <h3 className="ks-x ks-h3">{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ks-section" aria-labelledby="service-fit-title">
        <SectionHead index="03" id="service-fit-title" title={<>For you <em>when…</em></>} />
        <ul className={`${styles.fit} ${styles.indent}`}>
          {service.fit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="ks-section" aria-labelledby="service-work-title">
        <SectionHead
          index="04"
          id="service-work-title"
          title={<>Selected <em>work</em></>}
          aside={
            <Link className="ks-tlink" href="/work">
              All work <span aria-hidden="true">↗</span>
            </Link>
          }
        />
        <WorkGrid caseStudies={caseStudies} variant="rail" />
      </section>

      <section className="ks-section" aria-labelledby="service-cta-title">
        <div className={styles.cta}>
          <h2 className="ks-x ks-h2" id="service-cta-title">
            {service.ctaTitle}
          </h2>
          <div className={styles.actions}>
            <Cta href="/contact" variant="light" data-analytics-cta="service-contact">
              Start a project
            </Cta>
            <Cta href={auditOffer.href} variant="text" data-analytics-cta="service-audit-footer">
              {auditOffer.cta}
            </Cta>
          </div>
        </div>
      </section>
    </div>
  );
}
