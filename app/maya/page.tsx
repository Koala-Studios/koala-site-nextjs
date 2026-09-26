import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { MetricValue } from "@/components/animation/MetricValue";
import { Cta } from "@/components/site/Cta";
import { Marquee } from "@/components/site/Marquee";
import { Arch, Folio, SectionHead, StatRows } from "@/components/system";
import type { IconName } from "@/components/system/Icons";
import { Icon } from "@/components/system/Icons";
import { LineArt } from "@/components/system/LineArt";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getCaseStudiesBySlugs } from "@/lib/content";
import { auditOffer } from "@/lib/content/audit";
import { mayaContent as maya, mayaWork } from "@/lib/content/maya";
import { brands, channels } from "@/lib/content/maya-brands.json";
import { createPageMetadata } from "@/lib/metadata";

import styles from "./maya.module.css";

export const metadata = createPageMetadata({
  title: "Maya Amani | Ecommerce Growth at Koala Studios",
  description:
    "Maya Amani, Chief Marketing & Growth Officer at Koala Studios. 15+ years growing consumer brands across CPG, food, supplements and wellness, from retail channels to Shopify, email and paid growth.",
  path: "/maya",
  image: maya.portrait,
});

const heroStats = [
  { value: "300+", label: "Canadian sales channels", source: "Allo Nutrition" },
  { value: "45%", label: "Increase in DTC revenue", source: "Iron Brothers" },
  { value: "37%", label: "Online revenue growth", source: "Nosh Balls" },
  { value: "15+", label: "Years growing consumer brands", source: "CPG, food and wellness" },
];

const growIcons: Record<string, IconName> = { visibility: "eye", store: "cart", email: "repeat" };

function brand(id: string) {
  return brands.find((item) => item.id === id)!;
}

