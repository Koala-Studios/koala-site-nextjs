import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { FreeAuditForm } from "@/components/audit/FreeAuditForm";
import { BrandsBuiltFor } from "@/components/brands/BrandsBuiltFor";
import { Cta } from "@/components/site/Cta";
import { Arch } from "@/components/system";
import { freeAuditPage } from "@/lib/content/audit";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./free-audit.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Free Shopify Website Audit for Supplement and Wellness Brands",
  description:
    "Send us your store and get a free PDF audit: the three to five things most likely costing you orders, with screenshots and a sketch of each fix.",
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
        <div className={styles.promiseWrap}>
          <ul className={styles.promise}>
            {freeAuditPage.promise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Image
            className={styles.heroImage}
            src="/images/audit/audit-printout.webp"
            alt="A printed store audit: phone screenshots with problems circled in red and a sketch of each fix"
            width={1536}
            height={1024}
            sizes="(max-width: 900px) 92vw, 46vw"
            priority
          />
        </div>
        <div className={styles.formPanel} id="audit-form">
          <h2 className="ks-x ks-h3">{freeAuditPage.formTitle}</h2>
          <Suspense fallback={<p className="ks-muted" style={{ minHeight: "22rem" }}>Loading the form…</p>}>
            <FreeAuditForm />
          </Suspense>
        </div>
      </section>

      <BrandsBuiltFor />

      <section className={styles.section} aria-labelledby="free-audit-sample-title">
        <h2 className={`ks-x ${styles.h2}`} id="free-audit-sample-title">
          {freeAuditPage.sampleTitle}
        </h2>
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

      <section className={styles.section} aria-labelledby="free-audit-steps-title">
        <h2 className={`ks-x ${styles.h2}`} id="free-audit-steps-title">
          How it <em>works</em>
        </h2>
        <div className={styles.stepsWrap}>
          <Arch
            className={styles.stepsArch}
            src="/images/audit/audit-phone.webp"
            alt="A phone showing the IRONVOLT store's ISO Whey product page"
            sizes="(max-width: 900px) 70vw, 22rem"
          />
          <ol className={styles.steps}>
            {freeAuditPage.steps.map((step, index) => (
              <li key={step.title}>
                <span className="ks-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="ks-x ks-h3">{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="free-audit-checks-title">
        <h2 className={`ks-x ${styles.h2}`} id="free-audit-checks-title">
          {freeAuditPage.checksTitle}
        </h2>
        <div className={styles.checksWrap}>
          <ol className={styles.checks}>
            {freeAuditPage.checks.map((item, index) => (
              <li key={item}>
                <span className="ks-label">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <Image
            className={styles.checksImage}
            src="/images/blog/ironvolt/trial-pack.jpg"
            alt="IRONVOLT Trial Pack carton with two single-serve sachets"
            width={800}
            height={800}
            sizes="(max-width: 900px) 70vw, 24rem"
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="free-audit-faq-title">
        <h2 className={`ks-x ${styles.h2}`} id="free-audit-faq-title">
          Fair <em>questions</em>
        </h2>
        <dl className={styles.faq}>
          {freeAuditPage.faq.map((item) => (
            <div key={item.q}>
              <dt className="ks-x ks-h3">{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.again}>
          <Image
            className={styles.againImage}
            src="/images/redesign/contact/koala-contact-paper-plane-v4-1500.webp"
            alt=""
            width={1500}
            height={938}
            sizes="(max-width: 900px) 92vw, 40vw"
          />
          <div className={styles.againCopy}>
            <p className="ks-lede">{freeAuditPage.againCopy}</p>
            <Cta href="#audit-form" data-analytics-cta="free-audit-bottom">
              {freeAuditPage.submitLabel}
            </Cta>
          </div>
        </div>
      </section>
    </div>
  );
}
