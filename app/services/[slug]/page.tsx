import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animation/Reveal";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { FeaturedWork } from "@/components/work/FeaturedWork";
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

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const caseStudies = getPublishedCaseStudies();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navLabel,
    description: service.seoDescription,
    url: toAbsoluteUrl(`/services/${service.slug}`),
    serviceType: service.navLabel,
    provider: {
      "@type": "Organization",
      name: siteSettings.name,
      url: toAbsoluteUrl("/"),
    },
    areaServed: ["Canada", "United States"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className={`koala-page ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, faqJsonLd]),
        }}
      />

      <section className={styles.hero} aria-labelledby="service-title">
        <Link
          className={`${styles.back} koala-underline-link`}
          href="/services"
        >
          <ArrowIcon direction="left" />
          All services
        </Link>
        <SplitReveal
          accents={[service.accent]}
          as="h1"
          className={styles.title}
          id="service-title"
          text={service.headline}
        />
        <Reveal delay={0.12}>
          <p className={styles.lede}>{service.lede}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <Magnetic>
            <Cta
              href="/contact"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              Start a project
            </Cta>
          </Magnetic>
        </Reveal>
      </section>

      <section className={styles.deliverables} aria-label="What's included">
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">What&apos;s included</p>
        </Reveal>
        <div className={styles.chipGrid}>
          {service.deliverables.map((item, index) => (
            <Reveal delay={index * 0.04} key={item}>
              <span className={styles.deliverable}>
                <span className={styles.deliverableIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.steps} aria-labelledby="service-steps-title">
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">How it runs</p>
          <h2 className="koala-section-title" id="service-steps-title">
            Our Process
          </h2>
        </Reveal>
        <div className={styles.stepGrid}>
          {service.steps.map((step, index) => (
            <Reveal
              className={styles.step}
              delay={index * 0.05}
              key={step.number}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepCopy}>{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.fit} aria-labelledby="service-fit-title">
        <Reveal className={styles.sectionHead}>
          <h2 className="koala-section-title" id="service-fit-title">
            This is for you when&hellip;
          </h2>
        </Reveal>
        <ul className={styles.fitList}>
          {service.fit.map((item, index) => (
            <Reveal delay={index * 0.04} key={item}>
              <li className={styles.fitItem}>{item}</li>
            </Reveal>
          ))}
        </ul>
      </section>

      <FeaturedWork caseStudies={caseStudies} id="service-work-title" />

      <section className={styles.faq} aria-labelledby="service-faq-title">
        <Reveal className={styles.sectionHead}>
          <p className="koala-eyebrow">Questions</p>
          <h2 className="koala-section-title" id="service-faq-title">
            Good to know.
          </h2>
        </Reveal>
        <div className={styles.faqList}>
          {service.faq.map((item, index) => (
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

      <section className={styles.cta} aria-labelledby="service-cta-title">
        <Reveal>
          <p className="koala-eyebrow">Next step</p>
          <h2 className={styles.ctaTitle} id="service-cta-title">
            {service.ctaTitle}
          </h2>
        </Reveal>
        <Reveal className={styles.ctaActions} delay={0.08}>
          <Magnetic>
            <Cta
              data-analytics-cta="service-contact"
              href="/contact"
              icon="circle"
              iconPosition="left"
              size="large"
              variant="transparent"
            >
              Contact Koala
            </Cta>
          </Magnetic>
          <Cta
            data-analytics-cta="service-audit"
            href="/contact"
            size="medium"
            variant="outlined"
          >
            Get a free audit
          </Cta>
        </Reveal>
      </section>
    </div>
  );
}
