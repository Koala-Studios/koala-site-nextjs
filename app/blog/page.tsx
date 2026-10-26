import type { Metadata } from "next";
import Link from "next/link";

import { ArrowIcon } from "@/components/site/ArrowIcon";
import { Folio } from "@/components/system";
import {
  blogIndexContent,
  formatPostDate,
  getBlogPostTitle,
  getPublishedBlogPosts,
  getReadingMinutes,
  siteSettings,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { corePublicRoutes, getBlogPostPath, toAbsoluteUrl } from "@/lib/routes";

import styles from "./blog.module.css";

export const metadata: Metadata = createPageMetadata({
  title: blogIndexContent.seo.title,
  description: blogIndexContent.seo.description,
  path: blogIndexContent.seo.canonicalPath ?? corePublicRoutes.blog,
  keywords: ["ecommerce blog", "Shopify tips", "store audit"],
});

export default function BlogIndexPage() {
  const posts = getPublishedBlogPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteSettings.name} ${blogIndexContent.titleAccent}`,
    description: blogIndexContent.seo.description,
    url: toAbsoluteUrl(corePublicRoutes.blog),
    publisher: { "@type": "Organization", name: siteSettings.name, url: toAbsoluteUrl("/") },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: getBlogPostTitle(post),
      url: toAbsoluteUrl(getBlogPostPath(post.slug)),
      datePublished: post.publishedAt,
    })),
  };

  return (
    <div className="ks-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero} aria-labelledby="blog-title">
        <Folio items={["Koala Studios", `${posts.length} ${posts.length === 1 ? "post" : "posts"}`, "Journal"]} />
        <h1 className={`ks-x ks-split ${styles.title}`} id="blog-title">
          <span>{blogIndexContent.title}</span> <em>{blogIndexContent.titleAccent}</em>
        </h1>
        <p className={`ks-lede ${styles.lede}`}>{blogIndexContent.lede}</p>
      </section>

      <ol aria-label="Posts">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link className={styles.row} href={getBlogPostPath(post.slug)}>
              <span className={`ks-label ${styles.meta}`}>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span className="ks-muted">{getReadingMinutes(post)} min read</span>
              </span>
              <span className={styles.text}>
                <span className={`ks-x ${styles.postTitle}`}>
                  {post.title}
                  {post.titleAccent ? (
                    <>
                      {" "}
                      <em>{post.titleAccent}</em>
                    </>
                  ) : null}
                </span>
                <span className={styles.summary}>{post.summary}</span>
              </span>
              <ArrowIcon className={styles.arrow} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
