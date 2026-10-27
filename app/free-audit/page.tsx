import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { FreeAuditForm } from "@/components/audit/FreeAuditForm";
import { BrandsBuiltFor } from "@/components/brands/BrandsBuiltFor";
import { Cta } from "@/components/site/Cta";
import { IndexList, SectionHead } from "@/components/system";
import { freeAuditPage } from "@/lib/content/audit";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./free-audit.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Free Shopify Website Audit for Supplement and Wellness Brands",
  description:
    "Send us your store and get a free PDF audit within two working days: the three to five things most likely costing you orders, with screenshots and a sketch of each fix.",
  path: "/free-audit",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free website audit",
  description: freeAuditPage.lede,
  url: toAbsoluteUrl("/free-audit"),
  provider: { "@type": "Organization", name: "Koala Studios", url: toAbsoluteUrl("/") },
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
};

export default function FreeAuditPage() {
  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero} aria-labelledby="free-audit-title">
        <div className={styles.heroCopy}>
          <h1 className={`ks-x ${styles.title}`} id="free-audit-title">
            {freeAuditPage.title} <em>{freeAuditPage.titleAccent}</em>
          </h1>
          <p className="ks-lede">{freeAuditPage.lede}</p>
        </div>
        <ul className={styles.promise}>
          {freeAuditPage.promise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className={styles.formPanel} id="audit-form">
          <h2 className="ks-x ks-h3">{freeAuditPage.formTitle}</h2>
          <Suspense fallback={<p className="ks-muted" style={{ minHeight: "22rem" }}>Loading the form…</p>}>
            <FreeAuditForm />
          </Suspense>
        </div>
      </section>

      <BrandsBuiltFor />

      <section className="ks-section" aria-labelledby="free-audit-sample-title">
        <SectionHead id="free-audit-sample-title" title={freeAuditPage.sampleTitle} />
        <div className={styles.sample}>
          <p className={`ks-body ${styles.sampleCopy}`}>{freeAuditPage.sampleCopy}</p>
          <figure className={styles.page}>
            <p className={styles.pageTitle}>Put the bestseller in the sample pack.</p>
            <div className={styles.pair}>
              <div>
                <span className={styles.tag}>Before</span>
                <Image
                  alt="IRONVOLT sample pack with vanilla, strawberry, cookies and cream and mint chip, without chocolate"
                  height={800}
                  sizes="(max-width: 900px) 45vw, 28vw"
                  src="/images/blog/ironvolt/sample-pack-before.jpg"
                  width={800}
                />
                <figcaption>Four flavours, none of them the bestseller.</figcaption>
              </div>
              <div>
                <span className={styles.tag}>After</span>
                <Image
                  alt="IRONVOLT sample pack with chocolate, vanilla, strawberry and cookies and cream"
                  height={800}
                  sizes="(max-width: 900px) 45vw, 28vw"
                  src="/images/blog/ironvolt/sample-pack-after.jpg"
                  width={800}
                />
                <figcaption>Chocolate in, with the full tub one tap away.</figcaption>
              </div>
            </div>
            <p className={styles.pageFoot}>
              <span>IRONVOLT · demo store</span>
              <span>Koala Studios</span>
            </p>
          </figure>
        </div>
      </section>

      <section className="ks-section" aria-labelledby="free-audit-steps-title">
        <SectionHead id="free-audit-steps-title" title={<>How it <em>works</em></>} />
        <ol className={styles.steps}>
          {freeAuditPage.steps.map((step, index) => (
            <li key={step.title}>
              <span className="ks-num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="ks-x ks-h3">{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ks-section" aria-labelledby="free-audit-checks-title">
        <SectionHead id="free-audit-checks-title" title={freeAuditPage.checksTitle} />
        <IndexList items={freeAuditPage.checks.map((item, index) => ({ key: item, lead: String(index + 1).padStart(2, "0"), name: item }))} />
      </section>

      <section className="ks-section" aria-labelledby="free-audit-faq-title">
        <SectionHead id="free-audit-faq-title" title={<>Fair <em>questions</em></>} />
        <dl className={styles.faq}>
          {freeAuditPage.faq.map((item) => (
            <div key={item.q}>
              <dt className="ks-x ks-h3">{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.again}>
          <Cta href="#audit-form" data-analytics-cta="free-audit-bottom">
            {freeAuditPage.submitLabel}
          </Cta>
        </div>
      </section>
    </div>
  );
}
