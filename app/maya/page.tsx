import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { MetricValue } from "@/components/animation/MetricValue";
import { Marquee } from "@/components/site/Marquee";
import { LinkedInButton } from "./LinkedInButton";
import { Cta } from "@/components/site/Cta";
import { auditOffer } from "@/lib/content/audit";
import { mayaContent as maya } from "@/lib/content/maya";
import { brands, channels } from "@/lib/content/maya-brands.json";
import { createPageMetadata } from "@/lib/metadata";
import { MayaHeadline, MayaPortrait } from "./MayaHero";
import { GrowthIcon } from "./GrowthIcon";
import styles from "./maya.module.css";

export const metadata = createPageMetadata({
  title: "Maya Amani | Ecommerce Growth at Koala Studios",
  description: "Elevate your brand and grow ecommerce sales with Maya Amani at Koala Studios. Brand development, website optimization and email marketing for consumer brands.",
  path: "/maya", image: maya.portrait,
});
function AuditButton({ placement }: { placement: string }) {
  return <Cta className={styles.auditButton} href={auditOffer.mayaHref} variant="full" data-analytics-cta={`maya-${placement}`}>{auditOffer.cta}</Cta>;
}
function BrandIdentity({ id }: { id: string }) {
  const brand = brands.find(item => item.id === id)!;
  return <div className={styles.brandIdentity}><div className={styles.brandLogo}><Image src={brand.logo} alt={`${brand.name} logo`} width={180} height={72} sizes="180px" /></div><div><h3>{brand.name}</h3><p>{brand.description}</p></div></div>;
}
export default function MayaPage() {
  return <div className={`koala-page ${styles.page}`}>
    <section className={styles.hero} aria-labelledby="maya-title">
      <div className={styles.heroCopy}><MayaHeadline /><p className={styles.heroSummary}>{maya.heroSummary}</p><AuditButton placement="hero" /></div>
      <MayaPortrait />
    </section>
    <section className={styles.brandShowcase} aria-label="Selected brand experience">
      <Marquee duration={55}>{brands.map(brand => <div className={styles.brandMark} key={brand.id}><Image src={brand.logo} alt={`${brand.name} logo`} width={180} height={72} sizes="180px" loading="eager" /><span>{brand.description}</span></div>)}</Marquee>
    </section>
    <section className={styles.belief} aria-labelledby="maya-belief">
      <Reveal><h2 id="maya-belief">{maya.beliefTitle}</h2></Reveal>
      <Reveal className={styles.beliefBody}>{maya.belief.map(copy => <p key={copy}>{copy}</p>)}<a className={styles.profileLink} href={maya.profile} target="_blank" rel="noreferrer">View my executive profile <span aria-hidden="true">↗</span></a></Reveal>
    </section>
    <section className={styles.channels} aria-labelledby="maya-channels"><div><h2 id="maya-channels">{maya.channelTitle}</h2><p>{maya.channelCopy}</p></div><div className={styles.channelGrid}>{channels.map(channel => <div key={channel.id} className={styles.channelMark} data-channel={channel.id}><div><Image src={channel.logo} alt={`${channel.name} logo`} width={150} height={60} sizes="150px" /></div></div>)}<a className={styles.channelMark} href="https://www.shopify.com/" aria-label="Shopify"><div><Image src="/images/maya/brands/shopify.svg" alt="Shopify logo" width={150} height={60} sizes="150px" /></div></a></div></section>
    <section className={styles.growthServices} aria-label="How we grow ecommerce revenue">
      {maya.services.map(service => <Reveal key={service.title}><GrowthIcon kind={service.icon} /><h2>{service.title}</h2><p>{service.copy}</p></Reveal>)}
    </section>
    <section className={styles.brandLife} aria-labelledby="maya-brand-life">
      <div className={styles.brandLifeIntro}><Reveal><h2 id="maya-brand-life">{maya.brandLife.title}</h2></Reveal><Reveal><p>{maya.brandLife.copy}</p><p>{maya.brandLife.detail}</p></Reveal></div>
    </section>
    <section className={styles.proof} aria-label="Career results">
      {maya.proof.map(item => <div className={styles.proofItem} key={item.value}><strong><MetricValue value={item.value} /></strong><h2>{item.label}</h2><p>{item.context}</p></div>)}
    </section>
    <section className={styles.stories} aria-labelledby="maya-stories">
      <h2 id="maya-stories">Growth you can measure.</h2>
      <div className={styles.storyGrid}>{maya.stories.map(story => <Reveal key={story.brand} className={styles.storyReveal}>
        <article className={styles.story}>
          <BrandIdentity id={story.brand} />
          <div className={styles.storyResult}><strong><MetricValue value={story.metric} /></strong><div><span>{story.metricLabel}</span><p>{story.secondary}</p></div></div>
          <ul className={styles.resultBullets}>{story.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
        </article>
      </Reveal>)}</div>
      <div className={styles.engagementGrid}>{maya.engagements.map(item => <article key={item.brand}><BrandIdentity id={item.brand} /><h4>{item.title}</h4><p>{item.copy}</p></article>)}</div>
      <div className={styles.supportingResult}><Image src="/images/brands/light/magnum.png" alt="Magnum Nutraceuticals logo" width={110} height={42} /><p><strong>303% ecommerce revenue growth</strong><span>Magnum Nutraceuticals · Sports nutrition &amp; supplements</span></p></div>
    </section>
    <section className={styles.audit} aria-labelledby="maya-audit">
      <div><h2 id="maya-audit">Unlock your next stage of <em>ecommerce growth.</em></h2><div className={styles.directContact}><div><a href={`mailto:${maya.email}`} data-contact-method="email">{maya.email}</a></div><LinkedInButton /></div></div>
      <div className={styles.auditCopy}><p>{maya.auditSummary}</p><AuditButton placement="closing" /></div>
    </section>
  </div>;
}
