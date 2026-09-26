import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { Stagger } from "@/components/animation/Stagger";
import { MetricValue } from "@/components/animation/MetricValue";
import { HeroReel } from "@/components/home/HeroReel";
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
import { titleFit } from "@/lib/title-fit";

import styles from "./maya.module.css";

export const metadata = createPageMetadata({
  title: "Maya Amani | Ecommerce Growth at Koala Studios",
  description:
    "Maya Amani, Chief Marketing & Growth Officer at Koala Studios. 15+ years growing consumer brands across CPG, food, supplements and wellness, from retail channels to Shopify, email and paid growth.",
  path: "/maya",
  image: maya.portraitShare,
});

const heroStats = [
  { value: "300+", label: "Canadian sales channels", source: "Allo Nutrition" },
  { value: "45%", label: "Increase in DTC revenue", source: "Iron Brothers" },
  { value: "37%", label: "Online revenue growth", source: "Nosh Balls" },
];

const growIcons: Record<string, IconName> = { visibility: "eye", store: "cart", email: "repeat" };

function brand(id: string) {
  return brands.find((item) => item.id === id)!;
}

export default function MayaPage() {
  const work = getCaseStudiesBySlugs(mayaWork);

  return (
    <div className={`ks-page ${styles.page}`}>
      {/* ---------- Hero: the studio reel, Maya's portrait set into its corner, then her name ---------- */}
      <section className={styles.hero} aria-labelledby="maya-title">
        <Folio items={["Koala Studios", maya.event?.greeting ?? "Consumer brands", "Growth"]} />
        <HeroReel
          className={styles.reel}
          label="Koala Studios reel: Shopify storefronts, product video and 3D work for Mercato di Bellina, Freezo, Wellth Foods, Whiskey Road and more"
        />
        <div className={styles.heroGrid}>
          <Arch className={styles.portrait} src={maya.portrait} alt="Maya Amani, Chief Marketing & Growth Officer at Koala Studios" sizes="(max-width: 900px) 50vw, 26vw" position="center 20%" priority />
          <div className={styles.nameFit}>
            <h1 className={`ks-x ${styles.name}`} id="maya-title" style={titleFit(maya.name, { oneLine: true })}>
              <span>{maya.name}</span>
            </h1>
          </div>
          <div className={styles.heroCopy}>
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
          </div>
          <StatRows className={styles.heroStats} items={heroStats} />
        </div>
      </section>

      {/* ---------- Brands ---------- */}
      <section className={styles.brands} aria-label="Brands Maya has helped grow">
        <Folio className={styles.brandsFolio} items={["Brands I’ve helped grow", "CPG · Food · Wellness"]} />
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
        <SectionHead id="maya-belief" title={<>More visibility. <em>More sales.</em></>} />
        <Reveal className={styles.belief}>
          <p className="ks-lede">{maya.belief[0]}</p>
          <p className="ks-body ks-muted">{maya.belief[1]}</p>
        </Reveal>
      </section>

      {/* ---------- Channels ---------- */}
      <section className="ks-section" aria-labelledby="maya-channels">
        <SectionHead id="maya-channels" title={<>Shelf <em>to cart</em></>} />
        <p className={`ks-lede ${styles.channelCopy}`}>{maya.channelCopy}</p>
        <Stagger as="ul" className={styles.channels} aria-label="Retail, distribution and marketplace experience">
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
        </Stagger>
      </section>

      {/* ---------- How we grow ---------- */}
      <section className="ks-section" aria-labelledby="maya-grow">
        <SectionHead id="maya-grow" title={<>How we <em>grow brands</em></>} />
        <div className={styles.grow}>
          <Arch className={styles.growArch} src="/images/project/allo/allo_image_wide.jpg" alt="Allo protein for coffee packaging on sand-coloured plinths" sizes="(max-width: 900px) 92vw, 34vw" position="55% center" />
          <Stagger className="ks-index">
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
          </Stagger>
        </div>
      </section>

      {/* ---------- Stories ---------- */}
      <section className="ks-section" aria-labelledby="maya-stories">
        <SectionHead id="maya-stories" title={<>Growth you can <em>measure</em></>} />
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
        <Stagger className={styles.engagements}>
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
        </Stagger>
      </section>

      {/* ---------- Work ---------- */}
      <section className="ks-section" aria-labelledby="maya-work">
        <SectionHead id="maya-work" title={<>Bring your brand <em>to life</em></>} />
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
