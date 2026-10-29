import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { agenticSearchPage as page } from "@/content/pages/agentic-search";
import { getServiceDetail } from "@/content/pages/service-details";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./agentic-search.module.css";

const SLUG = "agentic-search-optimization";
const service = getServiceDetail(SLUG)!;

export const metadata: Metadata = createPageMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: `/services/${SLUG}`,
});

/** Caps lines with the accent word set in the serif italic. */
function Title({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split("\n").map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}{" "}
      <em>{accent}</em>
    </>
  );
}

/** Section heading: small green label over a one-line title, no rule. */
function Head({ id, label, title, accent, children }: { id: string; label: string; title: string; accent: string; children?: ReactNode }) {
  return (
    <div className={styles.head}>
      <span className={`ks-label ${styles.eyebrow}`}>{label}</span>
      <h2 className={`ks-x ${styles.h2}`} id={id}>
        <Title text={title} accent={accent} />
      </h2>
      {children}
    </div>
  );
}

export default function AgenticSearchPage() {
  const { offer, ctaLabel } = page;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.navLabel,
      description: service.seoDescription,
      url: toAbsoluteUrl(`/services/${SLUG}`),
      serviceType: service.navLabel,
      provider: { "@type": "Organization", name: siteSettings.name, url: toAbsoluteUrl("/") },
      areaServed: ["Canada", "United States"],
      audience: { "@type": "BusinessAudience", name: "Shopify consumer brands" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="aso-title">
        <Link className={`ks-label ${styles.back}`} href="/services">
          <ArrowIcon direction="left" /> All services
        </Link>
        <span className={`ks-label ${styles.eyebrow} ${styles.heroLabel}`}>{page.hero.label}</span>
        <h1 className={`ks-x ${styles.heroTitle}`} id="aso-title">
          <Title text={page.hero.headline} accent={page.hero.accent} />
        </h1>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.heroLede}>{page.hero.lede}</p>
            <ul className={styles.ticks}>
              {page.hero.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Cta href={offer.href} data-analytics-cta="service-hero">
                {ctaLabel}
              </Cta>
              <Cta href="#aso-included" variant="text" arrow={false}>
                See what you get
              </Cta>
            </div>
          </div>
          <figure className={styles.heroMedia}>
            <Image src={page.hero.image.src} alt={page.hero.image.alt} fill priority sizes="(min-width: 900px) 50vw, 100vw" />
          </figure>
        </div>
      </section>

      {/* ---------- The question changed ---------- */}
      <section className={styles.section} aria-labelledby="aso-shift-title">
        <Head id="aso-shift-title" label={page.shift.label} title={page.shift.title} accent={page.shift.accent} />
        <div className={styles.shift}>
          <div className={styles.shiftCard}>
            <span className="ks-label ks-muted">{page.shift.then.label}</span>
            <div className={styles.searchBox}>
              <SearchGlyph />
              <span>{page.shift.then.query}</span>
            </div>
            <p className={styles.shiftResult}>{page.shift.then.result}</p>
          </div>
          <div className={`${styles.shiftCard} ${styles.shiftNow}`}>
            <span className="ks-label">{page.shift.now.label}</span>
            <p className={styles.bubble}>{page.shift.now.query}</p>
            <p className={styles.shiftResult}>{page.shift.now.result}</p>
          </div>
          <p className={styles.point}>{page.shift.point}</p>
        </div>
      </section>

      {/* ---------- What AI can read ---------- */}
      <section className={styles.section} aria-labelledby="aso-reads-title">
        <Head id="aso-reads-title" label={page.reads.label} title={page.reads.title} accent={page.reads.accent} />
        <div className={styles.reads}>
          <figure className={styles.readsMedia}>
            <Image src={page.reads.image.src} alt={page.reads.image.alt} fill sizes="(min-width: 900px) 58vw, 100vw" />
            {page.reads.points.map((point, index) => (
              <span
                aria-hidden="true"
                className={styles.pin}
                key={point.title}
                style={{ left: `${point.pin.x}%`, top: `${point.pin.y}%` }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </figure>
          <ol className={styles.readsList}>
            {page.reads.points.map((point, index) => (
              <li key={point.title}>
                <span className="ks-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={`ks-x ${styles.h3}`}>{point.title}</h3>
                  <p>{point.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section className={styles.section} aria-labelledby="aso-for-title">
        <Head id="aso-for-title" label={page.brands.label} title={page.brands.title} accent={page.brands.accent} />
        <ul className={styles.brands}>
          {page.brands.items.map((item) => (
            <li className={styles.brand} key={item.brand}>
              <div className={styles.brandMedia}>
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1000px) 19vw, 70vw" />
              </div>
              <p className={styles.brandMeta}>
                <span className="ks-x">{item.brand}</span>
                <span className="ks-label ks-muted">{item.category}</span>
              </p>
              <p className={styles.brandQuestion}>“{item.question}”</p>
            </li>
          ))}
        </ul>
        <p className={`ks-muted ${styles.small}`}>{page.brands.note}</p>
      </section>

      {/* ---------- What you get ---------- */}
      <section className={styles.section} aria-labelledby="aso-included-title" id="aso-included">
        <Head id="aso-included-title" label={page.included.label} title={page.included.title} accent={page.included.accent} />
        <div className={styles.tracks}>
          {page.included.tracks.map((track, index) => (
            <div className={styles.track} key={track.title}>
              <span className="ks-num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className={`ks-x ${styles.h3}`}>{track.title}</h3>
              <ul>
                {track.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ol className={styles.steps} aria-label="How it works">
          {page.included.steps.map((step) => (
            <li key={step.number}>
              <span className="ks-label">{step.number}</span>
              <strong className="ks-x">{step.title}</strong>
              <span className={styles.stepCopy}>{step.copy}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Free audit ---------- */}
      <section className={styles.section} aria-labelledby="aso-audit-title">
        <div className={styles.audit}>
          <figure className={styles.auditMedia}>
            <Image src={page.audit.image.src} alt={page.audit.image.alt} fill sizes="(min-width: 900px) 50vw, 100vw" />
          </figure>
          <div className={styles.auditCopy}>
            <span className={`ks-label ${styles.eyebrow}`}>{page.audit.label}</span>
            <h2 className={`ks-x ${styles.h2}`} id="aso-audit-title">
              <Title text={page.audit.title} accent={page.audit.accent} />
            </h2>
            <ul className={styles.ticks}>
              {page.audit.checks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.outcome}>{page.audit.outcome}</p>
            <Cta href={offer.href} data-analytics-cta="service-audit-offer">
              {ctaLabel}
            </Cta>
            <p className={`ks-muted ${styles.small}`}>{offer.qualification}</p>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.section} aria-labelledby="aso-faq-title">
        <div className={styles.faqGrid}>
          <Head id="aso-faq-title" label={page.faq.label} title={page.faq.title} accent={page.faq.accent} />
          <div className={styles.faq}>
            {page.faq.items.map((item) => (
              <details className={styles.faqItem} key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <span aria-hidden="true" className={styles.faqIcon} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className={styles.section} aria-labelledby="aso-cta-title">
        <div className={styles.cta}>
          <div className={styles.ctaMedia}>
            <Image src={page.cta.image.src} alt="" fill sizes="100vw" />
          </div>
          <div className={styles.ctaCopy}>
            <h2 className={`ks-x ${styles.h2}`} id="aso-cta-title">
              <Title text={page.cta.title} accent={page.cta.accent} />
            </h2>
            <p>{page.cta.copy}</p>
            <Cta href={offer.href} variant="light" data-analytics-cta="service-contact">
              {ctaLabel}
            </Cta>
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m20 20-4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}
