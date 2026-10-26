import type { Metadata } from "next";
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
          <h1 className={`ks-x ${styles.title}`} id="post-title">
            {post.title}
            {post.titleAccent ? (
              <>
                {" "}
                <em>{post.titleAccent}</em>
              </>
            ) : null}
          </h1>
        </header>

        <div className={styles.body}>
          <div className={`${styles.offset} ${styles.intro}`}>
            {post.intro.map((paragraph, index) => (
              <PostParagraph className="ks-lede" key={index} paragraph={paragraph} />
            ))}
          </div>

          {post.sections.map((section) => (
            <section
              aria-labelledby={section.id}
              className={`${styles.section} ${section.number ? "" : styles.sectionClose}`}
              key={section.id}
            >
              <span className={`ks-num ${styles.number}`} aria-hidden="true">
                {section.number ? `${section.number}.` : null}
              </span>
              <div className={styles.sectionText}>
                <h2 className={`ks-x ${styles.heading}`} id={section.id}>
                  {section.number ? <span className="koala-sr-only">{section.number}. </span> : null}
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <PostParagraph className={styles.copy} key={index} paragraph={paragraph} />
                ))}
              </div>
            </section>
          ))}

          {post.signoff ? <p className={`${styles.offset} ${styles.signoff}`}>{post.signoff}</p> : null}

          <Link className={`ks-tlink ${styles.offset} ${styles.back}`} href={corePublicRoutes.blog}>
            <ArrowIcon direction="left" />
            <span>{blogIndexContent.backLabel}</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
