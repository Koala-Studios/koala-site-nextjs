import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Cta } from "@/components/site/Cta";
import {
  getPublishedCaseStudies,
  navigationContent,
  pageContent,
  siteSettings,
} from "@/lib/content";
import { createNoIndexMetadata, createPageMetadata } from "@/lib/metadata";
import { getCaseStudyPath } from "@/lib/routes";

import { ForwardGradientHeader } from "./ForwardGradientTest";
import styles from "./page.module.css";

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: "Gradient Homepage Concept | Koala Studios",
    description:
      "A hidden Koala Studios homepage concept using the interactive Forward-style gradient as the page header.",
    path: "/internal/resend-forward-gradient",
  }),
);

export default function ResendForwardGradientTestPage() {
  const home = pageContent.home;
  const services = pageContent.services;
  const contact = pageContent.contact;
  const featuredCaseStudies = getPublishedCaseStudies().slice(0, 4);
  const [headlineLead, headlineRest = ""] = home.hero.headline.split(" that ");

  return (
    <div className={styles.page}>
      <ForwardGradientHeader>
        <div className={styles.headerShell}>
          <nav className={styles.headerNav} aria-label="Concept navigation">
            <Link className={styles.brand} href="/">
              {siteSettings.name}
            </Link>
            <div className={styles.navLinks}>
              {navigationContent.primary.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link className={styles.navAction} href={navigationContent.featuredCta.href}>
              {navigationContent.featuredCta.label}
            </Link>
          </nav>

          <div className={styles.hero}>
            <p className={styles.kicker}>{home.hero.eyebrow}</p>
            <h1 className={styles.title} id="concept-title">
              {headlineLead}
              {" "}
              {headlineRest ? <span>that {headlineRest}</span> : null}
            </h1>
            <p className={styles.summary}>{home.hero.summary}</p>
            <div className={styles.heroActions}>
              {home.hero.ctas.map((cta, index) => (
                <Cta
                  className={
                    index === 0 ? styles.heroPrimaryCta : styles.heroSecondaryCta
                  }
                  href={cta.href}
                  icon={index === 0 ? "circle" : "inline"}
                  iconPosition={index === 0 ? "left" : "right"}
                  key={cta.href}
                  size={index === 0 ? "large" : "medium"}
                  variant={index === 0 ? "transparent" : "outlined"}
                >
                  {cta.label}
                </Cta>
              ))}
            </div>
          </div>
        </div>
        <main className={styles.content} aria-label="Homepage concept content">
        <section className={styles.messageSection} aria-labelledby="message-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Homepage message</p>
            <h2 id="message-title">{home.body.sections[0]?.heading}</h2>
          </div>
          <div className={styles.messageGrid}>
            {home.body.sections.map((section) => (
              <article className={styles.messageItem} key={section.id}>
                <span>{section.id}</span>
                <h3>{section.heading}</h3>
                <p>{section.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionLabel}>Featured work</p>
              <h2 id="work-title">Proof that backs it up.</h2>
            </div>
            <Cta
              className={styles.contentCta}
              href="/work"
              size="medium"
              variant="outlined"
            >
              See all cases
            </Cta>
          </div>

          <div className={styles.workGrid}>
            {featuredCaseStudies.map((caseStudy) => {
              const image = caseStudy.cardImage ?? caseStudy.media[0];

              return (
                <Link
                  className={styles.workCard}
                  href={getCaseStudyPath(caseStudy.slug)}
                  key={caseStudy.slug}
                >
                  <Image
                    alt={image.alt}
                    className={styles.workImage}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    src={image.src}
                  />
                  <span className={styles.workMeta}>
                    <strong>{caseStudy.title}</strong>
                    <span>{caseStudy.category}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.splitSection} aria-labelledby="services-title">
          <div className={styles.splitCopy}>
            <p className={styles.sectionLabel}>{services.hero.eyebrow}</p>
            <h2 id="services-title">Design. Build. Launch.</h2>
            <p>{services.hero.summary}</p>
            <div className={styles.serviceList}>
              {services.body.sections.map((section) => (
                <article key={section.id}>
                  <h3>{section.heading}</h3>
                  <p>{section.copy}</p>
                </article>
              ))}
            </div>
            <Cta
              className={styles.contentCta}
              href="/services"
              size="medium"
              variant="outlined"
            >
              View services
            </Cta>
          </div>
          <div className={styles.splitImageWrap}>
            <Image
              alt="Agency desk setup showing design and code work"
              className={styles.splitImage}
              height={900}
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/images/redesign/services/koala-services-desk-1600.webp"
              unoptimized
              width={1600}
            />
          </div>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactImageWrap}>
            <Image
              alt="Paper plane visual representing a project inquiry"
              className={styles.contactImage}
              height={938}
              loading="eager"
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/images/redesign/contact/koala-contact-paper-plane-v4-1500.webp"
              unoptimized
              width={1500}
            />
          </div>
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}>{contact.hero.eyebrow}</p>
            <h2 id="contact-title">{contact.hero.headline}</h2>
            <p>{contact.hero.summary}</p>
            <Cta
              className={styles.contentPanelCta}
              href={navigationContent.featuredCta.href}
              icon="circle"
              iconPosition="left"
              shape="box"
              size="large"
              variant="outlinedPanel"
            >
              {navigationContent.featuredCta.label}
            </Cta>
          </div>
        </section>
        </main>
      </ForwardGradientHeader>
    </div>
  );
}
