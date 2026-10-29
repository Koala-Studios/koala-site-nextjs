import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { Folio, SectionHead } from "@/components/system";
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

export default function AgenticSearchPage() {
  const { offer } = page;

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
        <Folio items={[page.hero.folio[0], page.hero.folio[1], <em className="ks-it" key="e">{page.hero.folio[2]}</em>]} />
        <div className={styles.heroGrid}>
          <h1 className={`ks-x ${styles.heroTitle}`} id="aso-title">
            <Title text={page.hero.headline} accent={page.hero.accent} />
          </h1>
          <div className={styles.heroCopy}>
            <p className={`ks-body ${styles.heroLede}`}>{page.hero.lede}</p>
            <div className={styles.actions}>
              <Cta href={offer.href} data-analytics-cta="service-hero">
                Request the free audit
              </Cta>
              <Cta href="#aso-included" variant="text" arrow={false}>
                See what’s included
              </Cta>
            </div>
            <p className={`ks-label ks-muted ${styles.heroNote}`}>{page.hero.note}</p>
          </div>
          <figure className={styles.heroMedia}>
            <Image
              src={page.hero.image.src}
              alt={page.hero.image.alt}
              fill
              priority
              sizes="(min-width: 900px) 52vw, 100vw"
            />
          </figure>
        </div>
      </section>

      {/* ---------- The question changed ---------- */}
      <section className="ks-section" aria-labelledby="aso-shift-title">
        <SectionHead index="01" id="aso-shift-title" title={<Title text={page.shift.title} accent={page.shift.accent} />} />
        <div className={styles.indent}>
          <p className={`ks-lede ${styles.shiftIntro}`}>{page.shift.intro}</p>
          <div className={styles.shift}>
            <div className={styles.shiftCard}>
              <span className="ks-label ks-muted">{page.shift.then.label}</span>
              <div className={styles.searchBox}>
                <SearchGlyph />
                <span>{page.shift.then.query}</span>
              </div>
              <ul className={styles.links} aria-hidden="true">
                <li /><li /><li /><li />
              </ul>
              <p className={styles.shiftResult}>{page.shift.then.result}</p>
            </div>
            <div className={`${styles.shiftCard} ${styles.shiftNow}`}>
              <span className="ks-label">{page.shift.now.label}</span>
              <p className={styles.bubble}>{page.shift.now.query}</p>
              <div className={styles.answer} aria-hidden="true">
                <span className={styles.answerLine} />
                <span className={styles.answerLine} />
                <div className={styles.answerPicks}>
                  <span /><span /><span />
                </div>
              </div>
              <p className={styles.shiftResult}>{page.shift.now.result}</p>
            </div>
          </div>
          <p className={`ks-quote ${styles.point}`}>{page.shift.point}</p>
        </div>
      </section>

      {/* ---------- What AI reads ---------- */}
      <section className="ks-section" aria-labelledby="aso-reads-title">
        <SectionHead index="02" id="aso-reads-title" title={<Title text={page.reads.title} accent={page.reads.accent} />} />
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
                  <h3 className="ks-x ks-h3">{point.title}</h3>
                  <p>{point.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section className="ks-section" aria-labelledby="aso-for-title">
        <SectionHead index="03" id="aso-for-title" title={<Title text={page.categories.title} accent={page.categories.accent} />} />
        <p className={`ks-lede ${styles.indent} ${styles.catIntro}`}>{page.categories.intro}</p>
        <ul className={styles.cats}>
          {page.categories.items.map((item) => (
            <li className={styles.cat} key={item.name}>
              <div className={styles.catMedia}>
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 900px) 24vw, (min-width: 600px) 48vw, 100vw" />
              </div>
              <h3 className="ks-label">{item.name}</h3>
              <p className={styles.catQuestion}>“{item.question}”</p>
            </li>
          ))}
        </ul>
        <p className={`ks-muted ${styles.fit}`}>{page.categories.fit}</p>
      </section>

      {/* ---------- What's included ---------- */}
      <section className="ks-section" aria-labelledby="aso-included-title" id="aso-included">
        <SectionHead index="04" id="aso-included-title" title={<Title text={page.included.title} accent={page.included.accent} />} />
        <div className={`${styles.tracks} ${styles.indent}`}>
          {page.included.tracks.map((track) => (
            <div className={styles.track} key={track.label}>
              <span className="ks-label">{track.label}</span>
              <ul>
                {track.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How it runs ---------- */}
      <section className="ks-section" aria-labelledby="aso-steps-title">
        <SectionHead index="05" id="aso-steps-title" title={<Title text={page.steps.title} accent={page.steps.accent} />} />
        <ol className={`${styles.steps} ${styles.indent}`}>
          {page.steps.items.map((step) => (
            <li className={styles.step} key={step.number}>
              <span className="ks-num">{step.number}</span>
              <h3 className="ks-x ks-h3">{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Free audit ---------- */}
      <section className="ks-section" aria-labelledby="aso-audit-title">
        <div className={styles.audit}>
          <figure className={styles.auditMedia}>
            <Image src={page.audit.image.src} alt={page.audit.image.alt} fill sizes="(min-width: 900px) 50vw, 100vw" />
          </figure>
          <div className={styles.auditCopy}>
            <span className="ks-label">{page.audit.label}</span>
            <h2 className="ks-x ks-h2" id="aso-audit-title">
              <Title text={page.audit.title} accent={page.audit.accent} />
            </h2>
            <p>We check:</p>
            <ul className={styles.checks}>
              {page.audit.checks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.outcome}>{page.audit.outcome}</p>
            <Cta href={offer.href} data-analytics-cta="service-audit-offer">
              {offer.cta}
            </Cta>
            <p className={`ks-muted ${styles.small}`}>{offer.qualification}</p>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="ks-section" aria-labelledby="aso-faq-title">
        <SectionHead index="06" id="aso-faq-title" title={<Title text={page.faq.title} accent={page.faq.accent} />} />
        <div className={`${styles.faq} ${styles.indent}`}>
          {page.faq.items.map((item) => (
            <details className={styles.faqItem} key={item.q}>
              <summary>
                <span className="ks-x">{item.q}</span>
                <span aria-hidden="true" className={styles.faqIcon} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="ks-section" aria-labelledby="aso-cta-title">
        <div className={styles.cta}>
          <div className={styles.ctaMedia}>
            <Image src={page.cta.image.src} alt="" fill sizes="100vw" />
          </div>
          <div className={styles.ctaCopy}>
            <h2 className="ks-x ks-h2" id="aso-cta-title">
              <Title text={page.cta.title} accent={page.cta.accent} />
            </h2>
            <p>{page.cta.copy}</p>
            <Cta href={offer.href} variant="light" data-analytics-cta="service-contact">
              Request the free audit
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
