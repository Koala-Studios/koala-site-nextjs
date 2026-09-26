import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Cta } from "@/components/site/Cta";
import { Arch, Folio, IndexList } from "@/components/system";
import type { CaseStudyContent, CaseStudyMedia } from "@/lib/content";
import { getCaseStudyCover } from "@/lib/content";
import { getCaseStudyPath } from "@/lib/routes";

import styles from "./CaseStudy.module.css";

/** Archivo 800 at wdth 125, caps: advance widths in em, measured in the browser. */
const capWidths: Record<string, number> = {
  A: 0.92, B: 0.9, C: 0.93, D: 0.92, E: 0.85, F: 0.79, G: 1, H: 0.98, I: 0.36, J: 0.72, K: 0.94, L: 0.74, M: 1.14,
  N: 0.98, O: 1, P: 0.85, Q: 1, R: 0.92, S: 0.86, T: 0.84, U: 0.96, V: 0.89, W: 1.2, X: 0.93, Y: 0.91, Z: 0.85,
};

/** 1 / longest word width in em: font-size = container width * --fit keeps whole words on a line. */
function titleFit(title: string) {
  const widths = title
    .toUpperCase()
    .split(/[\s-]+/)
    .map((word) => [...word].reduce((sum, char) => sum + (capWidths[char] ?? 0.9), 0.41));
  return { "--fit": (1 / (Math.max(...widths) * 1.04)).toFixed(4) } as CSSProperties;
}

type Props = { caseStudy: CaseStudyContent; number: number };

function MediaFrame({ item, priority }: { item: CaseStudyMedia; priority?: boolean }) {
  const width = item.width ?? 1440;
  const height = item.height ?? 1100;
  return (
    <figure className={`${styles.figure} ${height > width ? styles.portrait : ""}`}>
      <Image src={item.src} alt={item.alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 60vw" priority={priority} />
      <figcaption className="ks-label ks-muted">{item.alt}</figcaption>
    </figure>
  );
}

export function CaseStudyHero({ caseStudy, number }: Props) {
  const hero = caseStudy.heroImage ?? caseStudy.coverImage ?? caseStudy.media[0];
  const photographic = Boolean(caseStudy.coverImage || caseStudy.heroImage);
  const focus = caseStudy.metrics[0];

  return (
    <section className={styles.hero} aria-labelledby="case-study-title">
      <Link className={`ks-label ${styles.back}`} href="/work">
        <ArrowIcon direction="left" /> All work
      </Link>
      <Folio items={[`No. ${String(number).padStart(2, "0")}`, caseStudy.client, <em key="c" className="ks-it">{caseStudy.category}</em>]} />
      <div className={styles.titleBlock}>
        <div className={styles.titleFit}>
          <h1 className={`ks-x ${styles.title}`} id="case-study-title" style={titleFit(caseStudy.title)}>
            {caseStudy.title}
          </h1>
        </div>
        <p className={`ks-it ${styles.headline}`}>{caseStudy.headline}</p>
      </div>

      {hero ? (
        <div className={`${styles.heroMedia} ${photographic ? styles.heroPhoto : styles.heroShot}`}>
          <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" style={hero.position ? { objectPosition: hero.position } : undefined} />
        </div>
      ) : null}

      <dl className={styles.facts}>
        <div>
          <dt className="ks-label">Sector</dt>
          <dd>{caseStudy.sector}</dd>
        </div>
        <div>
          <dt className="ks-label">Services</dt>
          <dd>{caseStudy.services.join(" · ")}</dd>
        </div>
        {focus ? (
          <div>
            <dt className="ks-label">{focus.label}</dt>
            <dd>{focus.value}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}

export function CaseStudyStory({ caseStudy }: { caseStudy: CaseStudyContent }) {
  const heroSrc = (caseStudy.heroImage ?? caseStudy.coverImage ?? caseStudy.media[0])?.src;
  const media = caseStudy.media.filter((item) => item.src !== heroSrc);
  const chapters = [
    { title: <>The <em>challenge</em></>, body: <p>{caseStudy.challenge}</p>, media: media.filter((_, i) => i % 3 === 0) },
    { title: <>The <em>approach</em></>, body: <p>{caseStudy.approach}</p>, media: media.filter((_, i) => i % 3 === 1) },
    {
      title: <>The <em>outcome</em></>,
      body: (
        <ul className={styles.outcomes}>
          {caseStudy.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
      media: media.filter((_, i) => i % 3 === 2),
    },
  ];

  return (
    <div className={styles.story}>
      <p className={`ks-lede ${styles.intro}`}>{caseStudy.intro}</p>

      {chapters.map((chapter, index) => (
        <section className={styles.chapter} key={index}>
          <Reveal className={styles.chapterText}>
            <span className="ks-label">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="ks-x ks-h2">{chapter.title}</h2>
            <div className={styles.copy}>{chapter.body}</div>
          </Reveal>
          {chapter.media.length ? (
            <div className={styles.gallery}>
              {chapter.media.map((item) => (
                <MediaFrame item={item} key={item.src} />
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <h2 className="ks-label" id="deliverables-title">
          Deliverables
        </h2>
        <IndexList
          items={caseStudy.deliverables.map((item, index) => ({ key: item, lead: String(index + 1).padStart(2, "0"), name: item }))}
        />
        {caseStudy.externalUrl ? (
          <Cta className={styles.live} href={caseStudy.externalUrl} variant="text" target="_blank" rel="noreferrer">
            Visit the live store
          </Cta>
        ) : null}
      </section>

      {caseStudy.testimonial ? (
        <figure className={styles.quote}>
          <blockquote className="ks-quote">“{caseStudy.testimonial.quote}”</blockquote>
          <figcaption className="ks-label">
            {caseStudy.testimonial.author} · {caseStudy.testimonial.role}
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}

export function CaseStudyNext({ related }: { related?: CaseStudyContent }) {
  if (!related) {
    return (
      <section className={styles.next}>
        <Cta href="/work" variant="ghost">
          Back to all work
        </Cta>
      </section>
    );
  }
  const { image, position } = getCaseStudyCover(related);

  return (
    <section className={styles.next} aria-labelledby="case-study-next-title">
      <Link className={styles.nextLink} href={getCaseStudyPath(related.slug)}>
        <span className="ks-label">Next case</span>
        <span className={styles.nextBody}>
          {image ? (
            <Arch className={styles.nextArch} src={image.src} alt="" sizes="(max-width: 900px) 30vw, 14rem" position={position} />
          ) : null}
          <span>
            <span className={`ks-x ${styles.nextTitle}`} id="case-study-next-title" style={titleFit(related.title)}>
              {related.title}
            </span>
            <span className={`ks-it ${styles.nextHeadline}`}>{related.headline}</span>
          </span>
        </span>
      </Link>
    </section>
  );
}
