import { Reveal } from "@/components/animation/Reveal";
import { MetricValue } from "@/components/animation/MetricValue";
import { LinkedInButton } from "./LinkedInButton";
import { BrandsBuiltFor } from "@/components/brands/BrandsBuiltFor";
import { Cta } from "@/components/site/Cta";
import { auditOffer } from "@/lib/content/audit";
import { mayaContent as maya } from "@/lib/content/maya";
import { createPageMetadata } from "@/lib/metadata";
import { MayaHeadline, MayaPortrait } from "./MayaHero";
import styles from "./maya.module.css";

export const metadata = createPageMetadata({
  title: "Maya Amani | Chief Marketing & Growth Officer",
  description: "Meet Maya Amani, Chief Marketing & Growth Officer at Koala Studios. Executive marketing leadership for consumer brands. Request a free brand and growth audit.",
  path: "/maya", image: maya.portrait,
});
function AuditButton({ placement }: { placement: string }) {
  return <Cta className={styles.auditButton} href={auditOffer.mayaHref} variant="full" data-analytics-cta={`maya-${placement}`}>{auditOffer.cta}</Cta>;
}
export default function MayaPage() {
  return <div className={`koala-page ${styles.page}`}>
    <section className={styles.hero} aria-labelledby="maya-title">
      <div className={styles.heroCopy}><MayaHeadline /><AuditButton placement="hero" /></div>
      <MayaPortrait />
    </section>
    <BrandsBuiltFor />
    <section className={styles.belief} aria-labelledby="maya-belief">
      <Reveal><h2 id="maya-belief">{maya.beliefTitle}</h2></Reveal>
      <Reveal className={styles.beliefBody}>{maya.belief.map(copy => <p key={copy}>{copy}</p>)}<a className={styles.profileLink} href={maya.profile} target="_blank" rel="noreferrer">View my executive profile <span aria-hidden="true">↗</span></a></Reveal>
    </section>
    <section className={styles.proof} aria-label="Career results">
      {maya.proof.map(item => <div className={styles.proofItem} key={item.value}><strong><MetricValue value={item.value} /></strong><h2>{item.label}</h2><p>{item.context}</p></div>)}
    </section>
    <section className={styles.stories} aria-labelledby="maya-stories">
      <h2 id="maya-stories">Growth you can measure.</h2>
      <div className={styles.storyGrid}>{maya.stories.map(story => <Reveal key={story.name} className={styles.storyReveal}>
        <article className={styles.story}>
          <h3>{story.name}</h3>
          <div className={styles.storyResult}><strong><MetricValue value={story.metric} /></strong><div><span>{story.metricLabel}</span><p>{story.secondary}</p></div></div>
          <p className={styles.storyCopy}>{story.copy}</p>
        </article>
      </Reveal>)}</div>
    </section>
    <section className={styles.audit} aria-labelledby="maya-audit">
      <div><h2 id="maya-audit">Find your next<br /><em>growth opportunity.</em></h2><div className={styles.directContact}><div><a href={`mailto:${maya.email}`} data-contact-method="email">{maya.email}</a><a href={maya.phoneHref} data-contact-method="phone">{maya.phone}</a></div><LinkedInButton /></div></div>
      <div className={styles.auditCopy}><p>{auditOffer.summary}</p><AuditButton placement="closing" /></div>
    </section>
  </div>;
}
