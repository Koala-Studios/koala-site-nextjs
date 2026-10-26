import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Folio } from "@/components/system";
import {
  blogIndexContent,
  formatPostDate,
  getBlogPostBySlug,
  getBlogPostTitle,
  getPublishedBlogPosts,
  getReadingMinutes,
  siteSettings,
} from "@/lib/content";
import { createBlogPostMetadata } from "@/lib/metadata";
import { corePublicRoutes, getBlogPostPath, toAbsoluteUrl } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

import { LeakFigure } from "@/components/blog/LeakFigure";

import { PostParagraph } from "./PostText";
import styles from "./post.module.css";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createBlogPostMetadata({
    slug: post.slug,
    title: post.seo.title,
    description: post.seo.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    tags: post.tags,
    image: post.seo.ogImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = toAbsoluteUrl(getBlogPostPath(post.slug));
  const date = formatPostDate(post.publishedAt);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: getBlogPostTitle(post),
    description: post.seo.description,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: siteConfig.defaultLocale,
    keywords: post.tags,
    image: toAbsoluteUrl(post.seo.ogImage ?? siteConfig.defaultOgImage),
    author: { "@type": "Organization", name: post.author, url: toAbsoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteSettings.name,
      url: toAbsoluteUrl("/"),
      logo: { "@type": "ImageObject", url: toAbsoluteUrl("/images/brand/koala-wordmark.png") },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: `${blogIndexContent.title} ${blogIndexContent.titleAccent}`, item: toAbsoluteUrl(corePublicRoutes.blog) },
        { "@type": "ListItem", position: 2, name: post.title, item: postUrl },
      ],
    },
  };

  const sectionsById = new Map(post.sections.map((section) => [section.id, section]));

  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className={styles.article} aria-labelledby="post-title">
        <header className={styles.hero}>
          <Folio
            items={[
              <Link className="koala-underline-link" href={corePublicRoutes.blog} key="journal">
                {blogIndexContent.title} {blogIndexContent.titleAccent}
              </Link>,
              <time dateTime={post.publishedAt} key="date">
                {date}
              </time>,
              `${getReadingMinutes(post)} min read`,
            ]}
          />
          <h1 className={styles.title} id="post-title">
            {post.title}
            {post.titleAccent ? (
              <>
                {" "}
                <em>{post.titleAccent}</em>
              </>
            ) : null}
          </h1>
          <p className={`ks-lede ${styles.deck}`}>{post.summary}</p>
          {post.cover ? (
            <Image
              alt={post.cover.alt}
              className={styles.cover}
              height={post.cover.height}
              priority
              sizes="(min-width: 1100px) 64rem, 100vw"
              src={post.cover.src}
              width={post.cover.width}
            />
          ) : null}
        </header>

        {post.map ? (
          <nav aria-labelledby="post-map" className={styles.map}>
            <h2 className={`ks-label ${styles.mapTitle}`} id="post-map">
              {post.map.title}
            </h2>
            <ol className={styles.stages}>
              {post.map.stages.map((stage) => (
                <li className={styles.stage} key={stage.label}>
                  <p className={styles.stageLabel}>{stage.label}</p>
                  <p className={styles.stageNote}>{stage.note}</p>
                  <ul className={styles.stageLeaks}>
                    {stage.sectionIds.map((id) => {
                      const section = sectionsById.get(id);
                      if (!section) return null;
                      return (
                        <li key={id}>
                          <a className={styles.leakLink} href={`#${id}`}>
                            <span className={styles.leakNumber}>{section.number}</span>
                            <span>{section.heading}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={styles.body}>
          <div className={styles.intro}>
            {post.intro.map((paragraph, index) => (
              <PostParagraph className={styles.copy} key={index} paragraph={paragraph} />
            ))}
          </div>

          {post.takeaways ? (
            <aside className={styles.takeaways} aria-labelledby="post-takeaways">
              <h2 className={styles.boxTitle} id="post-takeaways">
                {post.takeaways.title}
              </h2>
              <ol className={styles.takeawayList}>
                {post.takeaways.items.map((item, index) => (
                  <li key={index}>
                    <PostParagraph className={styles.copy} paragraph={item} />
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}

          {post.sections.map((section) =>
            section.number ? (
              <section aria-labelledby={section.id} className={styles.section} key={section.id}>
                <div className={styles.sectionHead}>
                  <p className={`ks-label ${styles.kicker}`}>
                    <span className={styles.kickerNumber}>Leak {section.number}</span>
                    {section.area ? <span>{section.area}</span> : null}
                    {section.fixTime ? <span className="ks-muted">Fix: {section.fixTime}</span> : null}
                  </p>
                  <h2 className={styles.heading} id={section.id}>
                    {section.heading}
                  </h2>
                </div>

                {section.paragraphs.map((paragraph, index) => (
                  <PostParagraph className={styles.copy} key={index} paragraph={paragraph} />
                ))}

                {section.figure ? (
                  <div className={styles.wide}>
                    <LeakFigure figure={section.figure} />
                  </div>
                ) : null}

                {section.why?.length ? (
                  <>
                    <h3 className={styles.subhead}>Why it costs sales</h3>
                    {section.why.map((paragraph, index) => (
                      <PostParagraph className={styles.copy} key={index} paragraph={paragraph} />
                    ))}
                  </>
                ) : null}

                {section.steps?.length ? (
                  <>
                    <h3 className={styles.subhead}>How to fix it</h3>
                    <ol className={styles.steps}>
                      {section.steps.map((step, index) => (
                        <li key={index}>
                          <PostParagraph className={styles.copy} paragraph={step} />
                        </li>
                      ))}
                    </ol>
                  </>
                ) : null}

                {section.check ? (
                  <p className={styles.check}>
                    <strong>Check yours:</strong> {section.check}
                  </p>
                ) : null}
              </section>
            ) : (
              <section aria-labelledby={section.id} className={styles.closing} key={section.id}>
                <h2 className={`ks-x ${styles.closingHeading}`} id={section.id}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <PostParagraph className={styles.copy} key={index} paragraph={paragraph} />
                ))}
              </section>
            ),
          )}

          {post.checklist ? (
            <aside className={`${styles.wide} ${styles.checklist}`} aria-labelledby="post-checklist">
              <div className={styles.checklistHead}>
                <h2 className={`ks-x ${styles.checklistTitle}`} id="post-checklist">
                  {post.checklist.title}
                </h2>
                <p className={styles.checklistNote}>{post.checklist.note}</p>
              </div>
              <ol className={styles.checklistItems}>
                {post.checklist.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </aside>
          ) : null}

          {post.cta ? (
            <aside className={`${styles.wide} ${styles.cta}`} aria-labelledby="post-cta">
              <div>
                <h2 className={`ks-x ${styles.ctaTitle}`} id="post-cta">
                  {post.cta.title}
                </h2>
                <p className={styles.ctaText}>{post.cta.text}</p>
              </div>
              <Link className="ks-btn ks-btn--light" href={post.cta.href}>
                <span>{post.cta.label}</span>
                <ArrowIcon className="ks-btn__arrow" />
              </Link>
            </aside>
          ) : null}

          {post.signoff ? <p className={styles.signoff}>{post.signoff}</p> : null}

          <Link className={`ks-tlink ${styles.back}`} href={corePublicRoutes.blog}>
            <ArrowIcon direction="left" />
            <span>{blogIndexContent.backLabel}</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
