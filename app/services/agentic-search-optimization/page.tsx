import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Cta } from "@/components/site/Cta";
import { Arch } from "@/components/system";
import { LineArt } from "@/components/system/LineArt";
import { asoExample, asoPage, asoSources } from "@/lib/content/aso";
import { createPageMetadata } from "@/lib/metadata";
import { toAbsoluteUrl } from "@/lib/routes";

import styles from "./aso.module.css";

export const metadata: Metadata = createPageMetadata({
  title: asoPage.seoTitle,
  description: asoPage.seoDescription,
  path: asoPage.path,
  keywords: ["Agentic Search Optimization", "ChatGPT shopping", "Shopify agentic storefronts", "AI shopping"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: asoPage.navLabel,
  serviceType: "Agentic Search Optimization",
  description: asoPage.seoDescription,
  url: toAbsoluteUrl(asoPage.path),
  provider: { "@type": "Organization", name: "Koala Studios", url: toAbsoluteUrl("/") },
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" },
  ],
};

function Source({ id }: { id: keyof Omit<typeof asoSources, "checked"> }) {
  const source = asoSources[id];
  return (
    <a className={styles.source} href={source.href} target="_blank" rel="noreferrer">
      {source.label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function AgenticSearchOptimizationPage() {
  const { hero, why, reads, fixes, steps, faq, closing } = asoPage;

  return (
    <div className={`ks-page ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero} aria-labelledby="aso-title">
        <div className={styles.heroCopy}>
          <h1 className={`ks-x ${styles.title}`} id="aso-title">
            {hero.title} <em>{hero.accent}</em>
          </h1>
          <p className="ks-lede">{hero.lede}</p>
          <div className={styles.actions}>
            <Cta href={asoPage.ctaHref} data-analytics-cta="aso-hero">
              {asoPage.cta}
            </Cta>
            <Cta href="#aso-fixes" variant="text" arrow={false}>
              See what we fix
            </Cta>
          </div>
        </div>
        <Arch
          className={styles.heroArch}
          src="/images/aso/aso-closing.webp"
          alt="IRONVOLT ISO Whey tub and shaker on a concrete step in morning light"
          sizes="(max-width: 900px) 92vw, 34vw"
          priority
        />
      </section>

      <section className={styles.section} aria-labelledby="aso-why">
        <h2 className={`ks-x ${styles.h2}`} id="aso-why">
          {why.title} <em>{why.accent}</em>
        </h2>
        <div className={styles.why}>
          <figure className={styles.whyImage}>
            <Image
              src="/images/aso/store-on-phone.webp"
              alt="IRONVOLT tubs, shaker and a phone showing the store's product page on concrete"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 92vw, 46vw"
              loading="eager"
            />
          </figure>
          <dl className={styles.facts}>
            {why.facts.map((fact) => (
              <div className={styles.fact} key={fact.value}>
                <dt className="ks-x">{fact.value}</dt>
                <dd>
                  {fact.copy} <Source id={fact.source} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="aso-reads">
        <h2 className={`ks-x ${styles.h2}`} id="aso-reads">
          {reads.title} <em>{reads.accent}</em>
        </h2>
        <div className={styles.reads}>
          <p className={`ks-lede ${styles.readsCopy}`}>
            {reads.copy} <Source id="shopifyCatalog" />
          </p>
          <Reveal className={styles.record}>
            <div className={styles.recordHead}>
              <Image src="/images/blog/ironvolt/iso-whey.jpg" alt="IRONVOLT ISO Whey Chocolate tub" width={96} height={96} sizes="96px" loading="eager" />
              <span>
                <span className={styles.recordName}>IRONVOLT · ISO Whey</span>
                <span className={styles.recordMeta}>
                  {asoExample.price} · {asoExample.availability}
                </span>
              </span>
            </div>
            <div className={styles.recordCols}>
              <div>
                <span className={`${styles.tag} ${styles.tagBefore}`}>What AI gets today</span>
                <dl>
                  {asoExample.before.map((row) => (
                    <div key={row.field}>
                      <dt>{row.field}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <span className={`${styles.tag} ${styles.tagAfter}`}>After we fix it</span>
                <dl>
                  {asoExample.after.map((row) => (
                    <div key={row.field}>
                      <dt>{row.field}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className={styles.recordFoot}>IRONVOLT is our demo store for examples.</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="aso-fixes-title" id="aso-fixes">
        <h2 className={`ks-x ${styles.h2}`} id="aso-fixes-title">
          {fixes.title} <em>{fixes.accent}</em>
        </h2>
        <figure className={styles.lineup}>
          <Image
            src="/images/aso/aso-lineup.webp"
            alt="Five IRONVOLT ISO Whey flavours in a row: chocolate, vanilla, strawberry, cookies and cream, mint chip"
            width={1672}
            height={941}
            sizes="(max-width: 1440px) 92vw, 84rem" loading="eager"
          />
        </figure>
        <ol className={styles.fixes}>
          {fixes.items.map((item, index) => (
            <li key={item}>
              <span className="ks-label">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="aso-steps">
        <h2 className={`ks-x ${styles.h2}`} id="aso-steps">
          {steps.title} <em>{steps.accent}</em>
        </h2>
        <div className={styles.stepsWrap}>
          <figure className={styles.stepsImage}>
            <Image
              src="/images/aso/aso-desk.webp"
              alt="A printed ISO Whey product sheet corrected in red pen beside an IRONVOLT tub"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 92vw, 44vw" loading="eager"
            />
          </figure>
          <ol className={styles.steps}>
            {steps.items.map((step, index) => (
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

      <section className={styles.section} aria-labelledby="aso-faq">
        <h2 className={`ks-x ${styles.h2}`} id="aso-faq">
          {faq.title} <em>{faq.accent}</em>
        </h2>
        <div className={styles.faqWrap}>
          <Arch className={styles.faqArch} src="/images/aso/aso-label.webp" alt="Side label of an IRONVOLT tub: 25 g protein per scoop, 30 servings" sizes="(max-width: 900px) 60vw, 24vw" />
          <dl className={styles.faq}>
            {faq.items.map((item) => (
              <div key={item.q}>
                <dt className="ks-x ks-h3">{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="aso-closing">
        <div className={styles.closing}>
          <LineArt className={styles.closingArt} name="arches" />
          <h2 className={`ks-x ${styles.h2}`} id="aso-closing">
            {closing.title} <em>{closing.accent}</em>
          </h2>
          <p>{closing.copy}</p>
          <Cta href={asoPage.ctaHref} data-analytics-cta="aso-closing">
            {asoPage.cta}
          </Cta>
          <p className={styles.checked}>
            Platform facts from the Shopify and OpenAI help centres, checked {asoSources.checked}.
          </p>
        </div>
      </section>
    </div>
  );
}