export default function MayaPage() {
  const work = getCaseStudiesBySlugs(mayaWork);

  return (
    <div className="ks-page">
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="maya-title">
        <Folio items={["Koala Studios", maya.event?.greeting ?? "Consumer brands", "Growth"]} />
        <div className={styles.heroGrid}>
          <Arch className={styles.portrait} src={maya.portrait} alt="Maya Amani, Chief Marketing & Growth Officer at Koala Studios" sizes="(max-width: 900px) 92vw, 40vw" position="center 18%" priority />
          <div className={styles.heroCopy}>
            <h1 className={`ks-x ${styles.name}`} id="maya-title">
              Maya <br />
              Amani
            </h1>
            <p className={`ks-it ${styles.role}`}>{maya.title}</p>
            <p className="ks-lede">
              15+ years taking consumer brands from <em>shelf to cart</em> across CPG, food, supplements and wellness.
            </p>
            <div className={styles.actions}>
              <Cta href={auditOffer.mayaHref} fullWidth data-analytics-cta="maya-hero">
                Get your free audit
              </Cta>
              <Cta href={maya.profile} variant="text" target="_blank" rel="noreferrer">
                Download my profile
              </Cta>
            </div>
            <StatRows className={styles.heroStats} items={heroStats} />
          </div>
        </div>
      </section>

      {/* ---------- Brands ---------- */}
      <section className={`ks-section ${styles.brands}`} aria-label="Brands Maya has helped grow">
        <Folio items={["Brands I’ve helped grow", "CPG · Food · Wellness"]} />
        <Marquee className={styles.marquee} duration={50}>
          {brands.map((item) => (
            <span className={styles.brandMark} key={item.id}>
              <Image src={item.logo} alt={`${item.name} logo`} width={180} height={72} sizes="160px" loading="eager" />
              <span className="ks-it">{item.description}</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- Belief ---------- */}
      <section className="ks-section" aria-labelledby="maya-belief">
        <SectionHead index="01" id="maya-belief" title={<>More visibility. <em>More sales.</em></>} />
        <Reveal className={styles.twoCol}>
          {maya.belief.map((copy) => (
            <p className="ks-body" key={copy}>
              {copy}
            </p>
          ))}
        </Reveal>
      </section>

      {/* ---------- Channels ---------- */}
      <section className="ks-section" aria-labelledby="maya-channels">
        <SectionHead index="02" id="maya-channels" title={<>Shelf <em>to cart</em></>} />
        <p className={`ks-lede ${styles.channelCopy}`}>{maya.channelCopy}</p>
        <ul className={styles.channels} aria-label="Retail, distribution and marketplace experience">
          {channels.map((channel) => (
            <li className={styles.channel} data-channel={channel.id} key={channel.id}>
              <Image src={channel.logo} alt={`${channel.name} logo`} width={150} height={60} sizes="150px" />
              <span className="ks-label ks-muted">{channel.description}</span>
            </li>
          ))}
          <li className={styles.channel}>
            <Image src="/images/maya/brands/shopify.svg" alt="Shopify logo" width={150} height={60} sizes="150px" />
            <span className="ks-label ks-muted">Direct to consumer</span>
          </li>
        </ul>
      </section>

      {/* ---------- How we grow ---------- */}
      <section className="ks-section" aria-labelledby="maya-grow">
        <SectionHead index="03" id="maya-grow" title={<>How we <em>grow brands</em></>} />
        <div className={styles.grow}>
          <Arch className={styles.growArch} src="/images/project/allo/allo_image_wide.jpg" alt="Allo protein for coffee packaging on sand-coloured plinths" sizes="(max-width: 900px) 92vw, 34vw" position="55% center" />
          <div className="ks-index">
            {maya.services.map((service, index) => (
              <div className={`ks-index__row ${styles.growRow}`} key={service.title}>
                <span className="ks-label">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className={styles.growTitle}>
                    <Icon name={growIcons[service.icon] ?? "arch"} />
                    <span className="ks-x ks-index__name">{service.title}</span>
                  </span>
                  <span className={styles.growCopy}>{service.copy}</span>
                </span>
                <span />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Stories ---------- */}
      <section className="ks-section" aria-labelledby="maya-stories">
        <SectionHead index="04" id="maya-stories" title={<>Growth you can <em>measure</em></>} />
        <div className={styles.stories}>
          {maya.stories.map((story) => {
            const item = brand(story.brand);
            return (
              <Reveal className={styles.story} key={story.brand}>
                <div className={styles.storyHead}>
                  <Image className={styles.storyLogo} src={item.logo} alt={`${item.name} logo`} width={140} height={56} sizes="120px" />
                  <span>
                    <span className="ks-x ks-h3">{item.name}</span>
                    <span className="ks-it ks-muted">{item.description}</span>
                  </span>
                </div>
                <div className={styles.storyMetric}>
                  <strong className="ks-num">
                    <MetricValue value={story.metric} />
                  </strong>
                  <span>
                    {story.metricLabel}
                    <em>{story.secondary}</em>
                  </span>
                </div>
                <ul className={styles.bullets}>
                  {story.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <div className={styles.engagements}>
          {maya.engagements.map((engagement) => {
            const item = brand(engagement.brand);
            return (
              <div className={styles.engagement} key={engagement.brand}>
                <span className="ks-label">{item.name}</span>
                <h3 className="ks-it">{engagement.title}</h3>
                <p className="ks-muted">{engagement.copy}</p>
              </div>
            );
          })}
          <div className={styles.engagement}>
            <span className="ks-label">Magnum Nutraceuticals</span>
            <h3 className="ks-it">
              <span className="ks-num">303%</span> ecommerce revenue growth.
            </h3>
            <p className="ks-muted">Sports nutrition and supplements.</p>
          </div>
        </div>
      </section>

      {/* ---------- Work ---------- */}
      <section className="ks-section" aria-labelledby="maya-work">
        <SectionHead index="05" id="maya-work" title={<>Bring your brand <em>to life</em></>} />
        <p className={`ks-lede ${styles.channelCopy}`}>{maya.brandLife.copy}</p>
        <WorkGrid caseStudies={work} variant="rail" />
      </section>

      {/* ---------- Closing ---------- */}
      <section className="ks-section" aria-labelledby="maya-audit">
        <div className={styles.closing}>
          <LineArt className={styles.closingArt} name="arches" />
          <span className="ks-label">{auditOffer.title}</span>
          <h2 className="ks-x ks-h2" id="maya-audit">
            {maya.event ? (
              <>
                {maya.event.closing} <em>Let’s keep talking.</em>
              </>
            ) : (
              <>
                Unlock your next stage of <em>ecommerce growth.</em>
              </>
            )}
          </h2>
          <p>{maya.auditSummary}</p>
          <div className={styles.closingActions}>
            <Cta href={auditOffer.mayaHref} variant="light" data-analytics-cta="maya-closing">
              Book your free audit
            </Cta>
            <a className="ks-tlink" href={`mailto:${maya.email}`} data-contact-method="email">
              {maya.email}
            </a>
            <a className="ks-tlink" href={maya.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
